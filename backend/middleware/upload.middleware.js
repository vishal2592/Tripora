const multer = require("multer");

// Memory storage
const storage = multer.memoryStorage();

// Allowed image types
const fileFilter = (req, file, cb) => {
  const imageTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
    "image/gif",
  ];

  if (imageTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  return cb(
    new Error("Only JPEG, PNG, JPG, WEBP, and GIF images are allowed"),
    false,
  );
};

// Multer configuration
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter,
});

// Upload error handler
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File is too large. Maximum size is 5MB",
      });
    }

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  next();
};

// Single image upload
const uploadImage = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return handleUploadError(err, req, res, next);
    }

    next();
  });
};

// Multiple image upload
const uploadMultipleImages = (req, res, next) => {
  upload.array("images", 10)(req, res, (err) => {
    if (err) {
      return handleUploadError(err, req, res, next);
    }

    next();
  });
};

const uploadHotelImages = (req, res, next) => {
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 10,
    },
  ])(req, res, (err) => {
    if (err) {
      return handleUploadError(err, req, res, next);
    }

    next();
  });
};
// Custom field upload
const uploadWithField = (fieldName) => {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err) {
        return handleUploadError(err, req, res, next);
      }

      next();
    });
  };
};

module.exports = {
  uploadImage,
  uploadMultipleImages,
  uploadHotelImages,
  uploadWithField,
  handleUploadError,
};
