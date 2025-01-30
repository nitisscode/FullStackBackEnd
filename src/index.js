const express=require("express");
const {productsRouter}=require("./routes/products.routes");
const {connectToDb}=require("./dbConfig");
const {userRouter}=require("./routes/users.routes");
const cors = require("cors");
const corsOptions=require("./config/cors")

const app=express();
app.use(cors(corsOptions));
app.use(express.json());
app.use("/products",productsRouter);
app.use("/users",userRouter);

app.listen(3000,async()=>{
    await connectToDb();
    console.log("server is running at http://localhost:3000")
});