import * as React from 'react';
import { useState, useRef } from 'react'
import io from 'socket.io-client'
import "./styles/App.css"

// Meterial UI
import * as Mui from '@mui/material'
import MuiAppBar from '@mui/material/AppBar';

// Icons
import SmartToyIcon from '@mui/icons-material/SmartToy';
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import InboxIcon from '@mui/icons-material/Inbox'
import MailIcon from '@mui/icons-material/Mail'

// MUI System (style, theme)
import { styled, useTheme } from '@mui/material/styles';

// React-Nipple
import ReactNipple from 'react-nipple'

/*
  Note that the frontend is running at the port 3000
  and the backend is running at the port 3001.
*/
const host = '192.168.1.106'
const port = '3001'
const socket = io.connect(`http:${host}//:${port}`) // Connect to the URL of the backend server

const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



export default function App() {
  const [isSending, setIsSending] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  var intervalId = useRef(null)

  const handleMouseDown = (e, param) => {
    if (e.button == 0) {
      setIsSending(true)
      intervalId.current = setInterval(() => {
        socket.emit('msg_send', param)
      }, 10);
    }
  }

  const handleMouseUp = (e, param) => {
    if (e.button == 0) {
      setIsSending(false)
      clearInterval(intervalId.current)
      socket.emit('msg_send', param)
    }
  }

  const handleNipDir = (data) => {
    switch (data.direction.angle) {
      case 'up':
        socket.emit('msg_send', 'move_forward')
        break;
      case 'down':
        socket.emit('msg_send', 'move_backward')
        break;
      case 'left':
        socket.emit('msg_send', 'turn_left')
        break;
      case 'right':
        socket.emit('msg_send', 'turn_right')
        break;
    }
  }

  const handleNipEnd = () => {
    socket.emit('msg_send', 'stationary')
  }

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Mui.CssBaseline />
      <AppBar position="fixed" open={open}>
        <Mui.Toolbar>
          <Mui.IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </Mui.IconButton>
          <Mui.Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Mui.Typography>
        </Mui.Toolbar>
      </AppBar>
      <Mui.Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Mui.IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </Mui.IconButton>
        </DrawerHeader>
        <Mui.Divider />
        <Mui.List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <Mui.ListItem key={text} disablePadding>
              <Mui.ListItemButton>
                <Mui.ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </Mui.ListItemIcon>
                <Mui.ListItemText primary={text} />
              </Mui.ListItemButton>
            </Mui.ListItem>
          ))}
        </Mui.List>
      </Mui.Drawer>

      <Mui.Stack spacing={1} >
        <Mui.Stack spacing={1} direction='row'>
          <Mui.Button variant='contained' color='error'
            onMouseDown={e => handleMouseDown(e, 'kill')} 
            onMouseUp={e => handleMouseUp(e, 'stationary') }>
            KILL
          </Mui.Button>
        </Mui.Stack>
        <Mui.Stack spacing={1} direction='row'>
          <Mui.Button variant='contained'
            onMouseDown={e => handleMouseDown(e, 'stand_up')} 
            onMouseUp={e => handleMouseUp(e, 'stationary') }>
            STAND UP
          </Mui.Button>
          <Mui.Button variant='contained'
            onMouseDown={e => handleMouseDown(e, 'crouch_down')} 
            onMouseUp={e => handleMouseUp(e, 'stationary') }>
            CROUCH DOWN
          </Mui.Button>
        </Mui.Stack>
        <Mui.Stack spacing={1} direction='row'>
          <Mui.Button variant='contained' 
            onMouseDown={e => handleMouseDown(e, 'move_forward')} 
            onMouseUp={e => handleMouseUp(e, 'stationary') }>
            MOVE FORWARD
          </Mui.Button>
          <Mui.Button variant='contained' 
            onMouseDown={e => handleMouseDown(e, 'move_backward')} 
            onMouseUp={e => handleMouseUp(e, 'stationary') }>
            MOVE BACKWARD
          </Mui.Button>
          <Mui.Button variant='contained' 
            onMouseDown={e => handleMouseDown(e, 'turn_left')} 
            onMouseUp={e => handleMouseUp(e, 'stationary')}>
            TURN LEFT
          </Mui.Button>
          <Mui.Button variant='contained' 
            onMouseDown={e => handleMouseDown(e, 'turn_right')} 
            onMouseUp={e => handleMouseUp(e, 'stationary') }>
            TURN RIGHT
          </Mui.Button>
        </Mui.Stack>
        <Mui.Stack spacing={1} direction='row'>
          <ReactNipple
            options={{
              color: "black",
              mode: "static",
              position: { top: "50%", left: "50%" },
              multitouch: true
            }}
            style={{
              outline: "1px dashed red",
              width: 150,
              height: 150,
              position: "relative"
            }}
            onDir={(e, data) => {handleNipDir(data)}}
            onEnd={handleNipEnd}
          />
        </Mui.Stack>
      </Mui.Stack>
    </>
  )
}
