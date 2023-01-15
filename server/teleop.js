//import required library
const rclnodejs = require('rclnodejs');
const  = require('');
import MotionCtrl from motion_msgs


// command to move robot related to serial port
const CMD_GO_FORWARD = 0x08;
const CMD_GO_LEFT = 0x04;
const CMD_ROLL_RIGHT = 0x09;

const CMD_HEIGH_MODE = 0x01;
const CMD_BODY_UP = 0x11;

const CMD_STAND_UP = 0x02;
const CMD_STAND_DOWN = 0x12;

const CMD_PITCH = 0x03;
const CMD_PITCH_MODE = 0x13;

const CMD_SPEED_MODE = 0x05;

console.log("node started");
rclnodejs.init().then(() => {
    const node = new rclnodejs.Node("diablo_teleop_node");
    const publisher = node.createPublisher("motion_msg");

});

