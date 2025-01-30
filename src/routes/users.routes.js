const express=require("express");
const {signupUser,loginUser}=require("../controllers/users.controller");

const userRouter=express.Router();

userRouter.post("/register",signupUser);
userRouter.post("/login",loginUser);

module.exports={userRouter};