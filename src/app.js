const express = require("express");
require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

//**post API
app.post("/signup", async (req, res) => {
  //Creating a new instance of the User model

  // console.log(req.body);

  //** adding data here

  // one way**
  // const userobj = {
  //   firstName: "Arun",
  //   lastName: "Singh",
  //   emailId: "arun@yahoo.in",
  //   password: "arun123",
  // }
  // const user = new User (userobj);

  // **another way
  // const user = new User({
  //   firstName: "Prateek",
  //   lastName: "Singh",
  //   emailId: "prateek@yahoo.in",
  //   password: "prateek123",
  // });

  // **dynamically passed object from Client API side
    const user = new User(req.body);

  // **error handling
  try {
    await user.save();
    res.send("user added succesfully");
  } catch (err) {
    res.status(400).send("error saving the user:" + err.message);
  }
});

//**NOTE: MongoDB creates a '_id' key value in the every document inserted. Recommendation is not to alter the this '_id' key
// **let MongoDB assign the self-generated value to it

//server listens at port 7000
app.listen(7000, () => {
  console.log("Server is live on port 7000");
});
