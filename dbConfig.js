const mongoose=require("mongoose");
require("dotenv").config();

//fJwnspcBcKRh4Moc
const connectToDb=async()=>{
    await mongoose.connect(process.env.DATA_BASE_URL);
    console.log("Connected to db");
};

module.exports={connectToDb};