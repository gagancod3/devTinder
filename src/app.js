const express = require("express");
require("./config/database");
const app = express();
const User = require("./models/user");
app.post("/signup", async (req,res)=> {
  //Creating a new instance of the User model

  const user = new User({
    firstName: "Arun",
    lastName: "Singh",
    emailId: "arun@yahoo.in",
    password: "arun123",
  });

  await user.save();
})

//server listens at port 7000
app.listen(7000, () => {
  console.log("Server is live on port 7000");
});
