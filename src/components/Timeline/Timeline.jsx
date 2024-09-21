import React, { useEffect, useState } from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import { tokens } from '../../Theme';
import axios from 'axios';

const Timeline = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const [data, setData] = useState([]);

    useEffect(() => {
        const employeeId = localStorage.getItem('cususerid'); // Fetch the employee id from the local storage

        
        axios.get(process.env.REACT_APP_API_URL + `projects/employee/${employeeId}/projects/deadlines/`) // Use the employee id in the API call
            .then(response => {
                const timelineData = response.data.map(item => ({
                    period: item.project.deadline,
                    title: item.project.name,
                    content: item.project.status,
                }));
                setData(timelineData);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);
    return (
        <>

            <Box
                sx={{
                    backgroundColor: colors.primary[400],
                    width: '100%',
                    height: '350px',
                    padding: '29px',
                    paddingTop: '80px',
                    position: 'relative',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    top: '10px',
                    left: '-5px',

                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: '50%',
                        borderTop: '5px solid',
                        borderColor: colors.greenAccent[500],
                    },
                    '& .timeline-content': {
                        maxWidth: '150px',
                        height: '100px',
                        padding: '10px',
                        alignSelf: 'flex-start',
                        background: colors.blueAccent[500],
                        position: 'relative',
                        color: "white",
                        borderRadius: '10px',
                        marginRight: '10px',
                        boxShadow: '0px 0px 2px 2px rgba(0,0,0, 0.2)',
                        '&:nth-of-type(even)': {
                            alignSelf: 'flex-end',
                            marginLeft: '10px',
                            '& .timeline-period': {
                                bottom: 'calc(100% + 25px)',
                                top: 'auto',
                            },
                            '& .timeline-title': {
                                top: 'calc(100% + 55px)',
                                bottom: 'auto',
                            },
                        },
                    },
                    '& .timeline-period': {
                        position: 'absolute',
                        top: 'calc(100% + 25px)',
                        background: colors.greenAccent[500],
                        padding: '10px',
                        width: '100px',
                        textAlign: 'center',
                        borderRadius: '10px',
                        left: 'calc(50% - 50px)',
                        boxShadow: '0px 0px 2px 2px rgba(0,0,0, 0.2)',
                    },
                    '& .timeline-title': {
                        marginBottom: '5px',
                        top: 'calc(100% + 15px)',
                        fontSize: '1.5em',
                        fontWeight: 'bold',
                    },
                }}
            >
                <Typography variant="h4" component="h2" gutterBottom sx={{position:"absolute", textAlign: 'left', marginLeft: '22px', marginTop: '-60px', fontSize:'25px' , color: colors.greenAccent[300]}}>
                    Deadline Tracker
                </Typography>
                {data.map((d, i) => (
                    <div className="timeline-content" key={i}>
                        <div className="timeline-period">{d.period}</div>
                        <div className="timeline-title">{d.title}</div>
                        {d.content}

                    </div>
                ))}
            </Box>
        </>
    );
};

export default Timeline;