import React from 'react';
import * as Mui from '@mui/material'

import io from 'socket.io-client'
const host = '192.168.1.106'
const port = '3001'
const socket = io.connect(`http://${host}:${port}`)

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

	socket.on('msg_test', (arg) => {
		setMotorState({
			...arg, 
			left_hip_vel: arg.left_hip_vel.toFixed(2),
			left_knee_vel: arg.left_knee_vel.toFixed(2),
			left_wheel_vel: arg.left_wheel_vel.toFixed(2),
			right_hip_vel: arg.right_hip_vel.toFixed(2),
			right_knee_vel: arg.right_knee_vel.toFixed(2),
			right_wheel_vel: arg.right_wheel_vel.toFixed(2)
		})
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
						<Mui.Typography variant='h5'>{motorState.left_hip_vel}</Mui.Typography>
						<Mui.Typography variant='body2' color='text.secondary'>Right Hip Velocity</Mui.Typography>
						<Mui.Typography variant='h5'>{motorState.right_hip_vel}</Mui.Typography>
					</Mui.Stack>
					<Mui.Divider orientation='vertical' flexItem />
					<Mui.Stack sx={style}>
						<Mui.Typography variant='body2' color='text.secondary'>Left Knee Velocity</Mui.Typography>
						<Mui.Typography variant='h5'>{motorState.left_knee_vel}</Mui.Typography>
						<Mui.Typography variant='body2' color='text.secondary'>Right Knee Velocity</Mui.Typography>
						<Mui.Typography variant='h5'>{motorState.right_knee_vel}</Mui.Typography>
					</Mui.Stack>
					<Mui.Divider orientation='vertical' flexItem />
					<Mui.Stack sx={style}>
						<Mui.Typography variant='body2' color='text.secondary'>Left Wheel Velocity</Mui.Typography>
						<Mui.Typography variant='h5'>{motorState.left_wheel_vel}</Mui.Typography>
						<Mui.Typography variant='body2' color='text.secondary'>Right Wheel Velocity</Mui.Typography>
						<Mui.Typography variant='h5'>{motorState.right_wheel_vel}</Mui.Typography>
					</Mui.Stack>
				</Mui.Stack>
			</Mui.Paper>
			
			<Mui.Paper sx={{ display: 'inline-block', p: 2, my: 1 }} elevation={4}>
				<Mui.Stack direction='row' spacing={2}>
					<Mui.Stack sx={style}>
						<Mui.Typography variant='body2' color='text.secondary'>Left Hip IQ</Mui.Typography>
						<Mui.Typography variant='h5'>{motorState.left_hip_iq}</Mui.Typography>
						<Mui.Typography variant='body2' color='text.secondary'>Right Hip IQ</Mui.Typography>
						<Mui.Typography variant='h5'>{motorState.right_knee_iq}</Mui.Typography>
					</Mui.Stack>
					<Mui.Divider orientation='vertical' flexItem />
					<Mui.Stack sx={style}>
						<Mui.Typography variant='body2' color='text.secondary'>Left Knee IQ</Mui.Typography>
						<Mui.Typography variant='h5'>{motorState.left_knee_iq}</Mui.Typography>
						<Mui.Typography variant='body2' color='text.secondary'>Right Knee IQ</Mui.Typography>
						<Mui.Typography variant='h5'>{motorState.right_knee_iq}</Mui.Typography>
					</Mui.Stack>
					<Mui.Divider orientation='vertical' flexItem />
					<Mui.Stack sx={style}>
						<Mui.Typography variant='body2' color='text.secondary'>Left Wheel IQ</Mui.Typography>
						<Mui.Typography variant='h5'>{motorState.left_wheel_iq}</Mui.Typography>
						<Mui.Typography variant='body2' color='text.secondary'>Right Wheel IQ</Mui.Typography>
						<Mui.Typography variant='h5'>{motorState.right_wheel_iq}</Mui.Typography>
					</Mui.Stack>
				</Mui.Stack>
			</Mui.Paper>

			<Mui.Paper sx={{ display: 'inline-block', p: 2, my: 1 }} elevation={4}>
				<Mui.Stack direction='row' spacing={2}>
					<Mui.Stack sx={style}>
						<Mui.Typography variant='body2' color='text.secondary'>Left Leg Length</Mui.Typography>
						<Mui.Typography variant='h5'>{motorState.left_leg_length}</Mui.Typography>
						<Mui.Typography variant='body2' color='text.secondary'>Right Leg Length </Mui.Typography>
						<Mui.Typography variant='h5'>{motorState.right_leg_length}</Mui.Typography>
					</Mui.Stack>
				</Mui.Stack>
			</Mui.Paper>
		</Mui.Box>
	)
}