import React from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StraightIcon from '@mui/icons-material/Straight';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import TurnRightIcon from '@mui/icons-material/TurnRight';
import TurnSlightLeftIcon from '@mui/icons-material/TurnSlightLeft';
import TurnSlightRightIcon from '@mui/icons-material/TurnSlightRight';

const Step = ({ step, desc }) => {

  const stepContainer = {
    display: "flex",
    alignItems: "center",
    // background: "#f0f0f0",
    // borderRadius: 1,
    // padding: "12px 16px",
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
    switch (step) {
      case "curr": // Current Location
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
      default:
        return <LocationOnIcon sx={icon} />;
    }
  };

  return (
    <Box sx={stepContainer}>
      {getIcon()}
      <Typography>{desc}</Typography>
    </Box>
  );
};

export default Step;