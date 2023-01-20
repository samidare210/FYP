import * as React from 'react';
import { useState, useRef } from 'react'
import io from 'socket.io-client'
import "./styles/App.css"

// Meterial UI
import * as Mui from '@mui/material'

// React-Nipple
import ReactNipple from 'react-nipple'

// Components
import MenuContext from './components/DrawerContext'
import AppBar from './components/Appbar'
import Drawer from './components/Drawer'
import Main from './components/Main'

/*
  Note that the frontend is running at the port 3000
  and the backend is running at the port 3001.
*/
const host = '192.168.1.106'
const port = '3001'
const socket = io.connect(`http:${host}//:${port}`) // Connect to the URL of the backend server

export default function App() {
  const [isSending, setIsSending] = useState(false)

  var intervalId = useRef(null)

  const handleMouseDown = (e, param) => {
    if (e.button == 0) {
      setIsSending(true)
      intervalId.current = setInterval(() => {
        socket.emit('msg_send', param)
      }, 10);
    }
  }

  const handleMouseUp = (e, param) => {
    if (e.button == 0) {
      setIsSending(false)
      clearInterval(intervalId.current)
      socket.emit('msg_send', param)
    }
  }

  const handleNipDir = (data) => {
    switch (data.direction.angle) {
      case 'up':
        socket.emit('msg_send', 'move_forward')
        break;
      case 'down':
        socket.emit('msg_send', 'move_backward')
        break;
      case 'left':
        socket.emit('msg_send', 'turn_left')
        break;
      case 'right':
        socket.emit('msg_send', 'turn_right')
        break;
    }
  }

  const handleNipEnd = () => {
    socket.emit('msg_send', 'stationary')
  }

  return (
    <MenuContext>
      <Mui.Box sx={{ display: 'flex' }}>
        <Mui.CssBaseline />
        <AppBar></AppBar>
        <Drawer></Drawer>
        
        <Main>
          <Mui.Stack spacing={1} >
            <Mui.Stack spacing={1} direction='row'>
              <Mui.Button variant='contained' color='error'
                onMouseDown={e => handleMouseDown(e, 'kill')} 
                onMouseUp={e => handleMouseUp(e, 'stationary') }>
                KILL
              </Mui.Button>
            </Mui.Stack>
            <Mui.Stack spacing={1} direction='row'>
              <Mui.Button variant='contained'
                onMouseDown={e => handleMouseDown(e, 'stand_up')} 
                onMouseUp={e => handleMouseUp(e, 'stationary') }>
                STAND UP
              </Mui.Button>
              <Mui.Button variant='contained'
                onMouseDown={e => handleMouseDown(e, 'crouch_down')} 
                onMouseUp={e => handleMouseUp(e, 'stationary') }>
                CROUCH DOWN
              </Mui.Button>
            </Mui.Stack>
            <Mui.Stack spacing={1} direction='row'>
              <Mui.Button variant='contained' 
                onMouseDown={e => handleMouseDown(e, 'move_forward')} 
                onMouseUp={e => handleMouseUp(e, 'stationary') }>
                MOVE FORWARD
              </Mui.Button>
              <Mui.Button variant='contained' 
                onMouseDown={e => handleMouseDown(e, 'move_backward')} 
                onMouseUp={e => handleMouseUp(e, 'stationary') }>
                MOVE BACKWARD
              </Mui.Button>
              <Mui.Button variant='contained' 
                onMouseDown={e => handleMouseDown(e, 'turn_left')} 
                onMouseUp={e => handleMouseUp(e, 'stationary')}>
                TURN LEFT
              </Mui.Button>
              <Mui.Button variant='contained' 
                onMouseDown={e => handleMouseDown(e, 'turn_right')} 
                onMouseUp={e => handleMouseUp(e, 'stationary') }>
                TURN RIGHT
              </Mui.Button>
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
    </MenuContext>
  )
}
