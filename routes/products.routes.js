const express=require("express");
const {getProducts,addProduct,updateProduct,deleteProduct,getProductsData}=require("../controllers/products.controller");
const {auth}=require("../middlewares/auth.middleware")

const productsRouter=express.Router();

productsRouter.get("/",getProducts);
productsRouter.get("/:id",getProductsData);
productsRouter.post("/",auth,addProduct);
productsRouter.patch("/:id",auth,updateProduct);
productsRouter.delete("/:id",auth,deleteProduct);


module.exports={productsRouter};