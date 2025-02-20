import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, CssBaseline, AppBar, Toolbar, Box } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const drawerWidth = 240;

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(true); // Controla si el menu desplegable está abierto o cerrado

  const handleClick = () => {
    setOpen(!open); // Cambia el estado de abierto o cerrado
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <h1>Dashboard</h1>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={true}
      >
        <List>
          <ListItem button>
            <ListItemText primary="Opción 1" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Opción 2" />
          </ListItem>
          <ListItem button onClick={handleClick}>
            <ListItemText primary="Opción 3" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        </List>
      </Drawer>

      {/* Este es el lugar donde se renderizarán los 'children' */}
      <Box
        sx={{
          marginLeft: `${drawerWidth}px`,
          padding: 3,
          width: `calc(100% - ${drawerWidth}px)`,
          marginTop: 8, // Ajusta el espacio debajo del AppBar
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
