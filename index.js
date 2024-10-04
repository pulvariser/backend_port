const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sendEmailRoute = require('./api/sendEmail');

dotenv.config();  // Loads environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());  // Parses incoming JSON requests

// Routes
app.use('/api', sendEmailRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
