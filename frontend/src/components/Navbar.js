import React, { useState } from 'react';
import { AppBar, Tab, Tabs, Toolbar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [value, setValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <AppBar position="sticky" sx={{backgroundImage:"linear-gradient(90deg, rgba(2,0,36,1) 2%, rgba(166,69,252,1) 36%, rgba(142,8,8,1) 73%, rgba(0,212,255,1) 100%);"}}>
                <Toolbar>
                   
                    <Typography variant="h6" sx={{ flexGrow: 0 }} >
                        <b>Stock_Portfolio</b>
                    </Typography>
                    
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
                            <Tab label="DashBoard" sx={{ color: 'white' }} LinkComponent={Link} to='/'/>
                            <Tab label="Stocks" sx={{ color: 'white' }} LinkComponent={Link} to='/stock-list' />
                            
                        </Tabs>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;
