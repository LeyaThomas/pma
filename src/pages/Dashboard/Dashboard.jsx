import React from 'react';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../Theme";
import Header from "../../components/Header/Header";
import StatBox from "../../components/StatBox";
import RealTimePieChart from '../../components/pie';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import { useEffect, useState } from 'react';
import Timeline from '../../components/Timeline/Timeline';
import axios from 'axios';


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [username, setUsername] = useState('');
  const [projectCount, setProjectCount] = useState(0); // State for project count
  const [userCount, setUserCount] = useState(0); // State for user count
  const [myProjectCount, setMyProjectCount] = useState(0); // State for my project count

  useEffect(() => {
    const employeeId = localStorage.getItem("cususerid");

    // Fetch the user's data
    axios.get(process.env.REACT_APP_API_URL + `users/userdetail/${employeeId}/`)
      .then(response => setUsername(response.data.name))
      .catch(error => console.error('Error:', error));

    // Fetch the total project count
    axios.get(process.env.REACT_APP_API_URL + 'projects/projectcount/' )
      .then(response => setProjectCount(response.data.total_projects))
      .catch(error => console.error('Error:', error));

    // Fetch the total user count
    axios.get(process.env.REACT_APP_API_URL + 'users/usercount/')
      .then(response => setUserCount(response.data.total_users))
      .catch(error => console.error('Error:', error));

    // Fetch the my project count
    axios.get(process.env.REACT_APP_API_URL + `projects/projectcount/${employeeId}/`) // Use the employeeId in the API endpoint
      .then(response => {
        setMyProjectCount(response.data.user_projects_count); // Assuming the response object has a total_projects property
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const events = [
    {status: 'Finished', date: '2022-01-01', description: 'Project 1 finished', statusColor: 'green' },
    {status: 'In Progress', date: '2022-02-01', description: 'Project 2 started', statusColor: 'yellow' },
  ];


  return (
    <Box m="20px" mt="-110px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={`Heyy, ${username} 👋`} subtitle="Welcome to dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}

        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={userCount.toString()} // Display the user count
            subtitle="Users Registered"
            progress="0.50"
            increase="+21%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={projectCount.toString()} // Display the project count
            subtitle="Total Projects"
            progress="0.75"
            increase="+14%"
            icon={
              <WorkOutlineIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={myProjectCount ? myProjectCount.toString() : 'Loading...'} 
            subtitle="My Projects"
            progress="0.30"
            increase="+5%"
            icon={
              <FolderSpecialIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        


        <Box gridColumn="span 6">
        <RealTimePieChart />
      </Box>
      <Box gridColumn="span 6">
      <Timeline />
      </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;