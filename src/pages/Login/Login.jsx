import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, useTheme } from '@mui/material';
import {tokens } from "../../Theme";
import api from '../../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const res = await api.post('/api/token/', {username, password});
        console.log( res.data);
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        localStorage.setItem('userid', res.data.userid);
        localStorage.setItem('cususerid', res.data.cususerid);
        localStorage.setItem('companyid', res.data.companyid);
        navigate('/');
    }catch (error) {
        if (error.response.status === 401) {
            setError('Invalid credentials');
        }
        else {
            setError('Something went wrong. Please try again later');
        }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', marginTop: '10px' }}>
      <Container component="main" maxWidth="xs">
        <div style={{ textAlign: 'center' }}>
          <Typography component="h1" variant="h4" style={{ fontWeight: 'bold',fontSize:'30px', marginBottom: '16px' }}>
            Log In to your Account
          </Typography>
          <form style={{ width: '100%', marginTop: '8px' }} onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ marginBottom: '8px' }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: '16px' }}
            />
            {error && <Typography color="error" style={{ marginBottom: '16px' }}>{error}</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="inherit"
              style={{ backgroundColor: colors.blueAccent[500], color: 'white', marginBottom: '16px' , width:'50%'}}
            >
              Log In
            </Button>
            <Typography>
              Don't have an account? <Link to="/signup">Create new user</Link>
            </Typography>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Login;
