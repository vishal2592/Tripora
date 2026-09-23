require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.route");
const adminRoutes = require("./routes/admin.route");

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Mongodb connection
connectDB();

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
//test route
app.get("/", (req, res) => {
  res.json({
    Message: "Tripora backend is running",
  });
});

//server
const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
