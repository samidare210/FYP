import React from "react";

import * as Mui from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import io from "socket.io-client";

// Socket
import { socket } from "../Socket"

export default function ListItemCtrl() {
  const [batteryState, setBatteryState] = React.useState({});

  socket.on("msg_batteryStatus", (arg) => {
    setBatteryState(arg);
  })

  const percentage = 72;

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <Mui.ListItemButton onClick={handleClick}>
        <Mui.ListItemIcon>
          <BoltIcon />
        </Mui.ListItemIcon>
        <Mui.ListItemText primary="Battery Status" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </Mui.ListItemButton>
      <Mui.Collapse in={open} timeout="auto" unmountOnExit>
        <Mui.List sx={{ width: "inherit" }}>
          <Mui.ListItem>
            <Mui.Stack direction="column" sx={{ width: "inherit", px: 2 }}>
              <Mui.Typography variant="body2" color="text.secondary" gutterBottom>
                Battery Percentage:
              </Mui.Typography>
              <Mui.Box sx={{ display: "flex", alignItems: 'center'}}>
                <Mui.Box sx={{ width: "100%", mr: 1 }}>
                  <Mui.LinearProgress variant="determinate" color="success" value={percentage} />
                </Mui.Box>
                <Mui.Box sx={{ minWidth: 35 }}>
                  <Mui.Typography variant="body2" color="text.secondary">
                    {`${percentage}%`}
                  </Mui.Typography>
                </Mui.Box>
              </Mui.Box>
            </Mui.Stack>
          </Mui.ListItem>
        </Mui.List>
      </Mui.Collapse>
    </>
  );
}
