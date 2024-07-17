import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

const NewVisitorForm = ({ onVisitorSubmit }) => {
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [arrivalDateTime, setArrivalDateTime] = useState('');
  const [visitorOptions, setVisitorOptions] = useState([]);

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan verileri al
    const savedVisitorOptions = JSON.parse(localStorage.getItem('visitorOptions')) || [];
    setVisitorOptions(savedVisitorOptions);
  }, []); // [] içindeki boş array sadece sayfa yüklendiğinde çalışmasını sağlar

  useEffect(() => {
    // visitorOptions her güncellendiğinde localStorage'a kaydet
    localStorage.setItem('visitorOptions', JSON.stringify(visitorOptions));
  }, [visitorOptions]); // visitorOptions değiştiğinde çalışır

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVisitor = { name, contactPerson, arrivalDateTime };
    const updatedOptions = [...visitorOptions, newVisitor];
    setVisitorOptions(updatedOptions);
    localStorage.setItem('visitorOptions', JSON.stringify(updatedOptions)); // Veriyi ekledikten sonra localStorage'a kaydet
    onVisitorSubmit(newVisitor);
    setName('');
    setContactPerson('');
    setArrivalDateTime('');
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h6">Yeni Ziyaretçi Ekle</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Autocomplete
          freeSolo
          options={visitorOptions.map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              fullWidth
              label="Ad Soyad"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Autocomplete
          freeSolo
          options={visitorOptions.map((option) => option.contactPerson)}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              fullWidth
              label="Kiminle Görüşeceği"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          label="Geliş Tarihi ve Saati"
          type="datetime-local"
          InputLabelProps={{
            shrink: true,
          }}
          value={arrivalDateTime}
          onChange={(e) => setArrivalDateTime(e.target.value)}
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

export default NewVisitorForm;
