import React from 'react';
import { Typography, Container, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Bienvenido
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Esta es la página de bienvenida.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLoginClick}
          style={{ marginTop: '16px' }}
        >
          Iniciar Sesión
        </Button>
      </Box>
    </Container>
  );
};

export default LandingPage;