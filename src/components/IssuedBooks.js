// IssuedBooks.js
import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Container } from '@mui/material';
import axios from 'axios';

const IssuedBooks = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);

  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books/issued-books`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setIssuedBooks(res.data);
      } catch (error) {
        console.error('Error fetching issued books:', error);
      }
    };

    fetchIssuedBooks();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Issued Books
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {issuedBooks.length > 0 ? (
            issuedBooks.map((book) => (
              <Card key={book._id} sx={{ width: '300px', p: 2 }}>
                <CardContent>
                  <Typography variant="h6">{book.title}</Typography>
                  <Typography>Author: {book.author}</Typography>
                  <Typography>
                    Last Issued: {book.lastIssued ? new Date(book.lastIssued).toLocaleString() : 'N/A'}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography>No issued books to display.</Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default IssuedBooks;
