import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, Paper, Button, Avatar } from "@mui/material";
import axios from "axios";

const api_url = process.env.REACT_APP_STOCK_API_URL;

const UserDetail = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            navigate("/");
            return;
        }

        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${api_url}/user/userdetails/${userId}`);
                setUser(response.data.user);
            } catch (error) {
                console.error("Error fetching user details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [navigate]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress size={60} />
            </Box>
        );
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f4f6f9"
            padding={2}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    maxWidth: 400,
                    width: "100%",
                    textAlign: "center",
                    borderRadius: 2,
                    boxShadow: 3,
                    bgcolor: "white",
                }}
            >
                {user ? (
                    <>
                        <Avatar
                            sx={{
                                width: 80,
                                height: 80,
                                margin: "0 auto 16px",
                                bgcolor: "#1976d2",
                                fontSize: 40,
                            }}
                        >
                            {user.name[0].toUpperCase()}
                        </Avatar>
                        <Typography variant="h5" gutterBottom>
                            {user.name}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" gutterBottom>
                            {user.email}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => navigate("/")}
                            sx={{ marginTop: 2 }}
                        >
                            Go to Dashboard
                        </Button>
                    </>
                ) : (
                    <Typography variant="h6" color="error">
                        Unable to fetch user details.
                    </Typography>
                )}
            </Paper>
        </Box>
    );
};

export default UserDetail;
