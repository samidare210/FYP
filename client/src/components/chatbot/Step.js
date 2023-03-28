import React from "react";
import { Box, Typography, ListItemText } from "@mui/material";
import { makeStyles } from "@mui/styles";

import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StraightIcon from '@mui/icons-material/Straight';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import TurnRightIcon from '@mui/icons-material/TurnRight';
import TurnSlightLeftIcon from '@mui/icons-material/TurnSlightLeft';
import TurnSlightRightIcon from '@mui/icons-material/TurnSlightRight';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const Step = ({ direction }) => {

  const stepContainer = {
    display: "flex",
    alignItems: "center",
    // background: "#f0f0f0",
    // borderRadius: 1,
    padding: "4px 0",
    width: "100%",
  }

  const icon = {
    display: "flex",
    alignItems: "center",
    fontSize: 36,
    color: "#757575",
    mr: 2
  }

  const getIcon = () => {
    switch (direction.step) {
      case "start":
        return < MyLocationIcon sx={icon} />
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
        primary={direction.prim}
        secondary={direction.secd}
      />
    </Box>
  );
};

export default Step;