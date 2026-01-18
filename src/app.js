import express from "express";

import { connectDB } from "./config/database.js";
import { userModel } from "./models/user.js";
const app = express();

//Middleware to parse JSON request body
app.use(express.json());


app.post("/signup", async (req, res) => {
  try {
    // const { firstName, lastName, emailId, password } = req.body;
    // const user = new userModel({
        //   firstName,
        //   lastName,
        //   emailId,
        //   password,
    // });
    const user = new userModel(req.body);

  
    await user.save();
    console.log('saved');

    res.status(201).send("User added successfully");
  } catch (err) {
    console.log('Error ',err);
    res.status(500).send("something went wrong");
  }
});

//* Connecting to Database then listening to server 7000
connectDB()
  .then(() => {
    console.log("database connection established");
    app.listen(7000, () => {
      console.log("Server is successfully listening on port 7000");
    });
  })
  .catch((err) => {
    console.error("database cannot be connected");
  });
