import React from "react";

// Mui
import * as Mui from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

// Mui icons
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// Others
import ReactNipple from "react-nipple";

import io from "socket.io-client";
const host = "localhost";
const port = "3001";
const socket = io.connect(`http://${host}:${port}`);

const ToggleButton = styled(Mui.ToggleButton)(() => ({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: theme.palette.primary.main,
  },
}));

const theme = createTheme({
  palette: {
    text: {
      primary: "#1976d2",
    },
  },
});

export default function Controller() {
  const [stand, setStand] = React.useState(false);

  const handlePosition = (e, newPosition) => {
    if (newPosition !== null) {
      setStand(newPosition);
    }
  };

  React.useEffect(() => {
    console.log(stand);
    socket.emit("msg_stand", stand);
  }, [stand]);

  const handleLHSNip = (data) => {
    switch (data.direction.angle) {
      case "up":
        socket.emit("msg_send", "move_forward");
        break;
      case "down":
        socket.emit("msg_send", "move_backward");
        break;
      case "left":
        socket.emit("msg_send", "turn_left");
        break;
      case "right":
        socket.emit("msg_send", "turn_right");
        break;
      default:
        break;
    }
  };

  const handleRHSNip = (data) => {
    switch (data.direction.angle) {
      case "up":
        socket.emit("msg_send", "");
        break;
      case "down":
        socket.emit("msg_send", "");
        break;
      case "left":
        socket.emit("msg_send", "roll_left");
        break;
      case "right":
        socket.emit("msg_send", "roll_right");
        break;
      default:
        break;
    }
  };

  const handleLHSNipEnd = () => {
    socket.emit("msg_send", "stationary");
  }

  const handleRHSNipEnd = () => {
    socket.emit("msg_send", "roll_reset");
  }

  return (
    <Mui.Paper sx={{ width: "75%" }}>
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
          <ThemeProvider theme={theme}>
            <Mui.ToggleButtonGroup
              value={stand}
              onChange={handlePosition}
              orientation="vertical"
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
        </Mui.Box>

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
          onDir={(e, data) => handleRHSNip(data)}
          onEnd={(e, data) => handleRHSNipEnd(data)}
        />
      </Mui.Stack>
    </Mui.Paper>
  );
}
