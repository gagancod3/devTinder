const mongoos = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://user:<db_password>@cluster.wa.mongodb.net/sample_mflix"
  );
};

connectDB()
  .then(() => {
    console.log("database connection established");
  })
  .catch((err) => {
    console.error("database cannot be connected");
  });
