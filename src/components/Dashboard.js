import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { CSVLink } from 'react-csv';

const Dashboard = ({ vehicles, visitors, handleExit, handleDelete }) => {
  const [editMode, setEditMode] = useState({ type: '', id: null });
  const [editData, setEditData] = useState({ name: '', carPlate: '', entryDateTime: '', exitDateTime: '', contactPerson: '', arrivalDateTime: '' });

  const handleEdit = (type, id, data) => {
    setEditMode({ type, id });
    setEditData(data);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    handleExit(editMode.type, editMode.id, editData);
    setEditMode({ type: '', id: null });
  };

  const csvData = {
    vehicles: vehicles.map(vehicle => ({
      AdSoyad: vehicle.name,
      AracPlakasi: vehicle.carPlate,
      GirisTarihi: vehicle.entryDateTime,
      CikisTarihi: vehicle.exitDateTime
    })),
    visitors: visitors.map(visitor => ({
      AdSoyad: visitor.name,
      KiminleGorusecek: visitor.contactPerson,
      GelisTarihi: visitor.arrivalDateTime,
      CikisTarihi: visitor.exitDateTime
    }))
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Araçlar</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ad ve Soyad</TableCell>
              <TableCell>Araç Plakası</TableCell>
              <TableCell>Giriş Tarihi ve Saati</TableCell>
              <TableCell>Çıkış Tarihi ve Saati</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles && vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>
                  {editMode.type === 'vehicle' && editMode.id === vehicle.id ? (
                    <TextField
                      name="name"
                      value={editData.name}
                      onChange={handleEditChange}
                    />
                  ) : (
                    vehicle.name
                  )}
                </TableCell>
                <TableCell>
                  {editMode.type === 'vehicle' && editMode.id === vehicle.id ? (
                    <TextField
                      name="carPlate"
                      value={editData.carPlate}
                      onChange={handleEditChange}
                    />
                  ) : (
                    vehicle.carPlate
                  )}
                </TableCell>
                <TableCell>
                  {editMode.type === 'vehicle' && editMode.id === vehicle.id ? (
                    <TextField
                      name="entryDateTime"
                      type="datetime-local"
                      value={editData.entryDateTime}
                      onChange={handleEditChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  ) : (
                    vehicle.entryDateTime
                  )}
                </TableCell>
                <TableCell>
                  {editMode.type === 'vehicle' && editMode.id === vehicle.id ? (
                    <TextField
                      name="exitDateTime"
                      type="datetime-local"
                      value={editData.exitDateTime}
                      onChange={handleEditChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  ) : (
                    vehicle.exitDateTime
                  )}
                </TableCell>
                <TableCell>
                  {editMode.type === 'vehicle' && editMode.id === vehicle.id ? (
                    <Button variant="contained" color="secondary" onClick={handleSave}>
                      Kaydet
                    </Button>
                  ) : (
                    <>
                      <IconButton aria-label="edit" onClick={() => handleEdit('vehicle', vehicle.id, vehicle)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={() => handleDelete('vehicle', vehicle.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h2 style={{ margin: '2rem 0 1rem' }}>Ziyaretçiler</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ad Soyad</TableCell>
              <TableCell>Kiminle Görüşeceği</TableCell>
              <TableCell>Geliş Tarihi ve Saati</TableCell>
              <TableCell>Çıkış Tarihi ve Saati</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visitors && visitors.map((visitor) => (
              <TableRow key={visitor.id}>
                <TableCell>
                  {editMode.type === 'visitor' && editMode.id === visitor.id ? (
                    <TextField
                      name="name"
                      value={editData.name}
                      onChange={handleEditChange}
                    />
                  ) : (
                    visitor.name
                  )}
                </TableCell>
                <TableCell>
                  {editMode.type === 'visitor' && editMode.id === visitor.id ? (
                    <TextField
                      name="contactPerson"
                      value={editData.contactPerson}
                      onChange={handleEditChange}
                    />
                  ) : (
                    visitor.contactPerson
                  )}
                </TableCell>
                <TableCell>
                  {editMode.type === 'visitor' && editMode.id === visitor.id ? (
                    <TextField
                      name="arrivalDateTime"
                      type="datetime-local"
                      value={editData.arrivalDateTime}
                      onChange={handleEditChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  ) : (
                    visitor.arrivalDateTime
                  )}
                </TableCell>
                <TableCell>
                  {editMode.type === 'visitor' && editMode.id === visitor.id ? (
                    <TextField
                      name="exitDateTime"
                      type="datetime-local"
                      value={editData.exitDateTime}
                      onChange={handleEditChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  ) : (
                    visitor.exitDateTime
                  )}
                </TableCell>
                <TableCell>
                  {editMode.type === 'visitor' && editMode.id === visitor.id ? (
                    <Button variant="contained" color="secondary" onClick={handleSave}>
                      Kaydet
                    </Button>
                  ) : (
                    <>
                      <IconButton aria-label="edit" onClick={() => handleEdit('visitor', visitor.id, visitor)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={() => handleDelete('visitor', visitor.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <div style={{ marginTop: '2rem' }}>
        <CSVLink data={csvData.vehicles} filename={"vehicles.csv"} style={{ marginRight: '1rem' }}>
          <Button variant="contained" color="primary">
            Araçları Excel'e Aktar
          </Button>
        </CSVLink>
        <CSVLink data={csvData.visitors} filename={"visitors.csv"}>
          <Button variant="contained" color="primary">
            Ziyaretçileri Excel'e Aktar
          </Button>
        </CSVLink>
      </div>
    </div>
  );
};

export default Dashboard;
