var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jluguserhu@gmail.com',
    pass: 'hfhvisbxidijanpj'
  }
});



const sendWelcomeEmail = (userEmail, userName, userPassword) => {
    // Email options
    const mailOptions = {
      from: 'jluguserhu@gmail.com', // Sender address
      to: userEmail,
      subject: 'Welcome to JEC Linux User Group (JLUG) - Your Account is Ready!',
      text: `
        Dear ${userName},
  
        Thank you for registering with JLUG Recruitment! We’re excited to have you on board as you begin your journey with us.
  
        Here are your login credentials:
        
        Username: ${userEmail}
        Password: ${userPassword}
  
        You can log in to your account by visiting our website: .
  
        Once logged in, you will be able to explore job opportunities, update your profile, and apply for positions that match your skills and interests.
  
        If you have any questions or need assistance, feel free to reach out to our support team at [Support Email Address].
  
        We look forward to helping you find your next opportunity!
  
        Best regards,
        
      `,
    };

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
};




module.exports={sendWelcomeEmail};