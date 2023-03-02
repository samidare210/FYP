import React from "react";
import { makeStyles } from '@mui/material/styles'

// Mui
import * as Mui from "@mui/material";
import { Grid, Paper, Avatar, TextField, Button } from '@mui/material';
import { Typography } from '@mui/material';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Divider } from '@mui/material';
import { Fab } from '@mui/material';

// Icons
import SendIcon from '@mui/icons-material/Send';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    chatSection: {
      width: '100%',
      height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
      height: '70vh',
      overflowY: 'auto'
    }
  });


  const Chatbox = () => {
    const classes = useStyles();
  
    return (
        <Mui.Box sx={{ display: 'inline-flex', flexDirection: 'column' }} spacing={2}>
            </Mui.Box>
    );
    };

export default Chatbox;

