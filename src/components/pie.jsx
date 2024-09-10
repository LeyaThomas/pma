import React, { useEffect, useState, useRef } from 'react';
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from '../Theme';
import * as d3 from 'd3';
import axios from 'axios';

const RealTimePieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const ref = useRef();

  useEffect(() => {
    const employeeId = localStorage.getItem('cususerid'); // Get the employee ID from local storage
    if (employeeId) {
      
      axios.get(process.env.REACT_APP_API_URL + `/projects/employee-projects/${employeeId}/`  )
        .then(response => {
          const projects = response.data;
          projects.sort((a, b) => {
            if (a.status === 'Not Started' && b.status !== 'Not Started') return -1;
            if (a.status === 'In Progress' && b.status === 'Completed') return -1;
            if (b.status === 'Not Started' && a.status !== 'Not Started') return 1;
            if (b.status === 'In Progress' && a.status === 'Completed') return 1;
            return 0;
          });
          const pieChartData = projects.map(project => ({
            id: project.id,
            name: project.name,
            status: project.status
          }));
          setData(pieChartData);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    } else {
      console.error('Employee ID is not set in local storage');
    }
  }, []);
  useEffect(() => {
    if (data.length === 0) return;

    const width = 500;
    const height = 350;
    const radius = Math.min(width, height) / 2;

    d3.select(ref.current).selectAll("svg").remove(); // Clear the SVG

    const svg = d3.select(ref.current)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '90%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${(width / 2) - 50}, ${height / 2})`); // Move 50 units to the left

    const color = d3.scaleOrdinal()
      .domain(['Completed', 'In Progress', 'Not Started'])
      .range([colors.greenAccent[500], "white", colors.blueAccent[500]]);

    const pie = d3.pie().value(d => d.status === 'Finished' ? 1 : 0.5);
    const path = d3.arc().outerRadius(radius - 10).innerRadius(0);

    const g = svg.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc');

    // Create tooltip
    const tooltip = d3.select(ref.current)
      .append('div')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background', 'lightgrey')
      .style('border-radius', '5px')
      .style('padding', '10px')
      .style('color', 'black');

    // Add tooltip to slices
    g.append('path')
      .attr('d', path)
      .style('fill', d => color(d.data.status))
      .on('mouseover', (event, d) => {
        tooltip.style('visibility', 'visible');
        tooltip.text(`Project: ${d.data.name}, Status: ${d.data.status}`);
      })
      .on('mousemove', (event) => {
        tooltip.style('top', (event.pageY - 10) + 'px')
          .style('left', (event.pageX + 10) + 'px');
      })
      .on('mouseout', () => tooltip.style('visibility', 'hidden'));


    // Add legend
    const legend = svg.selectAll('.legend')
      .data(color.domain())
      .enter().append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(0,${i * 20})`);

    legend.append('rect')
      .attr('x', width - 18 - 270)
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', color);

    legend.append('text')
      .attr('x', width - 24 - 150)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'end')
      .style('fill', 'white')
      .text(d => d);
  }, [data]);

  return (
    <Box
      width="680px"
      height="350px"
      marginTop="10px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      backgroundColor={colors.primary[400]}
      ref={ref}
    >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          textAlign: 'left',
          color: colors.greenAccent[300],
          marginLeft: '-300px',
          marginTop: '20px',
          fontSize: '25px'
        }}
      >
        Performance Analysis Pie
      </Typography>
    </Box>
  );
};

export default RealTimePieChart;