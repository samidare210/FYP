import React from "react";

// Mui
import * as Mui from "@mui/material";

// Components
import DrawerContext from "./components/DrawerContext";
import AppBar from "./components/Appbar";
import Drawer from "./components/Drawer";
import Main from "./components/Main";

import Chatbox from "./components/Chatbox";

export default function Chat() {
  return (
    <DrawerContext>
      <Mui.Box sx={{ display: "flex" }}>
        <Mui.CssBaseline />
        <AppBar />
        <Drawer />

        <Main>
          <Mui.Stack spacing={1}>
            <Chatbox />
          </Mui.Stack>
        </Main>
      </Mui.Box>
    </DrawerContext>
  );
}