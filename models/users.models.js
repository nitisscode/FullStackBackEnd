const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String},
    email:{type:String,required:true},
    role:{
        type:String,
        enum:["user",'admin'],
        default:"user"
    },
    password:{type:String,required:true},
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"products"
        }
    ]

});

const UserModel=mongoose.model("users",userSchema)

module.exports={UserModel};