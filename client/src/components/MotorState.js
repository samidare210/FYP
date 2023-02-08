import React from 'react';
import * as Mui from '@mui/material'

// Socket
import { socket } from "../Socket"

export default function MotorState() {

	const [motorState, setMotorState] = React.useState({
		left_hip_vel: 0,
		left_knee_vel: 0,
		left_wheel_vel: 0,
		right_hip_vel: 0,
		right_knee_vel: 0,
		right_wheel_vel: 0,
		
		left_hip_iq: 0,
		left_knee_iq: 0,
		left_wheel_iq: 0,
		right_hip_iq: 0,
		right_knee_iq: 0,
		right_wheel_iq: 0,

		left_leg_length: 0,
		right_leg_length: 0
	})

	socket.on('msg_motorStatus', (arg) => {
		setMotorState({ ...arg })
	})

	const style = {
		width: 200
	}

	return (
		<Mui.Box sx={{ display: 'inline-flex', flexDirection: 'column' }} spacing={2}>
			<Mui.Paper sx={{ display: 'inline-block', p: 2, my: 1 }} elevation={4}>
				<Mui.Stack direction='row' spacing={2}>
					<Mui.Stack sx={style}>
						<Mui.Typography variant='body2' color='text.secondary'>Left Hip Velocity</Mui.Typography>
						<Mui.Typography variant='h5'>{Math.round(motorState.left_hip_vel * 100) / 100}</Mui.Typography>
						<Mui.Typography variant='body2' color='text.secondary'>Right Hip Velocity</Mui.Typography>
						<Mui.Typography variant='h5'>{Math.round(motorState.right_hip_vel * 100) / 100}</Mui.Typography>
					</Mui.Stack>
					<Mui.Divider orientation='vertical' flexItem />
					<Mui.Stack sx={style}>
						<Mui.Typography variant='body2' color='text.secondary'>Left Knee Velocity</Mui.Typography>
						<Mui.Typography variant='h5'>{Math.round(motorState.left_knee_vel * 100) / 100}</Mui.Typography>
						<Mui.Typography variant='body2' color='text.secondary'>Right Knee Velocity</Mui.Typography>
						<Mui.Typography variant='h5'>{Math.round(motorState.right_knee_vel* 100) / 100}</Mui.Typography>
					</Mui.Stack>
					<Mui.Divider orientation='vertical' flexItem />
					<Mui.Stack sx={style}>
						<Mui.Typography variant='body2' color='text.secondary'>Left Wheel Velocity</Mui.Typography>
						<Mui.Typography variant='h5'>{Math.round(motorState.left_wheel_vel * 100) / 100}</Mui.Typography>
						<Mui.Typography variant='body2' color='text.secondary'>Right Wheel Velocity</Mui.Typography>
						<Mui.Typography variant='h5'>{Math.round(motorState.right_wheel_vel * 100) / 100}</Mui.Typography>
					</Mui.Stack>
				</Mui.Stack>
			</Mui.Paper>
			
			<Mui.Paper sx={{ display: 'inline-block', p: 2, my: 1 }} elevation={4}>
				<Mui.Stack direction='row' spacing={2}>
					<Mui.Stack sx={style}>
						<Mui.Typography variant='body2' color='text.secondary'>Left Hip IQ</Mui.Typography>
						<Mui.Typography variant='h5'>{Math.round(motorState.left_hip_iq * 100) / 100}</Mui.Typography>
						<Mui.Typography variant='body2' color='text.secondary'>Right Hip IQ</Mui.Typography>
						<Mui.Typography variant='h5'>{Math.round(motorState.right_knee_iq* 100) / 100}</Mui.Typography>
					</Mui.Stack>
					<Mui.Divider orientation='vertical' flexItem />
					<Mui.Stack sx={style}>
						<Mui.Typography variant='body2' color='text.secondary'>Left Knee IQ</Mui.Typography>
						<Mui.Typography variant='h5'>{Math.round(motorState.left_knee_iq * 100) / 100}</Mui.Typography>
						<Mui.Typography variant='body2' color='text.secondary'>Right Knee IQ</Mui.Typography>
						<Mui.Typography variant='h5'>{Math.round(motorState.right_knee_iq * 100) / 100}</Mui.Typography>
					</Mui.Stack>
					<Mui.Divider orientation='vertical' flexItem />
					<Mui.Stack sx={style}>
						<Mui.Typography variant='body2' color='text.secondary'>Left Wheel IQ</Mui.Typography>
						<Mui.Typography variant='h5'>{Math.round(motorState.left_wheel_iq * 100) / 100}</Mui.Typography>
						<Mui.Typography variant='body2' color='text.secondary'>Right Wheel IQ</Mui.Typography>
						<Mui.Typography variant='h5'>{Math.round(motorState.right_wheel_iq * 100) / 100}</Mui.Typography>
					</Mui.Stack>
				</Mui.Stack>
			</Mui.Paper>

			<Mui.Paper sx={{ display: 'inline-block', p: 2, my: 1 }} elevation={4}>
				<Mui.Stack direction='row' spacing={2}>
					<Mui.Stack sx={style}>
						<Mui.Typography variant='body2' color='text.secondary'>Left Leg Length</Mui.Typography>
						<Mui.Typography variant='h5'>{Math.round(motorState.left_leg_length * 100) / 100}</Mui.Typography>
						<Mui.Typography variant='body2' color='text.secondary'>Right Leg Length </Mui.Typography>
						<Mui.Typography variant='h5'>{Math.round(motorState.right_leg_length * 100) / 100}</Mui.Typography>
					</Mui.Stack>
				</Mui.Stack>
			</Mui.Paper>
		</Mui.Box>
	)
}