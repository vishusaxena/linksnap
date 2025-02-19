const { getUser } = require("../service/auth");

// Middleware to restrict access to logged-in users only
async function restrictToLoggedInUser(req, res, next) {
  const userId = req.cookies?.uid;

  if (!userId) return res.redirect("/login");

  const user = getUser(userId);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

// Middleware to check if user is logged in
async function checkAuth(req, res, next) {
  const userId = req.cookies?.uid;
  req.user = getUser(userId);
  next();
}

module.exports = { restrictToLoggedInUser, checkAuth };
