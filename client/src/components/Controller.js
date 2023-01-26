import React from 'react'

// Mui
import * as Mui from '@mui/material'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'

// Mui icons
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import SwipeUpAltIcon from '@mui/icons-material/SwipeUpAlt';
import SwipeDownAltIcon from '@mui/icons-material/SwipeDownAlt';
import RotateLeftIcon from '@mui/icons-material/RotateLeft'
import RotateRightIcon from '@mui/icons-material/RotateRight'

// Others
import ReactNipple from 'react-nipple'

import io from 'socket.io-client'
const host = '192.168.1.106'
const port = '3001'
const socket = io.connect(`http://${host}:${port}`)

const ToggleButton = styled(Mui.ToggleButton)(() => ({
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
  }
}))

const theme = createTheme({
  palette: {
    text: {
      primary: '#1976d2'
    }
  }
})

export default function Controller() {

	const [position, setPosition] = React.useState('prone')

	const handlePosition = (e, newPosition) => {
    if (newPosition !== null) {
      setPosition(newPosition)
    }
  }

  React.useEffect(() => {
    console.log(position)
    switch (position) {
      case 'stand':
        socket.emit('msg_send', 'stand')
        break
      case 'prone':
        socket.emit('msg_send', 'prone')
        break
    }
  }, [position])

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

	const handleRHSNip = (data) => {
		switch (data.direction.angle) {
			case 'up':
				socket.emit('msg_send', '')
				break
			case 'down':
				socket.emit('msg_send', '')
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
	}

	const handleLHSNipEnd = () => {
		socket.emit('msg_send', 'stationary')
	}

	const handleRHSNipEnd = () => {
		socket.emit('msg_send', 'roll_reset')
	}

	return (
		<Mui.Paper sx={{ width: '75%' }}>
			<Mui.Stack
				direction='row'
				divider={ <Mui.Divider orientation='vertical' flexItem /> }
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
					onDir={(e, data) => handleLHSNip(data)}
					onEnd={handleLHSNipEnd}
				/>

				<Mui.Box sx={{ 
					flexGrow: 1,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}>

					{/* <Mui.ToggleButtonGroup
						color="primary"
						exclusive
						value={mode}
						onChange={handleModeChange}>
						<Mui.ToggleButton value='m1'>Mode 1</Mui.ToggleButton>
						<Mui.ToggleButton value='m2'>Mode 2</Mui.ToggleButton>
						<Mui.ToggleButton value='m3'>Mode 3</Mui.ToggleButton>
					</Mui.ToggleButtonGroup> */}

					<ThemeProvider theme={theme} >
						<Mui.ToggleButtonGroup value={position} onChange={handlePosition} orientation='vertical' exclusive>
							<ToggleButton value='stand'>
								<ArrowDropUpIcon />
							</ToggleButton>
							<ToggleButton value='prone'>
								<ArrowDropDownIcon />
							</ToggleButton>
						</Mui.ToggleButtonGroup>
					</ThemeProvider>
					
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
					onDir={(e, data) => handleRHSNip(data)}
					onEnd={(e, data) => handleRHSNipEnd(data)}
				/>
			</Mui.Stack>
		</Mui.Paper>
	)
}