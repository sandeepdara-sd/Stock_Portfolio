import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useScrollTrigger,
  Slide,
  Tabs,
  Tab,
  Avatar,
  useMediaQuery,
  Drawer,
  IconButton,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";

const api_url = process.env.REACT_APP_STOCK_API_URL;

function HideOnScroll(props) {
  const trigger = useScrollTrigger({ threshold: 100 });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  );
}

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const [userDetails, setUserDetails] = useState(null);  
  const [value, setValue] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const location = useLocation(); 
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isMobile = useMediaQuery("(max-width:600px)"); 
  const getInitials = () => {
    if (userName) {
      const nameParts = userName.split(" ");
      return (nameParts[0][0] + (nameParts[1] ? nameParts[1][0] : '')).toUpperCase();
    }
    return "AB";
  };

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("userId");
    if (loggedInUserId && !isLoggedIn) {
      dispatch(authActions.login({ _id: loggedInUserId }));
    }

    if (isLoggedIn) {
      axios
        .get(`${api_url}/user/userdetails/${loggedInUserId}`)
        .then((response) => {
          setUserName(response.data.user.name);
          setUserDetails(response.data.user);  
        })
        .catch((err) => console.error("Error fetching user data:", err));
    }

    if (location.pathname === "/") {
      setValue(0); 
    } else if (location.pathname === "/stock-list") {
      setValue(1); 
    }
  }, [dispatch, isLoggedIn, location.pathname]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAvatarClick = () => {
    setValue(-1); 
  };

  const handleLogoClick = () => {
    setValue(0);
  };

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      <CssBaseline />
      <HideOnScroll>
        <AppBar
          position="fixed"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            pointerEvents: "none",
          }}
        >
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "space-between",
              pointerEvents: "auto",
              padding: "1rem 2rem",
            }}
          >
            <Typography
              variant="h5"
              component={Link}
              to={isLoggedIn ? "/dash" : "/"}
              onClick={handleLogoClick}
              style={{
                textDecoration: "none",
                color: "#2D3250",
                fontWeight: "bold",
                fontSize: "1.5rem",
                letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #2D3250, #424869)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                pointerEvents: "auto",
              }}
            >
              StockFolio
            </Typography>

            {isLoggedIn && !isMobile && (
              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <Tabs
                  textColor="inherit"
                  value={value}
                  onChange={handleTabChange}
                  indicatorColor="secondary"
                  aria-label="nav tabs"
                >
                  <Tab label="DashBoard" sx={{ color: "#2D3250" }} component={Link} to="/" />
                  <Tab label="Stocks" sx={{ color: "#2D3250" }} component={Link} to="/stock-list" />
                </Tabs>
              </Box>
            )}

            {isMobile ? (
              <IconButton
                color="#2D3250"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="end"
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box style={{ display: "flex", gap: "1rem" }}>
                {!isLoggedIn ? (
                  <>
                    <Button
                      variant="outlined"
                      component={Link}
                      to="/login"
                      style={{
                        padding: "0.5rem 1.5rem",
                        textTransform: "none",
                        borderWidth: "1.5px",
                        borderColor: "#2D3250",
                        color: "#2D3250",
                        fontWeight: 600,
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="contained"
                      component={Link}
                      to="/signup"
                      style={{
                        padding: "0.5rem 1.5rem",
                        backgroundColor: "#2D3250",
                        color: "#FFFFFF",
                        fontWeight: 600,
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                ) : (
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      sx={{
                        bgcolor: "#2D3250",
                        fontSize: "16px",
                        mr: 1,
                        cursor: "pointer",
                        ":hover": { transform: "scale(1.1)" },
                      }}
                      component={Link}
                      to="/user-details"
                      onClick={handleAvatarClick}
                    >
                      {getInitials()}
                    </Avatar>
                    <Button
                      onClick={() => dispatch(authActions.logout())}
                      component={Link}
                      to="/"
                      sx={{ margin: 1, borderRadius: 10 }}
                      variant="contained"
                      color="warning"
                    >
                      Logout
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={handleDrawerToggle}
        sx={{ width: 250 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
            gap: "1rem",
          }}
        >
          {isLoggedIn && userDetails && (  
            <Box style={{ marginBottom: "1rem", textAlign: "center" }}>
              <Avatar
                sx={{
                  bgcolor: "#2D3250",
                  fontSize: "24px",
                  width: "60px",
                  height: "60px",
                  margin: "0 auto",
                }}
              >
                {getInitials()}
              </Avatar>
              <Typography variant="h6" sx={{ marginTop: "1rem" }}>
                {userDetails.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>
                {userDetails.email}
              </Typography>
            </Box>
          )}
          {isLoggedIn && (
            <>
              <Button component={Link} to="/" onClick={handleDrawerToggle}>
                Dashboard
              </Button>
              <Button component={Link} to="/stock-list" onClick={handleDrawerToggle}>
                Stocks
              </Button>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Button component={Link} to="/login" onClick={handleDrawerToggle}>
                Sign In
              </Button>
              <Button component={Link} to="/signup" onClick={handleDrawerToggle}>
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
