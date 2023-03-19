import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Drawer,
  Box,
  IconButton,
} from "@mui/material";

import React, { useState } from "react";
import "./MuiNavbarStyle.css";
import SideBar from "../sidebar/sideBar";

const MuiNavbar = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [translationName, setTranslationName] = useState([]);

  return (
    <div>
      <AppBar position="static" style={{ background: "#252931" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <img
              style={{ width: "55px" }}
              src="../../krishna4.png"
              alt="your-image-alt-text"
            />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bhagwad Geeta
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button color="inherit" onClick={() => setIsDrawerOpen(true)}>
              <i className="fa fa-gear" style={{ fontSize: "24px" }}></i>
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box p={2} className="side-box">
          <Button
            className="closing-button"
            onClick={() => setIsDrawerOpen(false)}
          >
            <i className="fa fa-close i-tag"></i>
          </Button>
          <SideBar
            translationName={translationName}
            setTranslationName={setTranslationName}
            onUpdateAuthorsName={props.onUpdateAuthorsName}
          />
        </Box>
      </Drawer>
    </div>
  );
};

export default MuiNavbar;
