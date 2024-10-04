const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sendEmailRoute = require('./api/sendEmail');

dotenv.config();  // Loads environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'https://myport-blush.vercel.app',  // Replace with your frontend URL
    methods: ['GET', 'POST'],  // Allow only the necessary methods
    credentials: true,  // If you're sending cookies or other credentials
  }));

app.options('*', cors());  // Allow preflight requests for all routes

app.use(express.json());  // Parses incoming JSON requests

// Routes
app.use('/api', sendEmailRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
