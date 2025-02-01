const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.mongoURI);
    console.log("MongoDB connection SUCCESS");
  } catch (err) {
    console.error("Failed to connect to MongoDB");
    process.exit(1);
  }
};

module.exports = { connectDb };
