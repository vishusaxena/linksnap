const express = require("express");
const {
  handleGenerateNewUrl,
  handleRedirectUrl,
  handleAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewUrl);
router.get("/analytics/:shortId", handleAnalytics);
router.get("/:shortId", handleRedirectUrl);

module.exports = router;
