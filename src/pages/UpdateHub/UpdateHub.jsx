import React, { useState, useEffect } from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, Button, Paper, Select, MenuItem, InputLabel, useTheme } from '@mui/material';
import { tokens } from '../../Theme';
import Header from '../../components/Header/Header.jsx';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateHub = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { id } = useParams();
    const [answers, setAnswers] = useState({
        question1: null,
        question2: null,
        question3: null,
        question4: null,
        question5: null,
        // Add more questions as needed
    });
    const [allAnswered, setAllAnswered] = useState(false);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const employeeId = localStorage.getItem('cususerid');  // Fetch employee id from local storage
        if (employeeId) {
            const url = process.env.REACT_APP_API_URL + `/projects/employee/${employeeId}/`;  // API URL
            axios.get(url)  // Use employee id in API URL
                .then(response => {
                    setProjects(response.data);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        } else {
            console.error('Employee ID is null');
        }
    }, []);


    const handleChange = (event) => {
        const value = event.target.name === 'project' ? event.target.value : event.target.value === 'yes' ? true : false;
        if (event.target.name === 'project') {
            setSelectedProject(value);
        } else {
            setAnswers({
                ...answers,
                [event.target.name]: value,
            });
        }
    };

    const handleSubmit = () => {
        // Send answers to backend
        const employeeId = localStorage.getItem('cususerid');  // Fetch employee id from local storage
        if (employeeId) {
            const url = process.env.REACT_APP_API_URL + `/projects/employeeanswer/`;
            const data = {
                ...answers,
                employee: employeeId,  // Include employee id in the data
                project: id,
            };

            console.log('Data sent to the server:', data);
            axios.post(url, data)  // Send data to the backend
                .then(response => {
                    console.log('Answers sent successfully');
                    setIsSubmitted(true);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    console.log('Error message:', error.message);
                    if (error.response) {
                        console.log('Server response:', error.response.data);
                    }
                });
        }

    };

    return (
        <Box style={{ width: '90%', marginTop: '-140px' }}>
            <Header title="FiveQ Assess" variant="h1" style={{ fontSize: '5em', fontWeight: 'bold', color: colors.greenAccent[500] }} />


            <FormControl component="fieldset" style={{ width: '100%' }}>
                <Paper elevation={3} style={{ padding: '10px', marginBottom: '10px', width: '100%', backgroundColor: colors.gray[100] }}>
                    <Typography variant="h6" style={{ color: colors.greenAccent[500] }}>Have you completed all assigned tasks ?</Typography>
                    <RadioGroup name="question1" value={answers.question1 === null ? '' : answers.question1 ? 'yes' : 'no'} onChange={handleChange}>
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" style={{ color: '#fff' }} />
                        <FormControlLabel value="no" control={<Radio />} label="No" style={{ color: '#fff' }} />
                    </RadioGroup>
                </Paper>


                <Paper elevation={3} style={{ padding: '10px', marginBottom: '10px', width: '100%', backgroundColor: colors.gray[100] }}>
                    <Typography variant="h6" style={{ color: colors.greenAccent[500] }}>Are you confident in your ability to meet project deadlines?</Typography>
                    <RadioGroup name="question2" value={answers.question2 === null ? '' : answers.question2 ? 'yes' : 'no'} onChange={handleChange}>
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" style={{ color: '#fff' }} />
                        <FormControlLabel value="no" control={<Radio />} label="No" style={{ color: '#fff' }} />
                    </RadioGroup>
                </Paper>


                <Paper elevation={3} style={{ padding: '10px', marginBottom: '10px', width: '100%', backgroundColor: colors.gray[100] }}>
                    <Typography variant="h6" style={{ color: colors.greenAccent[500] }}>Have you actively participated in project meetings and discussions?</Typography>
                    <RadioGroup name="question3" value={answers.question3 === null ? '' : answers.question3 ? 'yes' : 'no'} onChange={handleChange}>
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" style={{ color: '#fff' }} />
                        <FormControlLabel value="no" control={<Radio />} label="No" style={{ color: '#fff' }} />
                    </RadioGroup>
                </Paper>


                <Paper elevation={3} style={{ padding: '10px', marginBottom: '10px', width: '100%', backgroundColor: colors.gray[100] }}>
                    <Typography variant="h6" style={{ color: colors.greenAccent[500] }}>Have you adhered to project guidelines and standards in your work?</Typography>
                    <RadioGroup name="question4" value={answers.question4 === null ? '' : answers.question4 ? 'yes' : 'no'} onChange={handleChange}>
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" style={{ color: '#fff' }} />
                        <FormControlLabel value="no" control={<Radio />} label="No" style={{ color: '#fff' }} />
                    </RadioGroup>
                </Paper>


                <Paper elevation={3} style={{ padding: '10px', marginBottom: '10px', width: '100%', backgroundColor: colors.gray[100] }}>
                    <Typography variant="h6" style={{ color: colors.greenAccent[500] }}>Are you satisfied with the level of support and resources provided for the project?</Typography>
                    <RadioGroup name="question5" value={answers.question5 === null ? '' : answers.question5 ? 'yes' : 'no'} onChange={handleChange}>
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" style={{ color: '#fff' }} />
                        <FormControlLabel value="no" control={<Radio />} label="No" style={{ color: '#fff' }} />
                    </RadioGroup>
                </Paper>

                {/* Repeat for other questions */}

                <Button variant="contained" style={{ backgroundColor: allAnswered ? colors.greenAccentAccent[500] : colors.greenAccent[300], width: '20%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} onClick={handleSubmit}>
                    Submit
                </Button>
            </FormControl>
            <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: '20px',paddingLeft:'42%' }}>
                {isSubmitted && <Typography variant="h6">Submitted successfully</Typography>}
            </Box>
        </Box>
    );
};

export default UpdateHub;