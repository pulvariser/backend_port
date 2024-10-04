const express = require('express');
const createTransporter = require('../config/nodemailer');
const router = express.Router();

router.post('/sendEmail', async (req, res) => {
  const { fullname, email, mobile, message, subject } = req.body;

  // Validate the request body
  if (!fullname || !email || !message || !mobile || !subject) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`, 
      to: process.env.RECEIVER_EMAIL,  // Your email
      subject: subject,  // Subject is required in the email
      text: `
        You have received a new message from your portfolio website.
        
        Full Name: ${fullname}
        Subject: ${subject}
        Email: ${email}
        Mobile: ${mobile || 'Not provided'}
        Message: ${message}
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info);

    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email', error });
  }
});

module.exports = router;
