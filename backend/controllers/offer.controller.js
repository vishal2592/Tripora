const mongoose = require("mongoose");
const Offer = require("../models/offer.model");
const { uploadToImgBB, deleteFromImgBB } = require("../utils/imgbb");

const createOffer = async (req, res) => {
  try {
    const {
      title,
      category,
      discount,
      discountType,
      description,
      couponCode,
      validFrom,
      validUntil,
      status,
      featured,
      usage,
      limit,
    } = req.body;

    // check required fileds
    if (
      !title ||
      !category ||
      !discount ||
      !discountType ||
      !description ||
      !couponCode ||
      !validFrom ||
      !validFrom ||
      !validUntil
    ) {
      return res.status(400).json({
        success: false,
        message: "please provide all required fields",
      });
    }

    //date validation
    const startDate = new Date(validFrom);
    const endDate = new Date(validUntil);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid validFrom or validUntil date",
      });
    }

    if (endDate < startDate) {
      return res.status(400).json({
        success: false,
        message: "validUntil cannot be before validFrom",
      });
    }

    // Check duplicate coupon code
    const existingOffer = await Offer.findOne({
      couponCode: couponCode.trim().toUpperCase(),
    });

    if (existingOffer) {
      return res.status(409).json({
        success: false,
        message: "Coupon code already exists",
      });
    }

    let imageUrl = "";
    let imageDeleteUrl = "";

    // Upload image to ImgBB
    if (req.file) {
      const uploadResult = await uploadToImgBB(
        req.file.buffer,
        req.file.originalname,
      );

      if (!uploadResult.success) {
        return res.status(500).json({
          success: false,
          message: "Offer image upload failed",
        });
      }

      imageUrl = uploadResult.data.url || "";
      imageDeleteUrl = uploadResult.data.deleteUrl || "";
    }

    // create offer

    const offer = await Offer.create({
      title: title.trim(),
      category,
      discount: Number(discount),
      discountType,
      description: description.trim(),
      couponCode: couponCode.trim().toUpperCase(),
      image: imageUrl,
      imageDeleteUrl,

      validFrom: startDate,
      validUntil: endDate,

      status: status || "Active",
      featured: featured === true || featured === "true",

      usage: usage !== undefined ? Number(usage) : 0,

      limit: limit !== undefined ? Number(limit) : 500,
    });

    return res.status(201).json({
      success: true,
      message: "Offer created successfully",
      offer,
    });
  } catch (error) {
    console.error("Create Offer Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create offer",
      error: error.message,
    });
  }
};

//get All offers

const getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Offer fetched successfully ",
      count: offers.length,
      offers,
    });
  } catch (error) {
    console.error("Get All Offers Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getClientOffers = async (req, res) => {
  try {
    const { search, category, featured } = req.query;

    const filter = {
      status: "Active",
    };

    // Category filter
    if (category && category !== "All") {
      filter.category = category;
    }

    // Featured filter
    if (featured !== undefined) {
      filter.featured = featured === "true";
    }

    // Search filter
    if (search && search.trim()) {
      filter.$or = [
        {
          title: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          couponCode: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          description: {
            $regex: search.trim(),
            $options: "i",
          },
        },
      ];
    }

    const offers = await Offer.find(filter).sort({
      featured: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Client offers fetched successfully",
      count: offers.length,
      offers,
    });
  } catch (error) {
    console.error("Get Client Offers Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch client offers",
      error: error.message,
    });
  }
};

//get single offer

const getSingleOffer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid offer ID",
      });
    }

    const offer = await Offer.findById(id);
    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Offer fetched successfully",
      offer,
    });
  } catch (error) {
    console.error("Get Single Offer Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//update offer

const updateOffer = async (req, res) => {
  try {
    const { id } = req.params;

    // Check valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid offer ID",
      });
    }

    // Find existing offer
    const offer = await Offer.findById(id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    const {
      title,
      category,
      discount,
      discountType,
      description,
      couponCode,
      validFrom,
      validUntil,
      status,
      featured,
      usage,
      limit,
    } = req.body;

    // Check duplicate coupon code
    if (
      couponCode !== undefined &&
      couponCode.trim().toUpperCase() !== offer.couponCode
    ) {
      const existingOffer = await Offer.findOne({
        couponCode: couponCode.trim().toUpperCase(),
        _id: { $ne: id },
      });

      if (existingOffer) {
        return res.status(409).json({
          success: false,
          message: "Coupon code already exists",
        });
      }
    }

    // Date validation
    const finalValidFrom =
      validFrom !== undefined ? new Date(validFrom) : offer.validFrom;

    const finalValidUntil =
      validUntil !== undefined ? new Date(validUntil) : offer.validUntil;

    if (isNaN(finalValidFrom.getTime()) || isNaN(finalValidUntil.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid validFrom or validUntil date",
      });
    }

    if (finalValidUntil < finalValidFrom) {
      return res.status(400).json({
        success: false,
        message: "validUntil cannot be before validFrom",
      });
    }

    // --------------------------------
    // IMAGE UPDATE
    // --------------------------------

    if (req.file) {
      // Delete old ImgBB image
      if (offer.imageDeleteUrl) {
        await deleteFromImgBB(offer.imageDeleteUrl);
      }

      // Upload new image to ImgBB
      const uploadResult = await uploadToImgBB(
        req.file.buffer,
        req.file.originalname,
      );

      if (!uploadResult.success) {
        return res.status(500).json({
          success: false,
          message: "Offer image upload failed",
        });
      }

      offer.image = uploadResult.data.url || "";

      offer.imageDeleteUrl = uploadResult.data.deleteUrl || "";
    }

    // --------------------------------
    // UPDATE TEXT / OTHER FIELDS
    // --------------------------------

    if (title !== undefined) {
      offer.title = title.trim();
    }

    if (category !== undefined) {
      offer.category = category;
    }

    if (discount !== undefined) {
      offer.discount = Number(discount);
    }

    if (discountType !== undefined) {
      offer.discountType = discountType;
    }

    if (description !== undefined) {
      offer.description = description.trim();
    }

    if (couponCode !== undefined) {
      offer.couponCode = couponCode.trim().toUpperCase();
    }

    if (validFrom !== undefined) {
      offer.validFrom = finalValidFrom;
    }

    if (validUntil !== undefined) {
      offer.validUntil = finalValidUntil;
    }

    if (status !== undefined) {
      offer.status = status;
    }

    if (featured !== undefined) {
      offer.featured = featured === true || featured === "true";
    }

    if (usage !== undefined) {
      offer.usage = Number(usage);
    }

    if (limit !== undefined) {
      offer.limit = Number(limit);
    }

    await offer.save();

    return res.status(200).json({
      success: true,
      message: "Offer updated successfully",
      offer,
    });
  } catch (error) {
    console.error("Update Offer Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update offer",
      error: error.message,
    });
  }
};

//delte offer
const deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;

    //check valid mongoDB id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid offer ID",
      });
    }

    //find offer
    const offer = await Offer.findById(id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    //delete image from ImgBB

    await Offer.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Offer deleted successfully",
    });
  } catch (error) {
    console.error("Delete Offer Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete offer",
      error: error.message,
    });
  }
};

const toggleOfferStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid offer ID",
      });
    }

    // Find offer
    const offer = await Offer.findById(id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    // Toggle status
    offer.status = offer.status === "Active" ? "Inactive" : "Active";

    await offer.save();

    return res.status(200).json({
      success: true,
      message: `Offer status changed to ${offer.status}`,
      offer: {
        id: offer._id,
        title: offer.title,
        status: offer.status,
      },
    });
  } catch (error) {
    console.error("Toggle Offer Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update offer status",
      error: error.message,
    });
  }
};

const toggleOfferFeatured = async (req, res) => {
  try {
    const { id } = req.params;

    // Check valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid offer ID",
      });
    }

    // Find offer
    const offer = await Offer.findById(id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    // Toggle featured
    offer.featured = !offer.featured;

    await offer.save();

    return res.status(200).json({
      success: true,
      message: `Offer featured status changed to ${offer.featured}`,
      offer: {
        id: offer._id,
        title: offer.title,
        featured: offer.featured,
      },
    });
  } catch (error) {
    console.error("Toggle Offer Featured Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update offer featured status",
      error: error.message,
    });
  }
};
module.exports = {
  createOffer,
  getAllOffers,
  getClientOffers,
  getSingleOffer,
  updateOffer,
  deleteOffer,
  toggleOfferStatus,
  toggleOfferFeatured,
};
