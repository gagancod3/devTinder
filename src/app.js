// console.log("hello");

const express = require("express");

const app = express();

//**multiple request handlers along with next()

app.use("/user",(req,res,next) => {
console.log('Response 1');
// res.send("1st reponse");
next();
},
(req,res) => {
console.log('Response 2');
res.send("2nd reponse");
},
);

//server listens at port 7000
app.listen(7000, () => {
  console.log("Server is live on port 7000");
});


