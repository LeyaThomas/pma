import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as d3 from 'd3';
import { useTheme } from '@mui/material';
import { tokens } from '../../Theme';
import axios from 'axios';

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

const getEmployeeName = async (id) => {
    const response = await axios.get('http://localhost:8000/projects/project/9/employees/');
    const employee = response.data.find(emp => emp.id === id);
    return employee ? employee.name : 'Unknown';
}
const BarChartPage = () => {
    const classes = useStyles();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/projects/employeeanswer/')
            .then(async response => {
                const transformedData = await Promise.all(response.data.map(async item => ({
                    name: await getEmployeeName(item.employee),
                    value: item.mark,
                })));
                setData(transformedData);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const margin = { top: 20, right: 20, bottom: 50, left: 50 };
            const width = 500 - margin.left - margin.right;
            const height = 500 - margin.top - margin.bottom;

            const x = d3.scaleBand()
                .domain(data.map(d => d.name))
                .range([0, width])
                .padding(0.1);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.value)])
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
        }
    }, [data]);

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