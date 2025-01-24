import React, { useState } from 'react';
import { TextField, Typography, Box, Button, Grid } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from './../store/index';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert';

const api_url = process.env.REACT_APP_STOCK_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const sendRequest = async (type = "login") => {
    try {
      const res = await axios.post(`${api_url}/user/${type}`, {
        email: input.email,
        password: input.password
      });

      const data = res.data;
      // console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      Swal("Error", err.response?.data?.message || "Something went wrong", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await sendRequest();  
      if (data && data.existingUser) {
        
        // console.log("Login Response:", data);
        
        localStorage.setItem("userId", data.existingUser._id); 
        localStorage.setItem("token", data.token); 
  
        // console.log("Stored userId:", localStorage.getItem('userId')); 
  
        dispatch(authActions.login());
  
        Swal("Success", "Login successful", "success");
  
        navigate("/dash", { replace: true });
      } else {
        Swal("Error", "Invalid login credentials", "error");
      }
    } catch (err) {
      console.error(err);
      Swal("Error", err.response.data.message || "Something went wrong", "error");
    }
  };
  

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: '100svh',
        background: 'linear-gradient(135deg, #2D3250 0%, #424869 100%)',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box
          sx={{ backgroundColor: 'white' }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          boxShadow="10px 10px 20px #ccc"
          margin="auto"
          borderRadius={5}
          width={350}
          p={3}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            Login
          </Typography>
          <TextField
            required
            name="email"
            type="email"
            onChange={handleChange}
            value={input.email}
            margin="normal"
            placeholder="Email"
            fullWidth
          />
          <TextField
            required
            name="password"
            type="password"
            onChange={handleChange}
            value={input.password}
            margin="normal"
            placeholder="Password"
            fullWidth
          />
          <Button
            type="submit"
            color="warning"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
          >
            Login
          </Button>
          <Button
            sx={{ marginTop: 3, borderRadius: 3 }}
            LinkComponent={Link}
            to="/signup"
          >
            Change to Signup
          </Button>
        </Box>
      </form>
    </Grid>
  );
};

export default Login;
