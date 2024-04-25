import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, TextField, FormControlLabel, Radio, RadioGroup, Select, MenuItem } from '@material-ui/core';
import axios from 'axios';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('employee');
  const [company, setCompany] = useState('');
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users/companies/');
        setCompanies(response.data);
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/user/register/', {
        username,
        email,
        password,
        name,
        phone_number : phoneNumber,
        address,
        role,
        company,
      });

      if (response.status === 201) {
        setSuccessMessage('Sign-up successful! You can now log in.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={signUp}>
      <div>
        <RadioGroup row value={role} onChange={e => setRole(e.target.value)}>
          <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          <FormControlLabel value="employee" control={<Radio />} label="Employee" />
        </RadioGroup>
      </div>
      <div>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
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
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          autoComplete="current-password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="phoneNumber"
          label="Phone Number"
          name="phoneNumber"
          autoComplete="phoneNumber"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          name="address"
          autoComplete="address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        {role === 'admin' ? (
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="company"
            label="Company"
            name="company"
            autoComplete="company"
            value={company}
            onChange={e => setCompany(e.target.value)}
          />
        ) : (
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="company-label">Company</InputLabel>
            <Select
              labelId="company-label"
              value={company}
              onChange={e => setCompany(e.target.value)}
            >
              {companies.map((company) => (
                <MenuItem key={company.id} value={company.name}>{company.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </div>
      <button type="submit">Sign Up</button>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
    </form>
  );
}

export default Signup;
