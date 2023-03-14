import { useContext } from 'react'

// Mui
import * as Mui from '@mui/material'
import { useTheme } from '@mui/material/styles'

// Mui Icons
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TimelineIcon from '@mui/icons-material/Timeline'
import ControlCameraIcon from '@mui/icons-material/ControlCamera'
import ChatIcon from '@mui/icons-material/Chat'

// Components
import { Context } from './DrawerContext'
import DrawerHeader from './DrawerHeader'
import ListItemCtrl from './ListItemCtrl'
import BatteryItem from './BatteryItem'

// React-Router
import { Link } from 'react-router-dom';

const drawerWidth = 320

export default function Drawer(props) {
  const theme = useTheme()
  const { open, setOpen } = useContext(Context)

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
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
        <Mui.Typography
          varient='h6'
          sx={{
            ml: 1.5,
            mr: 'auto'
          }}
        >
          Menu
        </Mui.Typography>

        <Mui.IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </Mui.IconButton>
      </DrawerHeader>
      
      <Mui.Divider />

      <Mui.List>

        <Link to="/ChatBot" style={{ color: 'inherit', textDecoration: 'none'}}>
          <Mui.ListItemButton>
            <Mui.ListItemIcon>
              <ChatIcon />
            </Mui.ListItemIcon>
            <Mui.ListItemText primary='ChatBot' />
          </Mui.ListItemButton>
        </Link>
          
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none'}}>
          <Mui.ListItemButton>
            <Mui.ListItemIcon>
              <ControlCameraIcon />
            </Mui.ListItemIcon>
              <Mui.ListItemText primary='Remote Control' />
          </Mui.ListItemButton>
        </Link>

        <ListItemCtrl socket={props.socket}></ListItemCtrl>

        <BatteryItem></BatteryItem>
        
        <Link to="/MotorStatus" style={{ color: 'inherit', textDecoration: 'none'}}>
          <Mui.ListItemButton>
            <Mui.ListItemIcon>
              <TimelineIcon />
            </Mui.ListItemIcon>
            <Mui.ListItemText primary='Motor Status' />
          </Mui.ListItemButton>
        </Link>
      </Mui.List>

    </Mui.Drawer>
  )
}