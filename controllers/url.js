const URL = require("../models/url");

async function handleGenerateNewUrl(req, res) {
  const { nanoid } = await import("nanoid"); // Correctly importing nanoid
  const shortId = nanoid(6); // Generates a 6-character short ID

  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL not provided" });

  await URL.create({
    shortId,
    redirectUrl: url,
    visitedHistory: [],
    createdBy: req.user ? req.user._id : null,
  });

  return res.render("home", {
    shortenedUrl: `${req.protocol}://${req.get("host")}/url/${shortId}`,
    urls: await URL.find(),
  });
}

async function handleRedirectUrl(req, res) {
  const { shortId } = req.params;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitedHistory: { timestamp: Date.now() } } },
    { new: true }
  );

  if (!entry) {
    return res.status(404).send("Short URL not found");
  }

  return res.redirect(entry.redirectUrl);
}

async function handleAnalytics(req, res) {
  const { shortId } = req.params;
  const result = await URL.findOne({ shortId });

  if (!result) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  return res.json({
    totalClicks: result.visitedHistory.length,
    analytics: result.visitedHistory,
  });
}

module.exports = {
  handleGenerateNewUrl,
  handleRedirectUrl,
  handleAnalytics,
};
