const express=require('express');
const {handleGenerateNewUrl,handleRedirectUrl}=require("../controllers/url");
const router=express.Router();
router.post('/',handleGenerateNewUrl);
router.get('/:shortId',handleRedirectUrl);
module.exports=router;