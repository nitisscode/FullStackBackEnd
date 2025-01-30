const {ProductModel}=require("../models/products.models");
const {UserModel}=require("../models/users.models");

const getProducts= async(req,res)=>{
    try{
        const products=await ProductModel.find();
        res.status(200).json({
            message:"Products fetched successfully",
            products:products
        })
    }catch(err){
        res.status(400).json({
            message:"Bad request"
        })
    }
}

const getProductsData=async(req,res)=>{
    const {id}=req.params;
    
    try{
        const product=await ProductModel.findOne({_id:id});
        res.status(200).json({
            message:"Product details fetched successfully",
            product:product
        })
    }catch(err){
        res.status(400).json({
            message:"Bad request"
        })
    }
}

const addProduct=async(req,res)=>{
    const payload=req.body;
    payload.owner=req.body.userId;
    try{
        const product=new ProductModel(req.body);
        product.save();
        const user=await UserModel.findByIdAndUpdate(req.body.userId,
            {$push:{products:product._id}},
            {new:true}
        )
        
        res.status(201).json({
            message:"Product added successfully"
        })
    }catch(err){
        res.status(500).json({
            message:"Internal server error"
        })
    }
};

const updateProduct=async(req,res)=>{
    const {id}=req.params
    try{
        const product=await ProductModel.findOne({_id:id});
        if(!product){
            return res.status(404).json({
                message:"Product not found"
            })
        }
        if(product.owner.toString()===req.body.userId){
            await ProductModel.findByIdAndUpdate({_id:id},req.body);
            res.status(200).json({
                message:"Product updated successfully"
            })
        }else{
            res.status(400).json({
                message:"You are not authorised to perform this task"
            })
        }
        
    }catch(err){
        res.status(500).json({
            message:"Internal server error",
            error:err
        })
    }
};

const deleteProduct=async(req,res)=>{
    const {id}=req.params;
    try{
        const product=await ProductModel.findOne({_id:id});
        if(!product){
            return res.status(404).json({
                message:"Product not found"
            })
        }
        if(product.owner.toString()===req.body.userId){
            await ProductModel.findByIdAndDelete({_id:id});
            const user=await UserModel.findByIdAndUpdate(product.owner,
                {$pull:{products:id}},
                {new:true}
            );
            

            res.status(200).json({
                message:"Product deleted successfully"
            })
        }else{
            res.status(400).json({
                message:"You are not authorised to perform this task"
            })
        }
    }catch(err){
        res.status(500).json({
            message:"Internal server error",
            error:err
        })
    }
}


module.exports={getProducts,addProduct,updateProduct,deleteProduct,getProductsData}