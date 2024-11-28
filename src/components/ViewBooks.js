import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField, Container } from '@mui/material';
import axios from 'axios';

const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userRole, setUserRole] = useState('');

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    // Set user role from localStorage, assuming the role is stored there during login
    setUserRole(localStorage.getItem('userRole'));

    const fetchBooks = async () => {
      try {
        const booksRes = await axios.get(`${BACKEND_URL}/books`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setBooks(booksRes.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, [BACKEND_URL]);

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/books/${id}/delete`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setBooks(books.filter((book) => book._id !== id));
      alert('Book deleted successfully!');
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Failed to delete book. Please try again.');
    }
  };

  const handleIssueBook = async (id) => {
    try {
      await axios.post(
        `${BACKEND_URL}/books/issue`,
        { bookId: id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setBooks(
        books.map((book) =>
          book._id === id ? { ...book, copies: book.copies - 1, issued: true, lastIssued: new Date() } : book
        )
      );
      alert('Book issued successfully!');
    } catch (error) {
      console.error('Error issuing book:', error);
      alert('Failed to issue book. Please try again.');
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          View Books
        </Typography>
        <TextField
          label="Search by Title"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 4 }}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'space-evenly' }}>
          {filteredBooks.map((book) => (
            <Card key={book._id} sx={{ width: '23%', p: 2, boxShadow: 3 }}>
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                }}
              >
                <Typography variant="h6" sx={{ fontSize: '1rem', mb: 1 }}>
                  {book.title}
                </Typography>
                <Box
                  sx={{
                    width: '100%',
                    height: '250px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <img
                    src={book.image}
                    alt={book.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <Typography sx={{ fontSize: '0.875rem', mb: 0.5 }}>Author: {book.author}</Typography>
                <Typography sx={{ fontSize: '0.875rem', mb: 0.5 }}>Copies Available: {book.copies}</Typography>
                <Typography sx={{ fontSize: '0.875rem', mb: 0.5 }}>
                  Last Issued: {book.lastIssued ? new Date(book.lastIssued).toLocaleString() : 'N/A'}
                </Typography>
                {userRole === 'Admin' && (
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 1, fontSize: '0.75rem' }}
                    onClick={() => handleDeleteBook(book._id)}
                  >
                    Delete
                  </Button>
                )}
                {userRole === 'Librarian' && book.copies > 0 && (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1, fontSize: '0.75rem' }}
                    onClick={() => handleIssueBook(book._id)}
                  >
                    Issue
                  </Button>
                )}
                {userRole === 'Member' && (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 1, mr: 1, fontSize: '0.75rem' }}
                      onClick={() => {
                        alert(`Book "${book.title}" by ${book.author} has been borrowed.`);
                      }}
                    >
                      Borrow
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ mt: 1, fontSize: '0.75rem' }}
                      onClick={() => {
                        alert(`You are now reading "${book.title}" by ${book.author}`);
                      }}
                    >
                      Read
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default ViewBooks;
