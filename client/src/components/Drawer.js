import { useContext } from 'react'

// Mui
import * as Mui from '@mui/material'
import { useTheme } from '@mui/material/styles'

// Mui icons
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import InboxIcon from '@mui/icons-material/Inbox'
import MailIcon from '@mui/icons-material/Mail'

import { Context } from './DrawerContext'
import DrawerHeader from './DrawerHeader'

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
    )
}