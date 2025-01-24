# 🛒 E-Commerce API

An **E-Commerce API** built with **Node.js**, **Express.js**, and **MongoDB**. This project provides essential e-commerce functionality, including authentication, product and category management, cart operations, and order processing.

---

## 🌟 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access (`user` and `admin`).
- **Product Management**: CRUD operations with optional file upload for images.
- **Category Management**: Organize products into categories.
- **Cart Functionality**: Add, update, and remove items from the cart.
- **Order Processing**: Place orders, view order history, and manage orders as an admin.
- **Rate Limiting**: Protect endpoints from excessive requests.
- **Testing**: Fully tested using Jest and Supertest.

---

## 🚀 Getting Started

### **Prerequisites**

1. **Node.js**: Ensure you have Node.js installed.
   ```bash
   node -v
   ```

2. **MongoDB**: Ensure MongoDB is installed and running locally or via a cloud service (e.g., MongoDB Atlas).

---

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MasterWithAhmad/e-commerce-api.git
   cd e-commerce-api
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file in the project root**:

   ```plaintext
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   PORT=5000
   ```

4. **Seed the database with initial data**:

   ```bash
   node src/seeds/seed.js
   ```

---

## Run the Project

### Development

Start the development server:

```bash
npm run dev
```

### Production

Start the production server:

```bash
npm start
```

---

## 📋 API Endpoints

Here are some examples to test the API using curl.

### Authentication

**Register a User**:

```bash
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name": "Ahmad", "email": "ahmad@example.com", "password": "password123"}'
```

**Login a User**:

```bash
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email": "ahmad@example.com", "password": "password123"}'
```

---

### Products

**Fetch All Products**:

```bash
curl -X GET http://localhost:5000/api/products
```

**Create a Product (Admin Only)**:

```bash
curl -X POST http://localhost:5000/api/products \
-H "Authorization: Bearer <admin-token>" \
-H "Content-Type: application/json" \
-d '{"name": "Smartphone", "description": "Latest model", "price": 699.99, "category": "<category-id>", "stock": 50}'
```

---

### Cart

**Add Item to Cart**:

```bash
curl -X POST http://localhost:5000/api/cart \
-H "Authorization: Bearer <user-token>" \
-H "Content-Type: application/json" \
-d '{"productId": "<product-id>", "quantity": 2}'
```

**View Cart**:

```bash
curl -X GET http://localhost:5000/api/cart \
-H "Authorization: Bearer <user-token>"
```

---

### Orders

**Place an Order**:

```bash
curl -X POST http://localhost:5000/api/orders \
-H "Authorization: Bearer <user-token>"
```

**Fetch User Orders**:

```bash
curl -X GET http://localhost:5000/api/orders \
-H "Authorization: Bearer <user-token>"
```

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add your message here"
   ```

4. Push the changes:

   ```bash
   git push origin feature-name
   ```

5. Create a pull request.

---

## 🧪 Running Tests

Run all tests:

```bash
npm run test
```

Example output for tests:

```
PASS  tests/auth.test.js
PASS  tests/products.test.js
PASS  tests/cart.test.js
PASS  tests/orders.test.js
```

---

## 📝 License

This project is licensed under the MIT License.

---

✨ Thank You for Using This E-Commerce
