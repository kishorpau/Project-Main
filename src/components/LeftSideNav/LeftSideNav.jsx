import React, { useState } from "react";
import {
  Box,
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { LeftSideNavPages } from "./LeftSideNavPages";
import {
  listItemButtonStyles,
  linkStyles,
  drawerPaperStyles,
  menuButtonStyles,
} from "./LeftSideNavStyles";

const drawerWidth = 180;

export default function LeftSideNav({ children }) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width:600px)");
  const location = useLocation();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    )
      return;
    setDrawerOpen(open);
  };

  const getPath = (text) => `/${text}`.toLowerCase();
  const isActivePath = (path) => location.pathname.toLowerCase() === path;

  const renderListItems = (items) =>
    items.map(({ text, icon, path }) => {
      const fullpath = getPath(path);
      const isActive = isActivePath(fullpath);
      return (
        <Link key={text} to={fullpath} style={linkStyles}>
          <ListItem disablePadding>
            <ListItemButton sx={listItemButtonStyles(isActive)}>
              <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        </Link>
      );
    });

  const drawerContent = (
    <Box
      sx={{ width: drawerWidth }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>{renderListItems(LeftSideNavPages)}</List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {!isLargeScreen && (
        <Button
          onClick={toggleDrawer(true)}
          variant="text"
          sx={menuButtonStyles}
        >
          Menu
        </Button>
      )}
      <Drawer
        anchor="left"
        open={isLargeScreen || isDrawerOpen}
        onClose={toggleDrawer(false)}
        variant={isLargeScreen ? "persistent" : "temporary"}
        PaperProps={{
          sx: drawerPaperStyles,
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: "0.5rem",
          marginLeft: { sm: `${drawerWidth}px` },
          transition: "margin-left 0.3s",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
