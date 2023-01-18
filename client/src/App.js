import io from 'socket.io-client'
import * as React from 'react';
import "./styles/App.css"
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Button, Grid, Container, Slider } from '@mui/material'
import { Joystick } from 'react-joystick-component';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

/*
  Note that the frontend is running at the port 3000
  and the backend is running at the port 3001.
*/
const socket = io.connect('http://localhost:3001') // Connect to the URL of the backend server
const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const cardButton = (
  <React.Fragment>
    <CardContent>
        <div className='btn-container'>
        <Button variant='contained' 
        // onMouseDown={ sendMsgStand }
        >STAND UP</Button>
        <Button variant='contained'
        // onMouseDown={  }
        >STAND DOWN</Button>
        <Button variant='contained' 
        // onMouseDown={ sendMsgCrouch }
        >CROUCH DOWN</Button>
        <Button variant='contained'
          // onMouseDown={ e => onMouseDown('move_forward') } 
          // onMouseUp={ onMouseUp }
        >MOVE FORWARD</Button>
        <Button variant='contained'
          // onMouseDown={ e => onMouseDown('move_backward') } 
          // onMouseUp= { onMouseUp }
        >MOVE BACKWORD</Button>
        <Button variant='contained'
          // onMouseDown={ e => onMouseDown('turn_left') } 
          // onMouseUp={ onMouseUp}
        >TURN LEFT</Button>
        <Button variant='contained' 
          // onMouseDown={ e => onMouseDown('turn_right') } 
          // onMouseUp={ onMouseUp }
        >TURN RIGHT</Button>
            <DrawerHeader />
      </div>
    </CardContent>
  </React.Fragment>
);

const JoystickBarLeft = (
  <React.Fragment>
    <CardContent>
    <div className='joystick-container'>
      <Joystick>
        size={120}
        stickSize={60}
        sticky={false}
        baseColor="rgba(0, 0, 0, 0.5)"
        stickColor="rgba(0, 0, 0, 0.7)"
      </Joystick>
      </div>
    </CardContent>
  </React.Fragment>
);

const JoystickBarRight = (
  <React.Fragment>
    <CardContent>
      <div className='btn-container'>
      <Joystick>
        size={120}
        stickSize={60}
        sticky={false}
        baseColor="rgba(0, 0, 0, 0.5)"
        stickColor="rgba(0, 0, 0, 0.7)"
      </Joystick>
      </div>
    </CardContent>
  </React.Fragment>
);

const cardModeSelect = (
  <React.Fragment>
    <CardContent>
    <div className='joystick-container'>
      <ToggleButton value="left" key="left">
SPEED MODE
      </ToggleButton>
      <ToggleButton value="center" key="center"> 
POSITION MODE
      </ToggleButton>
      <ToggleButton value="right" key="right">
PITCH MODE
      </ToggleButton>
      </div>
    </CardContent>
  </React.Fragment>
);

export default function App() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [alignment, setAlignment] = React.useState('left');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const control = {
    value: alignment,
    onChange: handleChange,
    exclusive: true,
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 2.5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Robot Control Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Home', 'Message Log', 'Robot Status', 'Remote Control'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2,
                }}
              >
                <ListItemIcon>
{/* First line icon is HomeIcon,second line icon is InboxIcon,third line icon is SettingsIcon and the forth icon is ControlCameraIcon */}
                  {index % 4 === 0 ? <HomeIcon /> : index % 4 === 1 ? <InboxIcon /> : index % 4 === 2 ? <SettingsIcon /> : <ControlCameraIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <DrawerHeader />
      </Drawer>


      <Box component="main" sx={{ flexGrow: 1, p: 14 }}>
        <Card variant="outlined">//using camera</Card>
      </Box>
      <Box component="main" sx={{ flexGrow: 3, p: 25 }}>
        <Grid container spacing={6}>
          <Grid Card xs>
            <Card variant="outlined">
              {JoystickBarLeft}
            </Card>
          </Grid>
          <Grid Card xs={3.5}>
            <Card variant="outlined">
            <Stack spacing={3} alignItems="baseline" >
              <ToggleButtonGroup size="large" {...control} aria-label="Large sizes">
        {cardModeSelect}
      </ToggleButtonGroup>
      </Stack>
            </Card>
          </Grid>
          <Grid Card xs>
            <Card variant="outlined">
              {JoystickBarRight}
            </Card>
          </Grid>
        </Grid>
        <Box component="main" sx={{ flexGrow: 1, p: 6 }}>
          <Card variant="outlined">{cardButton}</Card>
        </Box>
      </Box>   
    </>
     )
  
  ////////
  ///////
  //////
  /////
  ////
  ///   
  // These coding is for the message sending and receiving function
  // if you want to use it, please uncomment the code below

  // const [message, setMessage] = useState('')
  // const [messageReceived, setMessageReceived] = useState('')

  // const [isPressed, setIsPressed] = useState(false)

  // Listen 'msg_receive' event from the backend server
  // useEffect(() => {
  //   socket.on('msg_receive', (data) => {
  //     setMessageReceived(data.message)
  //   })
  // }, [socket])

  // const sendMessage = () => {
  //   socket.emit('msg_send', {message})
  // }

  // <input placeholder='Message...' onChange={(event) => {
  //   setMessage(event.target.value)
  // }}/>
  // <button onClick={sendMessage}>Send</button>
  // <h3>Message:</h3>{messageReceived}

  // var intervalId = useRef(null)

  

  // const onMouseDown = (param) => {
  //   setIsPressed(true)
  // intervalId.current = setInterval(() => {
  //   socket.emit('msg_send', param)
  // }, 50)
  // }

  // const onMouseUp = () => {
  //   setIsPressed(false)
  //   clearInterval(intervalId.current)
  // }

  // const sendMsgStand = () => { socket.emit('msg_send', {msg: 'stand'}) }
  // const sendMsgCrouch = () => { socket.emit('msg_send', {msg: 'crouch'}) }
}
