import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import LibrarianDashboard from './components/LibrarianDashboard';
import MemberDashboard from './components/MemberDashboard';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import ViewBooks from './components/ViewBooks';
import AddBook from './components/AddBook';
import IssuedBooks from './components/IssuedBooks';
// import IssueBook from './components/IssueBook';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/librarian" element={<LibrarianDashboard />} />
        <Route path="/member" element={<MemberDashboard />} />
        <Route path="/books" element={<ViewBooks />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/issued-books" element={<IssuedBooks />} />
      </Routes>
    </Router>
  );
};

export default App;
