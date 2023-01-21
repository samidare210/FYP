import React from 'react'

// Mui
import * as Mui from '@mui/material'
import { styled } from '@mui/material/styles'

// Socket.io
import io from 'socket.io-client'
const host = '192.168.1.106'
const port = '3001'
const socket = io.connect(`http://${host}:${port}`)

export default function HoldBtn(props) {
	const [send, setSend] = React.useState(false)

	var intervalId = React.useRef(null)

	const handleMouseDown = (e, param) => {
		if (e.button === 0) {
			setSend(true)
			intervalId.current = setInterval(() => {
				socket.emit('msg_send', param)
			}, 10);
		}
	}

	const handleMouseUp = (e, param) => {
		if (e.button === 0) {
			setSend(false)
			clearInterval(intervalId.current)
			socket.emit('msg_send', param)
		}
	}

	return (
		<Mui.Button
			variant='contained' color={props.color}
			onMouseDown={e => handleMouseDown(e, props.mouseDownMsg)}
			onMouseUp={e => handleMouseUp(e, props.mouseUpMsg)}>
			{props.text}
		</Mui.Button>
	)
}