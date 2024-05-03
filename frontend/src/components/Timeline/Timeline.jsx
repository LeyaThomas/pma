import React from 'react';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../Theme';

const Timeline = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)

  // Mock data
  const mockData = [
    { period: '1998 - 2000', title: 'Title' },
    { period: '2000 - 2002', title: 'Title' },
    { period: '2002 - 2004', title: 'Title' },
    { period: '2004 - 2006', title: 'Title' },
    { period: '2006 - 2008', title: 'Title' },
  ];

  return (
    <Box
      sx={{
        backgroundColor: colors.primary[400],
        width: '100%',
        height: '350px',
        padding: '45px',
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
          borderColor: colors.blueAccent[500],
        },
        '& .timeline-content': {
          maxWidth: '150px',
          height: '100px',
          padding: '10px',
          alignSelf: 'flex-start',
          background: colors.greenAccent[500],
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
          background: colors.blueAccent[500],
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
      {mockData.map((d, i) => (
        <div className="timeline-content" key={i}>
          <div className="timeline-period">{d.period}</div>
          <div className="timeline-title">{d.title}</div>
          Lorem ipsum dolor sit.
          
        </div>
      ))}
    </Box>
  );
};

export default Timeline;