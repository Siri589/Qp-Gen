// filepath: c:\Users\sirip\OneDrive\Desktop\MAJOR\QpGen\client\src\components\layout\Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';

const Navbar = () => {
  return (
    <List>
      <ListItem button component={Link} to="/dashboard">
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} to="/materials">
        <ListItemText primary="Materials" />
      </ListItem>
      <ListItem button component={Link} to="/upload-material">
        <ListItemText primary="Upload Material" />
      </ListItem>
      <ListItem button component={Link} to="/outcomes">
        <ListItemText primary="Course Outcomes" />
      </ListItem>
      <ListItem button component={Link} to="/generate-questions">
        <ListItemText primary="Generate Questions" />
      </ListItem>
      <ListItem button component={Link} to="/question-bank">
        <ListItemText primary="Question Bank" />
      </ListItem>
      <ListItem button component={Link} to="/define-course">
        <ListItemText primary="Create Course" />
      </ListItem>
    </List>
  );
};

export default Navbar;