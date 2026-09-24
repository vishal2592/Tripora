const Destination = require("../models/destination.model");

//create destination

const createDestination = async (req, res) => {
  try {
    const {
      name,
      country,
      region,
      destinationType,
      status,
      packagesCount,
      hotelsCount,
      flightsCount,
      rating,
      bestTimeToVisit,
      image,
      description,
      highlights,
      isPopular,
    } = req.body;

    //check fields

    if (!name || !country || !region || !destinationType) {
      return res.status(400).json({
        success: false,
        message: "name, country, region, destinationType are required",
      });
    }

    //check duplicate destination

    const existingDestination = await Destination.findOne({
      name: name.trim(),
      country: country.trim(),
    });

    if (existingDestination) {
      return res.status(409).json({
        success: false,
        message: "Destination already exist",
      });
    }

    //convert highlights into array

    let highlightsArray = [];
    if (Array.isArray(highlights)) {
      highlightsArray = highlights;
    } else if (typeof highlights == "string") {
      highlightsArray = highlights
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
    }

    // create destination
    const destination = await Destination.create({
      name: name.trim(),
      country: country.trim(),
      region: region.trim(),
      destinationType,
      status: status || "Active",
      packagesCount: packagesCount || 0,
      hotelsCount: hotelsCount || 0,
      flightsCount: flightsCount || 0,
      rating: rating || 0,
      bestTimeToVisit,
      image,
      description,
      highlights: highlightsArray,
      isPopular: isPopular || false,
    });

    // success response

    return res.status(201).json({
      success: true,
      message: "Destination created successfully",
      destination,
    });
  } catch (error) {
    console.error("Create Destination Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//get all destination

const getAllDestination = async (req, res) => {
  try {
    const destinations = await Destination.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: destinations.length,
      destinations,
    });
  } catch (error) {
    console.error("Get All Destination Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// get single destinationa by ID

const getSingleDestinationById = async (req, res) => {
  try {
    const { id } = req.params;

    const destination = await Destination.findById(id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    //success response

    return res.status(200).json({
      success: true,
      destination,
    });
  } catch (error) {
    console.error("Get Destination By Id Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//update destination

const updateDestination = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      country,
      region,
      destinationType,
      status,
      packagesCount,
      hotelsCount,
      flightsCount,
      rating,
      bestTimeToVisit,
      image,
      description,
      highlights,
      isPopular,
    } = req.body;

    //find destination

    const destination = await Destination.findById(id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    // convert highlights into aaray

    let highlightsArray = [];
    if (Array.isArray(highlights)) {
      highlightsArray = highlights;
    } else if (typeof highlights == "string") {
      highlightsArray = highlights
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
    }

    // update fields

    destination.name = name !== undefined ? name.trim() : destination.name;
    destination.country =
      country !== undefined ? country.trim() : destination.country;
    destination.region =
      region !== undefined ? region.trim() : destination.region;
    destination.destinationType =
      destinationType !== undefined
        ? destinationType
        : destination.destinationType;
    destination.status = status !== undefined ? status : destination.status;

    destination.packagesCount =
      packagesCount !== undefined ? packagesCount : destination.packagesCount;

    destination.hotelsCount =
      hotelsCount !== undefined ? hotelsCount : destination.hotelsCount;

    destination.flightsCount =
      flightsCount !== undefined ? flightsCount : destination.flightsCount;

    destination.rating = rating !== undefined ? rating : destination.rating;

    destination.bestTimeToVisit =
      bestTimeToVisit !== undefined
        ? bestTimeToVisit
        : destination.bestTimeToVisit;

    destination.image = image !== undefined ? image : destination.image;

    destination.description =
      description !== undefined ? description : destination.description;

    destination.highlights = highlightsArray;

    destination.isPopular =
      isPopular !== undefined ? isPopular : destination.isPopular;

    const updatedDestination = await destination.save();

    return res.status(200).json({
      success: true,
      message: "Destination updated successfully",
      destination: updatedDestination,
    });
  } catch (error) {
    console.error("Update Destination Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//delete destination

const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;

    const destination = await Destination.findById(id);

    if(!destination){
      return res.status(404).json({
        success:false,
        message:"Destin"
      })
    }

    await Destination.findByIdAndDelete(id);

    //success response

    return res.status(200).json({
      success:true,
      message:"Destination deleted successfully"
    })


  } catch (error) {
    console.error("Delete Destination Error:",error)
    return res.status(500).json({
      success:false,
      message:"Server error"
    })
  }
};

module.exports = {
  createDestination,
  getAllDestination,
  getSingleDestinationById,
  updateDestination,
  deleteDestination 
};
