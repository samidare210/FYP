// Socket.io
import io from 'socket.io-client'

/*
  Note that the frontend is running at the port 3000
  and the backend is running at the port 3001.
*/
const host = '192.168.4.9'
const port = '13000'
const socket = io(`ws://${host}:${port}`) // Connect to the URL of the backend server

export { socket }
