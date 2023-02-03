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

import { CopyToClipboard } from "react-copy-to-clipboard"
import Peer from "simple-peer"
import AssignmentIcon from "@mui/icons-material/Assignment"
import PhoneIcon from "@mui/icons-material/Phone"

/*
  Note that the frontend is running at the port 3000
  and the backend is running at the port 3001.
*/
const host = "localhost";
const port = "3001";
const socket = io.connect(`https://${host}:${port}`)// Connect to the URL of the backend server
// Setup SSL in package
// HTTPS=true SSL_CRT_FILE=./ssl/192.168.1.106.pem SSL_KEY_FILE=./ssl/192.168.1.106-key.pem

export default function App() {
  const [me, setMe] = React.useState("");
  const [stream, setStream] = React.useState();
  const [receivingCall, setReceivingCall] = React.useState(false);
  const [caller, setCaller] = React.useState("");
  const [callerSignal, setCallerSignal] = React.useState();
  const [callAccepted, setCallAccepted] = React.useState(false);
  const [idToCall, setIdToCall] = React.useState("");
  const [callEnded, setCallEnded] = React.useState(false);
  const [name, setName] = React.useState("");

  const myVideo = React.useRef();
  const userVideo = React.useRef();
  const connectionRef = React.useRef();

  React.useEffect(() => {
    navigator.mediaDevices.getUserMedia({ 
      video: true, 
      audio: true 
    })
    .then((stream) => {
      setStream(stream);
      myVideo.current.srcObject = stream
    })

    socket.on("me", (id) => {
      setMe(id);
    })

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      })
    })

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  }

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <DrawerContext>
      <Mui.Box sx={{ display: "flex" }}>
        <Mui.CssBaseline />
        <AppBar />
        <Drawer socket={socket} />

        <Main>
          <Mui.Stack spacing={1}>
            <div>
              {stream && (
                <video playsInline muted ref={myVideo} autoPlay style={{ width: "400px" }} />
              )}
            </div>
            <div className="video">
              {callAccepted && !callEnded ? (
                <video playsInline ref={userVideo} autoPlay style={{ width: "400px" }} />
              ) : null}
            </div>
            <div>
              <Mui.TextField
                id="filled-basic"
                label="Name"
                variant="filled"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ marginBottom: "20px" }}
              />
              <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
                <Mui.Button
                  variant="contained"
                  color="primary"
                  startIcon={<AssignmentIcon fontSize="large" />}
                >
                  Copy ID
                </Mui.Button>
              </CopyToClipboard>

              <Mui.TextField
                id="filled-basic"
                label="ID to call"
                variant="filled"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
              />
              <div>
                {callAccepted && !callEnded ? (
                  <Mui.Button
                    variant="contained"
                    color="secondary"
                    onClick={leaveCall}
                  >
                    End Call
                  </Mui.Button>
                ) : (
                  <Mui.IconButton
                    color="primary"
                    aria-label="call"
                    onClick={() => callUser(idToCall)}
                  >
                    <PhoneIcon fontSize="large" />
                  </Mui.IconButton>
                )}
                {idToCall}
              </div>
            </div>
            <div>
              {receivingCall && !callAccepted ? (
                <div>
                  <h1>{name} is calling...</h1>
                  <Mui.Button
                    variant="contained"
                    color="primary"
                    onClick={answerCall}
                  >
                    Answer
                  </Mui.Button>
                </div>
              ) : null}
            </div>

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
