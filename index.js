const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sendEmailRoute = require('./api/sendEmail');

dotenv.config();  // Loads environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
    origin: 'https://myport-blush.vercel.app',  // Your frontend URL
    methods: ['GET', 'POST'],  // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
    credentials: true,  // Allow credentials like cookies if needed
}));

// Middleware for parsing JSON
app.use(express.json());  

// Routes
app.use('/api', sendEmailRoute);

// Catch-all route for invalid URLs
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
