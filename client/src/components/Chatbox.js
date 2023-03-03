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

  const style = {
		width: 200
	}

  const Chatbox = () => {
    const classes = useStyles();
  
    return (
      <Mui.Box sx={{ display: 'inline-flex', flexDirection: 'column' }} spacing={2}>
			<Mui.Paper sx={{ display: 'inline-block', p: 2, my: 1 }} elevation={4}>
				<Mui.Stack direction='row' spacing={2}>
					<Mui.Stack sx={style}>
						{/* <Mui.Typography variant='body2' color='text.secondary'>Left Hip IQ</Mui.Typography>
						<Mui.Typography variant='h5'>{ motorState.left_hip_iq }</Mui.Typography>
						<Mui.Typography variant='body2' color='text.secondary'>Right Hip IQ</Mui.Typography>
						<Mui.Typography variant='h5'>{ motorState.right_knee_iq }</Mui.Typography> */}
					</Mui.Stack>
					<Mui.Divider orientation='vertical' flexItem />
					<Mui.Stack sx={style}>
						{/* <Mui.Typography variant='body2' color='text.secondary'>Left Knee IQ</Mui.Typography>
						<Mui.Typography variant='h5'>{ motorState.left_knee_iq }</Mui.Typography>
						<Mui.Typography variant='body2' color='text.secondary'>Right Knee IQ</Mui.Typography>
						<Mui.Typography variant='h5'>{ motorState.right_knee_iq }</Mui.Typography> */}
					</Mui.Stack>
					<Mui.Divider orientation='vertical' flexItem />
					<Mui.Stack sx={style}>
						{/* <Mui.Typography variant='body2' color='text.secondary'>Left Wheel IQ</Mui.Typography>
						<Mui.Typography variant='h5'>{ motorState.left_wheel_iq }</Mui.Typography>
						<Mui.Typography variant='body2' color='text.secondary'>Right Wheel IQ</Mui.Typography>
						<Mui.Typography variant='h5'>{ motorState.right_wheel_iq }</Mui.Typography> */}
					</Mui.Stack>
				</Mui.Stack>
			</Mui.Paper>

			<Mui.Paper sx={{ display: 'inline-block', p: 2, my: 1 }} elevation={4}>
				<Mui.Stack direction='row' spacing={2}>
					<Mui.Stack sx={style}>
						{/* <Mui.Typography variant='body2' color='text.secondary'>Left Leg Length</Mui.Typography>
						<Mui.Typography variant='h5'>{ motorState.left_leg_length }</Mui.Typography>
						<Mui.Typography variant='body2' color='text.secondary'>Right Leg Length </Mui.Typography>
						<Mui.Typography variant='h5'>{ motorState.right_leg_length }</Mui.Typography> */}
					</Mui.Stack>
				</Mui.Stack>
			</Mui.Paper>
		</Mui.Box>
    );
    };

export default Chatbox;

