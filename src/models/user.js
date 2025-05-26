const mongoose = require("mongoose");

//Schema
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true, // validation - mandatory field
    minLength: 4,
    maxLength: 50,
},
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true, // only unique key can be inserted
    lowercase: true, // converts value to lowercase
    trim: true, // removes white spaces
},
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    // custom validation function
    validate(value){
        if(!["male","female","others"].includes(value)){
            throw new Error("Gender data is not valid");
        }
    }
  },
  photoUrl: {
    type: String,
    default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.citypng.com%2Fphoto%2F19313%2Fdownload-black-male-user-profile-icon-png&psig=AOvVaw0HOXkXXHpXc4fnko1Ny96u&ust=1748347272481000&source=images&cd=vfe&opi=89978449&ved=2ahUKEwiK152ii8GNAxXD7DgGHfdaFEQQjRx6BAgAEBk"
  },
  about: {
    type: String,
    default: "This is a default about description of the user!"
  },
  skills: {
    type: [String],
  },
});

//Model
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
