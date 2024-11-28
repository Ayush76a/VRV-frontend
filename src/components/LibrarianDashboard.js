import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
} from '@mui/material';
import axios from 'axios';

const LibrarianDashboard = () => {
  const [librarianProfile, setLibrarianProfile] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch librarian profile
        const profileRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/librarian/profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setLibrarianProfile(profileRes.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Error fetching profile. Please try again.');
      }
    };

    fetchProfile();
  }, []);

  return (
    <Container maxWidth="lg">
      {/* Greeting Section */}
      <Box sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <Typography variant="h4">Welcome to the Librarian Dashboard!</Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          Hello, {librarianProfile.name} ({librarianProfile.email})
        </Typography>
      </Box>
    </Container>
  );
};

export default LibrarianDashboard;
