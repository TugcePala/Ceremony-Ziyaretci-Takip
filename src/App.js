import React, { useState } from 'react';
import { Container, Grid, Typography, AppBar, Toolbar, Button, Box } from '@mui/material';
import Dashboard from './components/Dashboard';
import NewVisitorForm from './components/NewVisitorForm';
import NewVehicleForm from './components/NewVehicleForm';
import Login from './components/Login'; // Import the Login component
import logo from './logo.png'; // Logo dosyasının yolu

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [showVisitorForm, setShowVisitorForm] = useState(false);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [visitors, setVisitors] = useState([
    { id: 1, name: 'Mehmet Demir', contactPerson: 'Ali Veli', arrivalDateTime: '2024-07-15T09:00', exitDateTime: '' },
    // Diğer ziyaretçiler...
  ]);
  
  const [vehicles, setVehicles] = useState([
    { id: 1, name: 'Ahmet Yılmaz', carPlate: '34ABC34', entryDateTime: '2024-07-15T08:30', exitDateTime: '' },
    // Diğer araçlar...
  ]);

  const handleLogin = (status) => {
    setLoggedIn(status);
  };

  const handleVisitorFormSubmit = (formData) => {
    setVisitors((prevVisitors) => [...prevVisitors, formData]);
  };

  const handleVehicleFormSubmit = (formData) => {
    setVehicles((prevVehicles) => [...prevVehicles, formData]);
  };

  const handleExit = (type, id, updatedData) => {
    if (type === 'vehicle') {
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) =>
          vehicle.id === id ? { ...vehicle, ...updatedData } : vehicle
        )
      );
    } else if (type === 'visitor') {
      setVisitors((prevVisitors) =>
        prevVisitors.map((visitor) =>
          visitor.id === id ? { ...visitor, ...updatedData } : visitor
        )
      );
    }
  };

  const handleDelete = (type, id) => {
    if (type === 'vehicle') {
      setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle.id !== id));
    } else if (type === 'visitor') {
      setVisitors((prevVisitors) => prevVisitors.filter((visitor) => visitor.id !== id));
    }
  };

  const handleFormClick = (formType) => {
    if (formType === 'visitor') {
      setShowVisitorForm(true);
      setShowVehicleForm(false);
    } else if (formType === 'vehicle') {
      setShowVisitorForm(false);
      setShowVehicleForm(true);
    }
  };

  return (
    <Container disableGutters>
      {!loggedIn ? (
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Box sx={{ mt: 4 }}>
              <img src={logo} alt="Ceremony Gıda Logo" width="400" />
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center', mt: '40px' }}>
            <Typography variant="h4" gutterBottom>
              Ceremony Gıda Ziyaretçi Takip Sistemi
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Login onLogin={handleLogin} />
          </Grid>
        </Grid>
      ) : (
        <>
          <AppBar position="fixed" sx={{ width: '250px', top: 0, left: 0, bottom: 0, bgcolor: '#f7fafc' }}>
            <Toolbar sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 4 }}>
              <Box sx={{ mb: 4 }}>
                <img src={logo} alt="Ceremony Gıda Logo" width="200" />
              </Box>
              <Typography color='#000000' variant="h6" component="div" sx={{ mt: 2, textAlign: 'center' }}>
                Ceremony Gıda Ziyaretçi Takip Sistemi
              </Typography>
              <Button color="primary" variant="contained" onClick={() => handleFormClick('vehicle')} sx={{ mt: 2 }}>
                Yeni Araç Ekle
              </Button>
              <Button color="primary" variant="contained" onClick={() => handleFormClick('visitor')} sx={{ mt: 1 }}>
                Yeni Ziyaretçi Ekle
              </Button>
            </Toolbar>
          </AppBar>
          <Toolbar sx={{ width: '250px' }} />
          <Grid container spacing={3} sx={{ pl: '250px', pt: '64px' }}>
            <Grid item xs={12}>
              <Dashboard vehicles={vehicles} visitors={visitors} handleExit={handleExit} handleDelete={handleDelete} />
            </Grid>
            {showVisitorForm && (
              <Grid item xs={12}>
                <NewVisitorForm onVisitorSubmit={handleVisitorFormSubmit} />
              </Grid>
            )}
            {showVehicleForm && (
              <Grid item xs={12}>
                <NewVehicleForm onVehicleSubmit={handleVehicleFormSubmit} />
              </Grid>
            )}
          </Grid>
        </>
      )}
    </Container>
  );
}

export default App;
