import React, { useState, useEffect } from 'react';
import { AppBar, Tab, Tabs, Toolbar, Typography, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme, useMediaQuery } from '@mui/material';

const Navbar = () => {
    const [value, setValue] = useState(0);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const location = useLocation(); // Detect current route

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Synchronize the selected tab with the current route
    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setValue(0);
                break;
            case '/stock-list':
                setValue(1);
                break;
            default:
                setValue(false); // Handle routes not in Tabs
                break;
        }
    }, [location]);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerContent = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem button component={Link} to="/" onClick={() => setValue(0)}>
                    <ListItemText primary="DashBoard" />
                </ListItem>
                <ListItem button component={Link} to="/stock-list" onClick={() => setValue(1)}>
                    <ListItemText primary="Stocks" />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <AppBar
                position="sticky"
                sx={{
                    backgroundImage:
                        "linear-gradient(90deg, rgba(2,0,36,1) 2%, rgba(166,69,252,1) 36%, rgba(142,8,8,1) 73%, rgba(0,212,255,1) 100%);",
                }}
            >
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <b>Stock_Portfolio</b>
                    </Typography>
                    {isMobile ? (
                        <>
                            <IconButton
                                color="inherit"
                                edge="start"
                                onClick={toggleDrawer(true)}
                                sx={{ ml: 'auto' }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                                {drawerContent}
                            </Drawer>
                        </>
                    ) : (
                        <Box
                            sx={{
                                position: 'absolute',
                                left: '50%',
                                transform: 'translateX(-50%)',
                            }}
                        >
                            <Tabs
                                textColor="inherit"
                                value={value}
                                onChange={handleTabChange}
                                indicatorColor="secondary"
                            >
                                <Tab
                                    label="DashBoard"
                                    sx={{ color: 'white' }}
                                    component={Link}
                                    to="/"
                                />
                                <Tab
                                    label="Stocks"
                                    sx={{ color: 'white' }}
                                    component={Link}
                                    to="/stock-list"
                                />
                            </Tabs>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;
