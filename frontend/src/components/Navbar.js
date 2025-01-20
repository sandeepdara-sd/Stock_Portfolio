import React, { useState, useEffect } from 'react';
import { AppBar, Tab, Tabs, Toolbar, Typography, Box, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { useTheme, useMediaQuery } from '@mui/material';

const Navbar = () => {
    const [value, setValue] = useState(0);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const location = useLocation();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setValue(0);
                break;
            case '/stock-list':
                setValue(1);
                break;
            default:
                setValue(false);
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
            sx={{
                width: 250,
                height: '100%',
                background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Typography
                variant="h6"
                sx={{
                    textAlign: 'center',
                    marginBottom: 2,
                    fontWeight: 'bold',
                }}
            >
                Stock_Portfolio
            </Typography>
            <List>
                <ListItem button component={Link} to="/" onClick={() => setValue(0)}>
                    <ListItemIcon>
                        <DashboardIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="DashBoard" primaryTypographyProps={{ style: { color: 'white' } }} />
                </ListItem>
                <ListItem button component={Link} to="/stock-list" onClick={() => setValue(1)}>
                    <ListItemIcon>
                        <ShowChartIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Stocks" primaryTypographyProps={{ style: { color: 'white' } }} />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <AppBar
                position="sticky"
                sx={{
                   
                    backgroundColor: '#1f2937',        
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
