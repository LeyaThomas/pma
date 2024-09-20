import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Grid, Avatar, Box, Paper, useTheme, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminIcon from '@mui/icons-material/AdminPanelSettings';
import EmployeeIcon from '@mui/icons-material/Work';
import { tokens } from '../../Theme';
import axios from 'axios';
const SignUp = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [company, setCompany] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  useEffect(() => {
    const fetchCompanies = async () => {
      
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/users/companies'); 
        setCompanies(response.data);
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  const handleUserTypeSelection = (type) => {
    setUserType(type);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      let companyData;
      if (userType === 'admin') {
        companyData = company;
      } else {
        const companyObj = companies.find(company => company.name === selectedCompany);
        if (!companyObj) {
          console.error('Company not found');
          return;
        }
        companyData = companyObj.name;
      }

      const data = {
        username,
        email,
        password,
        name,
        phone_number: phoneNumber,
        address,
        role: userType,
        company: companyData,
      };

      const response = await axios.post(process.env.REACT_APP_API_URL + 'api/user/register/', data);

      console.log(response);

      if (response.status === 201) {
        setSuccessMessage('Sign-up successful! You can now log in.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  };
  return (
    <Grid container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '200px' }}>
      {!userType && (
        <>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" style={{ fontFamily: 'Verdana', fontSize: '30px', color: 'white', marginBottom: '30px' }}>
              Create an Account
            </Typography>
          </Grid>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={2}>
              <Paper elevation={3} style={{ padding: '10px', backgroundColor: 'white', height: '200px', border: '2px solid', borderColor: colors.greenAccent[500] }} >
                <Box display="flex" flexDirection="column" alignItems="center" gap={1} style={{ marginTop: '40px' }}>
                  <Avatar style={{ backgroundColor: 'transparent', marginBottom: '12px' }} onClick={() => handleUserTypeSelection('admin')}>
                    <AdminIcon style={{ color: colors.greenAccent[500], fontSize: '50px' }} />
                  </Avatar>
                  <Typography style={{ fontFamily: 'Arial', fontSize: '20px', color: colors.greenAccent[500] }}>Join as an Admin</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper elevation={3} style={{ padding: '10px', backgroundColor: 'white', height: '200px', border: '2px solid', borderColor: colors.greenAccent[500] }} >
                <Box display="flex" flexDirection="column" alignItems="center" gap={1} style={{ marginTop: '40px' }}>
                  <Avatar style={{ backgroundColor: 'transparent', marginBottom: '12px' }} onClick={() => handleUserTypeSelection('employee')}>
                    <EmployeeIcon style={{ color: colors.greenAccent[500], fontSize: '50px' }} />
                  </Avatar>
                  <Typography style={{ fontFamily: 'Arial', fontSize: '20px', color: colors.greenAccent[500] }}>Join as an Employee</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
      {userType && (
        <>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" style={{ marginBottom: '20px', fontSize: '40px', marginLeft: '-50px', marginTop: '-50px' }}>
              Create an Account
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} style={{ paddingLeft: '480px' }}>
              <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Grid>
            <Grid item xs={6} style={{ paddingLeft: '480px' }}>
              <TextField label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Name" variant="outlined" value={name}
                onChange={(e) => setName(e.target.value)} />
            </Grid>
            <Grid item xs={6} style={{ paddingLeft: '480px' }}>
              <TextField label="Confirm Password" type="password" variant="outlined" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Address" variant="outlined" value={address} onChange={(e) => setAddress(e.target.value)} />
            </Grid>
            <Grid item xs={6} style={{ paddingLeft: '480px' }}>
              <TextField label="Phone Number" variant="outlined" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </Grid>
            {userType === 'admin' && (
              <Grid item xs={6} >
                <TextField label="Company" variant="outlined" value={company} onChange={(e) => setCompany(e.target.value)} />
              </Grid>
            )}
            {userType === 'employee' && Array.isArray(companies) && (
              <Grid item xs={6} style={{ marginLeft: '-2px' }} >
                <TextField
                  select
                  label="Select Company"
                  variant="outlined"
                  value={selectedCompany}
                  onChange={(e) => {
                    setSelectedCompany(e.target.value);
                    console.log(e.target.value); // Log the new value
                  }}
                  fullWidth
                  style={{ width: '27%' }}
                >
                  {companies.map((company) => (
                    <MenuItem key={company.id} value={company.name}>
                      {company.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '-45px' }}>
              <Button variant="contained" onClick={handleSignUp} style={{ width: '150px', backgroundColor: colors.blueAccent[500] }}>
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={12}>
              {successMessage && <Typography variant="body1" color="success" style={{ paddingLeft: '630px' }}>{successMessage}</Typography>}
              {error && <Typography variant="body1" color="error" style={{ paddingLeft: '630px' }}>{error}</Typography>}
              <Typography variant="body1" paddingLeft='630Px' >
                Already have an account? <a href="/login">Log in</a>
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default SignUp;