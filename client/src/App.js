import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/routing/PrivateRoute';

// Pages
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UploadMaterial from './pages/UploadMaterial';
import Materials from './pages/Materials';
import OutcomesPage from './pages/OutcomesPage';
import QuestionGenerator from './pages/QuestionGenerator';
import QuestionBank from './pages/QuestionBank';
import Navbar from './components/layout/Navbar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/materials" element={
              <PrivateRoute>
                <Materials />
              </PrivateRoute>
            } />
            <Route path="/upload-material" element={
              <PrivateRoute>
                <UploadMaterial />
              </PrivateRoute>
            } />
            <Route path="/outcomes" element={
              <PrivateRoute>
                <OutcomesPage />
              </PrivateRoute>
            } />
            <Route path="/generate-questions" element={
              <PrivateRoute>
                <QuestionGenerator />
              </PrivateRoute>
            } />
            <Route path="/question-bank" element={
              <PrivateRoute>
                <QuestionBank />
              </PrivateRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;