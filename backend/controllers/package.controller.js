const mongoose = require("mongoose");

const Package = require("../models/package.model");
const Destination = require("../models/destination.model");
const Hotel = require("../models/hotel.model");

const { uploadToImgBB, deleteFromImgBB } = require("../utils/imgbb");

// ======================================================
// HELPER: CONVERT VALUE TO ARRAY
// ======================================================

const convertToArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return [];
    }

    // Try JSON array first
    try {
      const parsed = JSON.parse(trimmedValue);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (error) {
      // Not JSON, continue with comma-separated value
    }

    return trimmedValue
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
  }

  return [];
};

// ======================================================
// HELPER: PARSE JSON ARRAY
// ======================================================

const parseJsonArray = (value, defaultValue = []) => {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);

      if (Array.isArray(parsed)) {
        return parsed;
      }

      return defaultValue;
    } catch (error) {
      return null;
    }
  }

  return defaultValue;
};

// ======================================================
// HELPER: PARSE JSON OBJECT
// ======================================================

const parseJsonObject = (value, defaultValue = {}) => {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  if (typeof value === "object" && !Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);

      if (
        parsed &&
        typeof parsed === "object" &&
        !Array.isArray(parsed)
      ) {
        return parsed;
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  return defaultValue;
};

// ======================================================
// CREATE PACKAGE
// ======================================================

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

    // ==================================================
    // REQUIRED FIELDS
    // ==================================================

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

    // ==================================================
    // CHECK DESTINATION ID
    // ==================================================

    if (!mongoose.Types.ObjectId.isValid(destination)) {
      return res.status(400).json({
        success: false,
        message: "Invalid destination ID",
      });
    }

    // ==================================================
    // CHECK DESTINATION EXISTS
    // ==================================================

    const destinationExists = await Destination.findById(destination);

    if (!destinationExists) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    // ==================================================
    // CHECK HOTEL
    // ==================================================

    if (hotel) {
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
    }

    // ==================================================
    // CONVERT NUMBERS
    // ==================================================

    const packageDays = Number(days);
    const packageNights = Number(nights);
    const packagePrice = Number(price);

    const packageOldPrice =
      oldPrice !== undefined && oldPrice !== ""
        ? Number(oldPrice)
        : packagePrice;

    // ==================================================
    // VALIDATE NUMBERS
    // ==================================================

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

    // ==================================================
    // CONVERT ARRAYS
    // ==================================================

    const highlightsArray = convertToArray(highlights);
    const inclusionsArray = convertToArray(inclusions);
    const exclusionsArray = convertToArray(exclusions);
    const importantInfoArray = convertToArray(importantInfo);
    const cancellationArray = convertToArray(cancellation);

    // ==================================================
    // PARSE ITINERARY
    // ==================================================

    const itineraryArray = parseJsonArray(itinerary);

    if (itineraryArray === null) {
      return res.status(400).json({
        success: false,
        message: "Invalid itinerary format",
      });
    }

    // ==================================================
    // PARSE FLIGHTS
    // ==================================================

    const flightsObject = parseJsonObject(flights);

    if (flightsObject === null) {
      return res.status(400).json({
        success: false,
        message: "Invalid flights format",
      });
    }

    // ==================================================
    // DURATION
    // ==================================================

    const duration = `${packageDays} Days / ${packageNights} Nights`;

    // ==================================================
    // MAIN IMAGE
    // ==================================================

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

    // ==================================================
    // MULTIPLE GALLERY IMAGES
    // ==================================================

    const uploadedImages = [];

    if (req.files?.images?.length) {
      for (const imageFile of req.files.images) {
        const uploadResult = await uploadToImgBB(
          imageFile.buffer,
          imageFile.originalname,
        );

        uploadedImages.push({
          url: uploadResult.data.url,
          deleteUrl: uploadResult.data.deleteUrl,
        });
      }
    }

    // ==================================================
    // CREATE PACKAGE
    // ==================================================

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

      itinerary: itineraryArray,

      flights: flightsObject,

      importantInfo: importantInfoArray,

      cancellation: cancellationArray,

      // Main image
      image: imageUrl,

      imageDeleteUrl: imageDeleteUrl,

      // Gallery images
      images: uploadedImages,
    });

    // ==================================================
    // SUCCESS
    // ==================================================

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

// ======================================================
// GET ALL PACKAGES
// ======================================================

const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find()
      .populate(
        "destination",
        "name country region destinationType image",
      )
      .populate(
        "hotel",
        "hotelName propertyType starRating reviews city state country address price image images",
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: packages.length,
      packages,
    });
  } catch (error) {
    console.error("Get All Packages Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ======================================================
// GET SINGLE PACKAGE
// ======================================================

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

// ======================================================
// UPDATE PACKAGE
// ======================================================

const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;

    // ==================================================
    // CHECK PACKAGE ID
    // ==================================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid package ID",
      });
    }

    // ==================================================
    // FIND PACKAGE
    // ==================================================

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
      removeImages,
    } = req.body || {};

    // ==================================================
    // DESTINATION
    // ==================================================

    if (destination) {
      if (!mongoose.Types.ObjectId.isValid(destination)) {
        return res.status(400).json({
          success: false,
          message: "Invalid destination ID",
        });
      }

      const destinationExists =
        await Destination.findById(destination);

      if (!destinationExists) {
        return res.status(404).json({
          success: false,
          message: "Destination not found",
        });
      }

      packageData.destination = destination;
    }

    // ==================================================
    // HOTEL
    // ==================================================

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

    // ==================================================
    // BASIC FIELDS
    // ==================================================

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

    // ==================================================
    // STATUS
    // ==================================================

    if (status !== undefined) {
      if (!["Active", "Inactive"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status",
        });
      }

      packageData.status = status;
    }

    // ==================================================
    // DAYS / NIGHTS / PRICE
    // ==================================================

    let packageDays = packageData.days;
    let packageNights = packageData.nights;

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
      const packagePrice = Number(price);

      if (isNaN(packagePrice) || packagePrice <= 0) {
        return res.status(400).json({
          success: false,
          message: "Price must be greater than 0",
        });
      }

      packageData.price = packagePrice;
    }

    if (oldPrice !== undefined && oldPrice !== "") {
      const packageOldPrice = Number(oldPrice);

      if (isNaN(packageOldPrice) || packageOldPrice < 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid old price",
        });
      }

      packageData.oldPrice = packageOldPrice;
    }

    // ==================================================
    // UPDATE DURATION
    // ==================================================

    packageData.duration =
      `${packageDays} Days / ${packageNights} Nights`;

    // ==================================================
    // ARRAYS
    // ==================================================

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
      packageData.importantInfo =
        convertToArray(importantInfo);
    }

    if (cancellation !== undefined) {
      packageData.cancellation =
        convertToArray(cancellation);
    }

    // ==================================================
    // ITINERARY
    // ==================================================

    if (itinerary !== undefined) {
      const itineraryArray = parseJsonArray(itinerary);

      if (itineraryArray === null) {
        return res.status(400).json({
          success: false,
          message: "Invalid itinerary format",
        });
      }

      packageData.itinerary = itineraryArray;
    }

    // ==================================================
    // FLIGHTS
    // ==================================================

    if (flights !== undefined) {
      const flightsObject = parseJsonObject(flights);

      if (flightsObject === null) {
        return res.status(400).json({
          success: false,
          message: "Invalid flights format",
        });
      }

      packageData.flights = flightsObject;
    }

    // ==================================================
    // REMOVE SELECTED GALLERY IMAGES
    // ==================================================

    if (removeImages !== undefined) {
      const imagesToRemove = parseJsonArray(removeImages);

      if (imagesToRemove === null) {
        return res.status(400).json({
          success: false,
          message: "Invalid removeImages format",
        });
      }

      if (imagesToRemove.length > 0) {
        for (const imageId of imagesToRemove) {
          const imageToDelete = packageData.images.id(imageId);

          if (imageToDelete) {
            if (imageToDelete.deleteUrl) {
              await deleteFromImgBB(
                imageToDelete.deleteUrl,
              );
            }

            packageData.images.pull(imageId);
          }
        }
      }
    }

    // ==================================================
    // UPDATE MAIN IMAGE
    // ==================================================

    if (req.files?.image?.[0]) {
      const imageFile = req.files.image[0];

      const uploadResult = await uploadToImgBB(
        imageFile.buffer,
        imageFile.originalname,
      );

      const newImageUrl = uploadResult.data.url;
      const newImageDeleteUrl =
        uploadResult.data.deleteUrl;

      // Delete old main image
      if (packageData.imageDeleteUrl) {
        await deleteFromImgBB(
          packageData.imageDeleteUrl,
        );
      }

      packageData.image = newImageUrl;
      packageData.imageDeleteUrl =
        newImageDeleteUrl;
    }

    // ==================================================
    // ADD NEW GALLERY IMAGES
    // ==================================================

    if (req.files?.images?.length) {
      for (const imageFile of req.files.images) {
        const uploadResult = await uploadToImgBB(
          imageFile.buffer,
          imageFile.originalname,
        );

        packageData.images.push({
          url: uploadResult.data.url,
          deleteUrl: uploadResult.data.deleteUrl,
        });
      }
    }

    // ==================================================
    // SAVE PACKAGE
    // ==================================================

    await packageData.save();

    // ==================================================
    // POPULATE REFERENCES
    // ==================================================

    await packageData.populate([
      {
        path: "destination",
        select:
          "name country region destinationType image",
      },
      {
        path: "hotel",
        select:
          "hotelName propertyType starRating reviews email phone city state country address pincode description checkIn checkOut rooms price amenities status image images",
      },
    ]);

    // ==================================================
    // SUCCESS
    // ==================================================

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

// ======================================================
// DELETE PACKAGE
// ======================================================

const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    // ==================================================
    // CHECK PACKAGE ID
    // ==================================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid package ID",
      });
    }

    // ==================================================
    // FIND PACKAGE
    // ==================================================

    const packageData = await Package.findById(id);

    if (!packageData) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    // ==================================================
    // DELETE MAIN IMAGE
    // ==================================================

    if (packageData.imageDeleteUrl) {
      await deleteFromImgBB(
        packageData.imageDeleteUrl,
      );
    }

    // ==================================================
    // DELETE ALL GALLERY IMAGES
    // ==================================================

    if (
      packageData.images &&
      packageData.images.length > 0
    ) {
      for (const image of packageData.images) {
        if (image.deleteUrl) {
          await deleteFromImgBB(
            image.deleteUrl,
          );
        }
      }
    }

    // ==================================================
    // DELETE PACKAGE FROM MONGODB
    // ==================================================

    await Package.findByIdAndDelete(id);

    // ==================================================
    // SUCCESS
    // ==================================================

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

// ======================================================
// EXPORT
// ======================================================

module.exports = {
  createPackage,
  getAllPackages,
  getSinglePackage,
  updatePackage,
  deletePackage,
};