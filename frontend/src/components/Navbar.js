import React, { useState, useEffect } from 'react';
import { AppBar, Tab, Tabs, Toolbar, Typography, Box, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
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

    const listItemStyle = {
        '&:hover': {
            backgroundColor: '#374151',
        },
    };

    const drawerContent = (
        <Box
            sx={{
                width: 280,
                height: '100%',
                backgroundColor: '#1f2937',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Box sx={{ padding: '16px' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', color: '#60a5fa' }}>
                    Stock Portfolio
                </Typography>
            </Box>
            <Divider sx={{ backgroundColor: '#374151' }} />
           
            <List>
                <ListItem button component={Link} to="/" onClick={() => setValue(0)} sx={listItemStyle}>
                    <ListItemIcon>
                        <DashboardIcon sx={{ color: '#9ca3af' }} />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" primaryTypographyProps={{ style: { color: '#ffffff' } }} />
                </ListItem>
                <ListItem button component={Link} to="/stock-list" onClick={() => setValue(1)} sx={listItemStyle}>
                    <ListItemIcon>
                        <ShowChartIcon sx={{ color: '#9ca3af' }} />
                    </ListItemIcon>
                    <ListItemText primary="Stocks" primaryTypographyProps={{ style: { color: '#ffffff' } }} />
                </ListItem>
            </List>
            <Divider sx={{ backgroundColor: '#374151' }} />
            {/* Footer */}
            <Box sx={{ padding: '16px', textAlign: 'center', fontSize: '12px', color: '#9ca3af' }}>
                © 2025 Stock Portfolio
            </Box>
        </Box>
    );

    return (
        <div>
            <AppBar
                position="sticky"
                sx={{backgroundImage:"linear-gradient(90deg, rgba(2,0,36,1) 2%, rgba(166,69,252,1) 36%, rgba(142,8,8,1) 73%, rgba(0,212,255,1) 100%);"}}
            >
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, color: '#ffffff', fontWeight: 'bold' }}>
                        Stock Portfolio
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
                                    label="Dashboard"
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
