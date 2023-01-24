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

export default function BatteryStatus() {
    
      const [batteryStatus, setBatteryStatus] = React.useState('')
    
      React.useEffect(() => {
     socket.on('battery_status', (data) => {
        setBatteryStatus(data)
     })
      }, [])
    
      return (
        <DrawerContext>
        <Mui.Box sx={{ display: 'flex' }}>
          <Mui.CssBaseline />
          <AppBar />
          <Drawer />
  
          <Main>
            <Mui.Stack spacing={1} >
              <Mui.Stack spacing={1} direction='row'>
                
              </Mui.Stack>
              <Mui.Stack spacing={1} direction='row'>
                
              </Mui.Stack>
              <Mui.Stack spacing={1} direction='row'>
                
              </Mui.Stack>
  
              <Mui.Paper
                sx={{ width: '75%' }}
                elevation={4}
              >
                <Mui.Stack 
                  direction='row'
                  divider={
                    <Mui.Divider orientation='vertical' flexItem />
                  }
                >
                  
                  <Mui.Box 
                    sx={{ flexGrow: 1, border: 1 }}
                  >
                    This is the battery status page.
                  </Mui.Box>
                  
                </Mui.Stack>
              </Mui.Paper>
  
            </Mui.Stack>
          </Main>
        </Mui.Box>
      </DrawerContext>
      )
    }