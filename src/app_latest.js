import express from "express" ;
import("./config/database");
const app = express();
import User from "./models/user.js";
import {ValidateSignUp} from "./utils/validation.js";
const bcrypt = require("bcrypt");

app.use(express.json());

// **GET API '/feed' - to fetch all the users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.send("No user is present");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

// ** GET API '/user' - to fetch users with queried 'emailId'
app.get("/user", async (req, res) => {
  const useremail = req.body.emailId;
  const user = await User.findOne({ emailId: useremail });
  // console.log(user);
  try {
    if (user === null) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

// ** GET API '/user/id' - to fetch users with queried '_id' (default key by MongoDB)
app.get("/user/id", async (req, res) => {
  const userId = req.body._id;
  // console.log(userId);
  const user = await User.findById({ _id: userId });
  // console.log(user);
  try {
    if (user === null) {
      res.status(404).send("Id not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

// ** DELETE API '/user' - to fetch users with queried '_id' and delete it
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  const user = await User.findByIdAndDelete({ _id: userId });
  // OR
  // const user = await User.findByIdAndDelete(userId);
  try {
    if (user === null) {
      res.status(404).send("Id not found");
    } else {
      res.send({ message: "User got deleted", user: user });
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

// ** PUT API

// ** PATCH API '/user' - to fetch users with queried '_id' and update them with
app.patch("/user/:userId", async (req, res) => {
  console.log(req.params?.userId);
  const userId = req.params?.userId;
  const data = req.body;

  try {
    // **Data Sanitization - API validation for fields
    const ALLOWED_UPDATES = ["age", "gender", "skills", "about", "photoUrl"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    console.log(isUpdateAllowed, "flag");
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("skills limit exceeded");
    }
    const user = await User.findOneAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);

    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send("Update failed: " + err.message);
  }
});

// ** PATCH API '/user/email' - to fetch users with queried 'emailId' and update them with
app.patch("/user/email", async (req, res) => {
  console.log(req.body.emailId);
  const emailId = req.body.emailId;
  const data = req.body;

  const user = await User.findOneAndUpdate({ emailId: emailId }, data, {
    returnDocument: "after",
  });
  console.log(user);
  try {
    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

//**post API (aysnc callback function)
app.post("/signup", async (req, res) => {
  //Creating a new instance of the User model
  // **dynamically passed object from Client API side**
  try {
    const data = req.body;

    // Validation of data
    ValidateSignUp(data); //using utils function to validate the request body

    const {firstName, lastName, emailId, password} = data;

    // Encrypt the password
    const saltRounds = 10;
    const myPlaintextPassword = password;
    const passwordHash = await bcrypt.hash(myPlaintextPassword, saltRounds); //promise 
    
    // console.log("passwordHash::",passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash
    });
    await user.save();
    res.send("user added succesfully");
    // **error handling**
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

app.post("/login", async(req,res) => {
  try{
  const {emailId, password} = req.body;

  const user = await User.findOne({emailId: emailId});

  if (!user) {
    throw new Error('Invalid user credentials');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password); // compares encrypted password

  if(isPasswordValid){
    res.send('Successfully logged in');
  }
  else{
    throw new Error('Invalid user credentials');
  }
}
catch(err){
  res.status(400).send('ERROR: '+ err.message);
}
});

//**NOTE: MongoDB creates a '_id' key value in the every document inserted. Recommendation is not to alter the this '_id' key
// **let MongoDB assign the self-generated value to it

//server listens at port 7000
app.listen(7000, () => {
  console.log("Server is live on port 7000");
});
