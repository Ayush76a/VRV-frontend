import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;

      console.log("URL : ",  BACKEND_URL);
      
      const { data } = await axios.post(`${BACKEND_URL}/auth/login`, { email, password });

      // Store the token and role in local storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.role);

      console.log('userRole : ', data.role);

      // Redirect based on role
      if (data.role === 'Admin') navigate('/admin');
      else if (data.role === 'Librarian') navigate('/librarian');
      else navigate('/member');
    } catch (error) {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
