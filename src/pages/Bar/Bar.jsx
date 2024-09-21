import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import * as d3 from 'd3';
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from '@mui/material';
import { tokens } from '../../Theme';
import axios from 'axios';

const useStyles = makeStyles((theme) => {


    const colors = tokens(theme.palette.mode); // generate colors using tokens function

    return {
        root: {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: '80vh',
            backgroundColor: colors.primary[500], // Set background color to primary color from theme
        },
        chartContainer: {
            display: 'inline-block',
            width: '70%',
        },
        indicators: {
            position: 'absolute',
            top: '350px',
            right: '60px',
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            fontWeight: 'bold',
        },
    };
});


const BarChartPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { projectId } = useParams();
    const classes = useStyles();
    const [data, setData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        console.log("Project ID: ", projectId);
        axios.get(process.env.REACT_APP_API_URL + `projects/project/${id}/marks/`)
            .then(response => {
                const markData = response.data;
                return axios.get(process.env.REACT_APP_API_URL + `projects/project/${id}/employees/`)
                    .then(response => {
                        const employeeData = response.data;
                        const transformedData = markData.map(item => {
                            const employee = employeeData.find(emp => emp.employee.id === item.employee);
                            return {
                                name: employee ? employee.employee.name : `Employee ${item.employee}`,
                                value: item.mark,
                            };
                        });
                        setData(transformedData);
                    });
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [id, projectId]);


    useEffect(() => {
        if (data.length > 0) {
            d3.select("#barChart").selectAll("*").remove(); // Add this line
            const margin = { top: 20, right: 20, bottom: 50, left: 250 };
            const width = 790 - margin.left - margin.right;
            const height = 500 - margin.top - margin.bottom;

            const x = d3.scaleBand()
                .domain(data.map(d => d.name))
                .range([0, width])
                .padding(0.1);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.value)])
                .range([height, 0]);

            const svg = d3.select("#barChart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

                svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", d => x(d.name))
                .attr("width", x.bandwidth())
                .attr("y", d => y(d.value))
                .attr("height", d => height - y(d.value))
                .attr("fill", function(d) {  // fill each bar with a color based on its y-value
                    if (d.value === 5) return 'gold';
                    else if (d.value === 4) return 'silver';
                    else if (d.value === 3) return 'white';
                    else if (d.value === 2) return 'green';
                    else if (d.value === 1) return 'red';
                    else return 'black';  // default color
                });

            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            svg.append("g")
                .call(d3.axisLeft(y));
        }
    }, [data]);

    return (
        <div className={classes.root}>
            <Typography
                variant="h4"
                align="left"
                position="absolute"
                gutterBottom
                style={{ color: colors.greenAccent[500], marginLeft: '-730px', marginTop: '-115px', fontWeight: 'bold', fontSize: '40px'}}
            >
                Response Analytics Chart
            </Typography>
            <div id="barChart" className={classes.chartContainer} style={{ marginLeft: '-330px', marginBottom: '20px',marginTop:'55px' }} />
            <div className={classes.indicators} style={{ marginLeft: '20px' }}>
                <p><StarIcon style={{ color: 'gold' }} /> - Exceptional Performance</p>
                <p><StarIcon style={{ color: 'silver' }} /> - Very Competent</p>
                <p><StarIcon style={{ color: 'bronze' }} /> - Satisfactory Performance</p>
                <p><StarIcon style={{ color: 'green' }} /> - Adequate but Needs Work</p>
                <p><StarIcon style={{ color: 'red' }} /> - Room for Improvement</p>
            </div>
        </div>
    );
};

export default BarChartPage;