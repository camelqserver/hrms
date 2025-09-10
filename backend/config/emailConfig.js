const nodemailer = require('nodemailer');

// Email configuration with modern authentication
const createTransporter = () => {
  // Check if email credentials are provided
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    console.warn('⚠️  Email credentials not configured. Email features will be disabled.');
    console.warn('   Please set EMAIL_USER and EMAIL_APP_PASSWORD in your .env file');
    console.warn('   Copy .env.example to .env and configure your email settings');
    return null;
  }

  // Check which email service to use
  const service = process.env.EMAIL_SERVICE || 'gmail';
  
  let transporterConfig;

  switch (service.toLowerCase()) {
    case 'gmail':
      transporterConfig = {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_APP_PASSWORD // Use App Password, not regular password
        }
      };
      break;
      
    case 'outlook':
      transporterConfig = {
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_APP_PASSWORD
        }
      };
      break;
      
    case 'smtp':
      transporterConfig = {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_APP_PASSWORD
        }
      };
      break;
      
    default:
      transporterConfig = {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_APP_PASSWORD
        }
      };
  }

  return nodemailer.createTransport(transporterConfig);
};

// Test email configuration
const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.log('📧 Email service disabled - credentials not configured');
      return false;
    }
    await transporter.verify();
    console.log('✅ Email configuration is working correctly');
    return true;
  } catch (error) {
    console.error('❌ Email configuration error:', error.message);
    console.error('   Please check your email credentials in .env file');
    return false;
  }
};

module.exports = {
  createTransporter,
  testEmailConfig
};
