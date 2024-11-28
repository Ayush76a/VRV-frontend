import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole'); // Assuming user role is stored after login

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          M-Lib
        </Typography>
        <Box>
          {!token ? (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </>
          ) : (
            <>
              {userRole === 'Admin' && (
                <>
                  <Button color="inherit" component={Link} to="/admin">
                    Dashboard
                  </Button>
                  <Button color="inherit" component={Link} to="/books">
                    View Books
                  </Button>
                  <Button color="inherit" component={Link} to="/add-book">
                    Add Book
                  </Button>
                </>
              )}
              {userRole === 'Librarian' && (
                <>
                  <Button color="inherit" component={Link} to="/librarian">
                    Dashboard
                  </Button>
                  <Button color="inherit" component={Link} to="/books">
                    View Books
                  </Button>
                  <Button color="inherit" component={Link} to="/issued-books">
                    Issued Books
                  </Button>
                </>
              )}
              {userRole === 'Member' && (
                <>
                  <Button color="inherit" component={Link} to="/member">
                    Dashboard
                  </Button>
                  <Button color="inherit" component={Link} to="/books">
                    View Books
                  </Button>
                </>
              )}
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
