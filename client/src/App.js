import React from 'react';

// Socket.io
import io from 'socket.io-client'

// Mui
import * as Mui from '@mui/material'

import MuiToggleButton from '@mui/material/ToggleButton'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'

// Mui icons
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import SwipeUpAltIcon from '@mui/icons-material/SwipeUpAlt';
import SwipeDownAltIcon from '@mui/icons-material/SwipeDownAlt';

import RotateLeftIcon from '@mui/icons-material/RotateLeft'
import RotateRightIcon from '@mui/icons-material/RotateRight'

// Components
import DrawerContext from './components/DrawerContext'
import AppBar from './components/Appbar'
import Drawer from './components/Drawer'
import Main from './components/Main'
import HoldBtn from './components/HoldBtn'
import Controller from './components/Controller'
import MotorState from './components/MotorState'

/*
  Note that the frontend is running at the port 3000
  and the backend is running at the port 3001.
*/
const host = '192.168.1.106'
const port = '3001'
const socket = io.connect(`http://${host}:${port}`) // Connect to the URL of the backend server
// Setup SSL in package
// HTTPS=true SSL_CRT_FILE=./ssl/192.168.1.106.pem SSL_KEY_FILE=./ssl/192.168.1.106-key.pem

const ToggleButton = styled(Mui.ToggleButton)(() => ({
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
  }
}));

const theme = createTheme({
  palette: {
    text: {
      primary: '#1976d2'
    }
  }
})

const marks1 = [
  { value: 0, label: '0.0f' },
  { value: 0.5, label: '0.5f' },
  { value: 1, label: '1.0f' },
]

const marks2 = [
  { value: -0.1, label: '-0.1f' },
  { value: 0, label: '0.0f' },
  { value: 0.1, label: '0.1f' },
]

export default function App() {
  const [position, setPosition] = React.useState('prone')
  const [body, setBody] = React.useState('down')

  const [value, setValue] = React.useState(0)

  const handlePosition = (e, newPosition) => {
    if (newPosition !== null) {
      setPosition(newPosition)
    }
  }

  const handleBodySlider = (e) => {
    setValue(e.target.value)
  }

  React.useEffect(() => {
    console.log(value)
    socket.emit('msg_body', value)
  }, [value])

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

  return (
    <DrawerContext>
      <Mui.Box sx={{ display: 'flex'}}>
        <Mui.CssBaseline />
        <AppBar />
        <Drawer />

        <Main>
          <Mui.Stack spacing={1} >
            <Mui.Box sx={{ flexGrow: 1, height: 720, bgcolor: 'black' }} />
            <Mui.Stack spacing={1} direction='column'>
              <Mui.Box sx={{ width: 200 }}>
                <Mui.Typography variant='body2' color='text.secondary'>Body Up & Down</Mui.Typography>
                <Mui.Slider
                  onChange={handleBodySlider}
                  defaultValue={0}
                  max={1}
                  min={0}
                  step={0.01}
                  marks={marks1}
                />
              </Mui.Box>

              <Mui.Box sx={{ width: 200 }}>
                <Mui.Typography variant='body2' color='text.secondary'>Body Roll</Mui.Typography>
                <Mui.Slider
                  onChange={handleBodySlider}
                  defaultValue={0}
                  max={0.1}
                  min={-0.1}
                  step={0.01}
                  marks={marks2}
                />
              </Mui.Box>

            </Mui.Stack>
            <Mui.Stack spacing={1} direction='row'>
              <HoldBtn
                child={<WarningAmberIcon />}
                color='error'
                mouseDownMsg='kill'
                mouseUpMsg='stationary'
              />
              <HoldBtn
                child={<SwipeUpAltIcon />}
                mouseDownMsg='move_forward'
                mouseUpMsg='stationary'
              />
              <HoldBtn
                child={<SwipeDownAltIcon />}
                mouseDownMsg='move_backward'
                mouseUpMsg='stationary'
              />
              <HoldBtn
                child={<RotateLeftIcon />}
                mouseDownMsg='turn_left'
                mouseUpMsg='stationary'
              />
              <HoldBtn
                child={<RotateRightIcon />}
                mouseDownMsg='turn_right'
                mouseUpMsg='stationary'
              />
            </Mui.Stack>

            <Controller />

          </Mui.Stack>
        </Main>
      </Mui.Box>
    </DrawerContext>
  )
}
