const mongoose = require("mongoose");

const Package = require("../models/package.model");
const Destination = require("../models/destination.model");
const Hotel = require("../models/hotel.model");

const { uploadToImgBB, deleteFromImgBB } = require("../utils/imgbb");

// =========================
// CREATE PACKAGE
// =========================

const createPackage = async (req, res) => {
  try {
    const {
      name,
      destination,
      country,
      type,
      days,
      nights,
      price,
      oldPrice,
      description,
      highlights,
      inclusions,
      exclusions,
      hotel,
      itinerary,
      flights,
      importantInfo,
      cancellation,
    } = req.body;

    // =========================
    // CHECK REQUIRED FIELDS
    // =========================

    if (
      !name ||
      !destination ||
      !country ||
      !type ||
      days === undefined ||
      nights === undefined ||
      price === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "name, destination, country, type, days, nights and price are required",
      });
    }

    let imageUrl = "";
    let imageDeleteUrl = "";

    if (req.files?.image?.[0]) {
      const imageFile = req.files.image[0];

      const uploadResult = await uploadToImgBB(
        imageFile.buffer,
        imageFile.originalname,
      );

      imageUrl = uploadResult.data.url;
      imageDeleteUrl = uploadResult.data.deleteUrl;
    }
    // =========================
    // CHECK DESTINATION ID
    // =========================

    if (!mongoose.Types.ObjectId.isValid(destination)) {
      return res.status(400).json({
        success: false,
        message: "Invalid destination ID",
      });
    }

    // =========================
    // CHECK DESTINATION EXISTS
    // =========================

    const destinationExists = await Destination.findById(destination);

    if (!destinationExists) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    // =========================
    // CHECK HOTEL ID
    // =========================

    if (hotel) {
      if (!mongoose.Types.ObjectId.isValid(hotel)) {
        return res.status(400).json({
          success: false,
          message: "Invalid hotel ID",
        });
      }

      // =========================
      // CHECK HOTEL EXISTS
      // =========================

      const hotelExists = await Hotel.findById(hotel);

      if (!hotelExists) {
        return res.status(404).json({
          success: false,
          message: "Hotel not found",
        });
      }
    }

    // =========================
    // CONVERT NUMBERS
    // =========================

    const packageDays = Number(days);
    const packageNights = Number(nights);
    const packagePrice = Number(price);

    const packageOldPrice =
      oldPrice !== undefined && oldPrice !== ""
        ? Number(oldPrice)
        : packagePrice;

    // =========================
    // VALIDATE NUMBERS
    // =========================

    if (isNaN(packageDays) || packageDays < 1) {
      return res.status(400).json({
        success: false,
        message: "Days must be at least 1",
      });
    }

    if (isNaN(packageNights) || packageNights < 0) {
      return res.status(400).json({
        success: false,
        message: "Nights cannot be negative",
      });
    }

    if (isNaN(packagePrice) || packagePrice <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than 0",
      });
    }

    if (isNaN(packageOldPrice) || packageOldPrice < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid old price",
      });
    }

    // =========================
    // CONVERT HIGHLIGHTS
    // =========================

    let highlightsArray = [];

    if (Array.isArray(highlights)) {
      highlightsArray = highlights;
    } else if (typeof highlights === "string") {
      highlightsArray = highlights
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
    }

    // =========================
    // CONVERT INCLUSIONS
    // =========================

    let inclusionsArray = [];

    if (Array.isArray(inclusions)) {
      inclusionsArray = inclusions;
    } else if (typeof inclusions === "string") {
      inclusionsArray = inclusions
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
    }

    // =========================
    // CONVERT EXCLUSIONS
    // =========================

    let exclusionsArray = [];

    if (Array.isArray(exclusions)) {
      exclusionsArray = exclusions;
    } else if (typeof exclusions === "string") {
      exclusionsArray = exclusions
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
    }

    // =========================
    // CONVERT IMPORTANT INFO
    // =========================

    let importantInfoArray = [];

    if (Array.isArray(importantInfo)) {
      importantInfoArray = importantInfo;
    } else if (typeof importantInfo === "string") {
      importantInfoArray = importantInfo
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
    }

    // =========================
    // CONVERT CANCELLATION
    // =========================

    let cancellationArray = [];

    if (Array.isArray(cancellation)) {
      cancellationArray = cancellation;
    } else if (typeof cancellation === "string") {
      cancellationArray = cancellation
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
    }

    // =========================
    // DURATION
    // =========================

    const duration = `${packageDays} Days / ${packageNights} Nights`;

    // =========================
    // CREATE PACKAGE
    // =========================

    const packageData = await Package.create({
      name: name.trim(),

      destination,

      country: country.trim(),

      type: type.trim(),

      duration,

      days: packageDays,

      nights: packageNights,

      rating: 0,

      reviews: 0,

      price: packagePrice,

      oldPrice: packageOldPrice,

      bookings: 0,

      status: "Active",

      description: description ? description.trim() : "",

      highlights: highlightsArray,

      inclusions: inclusionsArray,

      exclusions: exclusionsArray,

      hotel: hotel || null,

      itinerary: Array.isArray(itinerary) ? itinerary : [],

      flights: flights || {},

      importantInfo: importantInfoArray,

      cancellation: cancellationArray,
      image: imageUrl,
      imageDeleteUrl: imageDeleteUrl,
    });

    // =========================
    // SUCCESS RESPONSE
    // =========================

    return res.status(201).json({
      success: true,
      message: "Package created successfully",
      package: packageData,
    });
  } catch (error) {
    console.error("Create Package Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// getAllPackages

const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find()
      .populate("destination", "name country region destinationType image")
      .populate(
        "hotel",
        "hotelName propertyType starRating reviews city state country address price image",
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: packages.length,
      packages,
    });
  } catch (error) {
    console.error("Get All Packages Error");
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getSinglePackage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid package ID",
      });
    }

    const packageData = await Package.findById(id)
      .populate(
        "destination",
        "name country region destinationType image description highlights",
      )
      .populate(
        "hotel",
        "hotelName propertyType starRating reviews email phone city state country address pincode description checkIn checkOut rooms price amenities status image images",
      );

    if (!packageData) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    return res.status(200).json({
      success: true,
      package: packageData,
    });
  } catch (error) {
    console.error("Get Single Package Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//updatePackage
const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;

    // Check package ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid package ID",
      });
    }

    // Find package
    const packageData = await Package.findById(id);

    if (!packageData) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    const {
      name,
      destination,
      country,
      type,
      days,
      nights,
      price,
      oldPrice,
      description,
      highlights,
      inclusions,
      exclusions,
      hotel,
      itinerary,
      flights,
      importantInfo,
      cancellation,
      status,
    } = req.body || {};

    // -----------------------------
    // Destination validation
    // -----------------------------

    if (destination) {
      if (!mongoose.Types.ObjectId.isValid(destination)) {
        return res.status(400).json({
          success: false,
          message: "Invalid destination ID",
        });
      }

      const destinationExists = await Destination.findById(destination);

      if (!destinationExists) {
        return res.status(404).json({
          success: false,
          message: "Destination not found",
        });
      }

      packageData.destination = destination;
    }

    // -----------------------------
    // Hotel validation
    // -----------------------------

    if (hotel !== undefined) {
      if (hotel === "" || hotel === null) {
        packageData.hotel = null;
      } else {
        if (!mongoose.Types.ObjectId.isValid(hotel)) {
          return res.status(400).json({
            success: false,
            message: "Invalid hotel ID",
          });
        }

        const hotelExists = await Hotel.findById(hotel);

        if (!hotelExists) {
          return res.status(404).json({
            success: false,
            message: "Hotel not found",
          });
        }

        packageData.hotel = hotel;
      }
    }

    // -----------------------------
    // Basic fields
    // -----------------------------

    if (name !== undefined) {
      packageData.name = name.trim();
    }

    if (country !== undefined) {
      packageData.country = country.trim();
    }

    if (type !== undefined) {
      packageData.type = type.trim();
    }

    if (description !== undefined) {
      packageData.description = description.trim();
    }

    if (status !== undefined) {
      if (!["Active", "Inactive"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status",
        });
      }

      packageData.status = status;
    }

    // -----------------------------
    // Days / Nights / Price
    // -----------------------------

    let packageDays = packageData.days;
    let packageNights = packageData.nights;
    let packagePrice = packageData.price;
    let packageOldPrice = packageData.oldPrice;

    if (days !== undefined) {
      packageDays = Number(days);

      if (isNaN(packageDays) || packageDays < 1) {
        return res.status(400).json({
          success: false,
          message: "Days must be at least 1",
        });
      }

      packageData.days = packageDays;
    }

    if (nights !== undefined) {
      packageNights = Number(nights);

      if (isNaN(packageNights) || packageNights < 0) {
        return res.status(400).json({
          success: false,
          message: "Nights cannot be negative",
        });
      }

      packageData.nights = packageNights;
    }

    if (price !== undefined) {
      packagePrice = Number(price);

      if (isNaN(packagePrice) || packagePrice <= 0) {
        return res.status(400).json({
          success: false,
          message: "Price must be greater than 0",
        });
      }

      packageData.price = packagePrice;
    }

    if (oldPrice !== undefined && oldPrice !== "") {
      packageOldPrice = Number(oldPrice);

      if (isNaN(packageOldPrice) || packageOldPrice < 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid old price",
        });
      }

      packageData.oldPrice = packageOldPrice;
    }

    // Update duration whenever days/nights are updated

    packageData.duration = `${packageDays} Days / ${packageNights} Nights`;

    // -----------------------------
    // Convert comma-separated fields
    // -----------------------------

    const convertToArray = (value) => {
      if (Array.isArray(value)) {
        return value;
      }

      if (typeof value === "string") {
        return value
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== "");
      }

      return [];
    };

    if (highlights !== undefined) {
      packageData.highlights = convertToArray(highlights);
    }

    if (inclusions !== undefined) {
      packageData.inclusions = convertToArray(inclusions);
    }

    if (exclusions !== undefined) {
      packageData.exclusions = convertToArray(exclusions);
    }

    if (importantInfo !== undefined) {
      packageData.importantInfo = convertToArray(importantInfo);
    }

    if (cancellation !== undefined) {
      packageData.cancellation = convertToArray(cancellation);
    }

    // -----------------------------
    // Itinerary
    // -----------------------------

    if (itinerary !== undefined) {
      if (Array.isArray(itinerary)) {
        packageData.itinerary = itinerary;
      } else {
        return res.status(400).json({
          success: false,
          message: "Itinerary must be an array",
        });
      }
    }

    // -----------------------------
    // Flights
    // -----------------------------

    if (flights !== undefined) {
      if (typeof flights === "object") {
        packageData.flights = flights;
      } else {
        return res.status(400).json({
          success: false,
          message: "Flights must be an object",
        });
      }
    }

    // -----------------------------
    // Image Update - ImgBB
    // -----------------------------

    if (req.files?.image?.[0]) {
      const imageFile = req.files.image[0];

      // Upload new image first
      const uploadResult = await uploadToImgBB(
        imageFile.buffer,
        imageFile.originalname,
      );

      const newImageUrl = uploadResult.data.url;
      const newImageDeleteUrl = uploadResult.data.deleteUrl;

      // Delete old image from ImgBB
      if (packageData.imageDeleteUrl) {
        await deleteFromImgBB(packageData.imageDeleteUrl);
      }

      packageData.image = newImageUrl;
      packageData.imageDeleteUrl = newImageDeleteUrl;
    }

    // -----------------------------
    // Save Package
    // -----------------------------

    await packageData.save();

    // Populate references
    await packageData.populate([
      {
        path: "destination",
        select: "name country region destinationType image",
      },
      {
        path: "hotel",
        select:
          "hotelName propertyType starRating reviews email phone city state country address pincode description checkIn checkOut rooms price amenities status image images",
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Package updated successfully",
      package: packageData,
    });
  } catch (error) {
    console.error("Update Package Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    // Check package ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid package ID",
      });
    }

    // Find package
    const packageData = await Package.findById(id);

    if (!packageData) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    // Delete package image from ImgBB
    if (packageData.imageDeleteUrl) {
      await deleteFromImgBB(packageData.imageDeleteUrl);
    }

    // Delete package from MongoDB
    await Package.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Package deleted successfully",
    });
  } catch (error) {
    console.error("Delete Package Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createPackage,
  getAllPackages,
  getSinglePackage,
  updatePackage,
  deletePackage,
};
