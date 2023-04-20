import React from "react";
import { Box, Typography, ListItemText } from "@mui/material";

import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StraightIcon from '@mui/icons-material/Straight';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import TurnRightIcon from '@mui/icons-material/TurnRight';
import TurnSlightLeftIcon from '@mui/icons-material/TurnSlightLeft';
import TurnSlightRightIcon from '@mui/icons-material/TurnSlightRight';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';

const Step = ({ direction }) => {

  const stepContainer = {
    display: "flex",
    alignItems: "center",
    padding: "4px 0",
    width: "100%",
  }

  const icon = {
    display: "flex",
    alignItems: "center",
    fontSize: "60px",
    color: "#757575",
    mr: 2
  }

  const getIcon = () => {
    switch (direction.step) {
      case "start":
        return <MyLocationIcon sx={icon} />;
      case "straight": 
        return <StraightIcon sx={icon} />;
      case "turn left":
        return <TurnLeftIcon sx={icon} />;
      case "turn right":
        return <TurnRightIcon sx={icon} />;
      case "slight left":
        return <TurnSlightLeftIcon sx={icon} />;
      case "slight right":
        return <TurnSlightRightIcon sx={icon} />;
      case "end":
        return <LocationOnIcon sx={icon} />;
      default:
        return <QuestionMarkIcon sx={icon} />;
    }
  };

  return (
    <Box sx={stepContainer}>
      {getIcon()}
      <ListItemText
        primary={
          <Typography variant="body1" sx={{ fontSize: '20px' }}>
            {direction.prim}
          </Typography>
        }
        secondary={
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              fontSize: '16px', 
              display: 'flex',
              alignItems: 'center'
            }}
          >
            
            {direction.step == 'end' ? direction.secd : (<><DirectionsWalkIcon /> {'— '}{direction.secd}{'m.'}</>)}
          </Typography>
        }
      />
    </Box>
  );
};

export default Step;