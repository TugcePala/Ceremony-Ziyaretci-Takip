// Sidebar.js
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <IconButton onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <div style={{ width: 250 }}>
          <List>
            <ListItem button>
              <ListItemText primary="Yeni Ziyaretçi Ekle" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Yeni Araç Ekle" />
            </ListItem>
          </List>
          <Divider />
          {/* Diğer menü öğeleri */}
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
