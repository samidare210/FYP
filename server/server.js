const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')

const cors = require('cors')
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://192.168.1.107:3000',    // Frontend URL
        methods: ['GET', 'POST']            // Request methods
    }
})

const rclnodejs = require('rclnodejs')

// rclnodejs.init().then(() => {
//     const node = rclnodejs.createNode('test_node')
//     const pub = node.createPublisher('std_msgs/msg/String', 'test_topic')
//     msg = `Hello`

//     setInterval(function() {
//         pub.publish(msg)
//         // console.log('Published message: ' + msg)
//     }, 1000)
    
//     rclnodejs.spin(node)
// })

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

const MOVE_FORWARD = {cmd_id: 0x08, value: 1.0}
const MOVE_BACKWARD = {cmd_id: 0x08, value: -1.0}

const TURN_LEFT = {cmd_id: 0x04, value: 1.0}
const TURN_RIGHT = {cmd_id: 0x04, value: -1.0}

var motion_data

rclnodejs.init().then(() => {
    const node = rclnodejs.createNode('test_node')
    const pub = node.createPublisher('motion_msgs/msg/MotionCtrl', 'diablo/MotionCmd')
    
    motion_data = STATIONARY

    setInterval(function() {
        pub.publish(motion_data)
        console.log(`Data Published: {cmd_id: ${motion_data.cmd_id}, value: ${motion_data.value}}`)
    }, 1000)

    rclnodejs.spin(node)
})

// connection event
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on('msg_send', (data) => {
        console.log(data);

        // Emit 
        socket.broadcast.emit('msg_receive', data)
    })
})

const server_port = 3001

// Set server to listen to port 3001
server.listen(server_port, () => {
    console.log("Server is running...")
})