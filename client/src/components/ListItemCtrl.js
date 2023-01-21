import React from 'react'
import Slider from '@mui/material/Slider'

import * as Mui from '@mui/material'
import { styled } from '@mui/material/styles'
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset'
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

const marks = [
  { value: 0, lablel: '0.0f' },
  { value: 1, lablel: '1.0f' },
  { value: 2, lablel: '2.0f' },
  { value: 3, lablel: '3.0f' },
  { value: 4, lablel: '4.0f' },
  { value: 5, lablel: '5.0f' }
]

const CustomSlider = styled(Slider)({
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 10,
    background: 'unset',
    padding: 0,
    width: 30,
    height: 30,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#1976d2',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
})

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
          subheader={<Mui.ListSubheader>Settings</Mui.ListSubheader>}
        >
          <Mui.ListItem>
            <Mui.Box sx={{ width: 'inherit', height: 200 }}>
              <Mui.Typography gutterBottom></Mui.Typography>
              <CustomSlider
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={20}
                marks={marks}
              />
            </Mui.Box>
          </Mui.ListItem>
        </Mui.List>
      </Mui.Collapse>
    </>
  )
}