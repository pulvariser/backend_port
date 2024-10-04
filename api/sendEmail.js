const express = require('express');
const createTransporter = require('../config/nodemailer');
const router = express.Router();

router.post('/sendEmail', async (req, res) => {
  const { fullname, email, mobile, message } = req.body;

  if (!fullname || !email || !message) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`, 
      to: process.env.RECEIVER_EMAIL,  // Your email
      subject: 'New Contact Form Submission',
      text: `
        You have received a new message from your portfolio website.
        
        Full Name: ${fullname}
        Email: ${email}
        Mobile: ${mobile || 'Not provided'}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email', error });
  }
});

module.exports = router;
