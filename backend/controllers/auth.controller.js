const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const registerUser = async (req, res) => {
  try {
    const { fullName, email, mobileNumber, password, confirmPassword } =
      req.body;

    // missing fileds check
    if (!fullName || !email || !mobileNumber || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //check existing email

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already exist",
      });
    }

    // check mobileNumber exist
    const existingmobileNumber = await User.findOne({ mobileNumber });
    if (existingmobileNumber) {
      return res.status(409).json({
        success: false,
        message: "Mobile number already exist",
      });
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user

    const user = await User.create({
      fullName,
      email,
      mobileNumber,
      password: hashedPassword,
    });

    //response
    res.status(201).json({
      succes: true,
      message: "User registered Successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Register Error", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register first",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        role: user.role,
      },
    });
  } catch (error) {
    console.loge("Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//get profile

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.loge("Get Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// update profile

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      name,
      mobile,
      location,
      dob,
      gender,
      avatar,
      preferredDestination,
      travelType,
      seatPreference,
      mealPreference,
    } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message,
      });
    }

    if (mobile && mobile !== user.mobileNumber) {
      const existingUser = await User.findOne({
        mobileNumber: mobile,
        _id: { $ne: userId },
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Mobile number is already registered",
        });
      }

      user.mobileNumber = mobile;
    }

    // Update profile fields
    if (name !== undefined) {
      user.fullName = name.trim();
    }

    if (location !== undefined) {
      user.location = location.trim();
    }

    if (dob !== undefined) {
      user.dob = dob;
    }

    if (gender !== undefined) {
      user.gender = gender;
    }

    if (avatar !== undefined) {
      user.avatar = avatar;
    }

    if (preferredDestination !== undefined) {
      user.preferredDestination = preferredDestination;
    }

    if (travelType !== undefined) {
      user.travelType = travelType;
    }

    if (seatPreference !== undefined) {
      user.seatPreference = seatPreference;
    }

    if (mealPreference !== undefined) {
      user.mealPreference = mealPreference;
    }

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        mobileNumber: updatedUser.mobileNumber,
        location: updatedUser.location,
        dob: updatedUser.dob,
        gender: updatedUser.gender,
        avatar: updatedUser.avatar,
        preferredDestination: updatedUser.preferredDestination,
        travelType: updatedUser.travelType,
        seatPreference: updatedUser.seatPreference,
        mealPreference: updatedUser.mealPreference,
        role: updatedUser.role,
        isActive: updatedUser.isActive,
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
};
