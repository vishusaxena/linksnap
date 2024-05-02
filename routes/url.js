const express=require('express');
const {handleGenerateNewUrl}=require("../controllers/url");
const router=express.Router();
router.post('/',handleGenerateNewUrl);
module.exports=router;