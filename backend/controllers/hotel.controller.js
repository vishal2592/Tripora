const { model } = require("mongoose");
const Hotel = require("../models/hotel.model");

const createHotel = async (req, res) => {
  try {
    const {
      hotelName,
      propertyType,
      starRating,
      reviews,
      email,
      phone,
      city,
      state,
      country,
      address,
      pincode,
      description,
      checkIn,
      checkOut,
      rooms,
      price,
      amenities,
      status,
      image,
      images,
    } = req.body;

    // check fields
    if (!hotelName || !city || !address || !rooms || !price) {
      return res.status(400).json({
        success: false,
        message: "hotelName,city,address,rooms & price are required",
      });
    }

    const hotel = await Hotel.create({
      hotelName,
      propertyType,
      starRating,
      reviews,
      email,
      phone,
      city,
      state,
      country,
      address,
      pincode,
      description,
      checkIn,
      checkOut,
      rooms,
      price,
      amenities,
      status,
      image,
      images,
    });

    // success response
    return res.status(201).json({
      success: true,
      message: "Hotel created successfully",
      hotel,
    });
  } catch (error) {
    console.error("Create Hotel Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//get all hotels

const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: hotels.length,
      hotels,
    });
  } catch (error) {
    console.error("Get All Hotels Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// get single hotel

const getSignleHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    // success response

    return res.status(200).json({
      success: true,
      hotel,
    });
  } catch (error) {
    console.error("Get Signle Hotel Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//update hotel

const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      hotelName,
      propertyType,
      starRating,
      reviews,
      email,
      phone,
      city,
      state,
      country,
      address,
      pincode,
      description,
      checkIn,
      checkOut,
      rooms,
      price,
      amenities,
      status,
      image,
      images,
    } = req.body;

    //check required fields
    if (!hotelName || !city || !address || !rooms || !price) {
      return res.status(400).json({
        success: false,
        message: "hotelName,city,address,rooms & price are required",
      });
    }
    // check hotel exist
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    // Update hotel

    hotel.hotelName = hotelName;
    hotel.propertyType = propertyType;
    hotel.starRating = starRating;
    hotel.email = email;
    hotel.phone = phone;
    hotel.city = city;
    hotel.state = state;
    hotel.country = country;
    hotel.address = address;
    hotel.pincode = pincode;
    hotel.description = description;
    hotel.checkIn = checkIn;
    hotel.checkOut = checkOut;
    hotel.rooms = rooms;
    hotel.price = price;
    hotel.amenities = amenities;
    hotel.status = status;
    hotel.image = image;
    hotel.images = images;

    await hotel.save();

    //success response
    return res.status(200).json({
      success: true,
      message: "Hotel updated successfully",
      hotel,
    });
  } catch (error) {
    console.error("Update Hotel Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//delete hotel

const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;

    //check existing hotel
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    // delete hotel

    await Hotel.findByIdAndDelete(id);

    //success response
    return res.status(200).json({
      success: true,
      message: "Hotel deleted successfully",
    });
  } catch (error) {
    console.error("Delet Hotel Error:", error);
    return res.status(500).json({
      success: false,
      messgae: "Server error",
      error: error.message,
    });
  }
};
module.exports = {
  createHotel,
  getAllHotels,
  getSignleHotel,
  updateHotel,
  deleteHotel,
};
