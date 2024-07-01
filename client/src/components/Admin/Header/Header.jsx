import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
function Header() {
  const navigate = useNavigate();
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
            <span style={{ color: "#9ab8b7", marginLeft: 15, fontFamily: 'inter'}}>admin</span>
          </Typography>
          <Button color="inherit">
            <Link to={"services"}>Services</Link>
          </Button>
          <Button color="inherit">
            <Link to={"users"}>Users</Link>
          </Button>
          <Button color="inherit">
            <Link to={"workers"}>Workers</Link>
          </Button>
          <Button color="inherit">
            <Link to={"messages"}>Messages</Link>
          </Button>
          <Button color="inherit">
            <Link to={"basket"}>Basket</Link>
          </Button>
          <Button
            onClick={() => {
              sessionStorage.removeItem("user");
              navigate("/admin");
              toast("you logged out successfully!", {
                icon: "🔙",
              });
            }}
            color="inherit"
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Toaster position="top-center" reverseOrder={false} />
    </Box>
  );
}
export default Header;
