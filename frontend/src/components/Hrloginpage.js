import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Paper, Typography, TextField, Button, Box, Link, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';

export default function HRLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openForgotDialog, setOpenForgotDialog] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');
  const [forgotError, setForgotError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'camelq@.com' && password === 'Camelq@2024') {
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      setForgotError('Please enter your email');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/password-reset/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setForgotMessage(`Password reset email sent to ${forgotEmail}`);
        setForgotError('');
        setTimeout(() => {
          setOpenForgotDialog(false);
          setForgotEmail('');
          setForgotMessage('');
        }, 3000);
      } else {
        setForgotError(data.message || 'Error sending reset email');
        setForgotMessage('');
      }
    } catch (error) {
      setForgotError('Error sending reset email');
      setForgotMessage('');
    }
  };

  return (
    <Box
          sx={{
        height: '100vh',
        width: '100%',
        backgroundImage: 'url(https://img.freepik.com/free-photo/flat-lay-workstation-with-copy-space-laptop_23-2148430879.jpg?semt=ais_items_boosted&w=740)', // Galaxy image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
      }}
    >
    <Container maxWidth="sm" sx={{marginTop:'2%', marginLeft:'3%'}}>
        <Typography variant="h4" gutterBottom>
          HR Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box component="form" onSubmit={handleLogin} noValidate>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              sx={{
                '& .MuiInputBase-input': {
                  color: 'white',
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }
              }}
            />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            sx={{
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiInputLabel-root': {
                color: 'white',
              },
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'white',
              },
              '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }
            }}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
          
          <Box sx={{ mt: 2 }}>
            <Link 
              component="button"
              variant="body2"
              onClick={() => setOpenForgotDialog(true)}
              sx={{ color: 'white', textDecoration: 'underline', cursor: 'pointer' }}
            >
              Forgot Password?
            </Link>
          </Box>
        </Box>

        {/* Forgot Password Dialog */}
        <Dialog 
          open={openForgotDialog} 
          onClose={() => setOpenForgotDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Enter your email address and we'll send a password reset link to your email
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              error={!!forgotError}
              helperText={forgotError}
            />
            {forgotMessage && (
              <Typography color="success.main" sx={{ mt: 2 }}>
                {forgotMessage}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenForgotDialog(false)}>Cancel</Button>
            <Button onClick={handleForgotPassword} variant="contained" color="primary">
              Send Reset Email
            </Button>
          </DialogActions>
        </Dialog>
      
    </Container>
    </Box>
  );
}
