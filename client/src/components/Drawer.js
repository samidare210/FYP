import { useContext } from 'react'

// Mui
import * as Mui from '@mui/material'
import { useTheme } from '@mui/material/styles'

// Mui Icons
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import BoltIcon from '@mui/icons-material/Bolt'
import TimelineIcon from '@mui/icons-material/Timeline'

// Components
import { Context } from './DrawerContext'
import DrawerHeader from './DrawerHeader'
import ListItemCtrl from './ListItemCtrl'

// React-Router
import { Link } from 'react-router-dom';

const drawerWidth = 320

export default function Drawer() {
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
        <ListItemCtrl></ListItemCtrl>

        <Mui.ListItemButton>
          <Mui.ListItemIcon>
            <BoltIcon />
          </Mui.ListItemIcon>
          <Link to="/BatteryStatus">
          <Mui.ListItemText primary='Battery Status' />
          </Link>
        </Mui.ListItemButton>

        <Mui.ListItemButton>
          <Mui.ListItemIcon>
            <TimelineIcon />
          </Mui.ListItemIcon>
          <Mui.ListItemText primary='Motor Status' />
        </Mui.ListItemButton>
      </Mui.List>

    </Mui.Drawer>
  )
}