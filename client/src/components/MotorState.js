import React from 'react';
import * as Mui from '@mui/material'

import io from 'socket.io-client'
const host = '192.168.1.106'
const port = '3001'
const socket = io.connect(`http://${host}:${port}`) 

export default function MotorState() {

    const [motorState, setMotorState] = React.useState({})
    
    React.useEffect(() => {
        // console.log(motorState)
    }, [motorState])

    socket.on('msg_test', (arg) => {
        // console.log(arg)
        setMotorState(arg)
    })

    return (
        <>
            <Mui.Typography>left_hip_iq: {JSON.stringify(motorState.left_hip_iq)}</Mui.Typography>
            <Mui.Typography>right_hip_iq: {JSON.stringify(motorState.right_hip_iq)}</Mui.Typography>

            <Mui.Typography>left_hip_vel: {JSON.stringify(motorState.left_hip_vel)}</Mui.Typography>
            <Mui.Typography>right_hip_vel: {JSON.stringify(motorState.right_hip_vel)}</Mui.Typography>

            <Mui.Typography>left_knee_vel: {JSON.stringify(motorState.left_knee_vel)}</Mui.Typography>
            <Mui.Typography>right_knee_vel: {JSON.stringify(motorState.right_knee_vel)}</Mui.Typography>

            <Mui.Typography>left_wheel_vel: {JSON.stringify(motorState.left_wheel_vel)}</Mui.Typography>
            <Mui.Typography>right_wheel_vel: {JSON.stringify(motorState.right_wheel_vel)}</Mui.Typography>

            <Mui.Typography>left_leg_length: {JSON.stringify(motorState.left_leg_length)}</Mui.Typography>
            <Mui.Typography>right_leg_length: {JSON.stringify(motorState.right_leg_length)}</Mui.Typography>
        </>
    )
}