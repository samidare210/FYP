import React from 'react';

// Socket.io
import io from 'socket.io-client'

// Mui
import * as Mui from '@mui/material'

// Components
import DrawerContext from './components/DrawerContext'
import AppBar from './components/Appbar'
import Drawer from './components/Drawer'
import Main from './components/Main'
import HoldBtn from './components/HoldBtn'
import Controller from './components/Controller'

// React-Webcam
import Webcam from 'react-webcam'

// React-Router
import { Link } from 'react-router-dom';

/*
  Note that the frontend is running at the port 3000
  and the backend is running at the port 3001.
*/
const host = '192.168.1.106'
const port = '3001'
const socket = io.connect(`http://${host}:${port}`) // Connect to the URL of the backend server
// Setup SSL in package
// HTTPS=true SSL_CRT_FILE=./ssl/192.168.1.106.pem SSL_KEY_FILE=./ssl/192.168.1.106-key.pem

export default function App() {

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
                socket={socket}
                mouseDownMsg='kill'
                mouseUpMsg='stationary'
              />
            </Mui.Stack>
            <Mui.Stack spacing={1} direction='row'>
              <HoldBtn
                text='stand up'
                socket={socket}
                mouseDownMsg='stand_up'
                mouseUpMsg='stationary'
              />
              <HoldBtn
                text='crouch down'
                socket={socket}
                mouseDownMsg='crouch_down'
                mouseUpMsg='stationary'
              />
            </Mui.Stack>
            <Mui.Stack spacing={1} direction='row'>
              <HoldBtn
                text='move forward'
                socket={socket}
                mouseDownMsg='move_forward'
                mouseUpMsg='stationary'
              />
              <HoldBtn
                text='move backward'
                socket={socket}
                mouseDownMsg='move_backward'
                mouseUpMsg='stationary'
              />
              <HoldBtn
                text='turn left'
                socket={socket}
                mouseDownMsg='turn_left'
                mouseUpMsg='stationary'
              />
              <HoldBtn
                text='turn right'
                socket={socket}
                mouseDownMsg='turn_right'
                mouseUpMsg='stationary'
              />
              <HoldBtn
                text='pitch stop'
                socket={socket}
                mouseDownMsg='pitch_stop'
                mouseUpMsg='pitch_stop'
              />
            </Mui.Stack>
            
            <Controller />

          </Mui.Stack>
        </Main>
      </Mui.Box>
    </DrawerContext>
  )
}
