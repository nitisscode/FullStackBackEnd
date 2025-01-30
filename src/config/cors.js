const cors = require("cors");

const corsOptions = {
    origin: "http://localhost:5173", // Replace with your front-end URL
    methods: ["GET", "POST", "PUT","PATCH", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  };
  
  module.exports = corsOptions;