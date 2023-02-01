import React from "react";

import * as Mui from "@mui/material";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";

import io from 'socket.io-client'
const host = '192.168.1.105'
const port = '3001'
const socket = io.connect(`http://${host}:${port}`)

const marks_heightSlider = [
  { value: 0, label: '0.0f' },
  { value: 0.5, label: '0.5f' },
  { value: 1, label: '1.0f' },
]

const marks_leanSlider = [
  { value: -0.2, label: '-0.2f' },
  { value: -0.1, label: '-0.1f' },
  { value: 0, label: '0.0f' },
  { value: 0.1, label: '0.1f' },
  { value: 0.2, label: '0.2f' }
]

const marks = [
  { value: 1, label: "1.0f" },
  { value: 2, label: "2.0f" },
  { value: 3, label: "3.0f" },
  { value: 4, label: "4.0f" },
  { value: 5, label: "5.0f" },
];

export default function ListItemCtrl(props) {
  const [open, setOpen] = React.useState(false);

  const [height, setHeight] = React.useState(0)
  const [lean, setLean] = React.useState(0)

  const handleClick = () => {
    setOpen(!open);
  }

  const handleHeightSlider = (e) => {
    setHeight(e.target.value)
  }

  const handleLeanSlider = (e) => {
    setLean(e.target.value)
  }

  React.useEffect(() => {
    socket.emit('msg_height', height)
  }, [height])

  React.useEffect(() => {
    socket.emit('msg_lean', lean)
  }, [lean])

  return (
    <>
      <Mui.ListItemButton onClick={handleClick}>
        <Mui.ListItemIcon>
          <VideogameAssetIcon />
        </Mui.ListItemIcon>
        <Mui.ListItemText primary="Controls Panel" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </Mui.ListItemButton>
      <Mui.Collapse in={open} timeout="auto" unmountOnExit>
        <Mui.List
          sx={{
            width: "inherit",
          }}
          subheader={<Mui.ListSubheader>Parameter Settings</Mui.ListSubheader>}
        >
          <Mui.ListItem>
            <Mui.Stack
              direction="column"
              sx={{
                width: "inherit",
                px: 2,
              }}
            >
              <Mui.Box sx={{ mb: 2 }}>
                <Mui.Typography variant="body2" color="text.secondary">
                  Standing Height
                </Mui.Typography>
                <Mui.Slider
                  onChange={handleHeightSlider}
                  defaultValue={0}
                  max={1}
                  min={0}
                  step={0.05}
                  marks={marks_heightSlider}
                />
              </Mui.Box>

              <Mui.Box sx={{ mb: 2 }}>
                <Mui.Typography variant="body2" color="text.secondary">
                  Leaning Degree
                </Mui.Typography>
                <Mui.Slider
                  onChange={handleLeanSlider}
                  defaultValue={0}
                  max={0.2}
                  min={-0.2}
                  step={0.025}
                  marks={marks_leanSlider}
                />
              </Mui.Box>
              <Mui.Box sx={{ mb: 2 }}>
                <Mui.Typography variant="body2" color="text.secondary">
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
                <Mui.Typography variant="body2" color="text.secondary">
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
  );
}
