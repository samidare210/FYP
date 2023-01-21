import React from 'react';

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

/*
  Note that the frontend is running at the port 3000
  and the backend is running at the port 3001.
*/
const host = '192.168.1.106'
const port = '3001'
const socket = io.connect(`http://${host}:${port}`) // Connect to the URL of the backend server

export default function App() {
  const [isSending, setIsSending] = React.useState(false)

  var intervalId = React.useRef(null)

  const handleMouseDown = (e, param) => {
    if (e.button === 0) {
      setIsSending(true)
      intervalId.current = setInterval(() => {
        socket.emit('msg_send', param)
      }, 10);
      console.log('Hello')
    }
  }

  const handleMouseUp = (e, param) => {
    if (e.button === 0) {
      setIsSending(false)
      clearInterval(intervalId.current)
      socket.emit('msg_send', param)
    }
  }

  const handleNipDir = (data) => {
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
          <Mui.Stack spacing={1} >
            <Mui.Stack spacing={1} direction='row'>
              <HoldBtn
                text='kill'
                color='error'
                mouseDownMsg='kill'
                mouseUpMsg='stationary'
              /> 
              <Mui.Button variant='contained' color='error'
                onMouseDown={e => handleMouseDown(e, 'kill')} 
                onMouseUp={e => handleMouseUp(e, 'stationary') }>
                KILL
              </Mui.Button>
            </Mui.Stack>
            <Mui.Stack spacing={1} direction='row'>
              <HoldBtn
                text='stand up'
                mouseDownMsg='stand_up'
                mouseUpMsg='stationary'
              /> 
              <HoldBtn
                text='crouch down'
                mouseDownMsg='crouch_down'
                mouseUpMsg='stationary'
              /> 
            </Mui.Stack>
            <Mui.Stack spacing={1} direction='row'>
              <HoldBtn
                text='move forward'
                mouseDownMsg='move_forward'
                mouseUpMsg='stationary'
              />
              <HoldBtn
                text='move backward'
                mouseDownMsg='move_backward'
                mouseUpMsg='stationary'
              />
              <HoldBtn
                text='turn left'
                mouseDownMsg='turn_left'
                mouseUpMsg='stationary'
              />
              <HoldBtn
                text='turn right'
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
                onDir={(e, data) => {handleNipDir(data)}}
                onEnd={handleNipEnd}
              />
            </Mui.Stack>
          </Mui.Stack>
        </Main>
      </Mui.Box>
    </DrawerContext>
  )
}
