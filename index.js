const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sendEmailRoute = require('./api/sendEmail');

dotenv.config();  // Loads environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
    origin: '*',  // Allow all origins for now to troubleshoot the issue
    methods: ['GET', 'POST', 'OPTIONS'],  // Allow OPTIONS method for preflight
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
    exposedHeaders: ['Access-Control-Allow-Origin'],
    credentials: true,
}));

// Middleware for parsing JSON
app.use(express.json());  

// Routes
app.use('/api', sendEmailRoute);

// 404 error handler for invalid routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
