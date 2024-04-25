import React, { useState } from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, Button, Paper, useTheme } from '@material-ui/core';
import { tokens } from '../../Theme';
import Header from '../../components/Header/Header.jsx';

const UpdateHub = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [answers, setAnswers] = useState({
        question1: '',
        question2: '',
        question3: '',
        question4: '',
        question5: '',
        // Add more questions as needed
    });
    const [allAnswered, setAllAnswered] = useState(false);

    const handleChange = (event) => {
        setAnswers({ ...answers, [event.target.name]: event.target.value });
        const allQuestionsAnswered = Object.values(answers).every(answer => answer !== '');
        setAllAnswered(allQuestionsAnswered);
    };

    const handleSubmit = () => {
        // Send answers to backend
        console.log(answers);
    };

    return (
        <Box style={{ width: '90%', marginTop: '-140px' }}>
            <Header title="Updates Hub" variant="h1" style={{ fontSize: '5em', fontWeight: 'bold' }} />


            <FormControl component="fieldset" style={{ width: '100%' }}>
                <Paper elevation={3} style={{ padding: '10px', marginBottom: '10px', width: '100%', backgroundColor: colors.gray[100] }}>
                    <Typography variant="h6" style={{ color: colors.greenAccent[500] }}>Question 1</Typography>
                    <RadioGroup name="question1" value={answers.question1} onChange={handleChange}>
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" style={{ color: '#fff' }} />
                        <FormControlLabel value="no" control={<Radio />} label="No" style={{ color: '#fff' }} />
                    </RadioGroup>
                </Paper>


                <Paper elevation={3} style={{ padding: '10px', marginBottom: '10px', width: '100%', backgroundColor: colors.gray[100] }}>
                    <Typography variant="h6" style={{ color: colors.greenAccent[500] }}>Question 2</Typography>
                    <RadioGroup name="question2" value={answers.question2} onChange={handleChange}>
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" style={{ color: '#fff' }} />
                        <FormControlLabel value="no" control={<Radio />} label="No" style={{ color: '#fff' }} />
                    </RadioGroup>
                </Paper>


                <Paper elevation={3} style={{ padding: '10px', marginBottom: '10px', width: '100%', backgroundColor: colors.gray[100] }}>
                    <Typography variant="h6" style={{ color: colors.greenAccent[500] }}>Question 3</Typography>
                    <RadioGroup name="question3" value={answers.question3} onChange={handleChange}>
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" style={{ color: '#fff' }} />
                        <FormControlLabel value="no" control={<Radio />} label="No" style={{ color: '#fff' }} />
                    </RadioGroup>
                </Paper>


                <Paper elevation={3} style={{ padding: '10px', marginBottom: '10px', width: '100%', backgroundColor: colors.gray[100] }}>
                    <Typography variant="h6" style={{ color: colors.greenAccent[500] }}>Question 4</Typography>
                    <RadioGroup name="question4" value={answers.question4} onChange={handleChange}>
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" style={{ color: '#fff' }} />
                        <FormControlLabel value="no" control={<Radio />} label="No" style={{ color: '#fff' }} />
                    </RadioGroup>
                </Paper>


                <Paper elevation={3} style={{ padding: '10px', marginBottom: '10px', width: '100%', backgroundColor: colors.gray[100] }}>
                    <Typography variant="h6" style={{ color: colors.greenAccent[500] }}>Question 5</Typography>
                    <RadioGroup name="question5" value={answers.question5} onChange={handleChange}>
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" style={{ color: '#fff' }} />
                        <FormControlLabel value="no" control={<Radio />} label="No" style={{ color: '#fff' }} />
                    </RadioGroup>
                </Paper>

                {/* Repeat for other questions */}

                <Button variant="contained" style={{ backgroundColor: allAnswered ? colors.greenAccentAccent[500] : colors.greenAccent[300], width: '20%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} onClick={handleSubmit}>
                    Submit
                </Button>
            </FormControl>
        </Box>
    );
};

export default UpdateHub;
