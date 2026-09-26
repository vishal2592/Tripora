const SavedHotel = require("../models/savedHotel.model");
const Hotel = require("../models/hotel.model");

const saveHotel = async (req, res) => {
  try {
    const { hotelId } = req.params;

    if (!hotelId) {
      return res.status(400).json({
        success: false,
        message: "Hotel ID is required",
      });
    }

    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required",
      });
    }

    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    const alreadySaved = await SavedHotel.findOne({
      user: req.user.userId,
      hotel: hotel._id,
    });

    if (alreadySaved) {
      return res.status(400).json({
        success: false,
        message: "Hotel is already saved",
      });
    }

    const savedHotel = await SavedHotel.create({
      user: req.user.userId,

      hotel: hotel._id,

      hotelDetails: {
        name: hotel.hotelName,
        image: hotel.image || "",
        location: `${hotel.city || ""}, ${hotel.state || ""}`.replace(
          /,\s*$/,
          "",
        ),
        price: hotel.price || 0,
        rating: hotel.rating || 0,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Hotel saved successfully",
      savedHotel,
    });
  } catch (error) {
    console.error("Save Hotel Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getSavedHotels = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required",
      });
    }

    const savedHotels = await SavedHotel.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Saved hotels fetched successfully",
      count: savedHotels.length,
      savedHotels,
    });
  } catch (error) {
    console.error("Get Saved Hotels Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//removeSavedHotel

const removeSavedHotel = async (req, res) => {
  try {
    const { hotelId } = req.params;

    if (!hotelId) {
      return res.status(400).json({
        success: false,
        message: "Hotel ID is required",
      });
    }

    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required",
      });
    }

    const savedHotel = await SavedHotel.findOne({
      user: req.user.userId,
      hotel: hotelId,
    });

    if (!savedHotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel is not saved",
      });
    }

    await SavedHotel.findByIdAndDelete(savedHotel._id);

    return res.status(200).json({
      success: true,
      message: "Hotel removed from saved hotels successfully",
    });
  } catch (error) {
    console.error("Remove Saved Hotel Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  saveHotel,
  getSavedHotels,
  removeSavedHotel,
};
