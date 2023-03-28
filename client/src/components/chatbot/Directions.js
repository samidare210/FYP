import React, { useContext } from "react";
import { Box, List, ListItem, ListItemText, Typography, Button, Divider } from "@mui/material";
import Step from "./Step";

import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

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
                <Step direction={direction} />
              </ListItemText>
            </ListItem>
            <Divider component="li" />
          </>
        ))}
      </List>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button 
          variant="contained" 
          startIcon={<PlayCircleFilledIcon />}
          onClick={handleNextStep}
        >
          Start Guiding
        </Button>
      </Box>
    </Box>
  );
};

export default Directions;
