import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as d3 from 'd3';
import { useTheme } from '@mui/material';
import { tokens } from '../../Theme';

const useStyles = makeStyles((theme) => {
    const colors = tokens(theme.palette.mode); // generate colors using tokens function
  
    
    return {
        root: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: '80vh',
          backgroundColor: colors.primary[500], // Set background color to primary color from theme
        },
        paper: {
          width: '60%',
          marginTop: theme.spacing(-16), // Add some top margin
          padding: theme.spacing(2),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.primary[500], // Set background color to transparent
        },
        chartContainer: {
          height: 500,
          backgroundColor: 'transparent', // Set background color to primary[100] from theme
        },
      };
    });

const BarChartPage = () => {
  const classes = useStyles();
  

  useEffect(() => {
    const data = [
      { name: 'A', value: 10 },
      { name: 'B', value: 20 },
      { name: 'C', value: 30 },
      { name: 'D', value: 40 },
      { name: 'E', value: 50 },
    ];

    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, 100]) // Assuming the progress percentage can go up to 100
      .range([height, 0]);

    d3.select('#barChart').selectAll('svg').remove(); // Remove existing SVG

    const svg = d3.select('#barChart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.name))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', 'steelblue');

      svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('fill', '#ffffff'); // Change the color of the x-axis text

      svg.append('g')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .attr('fill', '#ffffff'); // Change the color of the y-axis text


  }, []);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h4" align="center" gutterBottom>
          
        </Typography>
        <div id="barChart" className={classes.chartContainer} />
      </Paper>
    </div>
  );
};

export default BarChartPage;