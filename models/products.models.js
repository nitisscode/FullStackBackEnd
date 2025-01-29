const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String},
    price:{type:Number,required:true,validate:{
        validator:function(value){
            return value>=0
        },
        message:"Price must be postive"
    }},
    category:{
        type:String,
        required:true,
        enum:["Electronics","Clothing","Food","Beauty","Home","Books","Kids","Sports"]
    },
    stock:{
        type:Number,
        required:true,
        validate:{
            validator:function(value){
                return value>=0
            },
            message:"Stocks can't be negative"
        }
    },
    imageurl:{
        type:String
    },
    active:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
});


const ProductModel=mongoose.model("products",productSchema);

module.exports={ProductModel};
