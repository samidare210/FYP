import io from 'socket.io-client'
import { useState, useEffect, useRef } from 'react'
import "./styles/App.css"

import { Button } from '@mui/material'
import { Joystick } from 'react-joystick-component';

/*
  Note that the frontend is running at the port 3000
  and the backend is running at the port 3001.
*/
const socket = io.connect('http://192.168.1.107:3001') // Connect to the URL of the backend server

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

  const onMouseDown = () => {
    setIsPressed(true)
    var msg = this.props.value
    socket.emit('msg_send', this.props.value)
    intervalId.current = setInterval(() => {
      socket.emit('msg_send', )
    }, 50)
  }

  const onMouseUp = () => {
    setIsPressed(false)
    clearInterval(intervalId.current)
    socket.emit('msg_send', intervalId.current)
  }

  const sendMsgStand = () => { socket.emit('msg_send', {msg: 'stand'}) }
  const sendMsgCrouch = () => { socket.emit('msg_send', {msg: 'crouch'}) }
  const sendMsgForward = () => { socket.emit('msg_send', {msg: 'forward'}) }
  const sendMsgBackward = () => { socket.emit('msg_send', {msg: 'backward'}) }
  const sendMsgLeft = () => { socket.emit('msg_send', {msg: 'left'}) }
  const sendMsgRight = () => { socket.emit('msg_send', {msg: 'right'}) }

  return (
    <>
      <div className='btn-container'>
        <Button variant="contained" onMouseDown={ sendMsgStand }>STAND UP</Button>
        <Button variant="contained" onMouseDown={ sendMsgCrouch }>CROUCH DOWN</Button>

        <Button 
          variant="contained" 
          onMouseDown={ onMouseDown } 
          onMouseUp={ onMouseUp }
        >
          MOVE FORWARD
        </Button>

        <Button 
          variant="contained"
          onMouseDown={ onMouseUp }
          onMouseUp= { onMouseUp }
        >
          MOVE BACKWORD
        </Button>

        <Button 
          variant="contained" 
          onMouseDown={ sendMsgLeft }
        >
          TURN LEFT
        </Button>

        <Button 
          variant="contained" 
          onMouseDown={ sendMsgRight }
        >
          TURN RIGHT
        </Button>
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
