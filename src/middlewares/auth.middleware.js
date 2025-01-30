const jwt=require("jsonwebtoken");

const auth=(req,res,next)=>{
    try{
        const token=req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(400).json({
                message:"Please login first"
            })
        }
        const decoded=jwt.verify(token,"user");
        //console.log("decoded",decoded);
        req.body.userId=decoded.userId
        next();
    }catch(err){
        res.status(400).json({
            error:err
        })
    }

}

module.exports={auth};