console.log("hello");

const express = require("express");

const app = express();

//request handlers
app.get("/", (req, res) => {
  res.send("Welcome to Home page!");
});

app.get("/test", (req, res) => {
  res.send("Welcome to Test page!");
});

//server listens at port 7000
app.listen(7000, () => {
  console.log("Server is live on port 7000");
});


