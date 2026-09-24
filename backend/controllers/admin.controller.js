const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const Admin = require("../models/user.model");

const loginAdmin = async (req, res) => {
  try {

    const { email, password } = req.body;
        console.log(email,password)


    //check fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    //find admin

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    //Active Check

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Admin account is inactive",
      });
    }

    //compare password

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // generate admin jwt

    const token = jwt.sign(
      {
        adminId: admin._id,
        role: admin.role,
      },

      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // success response
    res.status(200).json({
      success: true,
      message: "Admin login successfully",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive,
      },
    });
  } catch (error) {
    console.error("Admin Login Error", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { loginAdmin };
