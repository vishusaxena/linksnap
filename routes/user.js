const express = require("express");
const {
  handleUserSignup,
  handleUserLogin,
  handleUserLogout,
} = require("../controllers/user");
const {
  checkAuth,
  restrictToLoggedInUser,
} = require("../controllers/middleware/auth");

const router = express.Router();

// Route to handle signup (POST request)
router.post("/signup", handleUserSignup);

// Route to handle login (POST request)
router.post("/login", handleUserLogin);

// Route to handle logout (GET request)
router.get("/logout", handleUserLogout);

// Route to render login page
router.get("/login", checkAuth, (req, res) => {
  if (req.user) return res.redirect("/dashboard");
  res.render("login", { user: req.user });
});

// Route to render signup page
router.get("/signup", checkAuth, (req, res) => {
  if (req.user) return res.redirect("/dashboard");
  res.render("signup", { user: req.user });
});

module.exports = router;
