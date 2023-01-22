import React, { useState } from 'react'

// Mui
import * as Mui from '@mui/material'
import { styled } from '@mui/material/styles'

// Socket.io
import io from 'socket.io-client'
import { fabClasses } from '@mui/material'
const host = '192.168.1.106'
const port = '3001'
const socket = io.connect(`http://${host}:${port}`)

export default function HoldBtn(props) {
  const [state, setState] = useState('')

  var intervalId = React.useRef(null)

  // const handleMouseDown = (e, param) => {
  // 	if (e.button === 0) {
  // 		setSend(true)
  // 		intervalId.current = setInterval(() => {
  // 			socket.emit('msg_send', param)
  // 		}, 10);
  // 	}
  // }

  // const handleMouseUp = (e, param) => {
  // 	if (e.button === 0) {
  // 		setSend(false)
  // 		clearInterval(intervalId.current)
  // 		socket.emit('msg_send', param)
  // 	}
  // }

  const handleMouseDown = () => {
    console.log(state)
    setState('down');
    // console.log('down')
  }

  const handleMouseUp = () => {
    setState('up');
    // console.log('up')
  }

  async function sendMsg() {
    while (state) {
      socket.emit('msg_send', 'Hello')
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return (
    <Mui.Button
      className='HoldBtn'
      variant='contained' color={props.color}
      onMouseDown={e => handleMouseDown(e, props.mouseDownMsg)}
      onMouseUp={e => handleMouseUp(e, props.mouseUpMsg)}>
      {props.text}
    </Mui.Button>
  )
}