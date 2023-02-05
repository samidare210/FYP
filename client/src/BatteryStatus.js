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

/*
  Note that the frontend is running at the port 3000
  and the backend is running at the port 3001.
*/
const host = '192.168.1.109'
const port = '3001'
const socket = io.connect(`http://${host}:${port}`) // Connect to the URL of the backend server

export default function BatteryStatus() { 
      return (
        <DrawerContext>
        <Mui.Box sx={{ display: 'flex' }}>
          <Mui.CssBaseline />
          <AppBar />
          <Drawer />
  
          <Main>
            <Mui.Stack spacing={1} >
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
                  
                  <Mui.Box sx={{ flexGrow: 1, border: 1 }}>
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