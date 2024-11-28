import React, { useState, useEffect } from 'react'; 
import { Box, Typography, Container } from '@mui/material';
import axios from 'axios';

const MemberDashboard = () => {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/member/profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Member Dashboard!
        </Typography>
        <Typography variant="h6">
          Hello, {user.name} ({user.email})
        </Typography>
      </Box>
    </Container>
  );
};

export default MemberDashboard;
