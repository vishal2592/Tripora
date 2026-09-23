const express = require("express");

const { loginAdmin } = require("../controllers/admin.controller");

const adminAuth = require("../middleware/adminAuth.middleware");

const router = express.Router();

router.post("/login", loginAdmin);
//protected test route
router.get("/profile", adminAuth, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin authentication successful",
    admin: req.admin,
  });
});

module.exports = router;
