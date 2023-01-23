import React from 'react';

// Socket.io
import io from 'socket.io-client'

// Mui
import * as Mui from '@mui/material'

// React-Nipple
import ReactNipple from 'react-nipple'

// Components
import DrawerContext from './components/DrawerContext'
import AppBar from './components/Appbar'
import Drawer from './components/Drawer'
import Main from './components/Main'
import HoldBtn from './components/HoldBtn'

// React-Webcam
import Webcam from 'react-webcam'

/*
  Note that the frontend is running at the port 3000
  and the backend is running at the port 3001.
*/
const host = '192.168.1.106'
const port = '3001'
const socket = io.connect(`http://${host}:${port}`) // Connect to the URL of the backend server
// SSL
// HTTPS=true SSL_CRT_FILE=./ssl/192.168.1.106.pem SSL_KEY_FILE=./ssl/192.168.1.106-key.pem

export default function App() {
  
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

  const handleNipEnd = () => {
    socket.emit('msg_send', 'stationary')
  }

  return (
    <DrawerContext>
      <Mui.Box sx={{ display: 'flex' }}>
        <Mui.CssBaseline />
        <AppBar />
        <Drawer />
        
        <Main>
          
          <Webcam />

          <Mui.Stack spacing={1} >
            <Mui.Stack spacing={1} direction='row'>
              <HoldBtn
                text='kill'
                color='error'
                socket={socket}
                mouseDownMsg='kill'
                mouseUpMsg='stationary'
              />
            </Mui.Stack>
            <Mui.Stack spacing={1} direction='row'>
              <HoldBtn
                text='stand up'
                socket={socket}
                mouseDownMsg='stand_up'
                mouseUpMsg='stationary'
              /> 
              <HoldBtn
                text='crouch down'
                socket={socket}
                mouseDownMsg='crouch_down'
                mouseUpMsg='stationary'
              /> 
            </Mui.Stack>
            <Mui.Stack spacing={1} direction='row'>
              <HoldBtn
                text='move forward'
                socket={socket}
                mouseDownMsg='move_forward'
                mouseUpMsg='stationary'
              />
              <HoldBtn
                text='move backward'
                socket={socket}
                mouseDownMsg='move_backward'
                mouseUpMsg='stationary'
              />
              <HoldBtn
                text='turn left'
                socket={socket}
                mouseDownMsg='turn_left'
                mouseUpMsg='stationary'
              />
              <HoldBtn
                text='turn right'
                socket={socket}
                mouseDownMsg='turn_right'
                mouseUpMsg='stationary'
              />
            </Mui.Stack>
            <Mui.Stack spacing={1} direction='row'>
              <ReactNipple
                options={{
                  color: "black",
                  mode: "static",
                  position: { top: "50%", left: "50%" },
                  multitouch: true
                }}
                style={{
                  outline: "1px dashed red",
                  width: 150,
                  height: 150,
                  position: "relative"
                }}
                onDir={(e, data) => {handleLHSNip(data)}}
                onEnd={handleNipEnd}
              />
              <ReactNipple
                options={{
                  color: "black",
                  mode: "static",
                  position: { top: "50%", left: "50%" },
                  multitouch: true
                }}
                style={{
                  outline: "1px dashed red",
                  width: 150,
                  height: 150,
                  position: "relative"
                }}
                onDir={(e, data) => {handleRHSNip(data)}}
                onEnd={handleNipEnd}
              />
            </Mui.Stack>
          </Mui.Stack>
        </Main>
      </Mui.Box>
    </DrawerContext>
  )
}
