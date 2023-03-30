import React, { useContext } from "react";
import { Box, List, ListItem, ListItemText, Typography, Button, Divider } from "@mui/material";
import Step from "./Step";

import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { ChatBotContext } from './ChatBotCompo';

const Directions = ({ triggerNextStep }) => {

  const { directions } = useContext(ChatBotContext);

  const handleNextStep = () => {
    triggerNextStep();
  }

  return (
    <Box style={{ width: '100%' }}>
      <Typography sx={{ fontSize: '24px' }}>Directions:</Typography>
      <List>
          <Divider component="li" />
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
          startIcon={
            <PlayArrowIcon />
          }
          onClick={handleNextStep}
          sx={{
            fontSize: '20px',
            textTransform: 'capitalize',
            backgroundColor: '#e53935',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#ff5252',
            },
          }}
        >
          Start Guiding
        </Button>
      </Box>
    </Box>
  );
};

export default Directions;
