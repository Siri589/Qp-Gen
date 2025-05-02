import React, { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileAnchorEl, setMobileAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenu = (event) => {
    setMobileAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMobileAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/login');
  };

  const mobileMenu = (
    <Menu
      id="menu-appbar-mobile"
      anchorEl={mobileAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(mobileAnchorEl)}
      onClose={handleClose}
    >
      <MenuItem component={RouterLink} to="/" onClick={handleClose}>
        Dashboard
      </MenuItem>
      <MenuItem component={RouterLink} to="/materials" onClick={handleClose}>
        Materials
      </MenuItem>
      <MenuItem component={RouterLink} to="/upload-material" onClick={handleClose}>
        Upload Material
      </MenuItem>
      <MenuItem component={RouterLink} to="/outcomes" onClick={handleClose}>
        Course Outcomes
      </MenuItem>
      <MenuItem component={RouterLink} to="/generate-questions" onClick={handleClose}>
        Generate Questions
      </MenuItem>
      <MenuItem component={RouterLink} to="/question-bank" onClick={handleClose}>
        Question Bank
      </MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {isAuthenticated && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: { md: 'none' } }}
              onClick={handleMobileMenu}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div">
            Question Paper Generator
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {isAuthenticated ? (
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button color="inherit" component={RouterLink} to="/">
                Dashboard
              </Button>
              <Button color="inherit" component={RouterLink} to="/materials">
                Materials
              </Button>
              <Button color="inherit" component={RouterLink} to="/upload-material">
                Upload Material
              </Button>
              <Button color="inherit" component={RouterLink} to="/outcomes">
                Course Outcomes
              </Button>
              <Button color="inherit" component={RouterLink} to="/generate-questions">
                Generate Questions
              </Button>
              <Button color="inherit" component={RouterLink} to="/question-bank">
                Question Bank
              </Button>
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
            </Box>
          ) : (
            <Box>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {mobileMenu}
    </Box>
  );
};

export default Navbar;
