import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme, Typography } from "@mui/material";
import { styled } from '@mui/system';
import { tokens } from "../../Theme";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StyledDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-cell': {
    fontSize: '1.2em',
  },
  '& .MuiDataGrid-columnHeaderLabel': {
    fontSize: '1.2em',
  },
});
const ProjectCatalog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const { id } = useParams();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + `/projects/project/${id}/employees/`);
        console.log(response.data);
        const data = response.data.map(item => {
          const employee = item.employee;
          if (employee.id == null) {
            console.log('Employee without id: ', employee);
          }
          return {
            id: employee.id,
            name: employee.name,
            email: employee.email,
            phone: employee.phone_number,
            address: employee.address,
          };
        });
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
    <>
      <Typography variant="h1" style={{ marginTop: '-120px', position: 'absolute', paddingLeft: '135px', color: colors.greenAccent[500] }}>Team Details</Typography>
      <div style={{ height: '400px', position: 'relative',marginTop: '-35px', width: '80%', marginLeft: '130px', backgroundColor: colors.primary[400], color: `${colors.greenAccent[200]} !important` }}>
      <StyledDataGrid 
          rows={rows} 
          columns={columns} 
          pageSize={5} 
        />
      </div>
    </>
  );
};

export default ProjectCatalog;