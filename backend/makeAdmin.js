const mongoose = require("mongoose");
const User = require("./models/user.model");
require("dotenv").config();

// 👇 REPLACE THIS WITH THE EMAIL YOU WANT TO MAKE ADMIN
const targetEmail = "balakri818@gmail.com"; 

const promoteUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to database...");

    const user = await User.findOne({ email: targetEmail });

    if (!user) {
      console.log(`❌ User with email '${targetEmail}' not found.`);
    } else {
      user.role = "admin";
      await user.save();
      console.log(`🎉 Success! ${user.name} is now an ADMIN.`);
    }
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    mongoose.disconnect();
  }
};

promoteUser();