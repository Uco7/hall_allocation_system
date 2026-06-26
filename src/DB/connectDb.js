const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Db connection successful");
  } catch (error) {
    console.error("Database connection failed:");
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDb;