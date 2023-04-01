import React from "react";

// Mui
import * as Mui from "@mui/material";

// Components
import DrawerContext from "./components/DrawerContext";
import AppBar from "./components/Appbar";
import Drawer from "./components/Drawer";
import Main from "./components/Main";
import ChatBotCompo from "./components/chatbot/ChatBotCompo";
import MyChatBot from "./components/chatbot/MyChatBot";

const Chat = () => {

  return (
    <DrawerContext>
      <Mui.Box sx={{ display: "flex" }}>
        <Mui.CssBaseline />
        <AppBar />
        <Drawer />
        <Main>
          <Mui.Stack spacing={1}>
            <ChatBotCompo />
            {/* <MyChatBot /> */}
          </Mui.Stack>
        </Main>
      </Mui.Box>
    </DrawerContext>
  );
};

export default Chat;