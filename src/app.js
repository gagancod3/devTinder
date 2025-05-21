// console.log("hello");

const express = require("express");

const app = express();

//**multiple request handlers along with next()

// app.use("/user",(req,res,next) => {
// console.log('Response 1');

// // // res.send("1st reponse");

// next();
// },
// (req,res) => {
// console.log('Response 2');
// res.send("2nd reponse");
// },
// );
const { user_auth, admin_auth } = require("./middleware/auth");

app.use("/user", user_auth);

app.use("/admin", admin_auth);

// once authentication for '/user' is done it'll come here if requested for '/user/data'
app.get("/user/data", (req, res) => {
  res.send("User data sent");
});

// once authentication for '/admin' is done it'll come here if requested for '/admin/login'
app.get("/admin/login", (req, res) => {
  res.send("Admin user logged in");
});

//**error handling

app.get("/getUserData", (req, res) => {
  try {
    throw new Error("abcd");
    res.send("user data sent");
  } catch (err) {
    res.status(500).send("something went wrong while fetching userdata");
  }
});

// syntax parameters chain
// app.use("/path",(req,res)=>{})
// app.use("/path",(req,res,next)=>{})
// app.use("/path",(err,req,res,next)=>{})

app.use("/", (err, req, res, next) => {
  if (err) {
    //logging error
    res.status(500).send("something went wrong");
  }
  // next();
});

//server listens at port 7000
app.listen(7000, () => {
  console.log("Server is live on port 7000");
});
