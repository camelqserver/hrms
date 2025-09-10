# Password Reset Email Setup Guide

## Overview
This guide helps you set up the password reset email functionality for the HR Portal.

## Prerequisites
1. A Gmail account with 2-factor authentication enabled
2. An App Password from Google (not your regular password)

## Step 1: Configure Email Settings

### Gmail App Password Setup
1. Go to your Google Account settings
2. Enable 2-factor authentication if not already enabled
3. Generate an App Password for "Mail" application
4. Copy the 16-character app password

### Update .env file
Replace the placeholder values in `backend/.env`:

```
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASS=your-16-character-app-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false

JWT_SECRET=your-secure-jwt-secret-key
FRONTEND_URL=http://localhost:3000
```

## Step 2: Database Setup
Ensure your User model has the required fields:
- `email` (unique)
- `resetToken` (string, nullable)
- `resetTokenExpiry` (date, nullable)

## Step 3: Test the Setup

### Backend Test
```bash
cd backend
npm install
npm start
```

### Frontend Test
```bash
cd frontend
npm install
npm start
```

### Password Reset Flow Test
1. Create a test user in the database
2. Go to http://localhost:3000
3. Click "Forgot Password"
4. Enter the test user's email
5. Check your email for the reset link

## Troubleshooting

### Common Issues

1. **"Invalid credentials" error**
   - Ensure you're using an App Password, not your regular Gmail password
   - Check if 2-factor authentication is enabled

2. **"User not found" error**
   - Verify the email exists in your database
   - Check the User model has the correct fields

3. **"Error sending reset email"**
   - Check the backend console for detailed error messages
   - Verify the .env file has the correct email configuration

4. **CORS errors**
   - Ensure the backend is running on port 5000
   - Check if CORS is properly configured in server.js

### Debug Commands
```bash
# Check if .env is loaded
node -e "require('dotenv').config(); console.log(process.env.EMAIL_USER)"

# Test email sending directly
node -e "const nodemailer = require('nodemailer'); const transporter = nodemailer.createTransport({service: 'gmail', auth: {user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS}}); transporter.sendMail({from: process.env.EMAIL_USER, to: 'test@example.com', subject: 'Test', text: 'Test email'}).then(console.log).catch(console.error)"
```

## Security Notes
- Never commit the .env file to version control
- Use environment variables for all sensitive data
- Consider using a more secure email service for production
- Implement rate limiting to prevent abuse

## Production Considerations
- Use a transactional email service (SendGrid, Mailgun, etc.)
- Implement proper email templates
- Add rate limiting and security measures
- Use HTTPS for all communications
