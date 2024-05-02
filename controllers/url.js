const shortid=require("shortid");
const URL=require("..//models/url");


async function handleGenerateNewUrl(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({error:"url not found"});
    const shortId=shortid();
    await URL.create({
        shortId:shortId,
        redirectUrl:body.url,
        visitedHistory:[]
    });
    return res.json({id:shortId});
}
module.exports={
    handleGenerateNewUrl
};