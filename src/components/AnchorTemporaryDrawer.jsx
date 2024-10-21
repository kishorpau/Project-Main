import React, { useState } from 'react';
import { Box, Drawer, Button, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon, MoveToInbox as InboxIcon, Mail as MailIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

export default function ResponsiveDrawer() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const isLargeScreen = useMediaQuery('(min-width:600px)');
  const location = useLocation();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerOpen(open);
  };

  const pages = ['Dashboard', 'Analytics', 'Tools', 'SendSms', 'SmsHistory', 'Calendar', 'Notification'];
  const additionalItems = ['All mail', 'Trash', 'Spam'];

  const getPath = (text) => `/${text}`.toLowerCase();
  const isActivePath = (path) => location.pathname.toLowerCase() === path;

  const renderListItems = (items) =>
    items.map((text, index) => {
      const path = getPath(text);
      const isActive = isActivePath(path);
      return (
        <Link key={text} to={path} style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem disablePadding>
            <ListItemButton sx={{ backgroundColor: isActive ? '#304C50' : 'transparent', color:isActive ? 'white':'black',

'&:hover': {
    backgroundColor:isActive?'#1A393D':'transparent',}

             }}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        </Link>
      );
    });

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>{renderListItems(pages)}</List>
      <Divider />
      <List>{renderListItems(additionalItems)}</List>
    </Box>
  );

  return (
    <div>
      {!isLargeScreen && (
        <Button onClick={toggleDrawer(true)}>
          Menu
        </Button>
      )}
      <Drawer
        anchor="left"
        open={isLargeScreen || isDrawerOpen}
        onClose={toggleDrawer(false)}
        variant={isLargeScreen ? 'persistent' : 'temporary'}
        PaperProps={{
          sx: {
            height: '80vh',
            top: '10vh',
            position: 'fixed',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </div>
  );
}
