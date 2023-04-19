import React from 'react';

// Mui
import * as Mui from '@mui/material'

// Components
import DrawerContext from './components/DrawerContext'
import AppBar from './components/Appbar'
import Drawer from './components/Drawer'
import Main from './components/Main'

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