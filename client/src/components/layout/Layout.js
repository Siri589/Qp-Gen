import React, { useContext, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Typography, 
  AppBar, 
  Toolbar,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { AuthContext } from '../../context/AuthContext';

const Layout = ({ children }) => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Materials', icon: <LibraryBooksIcon />, path: '/materials' },
    { text: 'Upload Material', icon: <UploadFileIcon />, path: '/upload-material' },
    { text: 'Course Outcomes', icon: <SchoolIcon />, path: '/outcomes' },
    { text: 'Generate Questions', icon: <QuizIcon />, path: '/generate-questions' },
    { text: 'Question Bank', icon: <QuestionAnswerIcon />, path: '/question-bank' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Question Paper Generator
          </Typography>
          
          {/* Profile Menu */}
          {isAuthenticated && (
            <Box>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem disabled>
                  {user?.name} ({user?.department})
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          mr: { sm: '240px' }, // Add margin for the sidebar on non-mobile screens
        }}
      >
        {children}
      </Box>

      {/* Right sidebar navigation */}
      {isAuthenticated && (
        <Paper
          elevation={3}
          sx={{
            width: 240,
            position: 'fixed',
            right: 0,
            top: 64,
            bottom: 0,
            borderRadius: 0,
            display: { xs: 'none', sm: 'block' },
            overflowY: 'auto',
          }}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                component={RouterLink}
                to={item.path}
                key={item.text}
                sx={{
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                      color: 'white',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default Layout; 