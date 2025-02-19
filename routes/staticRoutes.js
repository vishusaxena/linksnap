const express = require("express");
const URL = require("../models/url");
const { restrictToLoggedInUser } = require("../controllers/middleware/auth");

const router = express.Router();

// Home Page
router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const allUrls = await URL.find({ createdBy: req.user._id });
  res.render("home", { user: req.user, urls: allUrls }); // Pass user to EJS
});

// Dashboard (Requires Authentication)
router.get("/dashboard", restrictToLoggedInUser, async (req, res) => {
  const allUrls = await URL.find({ createdBy: req.user._id });
  res.render("home", { user: req.user, urls: allUrls });
});

// Signup Page
router.get("/signup", (req, res) => {
  res.render("signup", { user: req.user || null });
});

// Login Page
router.get("/login", (req, res) => {
  res.render("login", { user: req.user || null }); // Ensure `user` is defined
});

module.exports = router;
