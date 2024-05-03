const express=require('express');
const urlRoute=require("./routes/url");

const {connectToMongoDB}=require("./connect");
const app =express();
const PORT=8000;
connectToMongoDB('mongodb://localhost:27017/short-url').then(()=>console.log(`mongoDB is connected`));
app.use(express.json());
app.use('/url',urlRoute);
app.use('/',urlRoute);
app.listen(PORT,()=>{console.log(`server started at ${PORT}`)});