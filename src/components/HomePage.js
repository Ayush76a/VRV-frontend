import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Welcome to M-Lib
        </Typography>
        <Typography variant="h6" paragraph>
          Manage your library resources effectively and conveniently with M-Lib, a Library Management System designed for role-based access by Admins, Librarians, and Members. Each user role enjoys distinct access to efficiently manage books and resources.
        </Typography>
        <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center', gap: 3 }}>
          <Button variant="contained" color="primary" component={Link} to="/login">
            Login
          </Button>
          <Button variant="outlined" color="primary" component={Link} to="/signup">
            Signup
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
