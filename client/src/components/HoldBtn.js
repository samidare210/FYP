import React from 'react'

// Mui
import * as Mui from '@mui/material'

export default function HoldBtn(props) {
  const [isHold, setIsHold] = React.useState(false)

  var intervalId = React.useRef(null)

  React.useEffect(() => {
      console.log(isHold)
      if (isHold) {
        intervalId.current = setInterval(() => {
          props.socket.emit('msg_send', props.mouseDownMsg)
        }, 20)
      } else {
        clearInterval(intervalId.current)
        props.socket.emit('msg_send', props.mouseUpMsg)
      }
  }, [isHold, props.socket, props.mouseDownMsg, props.mouseUpMsg]) 

  // async function sendMsg() {
  //   while (state) {
  //     socket.emit('msg_send', 'Hello')
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  //   }
  // }

  return (
    <Mui.Button
      className='HoldBtn'
      variant='contained' color={props.color}
      onMouseDown={() => setIsHold(true)}
      onMouseUp={() => setIsHold(false)}
      onTouchStart={() => setIsHold(true)}
      onTouchEnd={() => setIsHold(false)}
    >
      {props.text}
    </Mui.Button>
  )
}