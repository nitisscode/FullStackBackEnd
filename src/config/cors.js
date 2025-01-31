const cors = require("cors");

const corsOptions = {
    origin: ["http://localhost:5173","https://vite-react-mocha-iota.vercel.app/","https://the-ecommerce.onrender.com"], // Replace with your front-end URL
    methods: ["GET", "POST", "PUT","PATCH", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  };
  
  module.exports = corsOptions;