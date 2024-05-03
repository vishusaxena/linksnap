const shortid = require("shortid");
const URL = require("..//models/url");


async function handleGenerateNewUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url not found" });
    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitedHistory: []
    });
    return res.json({ id: shortId });
}

async function handleRedirectUrl(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },
        {
            $push: {
                visitedHistory: {
                    timestamp: Date.now()
                }
            }
        });
        
   return   res.redirect(entry.redirectUrl);
   
}


module.exports = {
    handleGenerateNewUrl,
    handleRedirectUrl
};