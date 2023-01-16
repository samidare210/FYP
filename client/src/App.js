import io from 'socket.io-client'
import { useState, useEffect, useRef } from 'react'
import "./styles/App.css"

import { Button } from '@mui/material'
import { Joystick } from 'react-joystick-component';

/*
  Note that the frontend is running at the port 3000
  and the backend is running at the port 3001.
*/
const socket = io.connect('http://192.168.189.77:3001') // Connect to the URL of the backend server

export default function App() {
  const [message, setMessage] = useState('')
  const [messageReceived, setMessageReceived] = useState('')

  const [isPressed, setIsPressed] = useState(false)

  // Listen 'msg_receive' event from the backend server
  useEffect(() => {
    socket.on('msg_receive', (data) => {
      setMessageReceived(data.message)
    })
  }, [socket])

  const sendMessage = () => {
    socket.emit('msg_send', {message})
  }

  // <input placeholder='Message...' onChange={(event) => {
  //   setMessage(event.target.value)
  // }}/>
  // <button onClick={sendMessage}>Send</button>
  // <h3>Message:</h3>{messageReceived}

  var intervalId = useRef(null)

  const onMouseDown = (param) => {
    setIsPressed(true)
    // intervalId.current = setInterval(() => {
    //   socket.emit('msg_send', param)
    // }, 50)
  }

  const onMouseUp = () => {
    setIsPressed(false)
    clearInterval(intervalId.current)
  }

  const sendMsgStand = () => { socket.emit('msg_send', {msg: 'stand'}) }
  const sendMsgCrouch = () => { socket.emit('msg_send', {msg: 'crouch'}) }

  return (
    <>
      <div className='btn-container'>
        <Button variant='contained' onMouseDown={ sendMsgStand }>STAND UP</Button>
        <Button variant='contained' onMouseDown={ sendMsgCrouch }>CROUCH DOWN</Button>
        <Button variant='contained'
          onMouseDown={ e => onMouseDown('move_forward') } 
          onMouseUp={ onMouseUp }
        >MOVE FORWARD</Button>
        <Button variant='contained'
          onMouseDown={ e => onMouseDown('move_backward') } 
          onMouseUp= { onMouseUp }
        >MOVE BACKWORD</Button>
        <Button variant='contained'
          onMouseDown={ e => onMouseDown('turn_left') } 
          onMouseUp={ onMouseUp}
        >TURN LEFT</Button>
        <Button variant='contained' 
          onMouseDown={ e => onMouseDown('turn_right') } 
          onMouseUp={ onMouseUp }
        >TURN RIGHT</Button>
      </div>
      <Joystick 
        size={120}
        stickSize={60}
        sticky={false} 
        baseColor="rgba(0, 0, 0, 0.5)" 
        stickColor="rgba(0, 0, 0, 0.7)">
      </Joystick>
    </>
  )
}
