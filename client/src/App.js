import React, { useEffect, useRef } from 'react';

// Mui
import * as Mui from "@mui/material";

// Components
import DrawerContext from "./components/DrawerContext";
import AppBar from "./components/Appbar";
import Drawer from "./components/Drawer";
import Main from "./components/Main";
import Controller from "./components/Controller";

import { socket } from "./SocketControls";

export default function App() {

  const videoRef = useRef(null);

  useEffect(() => {
    const mediaSource = new MediaSource();
    const video = videoRef.current;

    video.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener('sourceopen', (e) => {
      const sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');

      socket.on('video', (data) => {
        console.log("Video data retrieved: " + data);
        if (sourceBuffer.updating) return;

        const videoChunk = new Uint8Array(data);
        sourceBuffer.appendBuffer(videoChunk);
      });

      socket.on('disconnect', () => {
        socket.disconnect();
      });
    });
  }, []);

  return (
    <DrawerContext>
      <Mui.Box sx={{ display: "flex" }}>
        <Mui.CssBaseline />
        <AppBar />
        <Drawer />
        <Main>
          <Mui.Stack spacing={1}>
            <div style={{
              display: "flex",
              justifyContent: "center",
            }}>
              <video ref={videoRef} autoPlay ></video>
            </div>
            <Controller />
          </Mui.Stack>
        </Main>
      </Mui.Box>
    </DrawerContext>
  );
}