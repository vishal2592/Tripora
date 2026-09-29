const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const HotelBooking = require("../models/hotelBooking.model");
const PackageBooking = require("../models/packageBooking.model");
// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get All Users Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching users",
      error: error.message,
    });
  }
};

// Get single user
const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Get user without password
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // =========================
    // HOTEL BOOKING COUNTS
    // =========================

    const hotelTotal = await HotelBooking.countDocuments({
      user: id,
    });

    const hotelPending = await HotelBooking.countDocuments({
      user: id,
      bookingStatus: "pending",
    });

    const hotelConfirmed = await HotelBooking.countDocuments({
      user: id,
      bookingStatus: "confirmed",
    });

    const hotelCancelled = await HotelBooking.countDocuments({
      user: id,
      bookingStatus: "cancelled",
    });

    const hotelCompleted = await HotelBooking.countDocuments({
      user: id,
      bookingStatus: "completed",
    });

    // =========================
    // PACKAGE BOOKING COUNTS
    // =========================

    const packageTotal = await PackageBooking.countDocuments({
      user: id,
    });

    const packagePending = await PackageBooking.countDocuments({
      user: id,
      bookingStatus: "Pending",
    });

    const packageConfirmed = await PackageBooking.countDocuments({
      user: id,
      bookingStatus: "Confirmed",
    });

    const packageCancelled = await PackageBooking.countDocuments({
      user: id,
      bookingStatus: "Cancelled",
    });

    const packageCompleted = await PackageBooking.countDocuments({
      user: id,
      bookingStatus: "Completed",
    });

    // =========================
    // TOTAL BOOKINGS
    // =========================

    const totalBookings = hotelTotal + packageTotal;

    // =========================
    // STATUS TOTALS
    // =========================

    const pendingBookings = hotelPending + packagePending;

    const confirmedBookings = hotelConfirmed + packageConfirmed;

    const cancelledBookings = hotelCancelled + packageCancelled;

    const completedBookings = hotelCompleted + packageCompleted;

    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",

      user: {
        ...user.toObject(),

        bookings: totalBookings,

        bookingStats: {
          total: totalBookings,

          hotel: hotelTotal,

          package: packageTotal,

          pending: pendingBookings,

          confirmed: confirmedBookings,

          cancelled: cancelledBookings,

          completed: completedBookings,
        },
      },
    });
  } catch (error) {
    console.error("Get Single User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching user details",
      error: error.message,
    });
  }
};
// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const {
      fullName,
      email,
      mobileNumber,
      location,
      dob,
      gender,
      avatar,
      preferredDestination,
      travelType,
      seatPreference,
      mealPreference,
    } = req.body;

    // Check duplicate email
    if (email && email.toLowerCase() !== user.email) {
      const existingEmail = await User.findOne({
        email: email.toLowerCase(),
        _id: { $ne: id },
      });

      if (existingEmail) {
        return res.status(409).json({
          success: false,
          message: "Email already registered with another user",
        });
      }

      user.email = email.toLowerCase().trim();
    }

    // Check duplicate mobile number
    if (mobileNumber && mobileNumber !== user.mobileNumber) {
      const existingMobile = await User.findOne({
        mobileNumber,
        _id: { $ne: id },
      });

      if (existingMobile) {
        return res.status(409).json({
          success: false,
          message: "Mobile number already registered with another user",
        });
      }

      user.mobileNumber = mobileNumber.trim();
    }

    // Update fields only if provided
    if (fullName !== undefined) {
      user.fullName = fullName.trim();
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
      user.avatar = avatar.trim();
    }

    if (preferredDestination !== undefined) {
      user.preferredDestination = preferredDestination.trim();
    }

    if (travelType !== undefined) {
      user.travelType = travelType.trim();
    }

    if (seatPreference !== undefined) {
      user.seatPreference = seatPreference.trim();
    }

    if (mealPreference !== undefined) {
      user.mealPreference = mealPreference.trim();
    }

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
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
    console.error("Update User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while updating user",
      error: error.message,
    });
  }
};

// Block / Unblock user
const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Toggle user status
    user.isActive = !user.isActive;

    await user.save();

    return res.status(200).json({
      success: true,
      message: user.isActive
        ? "User unblocked successfully"
        : "User blocked successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Toggle User Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while updating user status",
      error: error.message,
    });
  }
};

// Toggle user email verification
const toggleUserVerification = async (req, res) => {
  try {
    const { id } = req.params;

    // Check valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Toggle verification status
    user.isVerified = !user.isVerified;

    await user.save();

    return res.status(200).json({
      success: true,
      message: user.isVerified
        ? "User email verified successfully"
        : "User email verification removed successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Toggle User Verification Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while updating verification status",
      error: error.message,
    });
  }
};
// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent deleting admin account
    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin user cannot be deleted",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber,
      },
    });
  } catch (error) {
    console.error("Delete User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while deleting user",
      error: error.message,
    });
  }
};

// Create user from admin panel
const createUserByAdmin = async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobileNumber,
      location,
      dob,
      gender,
      avatar,
      preferredDestination,
      travelType,
      seatPreference,
      mealPreference,
      role,
      isActive,
      password,
    } = req.body;

    // Required fields
    if (!fullName || !email || !mobileNumber) {
      return res.status(400).json({
        success: false,
        message: "Full name, email and mobile number are required",
      });
    }

    // Password required for creating a new user
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    // Check existing email
    const existingEmail = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Check existing mobile number
    const existingMobile = await User.findOne({
      mobileNumber: mobileNumber.trim(),
    });

    if (existingMobile) {
      return res.status(409).json({
        success: false,
        message: "Mobile number already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      mobileNumber: mobileNumber.trim(),
      location: location?.trim(),
      dob,
      gender,
      avatar: avatar?.trim(),
      preferredDestination: preferredDestination?.trim(),
      travelType: travelType?.trim(),
      seatPreference: seatPreference?.trim(),
      mealPreference: mealPreference?.trim(),
      password: hashedPassword,
      role: role === "admin" ? "admin" : "user",
      isActive: isActive !== undefined ? isActive : true,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        location: user.location,
        dob: user.dob,
        gender: user.gender,
        avatar: user.avatar,
        preferredDestination: user.preferredDestination,
        travelType: user.travelType,
        seatPreference: user.seatPreference,
        mealPreference: user.mealPreference,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Create User By Admin Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while creating user",
      error: error.message,
    });
  }
};
module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  toggleUserStatus,
  toggleUserVerification,
  deleteUser,
  createUserByAdmin,
};
