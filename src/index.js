const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const postRoutes = require("./routes/posts");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", postRoutes);

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/blog")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
