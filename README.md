# FullStackBackEnd

### 📚 Project Overview
This backend application is built using Node.js, Express, and MongoDB to provide a RESTful API for product and user management.

---

### 🚀 Setup Instructions

  1. **Clone the repository**:
   ```bash
   git clone https://github.com/nitisscode/FullStackBackEnd
   cd FullStackBackEnd

    2. Install dependencies:
        npm install
    
    3. Start the server:
        npm run server

### ⚙️ Environment Variables
        MONGO_URI=<Your MongoDB connection string>
        JWT_SECRET=<Your secret key for JWT>
        PORT=<Port number (default: 5000)>

### 📁 project Structure
        src/
        ├── config/
        │   └── cors.js                 # Handles CORS configuration
        ├── controllers/
        │   ├── products.controller.js   # Handles product-related logic
        │   └── users.controller.js      # Handles user-related logic
        ├── middlewares/
        │   └── auth.middleware.js       # Middleware for JWT token validation
        ├── models/
        │   ├── products.models.js       # MongoDB schema for products
        │   └── users.models.js          # MongoDB schema for users
        ├── routes/
        │   ├── products.routes.js       # Routes for product operations
        │   └── users.routes.js          # Routes for user operations
        ├── dbConfig.js                  # Database connection logic
        └── index.js                     # Application entry point

### 🔧 API Documentation
#### Authentication Endpoints
- POST /api/users/signup: Register a new user
Request Body:
        {
            "firstName": "John",
            "lastName": "Deere"
            "email": "john@deere.com",
            "password": "password123"
        }
Response (Success):
        {
            "message": "User registered successfully"
        }

- POST /api/users/login: User login
Request Body:
        {
            "email": "john@example.com",
            "password": "password123"
        }
Response (Success):
        {
            "message": "Login successfully",
            "token": "your-jwt-token"
        }


##### Product Endpoints
GET /api/products
- Valid user will get the product list
        {
            "message": "Products fetched successfully",
            "products": [
                { "id": "123", "name": "Product A", "price": 100 },
                { "id": "124", "name": "Product B", "price": 150 }
            ]
        }


POST /api/products
- Purpose: Add a new product (for authenticated users only).
- JWT Role:
    - The JWT token validates that the user is authenticated and authorized to perform this action.
    - If the token is valid, the server processes the request and creates the product.
    - If the token is missing, expired, or invalid, the server responds with an error message.

        POST /api/products
        Headers: {
            "Authorization": "Bearer <jwt-token>"
        }
        Body: {
            "name": "Sample Product",
            "description": "description",
            "category": "choose category",
            "stock": "500",
            "imageurl": "url",
            "price": 100,
            "description": "A product description"
        }
    Error Response (Invalid or missing token):
        {
            "error": "You are not authorized to perform this task"
        }

PATCH /api/products/:id
- Purpose: Update the details of an existing product (authenticated users only).
- JWT Role:
    - The token verifies that the user is authorized to update the product.
    - If the user is valid, the server updates the product information.
    - If the token is invalid or the user lacks permission, an error message is returned.
Example:- 
PATCH /api/products/12345
Headers: {
    "Authorization": "Bearer <jwt-token>"
}
Body: {
    "price": 150
}

DELETE /api/products/:id
- Purpose: Delete a product (for authenticated users only).
- JWT Role:
    - The JWT token ensures that only valid users can delete products.
    - If the token is missing or invalid, an error message is returned.

        DELETE /api/products/12345
        Headers: {
            "Authorization": "Bearer <jwt-token>"
        }
    Error Response (Invalid or missing token):
        {
            "error": "You are not authorized to perform this task"
        }

### 🔐 **Authentication and Authorization**

#### **How JWT Secures Routes**
- **JWT Creation**:
  - Upon successful login , the server generates a **JWT token** containing the user's information (like `userId`) and signs it with a **secret key (`JWT_SECRET`)**.
  - The token is then sent to the client.

- **Token Storage**:
  - The frontend stores this token in **localStorage** and includes it in the `Authorization` header (`Bearer <token>`) for subsequent API requests.

- **Token Verification**:
  - The server verifies the token for every protected route by decoding it using the same `JWT_SECRET`.
  - If the token is valid, the request proceeds; if not, an error is returned.



#### **CRUD Operations with Authorization**
- **GET** `/api/products`:
  - Requires the presence of a valid JWT token to fetch the product list.

- **POST** `/api/products`:
  - Valid users can create a product. The server verifies the user's token to ensure they are authorized.

- **PATCH** `/api/products/:id`:
  - Only authenticated users can update product information.
  - Unauthorized users receive an error response.

- **DELETE** `/api/products/:id`:
  - Only authenticated users can delete a product.
  - The token is validated before proceeding with deletion.

---

### 🚀 **Deployment Instructions**

#### **Deploying on Render**
1. Create an account on [Render](https://render.com).
2. Create a new **Web Service**.
3. Connect your GitHub repository and choose the backend project.
4. Set the environment variables (`MONGO_URI`, `JWT_SECRET`, etc.) under **Environment Variables**.
5. Select the build and start commands:
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Click **Deploy** to deploy your backend.


