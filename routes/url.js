const express=require('express');
const {handleGenerateNewUrl,handleRedirectUrl,handleAnalytics}=require("../controllers/url");
const router=express.Router();
router.post('/',handleGenerateNewUrl);
router.get('/:shortId',handleRedirectUrl);
router.get('/analytics/:shortId',handleAnalytics);
module.exports=router;