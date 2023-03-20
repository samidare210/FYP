import React from "react";

// Mui
import * as Mui from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

// Mui icons
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import SwipeUpAltIcon from "@mui/icons-material/SwipeUpAlt";
import SwipeDownAltIcon from "@mui/icons-material/SwipeDownAlt";

import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// Others
import ReactNipple from "react-nipple";
import HoldBtn from "./HoldBtn";

// Socket
import { socket } from "../SocketControls"

const ToggleButton = styled(Mui.ToggleButton)(() => ({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: theme.palette.primary.main
  }
}))

const theme = createTheme({
  palette: {
    text: {
      primary: "#1976d2"
    }
  }
})

export default function Controller() {
  const [stand, setStand] = React.useState(false);

  const handlePosition = (e, newPosition) => {
    if (newPosition !== null) {
      setStand(newPosition);
    }
  };

  if (stand == true) {
    socket.emit("msg_send", "stand");
  } else {
    socket.emit("msg_send", "prone")
  }

  const handleLHSNip = (data) => {
    switch (data.direction.angle) {
      case "up":
        socket.emit("msg_send", "move_forward")
        break
      case "down":
        socket.emit("msg_send", "move_backward")
        break
      case "left":
        socket.emit("msg_send", "turn_left")
        break
      case "right":
        socket.emit("msg_send", "turn_right")
        break
      default:
        break
    }
  }
  
  const handleRHSNip = (data) => {
    switch (data.direction.angle) {
      case "up":
        socket.emit("msg_send", "pitch_up")
        break
      case "down":
        socket.emit("msg_send", "pitch_down")
        break
      case "left":
        socket.emit("msg_send", "roll_left")
        break
      case "right":
        socket.emit("msg_send", "roll_right")
        break
      default:
        break
    }
  }

  const handleLHSNipEnd = () => {
    socket.emit("msg_send", "stationary")
  }

  const handleRHSNipEnd = () => {
    socket.emit("msg_send", "pitch_stop")
  }

  return (
    <Mui.Paper sx={{ width: 1 }}>
      <Mui.Stack
        direction="row"
        divider={<Mui.Divider orientation="vertical" flexItem />}
      >
        <ReactNipple
          options={{
            color: "black",
            mode: "static",
            position: { top: "50%", left: "50%" },
            multitouch: true,
          }}
          style={{
            width: 200,
            height: 200,
            position: "relative",
          }}
          onDir={(e, data) => handleLHSNip(data)}
          onEnd={handleLHSNipEnd}
        />
        <Mui.Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Mui.Stack spacing={1} direction="row">
            <ThemeProvider theme={theme}>
              <Mui.ToggleButtonGroup
                value={stand}
                onChange={handlePosition}
                exclusive
              >
                <ToggleButton value={true}>
                  <ArrowDropUpIcon />
                </ToggleButton>
                <ToggleButton value={false}>
                  <ArrowDropDownIcon />
                </ToggleButton>
              </Mui.ToggleButtonGroup>
            </ThemeProvider>
            <HoldBtn
              child={<WarningAmberIcon />}
              color="error"
              mouseDownMsg="kill"
              mouseUpMsg="stationary"
            />
            <HoldBtn
              child={<SwipeUpAltIcon />}
              mouseDownMsg="move_forward"
              mouseUpMsg="stationary"
            />
            <HoldBtn
              child={<SwipeDownAltIcon />}
              mouseDownMsg="move_backward"
              mouseUpMsg="stationary"
            />
            <HoldBtn
              child={<RotateLeftIcon />}
              mouseDownMsg="turn_left"
              mouseUpMsg="stationary"
            />
            <HoldBtn
              child={<RotateRightIcon />}
              mouseDownMsg="turn_right"
              mouseUpMsg="stationary"
            />
          </Mui.Stack>
        </Mui.Box>
        <ReactNipple
          options={{
            color: "black",
            mode: "static",
            position: { top: "50%", left: "50%" },
            multitouch: true,
            lockY: true
          }}
          style={{
            width: 200,
            height: 200,
            position: "relative",
          }}
          onDir={(e, data) => handleRHSNip(data)}
          onEnd={(e, data) => handleRHSNipEnd(data)}
        />
      </Mui.Stack>
    </Mui.Paper>
  );
}
