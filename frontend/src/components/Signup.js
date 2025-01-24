import React, { useState } from 'react';
import { TextField, Typography, Box, Button, Grid } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../store';
import Swal from 'sweetalert';

const api_url = process.env.REACT_APP_STOCK_API_URL;

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post(`${api_url}/user/signup`, {
        name: input.name,
        email: input.email,
        password: input.password
      });
      const data = res.data;
      return data;
    } catch (err) {
      console.log(err);
      Swal("Error", err.response.data.message || "Something went wrong", "error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(input);
    sendRequest()
      .then((data) => {
        if (data && data.user) {
          localStorage.setItem("userId", data.user._id);
          dispatch(authActions.login());
          navigate("/dash");
          Swal("Success", "Signup successful", "success");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: '100svh', // Full viewport height
        background: 'linear-gradient(135deg, #2D3250 0%, #424869 100%)', // Background gradient
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
          width={400}
          p={3}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            SignUp
          </Typography>
          <TextField
            required
            name="name"
            type="text"
            onChange={handleChange}
            value={input.name}
            margin="normal"
            placeholder="Name"
            fullWidth
          />
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
            SignUp
          </Button>
          <Button
            sx={{ marginTop: 3, borderRadius: 3 }}
            LinkComponent={Link}
            to="/login"
          >
            Change to Login
          </Button>
        </Box>
      </form>
    </Grid>
  );
};

export default Signup;
