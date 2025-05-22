const mongoose = require('mongoose');

//Schema
const userSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    age:{
        type: Number
    },
    gender:{
        type: String
    }
});

//Model
const userModel = mongoose.model("User",userSchema);

module.exports = userModel;

