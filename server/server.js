const express = require('express')
const app = express()
const server = require('http').createServer(app)
const { Server } = require('socket.io')

const cors = require('cors')
app.use(cors())

const host = '192.168.1.106'
const port_client = '3000'
const port_server = '3001'

const io = new Server(server, {
    cors: {
        origin: `http://${host}:${port_client}`,    // Frontend URL
        methods: ['GET', 'POST']                    // Request methods
    }
})

// Set server to listen to port 3001
server.listen(port_server, () => {
    console.log(`[${host}:${port_server}] | Server is running...`)
})

// connection event
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on('msg_send', (data) => {
        console.log(`Message received: ${data}`);
        ctrl_data = data
    })
})

const rclnodejs = require('rclnodejs')
const { kill } = require('process')

// Original Ctrl ID
const CMD_GO_FORWARD = 0x08
const CMD_GO_LEFT = 0x04
const CMD_ROLL_RIGHT = 0x09

const CMD_HEIGH_MODE = 0x01
const CMD_BODY_UP = 0x11

const CMD_STAND_UP = 0x02
const CMD_STAND_DOWN  =  0x12

const CMD_PITCH = 0x03
const CMD_PITCH_MODE = 0x13

const CMD_SPEED_MODE = 0x05

// [NEW] Motion Objects
const STATIONARY = {cmd_id: 0, value: 0}

const STAND_UP = {cmd_id: 0x02, value: 0}
const CROUCH_DOWN = {cmd_id: 0x12, value: 0}

const MOVE_FORWARD = {cmd_id: 0x08, value: 0.5}
const MOVE_BACKWARD = {cmd_id: 0x08, value: -0.5}

const TURN_LEFT = {cmd_id: 0x04, value: 2}
const TURN_RIGHT = {cmd_id: 0x04, value: -2}

var ctrl_data
var motion_data

rclnodejs.init().then(() => {
    const teleop_nodejs = new rclnodejs.Node('teleop_nodejs')
    const pub = teleop_nodejs.createPublisher(
        'motion_msgs/msg/MotionCtrl', 
        'diablo/MotionCmd'
    )
    
    setInterval(function() {
        switch (ctrl_data) {
            case 'kill':
                kill(3001, 'tcp')
                break;
            case 'stand_up':
                motion_data = STAND_UP
                break;
            case 'crouch_down':
                motion_data = CROUCH_DOWN
                break;
            case 'move_forward':
                motion_data = MOVE_FORWARD
                break;
            case 'move_backward':
                motion_data = MOVE_BACKWARD
                break;
            case 'turn_left':
                motion_data = TURN_LEFT
                break
            case 'turn_right':
                motion_data = TURN_RIGHT
                break
            default:
                ctrl_data = 'stationary'
                motion_data = STATIONARY
        }
        pub.publish(motion_data)
        console.log(`Published data: ${ctrl_data}, ${Object.values(motion_data)}}`)
    }, 20)
    teleop_nodejs.spin()

    // const battery_nodejs = new rclnodejs.Node('')
})