import React, { useContext } from "react";
import { Box, List, ListItem, ListItemText, Typography, Button, Divider } from "@mui/material";
import Step from "./Step";

import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import CancelIcon from '@mui/icons-material/Cancel';

import { ChatBotContext } from './ChatBotCompo';

const Directions = ({ triggerNextStep }) => {

  const { directions } = useContext(ChatBotContext);

  const handleNextStep = () => {
    triggerNextStep();
  }

  return (
    <Box style={{ width: '100%' }}>
      <Typography variant="h6">Directions:</Typography>
      <List>
        {directions.map((direction, index) => (
          <>
            <ListItem key={index}>
              <ListItemText>
                <Step step={direction.step} desc={direction.desc} />
              </ListItemText>
            </ListItem>
            <Divider component="li" />
          </>
        ))}
      </List>
      <Button 
        variant="contained" 
        startIcon={<PlayCircleFilledIcon />}
        onClick={handleNextStep}
      >
        Start Guiding
      </Button>
      {/* <Button 
        variant="outlined" 
        startIcon={<CancelIcon />}
      >
        Cancel
      </Button> */}
    </Box>
  );
};

export default Directions;