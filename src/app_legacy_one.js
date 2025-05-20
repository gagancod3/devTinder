// console.log("hello");

const express = require("express");

const app = express();

//request handlers


//** NOTE:

// when we use "app.use() we need to take care of the order of request handler as it matches the intial string which if declared above the enxtended endpoint, will open the earlier endpoint only"

/*

app.use("/", (req, res) => {
  res.send("Welcome to Home page!");
});

app.use("/test", (req, res) => {
  res.send("Welcome to Test page!");
});

so if we use above code, and try to render localhost:7000/test , it'll still render for "/"


*/

// if we use specific HTTP methods for request handlers, the problem we face in "app.use()" is terminated

app.get("/", (req, res) => {
  res.send("Welcome to Home page!");
});

app.get("/test", (req, res) => {
  res.send("Welcome to Test page!");
});

// **testing HTTP methods for dummy user response
app.get("/user", (req, res) => {
  res.send("user data fetched");
});

app.post("/user", (req, res) => {
  res.send("Data posted successfully");
});

app.delete("/user", (req, res) => {
  res.send("Deleted user");
});

// **RegExp in endpoints

//optional '?'

// '^' = start of string

// /a+b = match one or more "a"s followed by "b"

// '$' = end of string

// '*' anything like *a means anything before letter 'a' 

app.get(/^\/a+b$/, (req, res) => {
  res.send("matched pattern /a+b");
});


app.get(/^\/ab?c$/, (req, res) => {
  res.send("matched pattern /ab?c");
});

app.get(/^\/.*a$/, (req, res) => {
  res.send("matched pattern /.*a");
});

// **params

app.get("/user/:userId", (req, res) => {
  console.log(req.params);
  console.log(req.params.userId);
  res.send("user data fetched");
  // res.send(`User ID: ${req.params.id}`);
});


// **Query 

// GET /search?name=John&age=25

app.get("/search", (req, res) => {
  console.log('request query',req.query);
   res.send(`Name: ${req.query.name}, Age: ${req.query.age}`);
});


// if we don't pass any 'res', our api call goes into infinte loop

// app.use("/emptyuser",(req,res)=>{

// });


//server listens at port 7000
app.listen(7000, () => {
  console.log("Server is live on port 7000");
});


