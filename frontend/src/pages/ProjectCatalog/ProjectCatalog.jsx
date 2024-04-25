import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from "@mui/material";
import { tokens } from "../../Theme";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProjectCatalog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/projects/project/${id}/employees/`);
        console.log(response.data);
        const data = response.data.map(item => ({
          id: item.id,
          name: item.name,
          email: item.email,
          phone: item.phone_number,
          address: item.address,
        }));
        setRows(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [id]);

  const columns = [
    { field: 'id', headerName: 'Employee Id', width: 150 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phone', headerName: 'Phone Number', width: 200 },
    { field: 'address', headerName: 'Address', width: 300 },
  ];

  return (
    <div style={{ height: '500px', width: '80%', marginLeft: '130px', backgroundColor: colors.primary[400], color: `${colors.greenAccent[200]} !important` }}>
      <DataGrid 
        rows={rows} 
        columns={columns} 
        pageSize={5} 
      />
    </div>
  );
};

export default ProjectCatalog;
