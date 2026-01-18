// midddleware authenticator

// admin
export const adminAuth = (req, res, next) => {
  const token = "1234";
  const isAdminAuthorized = token === "1234";
  if (!isAdminAuthorized) {
    res.status(401).send("Admin not authenticated");
  } else {
    console.log("Admin authenticated from 'admin_auth' call");
    next();
  }
};

// user
export const userAuth = (req, res, next) => {
  const token = "abcd";

  if ("abcd" === token) {
    console.log("User authenticated");
    next();
  } else {
    res.status(401).send("User not authenticated");
  }
};

