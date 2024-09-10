import React, { useState, useEffect } from 'react';
import { useTheme, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { tokens } from "../../Theme";
import axios from 'axios';

const ProjectPulse = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState('');


  useEffect(() => {
    const employeeId = localStorage.getItem('cususerid');  // Fetch employee id from local storage
    if (employeeId) {
      console.log('employeeId:', employeeId);  // Log employeeId
      const url = process.env.REACT_APP_API_URL + `/projects/employee/${employeeId}/`;  // API URL  
      console.log('Request URL:', url);  // Log request URL
      axios.get(url)  // Use employee id in API URL
        .then(response => {
          console.log(response.data);
          const projects = response.data;
          if (projects) {
            const data = projects.map(project => {
              if (project) {
                return {
                  id: project.id,
                  name: project.name,
                  status: project.status,
                  deadline: project.deadline,
                };
              } else {
                console.error('Project is undefined');
                return null;
              }
            }).filter(item => item !== null);
            setProjects(data);
          } else {
            console.error('Projects is undefined');
          }
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    } else {
      console.error('Employee ID is null');
    }
  }, []);
  const columns = [
    { field: 'id', headerName: 'Project ID', width: 150 },
    { field: 'name', headerName: 'Project Name', width: 190 },
    {
      field: 'status',
      headerName: 'Status',
      width: 170,
      renderCell: (params) => (
        <div>
          {params.value}
          <IconButton size="small" color="primary" onClick={() => handleEdit(params.row.id, params.value)}>
            <EditIcon />
          </IconButton>
        </div>
      ),
    },
    { field: 'deadline', headerName: 'Deadline', width: 170 },
    {
      field: 'details',
      headerName: 'Details',
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          component={Link}
          to={`/catalog/${params.row.id}`}
        >
          View Details
        </Button>
      ),
    },
    {
      field: 'graph',
      headerName: 'Graph',
      width: 170,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleShowGraph(params.row.id)}
        >
          Show Graph
        </Button>
      ),
    },
    {
      field: 'fiveQAssess',
      headerName: 'FiveQ Assess',
      width: 190,
      // Add any other properties you need for this column
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleUpdate(params.row.id)}
        >
          Update
        </Button>
      ),
    },
  ];

  const handleEdit = (id, currentStatus) => {
    setEditingId(id);
    setStatus(currentStatus);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log(`Update status of project with id ${editingId} to ${status}`);
    const url = process.env.REACT_APP_API_URL + `/projects/project/${editingId}/update-status/`;
    axios.put(url, { status })
      .then(response => {
        console.log(response.data);
        setMessage('Updated successfully'); // Set the message
      })
      .catch(error => {
        console.error('There was an error!', error);
        setMessage('There was an error!'); // Set the message
      });
    setOpen(false);
  };
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleShowGraph = (id) => {
    navigate(`/bar/${id}`);
  };
  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          position: 'absolute',
          marginTop: '-100px',
          marginLeft: '90px',
          fontSize: '40px',
          color: colors.greenAccent[500],
          // textDecoration: `underline ${colors.blueAccent[500]}`,
        }}
      >
        Project Overview
      </Typography>
      <Box style={{position: 'relative', height: 400, width: '90%', marginLeft: '6%', backgroundColor: colors.primary[400], borderRadius: '5px', color: `${colors.greenAccent[200]} !important` }}>

        <DataGrid rows={projects} columns={columns} pageSize={5} />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Status</DialogTitle>
          <DialogContent>
            <Select value={status} onChange={handleChange}>
              <MenuItem value={'Not Started'}>Not Started</MenuItem>
              <MenuItem value={'In Progress'}>In Progress</MenuItem>
              <MenuItem value={'Completed'}>Completed</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default ProjectPulse;
