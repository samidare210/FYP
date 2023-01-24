import React from 'react';

// Mui
import * as Mui from '@mui/material'

// React-Nipple
import ReactNipple from 'react-nipple'

import io from 'socket.io-client'
const host = '192.168.1.106'
const port = '3001'
const socket = io.connect(`http://${host}:${port}`)

export default function Controller() {

	const [mode, setMode] = React.useState('')
	const handleModeChange = (e, newMode) => {
		setMode(newMode)
	}
	
	React.useEffect(() => {
		console.log(mode)
	}, [mode]);

	const handleLHSNip = (data) => {
    switch (data.direction.angle) {
      case 'up':
        socket.emit('msg_send', 'move_forward')
        break
      case 'down':
        socket.emit('msg_send', 'move_backward')
        break
      case 'left':
        socket.emit('msg_send', 'turn_left')
        break
      case 'right':
        socket.emit('msg_send', 'turn_right')
        break
      default:
        break
    }
  }

  var prevDir = ''
  const handleRHSNip = (data) => {
    switch (data.direction.angle) {
      case 'up':
        socket.emit('msg_send', 'pitch_up')
        break
      case 'down':
        socket.emit('msg_send', 'pitch_down')
        break
      case 'left':
        socket.emit('msg_send', 'roll_left')
        break
      case 'right':
        socket.emit('msg_send', 'roll_right')
        break
      default:
        break
    }
    prevDir = data.direction.angle
  }

  const handleLHSNipEnd = () => {
    socket.emit('msg_send', 'stationary')
  }

  const handleRHSNipEnd = () => {
    if (prevDir == 'up' || prevDir == 'down')
      socket.emit('msg_send', 'pitch_stop')
    else if (prevDir == 'left' || prevDir == 'right')
      socket.emit('msg_send', 'roll_reset')
  }

	return (
		<Mui.Paper
			sx={{ width: '75%' }}
			elevation={4}
		>
			<Mui.Stack
				direction='row'
				divider={
					<Mui.Divider orientation='vertical' flexItem />
				}
			>
				<ReactNipple
					options={{
						color: 'black',
						mode: 'static',
						position: { top: '50%', left: '50%' },
						multitouch: true
					}}
					style={{
						width: 200,
						height: 200,
						position: 'relative'
					}}
					onDir={(e, data) => { handleLHSNip(data) }}
					onEnd={handleLHSNipEnd}
				/>
				<Mui.Box sx={{ flexGrow: 1 }}>
					<Mui.ToggleButtonGroup
					  color="primary"
						exclusive
						value={mode}
						onChange={handleModeChange}
					>
						<Mui.ToggleButton value='m1'>Mode 1</Mui.ToggleButton>
						<Mui.ToggleButton value='m2'>Mode 2</Mui.ToggleButton>
						<Mui.ToggleButton value='m3'>Mode 3</Mui.ToggleButton>
					</Mui.ToggleButtonGroup>
				</Mui.Box>
				<ReactNipple
					options={{
						color: 'black',
						mode: 'static',
						position: { top: '50%', left: '50%' },
						multitouch: true
					}}
					style={{
						width: 200,
						height: 200,
						position: 'relative'
					}}
					onDir={(e, data) => { handleRHSNip(data) }}
					onEnd={(e, data) => handleRHSNipEnd(data)}
				/>
			</Mui.Stack>
		</Mui.Paper>
	)
}