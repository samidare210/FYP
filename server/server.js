const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");

const cors = require("cors");
app.use(cors());

const host = "192.168.1.109"; // DEMO: 192.168.1.105
const port_client = "3000";
const port_server = "3001";

const io = new Server(server, {
    cors: {
        origin: `http://${host}:${port_client}`, // Frontend URL
        methods: ["GET", "POST"], // Request methods
    },
});

const { spawn } = require("child_process");

const rclnodejs = require("rclnodejs");
const { kill } = require("process");

// Default Values
var value_height = 1;
var last_height = value_height;

var value_lean = 0;
var last_lean = value_lean;

// [NEW] Motion Objects
const STATIONARY = { cmd_id: 0, value: 0 };

const STAND = { cmd_id: 0x02, value: 0 };
const PRONE = { cmd_id: 0x12, value: 0 };

const MOVE_FORWARD = { cmd_id: 0x08, value: 0 };
const MOVE_BACKWARD = { cmd_id: 0x08, value: 0 };

const TURN_LEFT = { cmd_id: 0x04, value: 0 };
const TURN_RIGHT = { cmd_id: 0x04, value: 0 };

const PITCH_UP = { cmd_id: 0x03, value: 1 };
const PITCH_DOWN = { cmd_id: 0x03, value: -1 };
const PITCH_STOP = { cmd_id: 0x03, value: 0 };

const ROLL_LEFT = { cmd_id: 0x09, value: -0.2 };
const ROLL_RIGHT = { cmd_id: 0x09, value: 0.2 };
const ROLL_RESET = { cmd_id: 0x09, value: 0 };

const SET_HEIGHT = { cmd_id: 0x11, value: value_height };
const SET_LEAN = { cmd_id: 0x09, value: value_lean };

var ctrl_data;
var mode_data;
var last_mode;
var motion_data;

var battery_status = 0;
var motor_status = {};

rclnodejs.init().then(() => {
    // Teleop
    const teleop_nodejs = new rclnodejs.Node("teleop_nodejs");
    const pub = teleop_nodejs.createPublisher(
        "motion_msgs/msg/MotionCtrl",
        "diablo/MotionCmd"
    );

    // Connection event
    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        socket.on("disconnect", () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });

        socket.on("msg_send", (data) => {
            ctrl_data = data;

            // DEBUG
            // console.log(ctrl_data)
        });

        socket.on("msg_mode", (data) => {
            mode_data = data;
        });

        socket.on("msg_resetRHS", (data) => {
            motion_data = PITCH_STOP;
            motion_data = ROLL_RESET;

            ctrl_data = "stationary";
            motion_data = STATIONARY;

            // DEBUG
            console.log(motion_data);
        });

        // Handle robot parameters' message
        socket.on("msg_height", (data) => {
            value_height = data;
            console.log(value_height);
        });

        socket.on("msg_lean", (data) => {
            value_lean = data;
            console.log(value_lean);
        });

        socket.on("msg_movementSpeed", (data) => {
            MOVE_FORWARD["value"] = data;
            MOVE_BACKWARD["value"] = -data;

            // DEBUG
            console.log(MOVE_FORWARD);
            console.log(MOVE_BACKWARD);
        });

        socket.on("msg_rotationalSpeed", (data) => {
            TURN_LEFT["value"] = data;
            TURN_RIGHT["value"] = -data;

            // DEBUG
            console.log(TURN_LEFT);
            console.log(TURN_RIGHT);
        });

        setInterval(() => {
            socket.emit("msg_batteryStatus", battery_status);
            socket.emit("msg_motorStatus", motor_status);
        }, 1000);
    });

    // Handle locomotion
    setInterval(function () {
        switch (ctrl_data) {
            case "kill":
                kill(3001, "tcp");
                break;

            // Forward & backward
            case "move_forward":
                motion_data = MOVE_FORWARD;
                break;

            case "move_backward":
                motion_data = MOVE_BACKWARD;
                break;

            // Turn
            case "turn_left":
                motion_data = TURN_LEFT;
                break;

            case "turn_right":
                motion_data = TURN_RIGHT;
                break;

            // Pitch
            case "pitch_up":
                motion_data = PITCH_UP;
                break;

            case "pitch_down":
                motion_data = PITCH_DOWN;
                break;
            case "pitch_stop":
                motion_data = PITCH_STOP;
                break;

            // Roll
            case "roll_left":
                motion_data = ROLL_LEFT;
                break;

            case "roll_right":
                motion_data = ROLL_RIGHT;
                break;

            default:
                ctrl_data = "stationary";
                motion_data = STATIONARY;
        }

        if (mode_data !== last_mode) {
            last_mode = mode_data;
            if (mode_data === "stand") {
                motion_data = STAND;
            } else {
                motion_data = PRONE;
            }
        }

        if (value_height !== last_height) {
            SET_HEIGHT["value"] = value_height;
            last_height = value_height;
            motion_data = SET_HEIGHT;

            // DEBUG
            console.log(SET_HEIGHT);
        }

        if (value_lean !== last_lean) {
            SET_LEAN["value"] = value_lean;
            last_lean = value_lean;
            motion_data = SET_LEAN;

            // DEBUG
            console.log(SET_LEAN);
        }

        pub.publish(motion_data);

        // DEBUG
        if (ctrl_data != "stationary")
            console.log(
                `Published data: {${ctrl_data}, ${Object.values(motion_data)}}`
            );
    }, 20);
    teleop_nodejs.spin();

    // States Node
    var status_count = 0;

    const status_nodejs = new rclnodejs.Node("status_nodejs");
    status_nodejs.createSubscription(
        "sensor_msgs/msg/BatteryState",
        "diablo/sensor/Battery",
        (status) => {
            battery_status = status;

            // DEBUG
            // console.log(`Received message No. ${++status_count}`, status)
        }
    );
    status_nodejs.createSubscription(
        "motion_msgs/msg/RobotStatus",
        "diablo/sensor/Body_state",
        (status) => {
            // DEBUG
            // console.log(`Received message No. ${++status_count}`, status)
        }
    );
    status_nodejs.createSubscription(
        "motion_msgs/msg/LegMotors",
        "diablo/sensor/Motors",
        (status) => {
            motor_status = status;

            // DEBUG
            // console.log(`Received message No. ${++status_count}`, status)
        }
    );
    status_nodejs.spin();
});

// Webcam Module
async function streamWebcam(webcam) {
    io.on("connection", (socket) => {
        console.log("Client connected");

        const videoEncoder = spawn("ffmpeg", [
            "-f", "video4linux2",
            "-framerate","12",
            "-pixel_format", "yuyv422",
            "-video_size","480x320",
            "-i", webcam,
            '-c:v', 'libvpx-vp9',
            "-b:a", "100k",
            '-deadline', 'realtime',
            '-cpu-used', '5',
            '-threads', '4',
            "-f","webm",
            "pipe:1",
        ]);

        videoEncoder.stdout.on("data", (data) => {
            socket.emit("video", data);
        });

        videoEncoder.stderr.on("data", (data) => {
            console.error(`stderr: ${data}`);
        });

        videoEncoder.on("close", (code) => {
            console.log(`child process exited with code ${code}`);
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected");
            videoEncoder.kill("SIGTERM");
        });
    });

    io.on("error", (err) => {
        console.error(`Server error: ${err}`);
    });
}

async function main() {
    await streamWebcam("/dev/video0");
}

main().catch((e) => {
    console.error(e.stack);
});

// Set server to listen to port 3001
server.listen(port_server, () => {
    console.log(`[${host}:${port_server}] | Server is running...`);
});
