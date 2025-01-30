const {UserModel}=require("../models/users.models");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();


const signupUser=async(req,res)=>{
    try{
        const user=req.body;
        //user.role="user";
        //console.log(user)

        bcrypt.hash(user.password , Number(process.env.SALT_ROUNDS) , async(err,hash)=>{
            if(err){
                res.status(400).json({
                    message:"Something went wrong!",
                    error:err
                })
            }else{
                user.password=hash;
                console.log("user",user);
                const newUser=new UserModel(user);
                await newUser.save();
                res.status(200).json({
                    message:"You have been registered successfully!"
                })
            }
        })

    }catch(err){
        res.status(500).json({
            message:"Internl server error!"
        })
    }
};



const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const matchUser=await UserModel.findOne({email:email});
        if(matchUser){
            const matchpassword=await bcrypt.compare(password,matchUser.password);
            //console.log(matchpassword)
            if(matchpassword){
                const token=jwt.sign({userId:matchUser._id},process.env.SECRET_KEY);
                res.status(200).json({
                    message:"Login successfull!",
                    token:token
                })
            }else{
                res.status(400).json({
                    message:"Wrong password!"
                })
            }
        }else{
            res.status(400).json({
                message:"User not found"
            })
        }

    }catch(err){
        res.status(500).json({
            message:"Internal server error",
            error:err
        })
    }
};


module.exports={signupUser,loginUser};