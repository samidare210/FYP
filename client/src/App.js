import React from "react";

// Socket.io
import io from "socket.io-client";

// Mui
import * as Mui from "@mui/material";

// Components
import DrawerContext from "./components/DrawerContext";
import AppBar from "./components/Appbar";
import Drawer from "./components/Drawer";
import Main from "./components/Main";

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
          <Mui.Box sx={{ width: 1, height: 720 }} />
          <Mui.Stack spacing={1}>
            <Controller socket={socket} />
          </Mui.Stack>
        </Main>
      </Mui.Box>
    </DrawerContext>
  );
}
