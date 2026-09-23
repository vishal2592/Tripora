require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("../models/admin.model");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const existingAdmin = await Admin.findOne({
      email: "admin@tripora.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin@12345", 10);

    const admin = await Admin.create({
      name: "Tripora Admin",
      email: "admin@tripora.com",
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    console.log("Admin created successfully");
    console.log("Admin ID:", admin._id);

    process.exit(0);
  } catch (error) {
    console.error("Create Admin Error:", error);
    process.exit(1);
  }
};

createAdmin();
