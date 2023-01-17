import io from 'socket.io-client'
import { useState, useRef } from 'react'

import "./styles/App.css"
import * as Mui from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ReactNipple from 'react-nipple'
import DebugView from 'react-nipple/lib/DebugView'

/*
  Note that the frontend is running at the port 3000
  and the backend is running at the port 3001.
*/
const socket = io.connect('http://192.168.1.106:3001') // Connect to the URL of the backend server

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

  var angle 
  const handleNipMove = (data) => {
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
    <>
      <Mui.Box sx={{ flexGrwo: 1 }}>
        <Mui.AppBar position="static">
          <Mui.Toolbar>
            <Mui.IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </Mui.IconButton>
            <Mui.Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Robot Control
            </Mui.Typography>
          </Mui.Toolbar>
        </Mui.AppBar>
      </Mui.Box>

      <div className='container'>
        <div className='btn-container'>
          <Mui.Button variant='contained' color='error'
            onMouseDown={e => handleMouseDown(e, 'kill')} 
            onMouseUp={e => handleMouseUp(e, 'stationary') }>
            KILL
          </Mui.Button>
        </div>
        <div className='btn-container'>
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
        </div>
        <div className='btn-container'>
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
        </div>
        <div className='btn-container'>
          <ReactNipple
            options={{
              color: "black",
              mode: "static",
              position: { top: "50%", left: "50%" },
              lockY: true,
              multitouch: true
            }}
            style={{
              outline: "1px dashed red",
              width: 150,
              height: 150,
              position: "relative"
            }}
            onDir={(e, data) => {handleNipMove(data)}}
            onEnd={handleNipEnd}
          />
          <ReactNipple
            options={{
              color: "black",
              mode: "static",
              position: { top: "50%", left: "50%" },
              lockX: true,
              multitouch: true
            }}
            style={{
              outline: "1px dashed red",
              width: 150,
              height: 150,
              position: "relative"
            }}
            onDir={(e, data) => {handleNipMove(data)}}
            onEnd={handleNipEnd}
          />
        </div>
      </div>
    </>
  )
}
