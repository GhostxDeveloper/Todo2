import React from 'react';
import { Drawer, List, ListItem, ListItemText, CssBaseline, AppBar, Toolbar, Typography, Box, Collapse } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const drawerWidth = 240;

const MainLayout = () => {
  const [open, setOpen] = React.useState({});

  const handleClick = (text) => {
    setOpen((prevOpen) => ({ ...prevOpen, [text]: !prevOpen[text] }));
  };

  const menuItems = [
    { text: 'Perfil', options: ['Opción Uno', 'Opción Dos', 'Opción Tres'] },
    { text: 'Configuración', options: ['Opción Uno', 'Opción Dos', 'Opción Tres'] },
    { text: 'Favoritos', options: ['Opción Uno', 'Opción Dos', 'Opción Tres'] },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Bienvenido
          </Typography>
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
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map(({ text, options }) => (
              <React.Fragment key={text}>
                <ListItem button onClick={() => handleClick(text)}>
                  <ListItemText primary={text} />
                  {open[text] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open[text]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {options.map((subText) => (
                      <ListItem button key={subText} sx={{ pl: 4 }}>
                        <ListItemText primary={subText} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, ml: `${drawerWidth}px` }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
