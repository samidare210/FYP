import React from 'react'

import * as Mui from '@mui/material'
import BoltIcon from '@mui/icons-material/Bolt'
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import io from 'socket.io-client'

const host = '192.168.1.109'
const port = '3001'
const socket = io.connect(`http://${host}:${port}`)

export default function ListItemCtrl() {
  const [batteryState, setBatteryState] = React.useState({})

  socket.on('msg_batteryStatus', (arg) => {
    setBatteryState(arg)
  })

  const percentage = batteryState.percentage

  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <Mui.ListItemButton onClick={handleClick}>
        <Mui.ListItemIcon>
          <BoltIcon />
        </Mui.ListItemIcon>
        <Mui.ListItemText primary='Battery Status' />
        {open ? <ExpandLess /> : <ExpandMore />}
      </Mui.ListItemButton>
      <Mui.Collapse in={open} timeout='auto' unmountOnExit>
        <Mui.List
          sx={{
            width: 'inherit'
          }}
          subheader={<Mui.ListSubheader>Status</Mui.ListSubheader>}
        >
          <Mui.ListItem>
            <Mui.Stack direction='column' sx={{ width: 'inherit', px: 2 }}>
              <Mui.Typography varient='body1' gutterBottom>Battery Percentage:</Mui.Typography>
              <Mui.LinearProgress variant="determinate" color="success" value={percentage}/>
            </Mui.Stack>
          </Mui.ListItem>
        </Mui.List>
      </Mui.Collapse>
    </>
  )
}