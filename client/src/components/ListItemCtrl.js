import React from 'react'

import * as Mui from '@mui/material'
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset'
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

const marks = [
  { value: 1, label: '1.0f' },
  { value: 2, label: '2.0f' },
  { value: 3, label: '3.0f' },
  { value: 4, label: '4.0f' },
  { value: 5, label: '5.0f' }
]

export default function ListItemCtrl() {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <Mui.ListItemButton onClick={handleClick}>
        <Mui.ListItemIcon>
          <VideogameAssetIcon />
        </Mui.ListItemIcon>
        <Mui.ListItemText primary='Controls Panel' />
        {open ? <ExpandLess /> : <ExpandMore />}
      </Mui.ListItemButton>
      <Mui.Collapse in={open} timeout='auto' unmountOnExit>
        <Mui.List
          sx={{
            width: 'inherit'
          }}
          subheader={<Mui.ListSubheader>Parameter Settings</Mui.ListSubheader>}
        >
          <Mui.ListItem>
            <Mui.Stack 
              direction='column' 
              sx={{
                width: 'inherit',
                px: 2 
              }}
            >
              <Mui.Box sx={{ mb: 2 }}>
                <Mui.Typography variant='body2' color='text.secondary'>
                  Movement Speed
                </Mui.Typography>
                <Mui.Slider
                  aria-label="slider"
                  valueLabelDisplay="auto"
                  defaultValue={3.0}
                  marks={marks}
                  min={1.0}
                  max={5.0}
                  step={0.1}
                />
              </Mui.Box>
              
              <Mui.Box sx={{ mb: 2 }}>
                <Mui.Typography variant='body2' color='text.secondary'>
                  Rotational Speed
                </Mui.Typography>
                <Mui.Slider
                  aria-label="slider"
                  valueLabelDisplay="auto"
                  defaultValue={3.0}
                  marks={marks}
                  min={1.0}
                  max={5.0}
                  step={0.1}
                />
              </Mui.Box>
            </Mui.Stack>
          </Mui.ListItem>
        </Mui.List>
      </Mui.Collapse>
    </>
  )
}