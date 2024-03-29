import React from 'react'

// Mui
import * as Mui from '@mui/material'

// Socket
import { socket } from "../SocketControls"

export default function HoldBtn(props) {
  const [isHold, setIsHold] = React.useState(false)

  var intervalId = React.useRef(null)

  React.useEffect(() => {
      console.log(isHold)
      if (isHold) {
        intervalId.current = setInterval(() => {
          socket.emit('msg_send', props.mouseDownMsg)
        }, 20)
      } else {
        clearInterval(intervalId.current)
        socket.emit('msg_send', props.mouseUpMsg)
      }
  }, [isHold, props.mouseDownMsg, props.mouseUpMsg]) 

  return (
    <Mui.Button
      className='HoldBtn'
      variant='contained' 
      color={props.color}
      onMouseDown={e => {e.button == 0 && setIsHold(true)}}
      onMouseUp={e => {e.button == 0 && setIsHold(false)}}
      onTouchStart={() => setIsHold(true)}
      onTouchEnd={() => setIsHold(false)}
    >
      {props.child}
    </Mui.Button>
  )
}