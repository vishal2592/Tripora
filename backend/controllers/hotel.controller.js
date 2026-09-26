const Hotel = require("../models/hotel.model");
const { uploadToImgBB, deleteFromImgBB } = require("../utils/imgbb");

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
    } = req.body;

    // Check required fields
    if (!hotelName || !city || !address || !rooms || !price) {
      return res.status(400).json({
        success: false,
        message: "hotelName, city, address, rooms & price are required",
      });
    }

    // If image is uploaded
    let imageUrl = "";
    let imageDeleteUrl = "";
    let imageUrls = [];
    let imageDeleteUrls = [];

    // Main image
    if (req.files?.image?.length > 0) {
      const mainImage = req.files.image[0];

      const uploadResult = await uploadToImgBB(
        mainImage.buffer,
        mainImage.originalname,
      );

      imageUrl = uploadResult.data.url;
      imageDeleteUrl = uploadResult.data.deleteUrl;
    }

    // Multiple gallery images
    if (req.files?.images?.length > 0) {
      for (const image of req.files.images) {
        const uploadResult = await uploadToImgBB(
          image.buffer,
          image.originalname,
        );

        imageUrls.push(uploadResult.data.url);
        imageDeleteUrls.push(uploadResult.data.deleteUrl);
      }
    }

    // Create hotel
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
      //main image
      image: imageUrl,
      imageDeleteUrl: imageDeleteUrl,
      //gellary image
      images: imageUrls,
      imageDeleteUrls: imageDeleteUrls,
    });

    // Success response
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

// update hotel
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
    } = req.body;

    // Check required fields
    if (!hotelName || !city || !address || !rooms || !price) {
      return res.status(400).json({
        success: false,
        message: "hotelName, city, address, rooms & price are required",
      });
    }

    // Check hotel exists
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    // Update hotel fields
    hotel.hotelName = hotelName;
    hotel.propertyType = propertyType;
    hotel.starRating = starRating;
    hotel.reviews = reviews;
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

    // Update Main Image

    if (req.files?.image?.length > 0) {
      const mainImage = req.files.image[0];

      // Save old delete URL
      const oldDeleteUrl = hotel.imageDeleteUrl;

      // Upload new main image
      const uploadResult = await uploadToImgBB(
        mainImage.buffer,
        mainImage.originalname,
      );

      // Save new image URLs
      hotel.image = uploadResult.data.url;
      hotel.imageDeleteUrl = uploadResult.data.deleteUrl;

      // Delete old image from ImgBB
      if (oldDeleteUrl) {
        await deleteFromImgBB(oldDeleteUrl);
      }
    }

    // Add New Gallery Images

    if (req.files?.images?.length > 0) {
      for (const image of req.files.images) {
        const uploadResult = await uploadToImgBB(
          image.buffer,
          image.originalname,
        );

        // Add new gallery image URL
        hotel.images.push(uploadResult.data.url);

        // Add corresponding delete URL
        hotel.imageDeleteUrls.push(uploadResult.data.deleteUrl);
      }
    }

    // Save updated hotel
    await hotel.save();

    // Success response
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

// delete hotel
const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;

    // Check hotel exists
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    // Delete Main Image from ImgBB

    if (hotel.imageDeleteUrl) {
      await deleteFromImgBB(hotel.imageDeleteUrl);
    }

    // Delete Gallery Images from ImgBB

    if (hotel.imageDeleteUrls?.length > 0) {
      for (const deleteUrl of hotel.imageDeleteUrls) {
        if (deleteUrl) {
          await deleteFromImgBB(deleteUrl);
        }
      }
    }

    // Delete Hotel from MongoDB

    await Hotel.findByIdAndDelete(id);

    // Success response
    return res.status(200).json({
      success: true,
      message: "Hotel and all associated images deleted successfully",
    });
  } catch (error) {
    console.error("Delete Hotel Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
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
