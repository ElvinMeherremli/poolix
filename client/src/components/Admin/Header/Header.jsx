import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#003e3c" }}>
        <Toolbar>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            sx={{ mr: 1 }}
            className="flex items-center justify-center"
          >
            <Link to={"/"}>
              <HomeIcon />
            </Link>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            POOLIX{" "}
            <span style={{ color: "#9ab8b7", marginLeft: 15 }}>admin</span>
          </Typography>
          <Button color="inherit">
            <Link to={"services"}>Services</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Header;
