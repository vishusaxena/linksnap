const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser, getUser } = require("../controllers/service/auth");

// Handle user signup
async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  // Check if the user is already logged in
  const userId = req.cookies.uid;
  if (userId) {
    const user = getUser(userId);
    if (user) return res.redirect("/dashboard");
  }

  // Create a new user
  await User.create({ name, email, password });
  return res.redirect("/login");
}

// Handle user login
async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (user) {
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect("/dashboard");
  }

  res.render("login", { error: "Invalid email or password", user: null });
}

// Handle user logout
async function handleUserLogout(req, res) {
  res.clearCookie("uid");
  return res.redirect("/login");
}

module.exports = { handleUserSignup, handleUserLogin, handleUserLogout };
