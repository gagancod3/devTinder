const mongoose = require("mongoose");

//Schema
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true, // validation - mandatory field
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      minLength: 4,
      maxLength: 50,
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
      minLength: 8,
      maxLength: 50,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      lowercase: true,
      // **custom validation function
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.citypng.com%2Fphoto%2F19313%2Fdownload-black-male-user-profile-icon-png&psig=AOvVaw0HOXkXXHpXc4fnko1Ny96u&ust=1748347272481000&source=images&cd=vfe&opi=89978449&ved=2ahUKEwiK152ii8GNAxXD7DgGHfdaFEQQjRx6BAgAEBk",
    },
    about: {
      type: String,
      default: "This is a default about description of the user!",
    },
    skills: {
      type: [String],
      maxLength: 10,
    },
  },
  {
    timestamp: true, 
    /**
     **Mongoose schemas support a timestamps option. If you set timestamps: true, Mongoose will add two properties of type Date to your schema:

        **createdAt: a date representing when this document was created
        **updatedAt: a date representing when this document was last updated


        Mongoose will then set createdAt when the document is first inserted,
        and update updatedAt whenever you update the document using: 
        ** save(), updateOne(), updateMany(), findOneAndUpdate(), update(), replaceOne(), or bulkWrite()

        **SYNTAX
        const userSchema = new Schema({ name: String }, { timestamps: true });

     */
  }
);

//Model
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
