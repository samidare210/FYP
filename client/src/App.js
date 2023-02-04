import React from "react";

// Socket.io
import io from "socket.io-client";

// Mui
import * as Mui from "@mui/material";

// Mui icons
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import SwipeUpAltIcon from "@mui/icons-material/SwipeUpAlt";
import SwipeDownAltIcon from "@mui/icons-material/SwipeDownAlt";

import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";

// Components
import DrawerContext from "./components/DrawerContext";
import AppBar from "./components/Appbar";
import Drawer from "./components/Drawer";
import Main from "./components/Main";
import HoldBtn from "./components/HoldBtn";
import Controller from "./components/Controller";

/*
  Note that the frontend is running at the port 3000
  and the backend is running at the port 3001.
*/
const host = "192.168.1.109";
const port = "3001";
const socket = io.connect(`http://${host}:${port}`)// Connect to the URL of the backend server

export default function App() {
  return (
    <DrawerContext>
      <Mui.Box sx={{ display: "flex" }}>
        <Mui.CssBaseline />
        <AppBar />
        <Drawer socket={socket} />

        <Main>
          <Mui.Stack spacing={1}>
            <Mui.Stack spacing={1} direction="row">
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

            <Controller socket={socket} />
          </Mui.Stack>
        </Main>
      </Mui.Box>
    </DrawerContext>
  );
}
