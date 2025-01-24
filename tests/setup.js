const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('../server'); // Import your Express app

dotenv.config();

let server;

// Before all tests
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    server = app.listen(9008, () => {
        console.log('Test server running on port 9008');
    });
});

// After all tests
afterAll(async () => {
    await mongoose.connection.close();
    server.close(); // Ensure the server shuts down properly
});

module.exports = app;