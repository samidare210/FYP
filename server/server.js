const express = require('express')
const app = express()
const server = require('http').createServer(app)
const { Server } = require('socket.io')

const cors = require('cors')
app.use(cors())

const host = '192.168.1.105'
const port_client = '3000'
const port_server = '3001'

const io = new Server(server, {
	cors: {
		origin: `http://${host}:${port_client}`,    // Frontend URL
		methods: ['GET', 'POST']                    // Request methods
	}
})

var body = { cmd_id: 0, value: 0 }
var lastValue

var battery_status = 0
var motor_status = {}

// Connection event
io.on('connection', (socket) => {
	console.log(`User connected: ${socket.id}`)

	socket.on('msg_send', (data) => {
		ctrl_data = data
		console.log(ctrl_data);
	})

	socket.on('msg_height', (data) => {
		body['cmd_id'] = 0x11
		body['value'] = data
		console.log(body)
	})

	socket.on('msg_lean', (data) => {
		body['cmd_id'] = 0x09
		body['value'] = data
		console.log(body)
	})

	setInterval(() => {
		var max = 5
		value = {
			left_hip_vel: genRandomValue(max),
			left_knee_vel: genRandomValue(max),
			left_wheel_vel: genRandomValue(max),
			right_hip_vel: genRandomValue(max),
			right_knee_vel: genRandomValue(max),
			right_wheel_vel: genRandomValue(max),

			left_hip_iq: genRandomValue(max),
			left_knee_iq: genRandomValue(max),
			left_wheel_iq: genRandomValue(max),
			right_hip_iq: genRandomValue(max),
			right_knee_iq: genRandomValue(max),
			right_wheel_iq: genRandomValue(max),
	
			left_leg_length: genRandomValue(max),
			right_leg_length: genRandomValue(max)
		}
		socket.emit('msg_test', value)

		socket.emit('msg_batteryStatus', battery_status)
		socket.emit('msg_motorStatus', motor_status)
	}, 1000)
})

var value = {
	left_hip_vel: 0,
	left_knee_vel: 0,
	left_wheel_vel: 0,
	right_hip_vel: 0,
	right_knee_vel: 0,
	right_wheel_vel: 0,

	left_hip_iq: 0,
	left_knee_iq: 0,
	left_wheel_iq: 0,
	right_hip_iq: 0,
	right_knee_iq: 0,
	right_wheel_iq: 0,

	left_leg_length: 0,
	right_leg_length: 0
}

function genRandomValue(max) {
	return (Math.random() * max * (Math.round(Math.random()) ? 1 : -1)).toFixed(2)
}

// Set server to listen to port 3001
server.listen(port_server, () => {
	console.log(`[${host}:${port_server}] | Server is running...`)
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
const CMD_STAND_DOWN = 0x12

const CMD_PITCH = 0x03
const CMD_PITCH_MODE = 0x13

const CMD_SPEED_MODE = 0x05

// [NEW] Motion Objects
const STATIONARY = { cmd_id: 0, value: 0 }

const STAND = { cmd_id: 0x02, value: 0 }
const PRONE = { cmd_id: 0x12, value: 0 }

const MOVE_FORWARD = { cmd_id: 0x08, value: 0.5 }
const MOVE_BACKWARD = { cmd_id: 0x08, value: -0.5 }

const TURN_LEFT = { cmd_id: 0x04, value: 2 }
const TURN_RIGHT = { cmd_id: 0x04, value: -2 }

const PITCH_UP = { cmd_id: 0x03, value: 1.0 }
const PITCH_DOWN = { cmd_id: 0x03, value: -1.0 }
const PITCH_STOP = { cmd_id: 0x03, value: 0 }

const ROLL_LEFT = { cmd_id: 0x09, value: -0.1 }
const ROLL_RIGHT = { cmd_id: 0x09, value: 0.1 }
const ROLL_RESET = { cmd_id: 0x09, value: 0 }

var ctrl_data
var motion_data

rclnodejs.init().then(() => {

	// Teleop
	const teleop_nodejs = new rclnodejs.Node('teleop_nodejs')
	const pub = teleop_nodejs.createPublisher(
		'motion_msgs/msg/MotionCtrl',
		'diablo/MotionCmd'
	)

	setInterval(function () {
		switch (ctrl_data) {
			case 'kill':
				kill(3001, 'tcp')
				break
		
		// Stand & crouch
			case 'stand':
				motion_data = STAND
				break
			case 'prone':
				motion_data = PRONE
				break

		// Forward & backward
			case 'move_forward':
				motion_data = MOVE_FORWARD
				break

			case 'move_backward':
				motion_data = MOVE_BACKWARD
				break
		
		// Turn
			case 'turn_left':
				motion_data = TURN_LEFT
				break

			case 'turn_right':
				motion_data = TURN_RIGHT
				break

		// Pitch
			case 'pitch_up':
				motion_data = PITCH_UP
				break

			case 'pitch_down':
				motion_data = PITCH_DOWN
				break
			
			case 'pitch_stop':
				motion_data = PITCH_STOP
				break

		// Roll
			case 'roll_left':
				motion_data = ROLL_LEFT
				break

			case 'roll_right':
				motion_data = ROLL_RIGHT
				break

			case 'roll_reset':
				motion_data = ROLL_RESET
				break

			default:
				ctrl_data = 'stationary'
				motion_data = STATIONARY
		}

		if (body['value'] !== lastValue) {
			motion_data = body
			lastValue = body['value']
		}
		
		pub.publish(motion_data)
		// console.log(`Published data: ${ctrl_data}, ${Object.values(motion_data)}}`)
	}, 20)
	teleop_nodejs.spin()

	// States Node
	var status_count = 0;
	const status_nodejs = new rclnodejs.Node('status_nodejs')
	status_nodejs.createSubscription(
		'sensor_msgs/msg/BatteryState',
		'diablo/sensor/Battery',
		(status) => {
			// console.log(`Received message No. ${++status_count}`, status)
		}
	)
	status_nodejs.createSubscription(
		'motion_msgs/msg/RobotStatus',
		'diablo/sensor/Body_state',
		(status) => {
			// console.log(`Received message No. ${++status_count}`, status)
		}
	)
	status_nodejs.createSubscription(
		'motion_msgs/msg/LegMotors',
		'diablo/sensor/Motors',
		(status) => {
			// console.log(`Received message No. ${++status_count}`, status)
			motor_status = status
		}
	)
	status_nodejs.spin()
})