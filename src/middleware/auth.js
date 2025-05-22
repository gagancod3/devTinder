// midddleware authenticator

// admin
const admin_auth = (req, res, next) => {
  const token = "1234";

  if ("1234" === token) {
    console.log("Admin authenticated");
    // res.send("User authenticated");
    next();
  } else {
    res.status(401).send("Admin not authenticated");
  }
};

// user
const user_auth = (req, res, next) => {
  const token = "abcd";

  if ("abcd" === token) {
    console.log("User authenticated");
    // res.send("User authenticated");
    next();
  } else {
    res.status(401).send("User not authenticated");
  }
};


module.exports = {user_auth, admin_auth};
