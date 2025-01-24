import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dash from './components/Dash';
import StockList from './components/StockList';
import Login from './components/Login';
import Signup from './components/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store';
import UserDetail from './components/UserDetail';

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // console.log('Redux isLoggedIn:', isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/dash" element={<Dash />} />
            <Route path="/stock-list" element={<StockList />} />
            <Route path="/user-details" element={<UserDetail />} />
            <Route path="*" element={<Navigate to="/dash" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
