import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

const NewVehicleForm = ({ onVehicleSubmit }) => {
  const [name, setName] = useState('');
  const [carPlate, setCarPlate] = useState('');
  const [entryDateTime, setEntryDateTime] = useState('');
  const [vehicleOptions, setVehicleOptions] = useState([]);

  useEffect(() => {
    const savedVehicleOptions = JSON.parse(localStorage.getItem('vehicleOptions')) || [];
    setVehicleOptions(savedVehicleOptions);
  }, []);

  useEffect(() => {
    localStorage.setItem('vehicleOptions', JSON.stringify(vehicleOptions));
  }, [vehicleOptions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVehicle = { name, carPlate, entryDateTime };
    setVehicleOptions([...vehicleOptions, newVehicle]);
    onVehicleSubmit(newVehicle);
    setName('');
    setCarPlate('');
    setEntryDateTime('');
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h6">Yeni Araç Ekle</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Autocomplete
          freeSolo
          options={vehicleOptions.map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              fullWidth
              label="Ad ve Soyad"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Autocomplete
          freeSolo
          options={vehicleOptions.map((option) => option.carPlate)}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              fullWidth
              label="Araç Plakası"
              value={carPlate}
              onChange={(e) => setCarPlate(e.target.value)}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          label="Giriş Tarihi ve Saati"
          type="datetime-local"
          InputLabelProps={{
            shrink: true,
          }}
          value={entryDateTime}
          onChange={(e) => setEntryDateTime(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Ekle
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewVehicleForm;
