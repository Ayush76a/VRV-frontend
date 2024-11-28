import React, { useState } from 'react';
import { Box, Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const AddBook = () => {
  const [newBook, setNewBook] = useState({ title: '', author: '', copies: 1, image: null });

  // Access the BACKEND_URL from the environment variables
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const handleAddBook = async () => {
    try {
      const formData = new FormData();
      formData.append('title', newBook.title);
      formData.append('author', newBook.author);
      formData.append('copies', newBook.copies);
      formData.append('image', newBook.image);

      await axios.post(`${BACKEND_URL}/books/add`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data', // Important for form data
        },
      });
      alert('Book added successfully!');
      setNewBook({ title: '', author: '', copies: 1, image: null }); // Reset form
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add a New Book
        </Typography>
        <TextField
          label="Title"
          fullWidth
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          sx={{ my: 2 }}
        />
        <TextField
          label="Author"
          fullWidth
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          sx={{ my: 2 }}
        />
        <TextField
          label="Copies"
          type="number"
          fullWidth
          value={newBook.copies}
          onChange={(e) => setNewBook({ ...newBook, copies: +e.target.value })}
          sx={{ my: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            variant="contained"
            component="label"
            sx={{ my: 2 }}
          >
            Upload Book Image
            <input
              type="file"
              hidden
              onChange={(e) => setNewBook({ ...newBook, image: e.target.files[0] })}
            />
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddBook}
            sx={{ my: 2 }}
          >
            Add Book
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddBook;
