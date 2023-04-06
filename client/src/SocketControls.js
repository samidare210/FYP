// Socket.io
import io from 'socket.io-client'

/*
  Note that the frontend is running at the port 3000
  and the backend is running at the port 3001.
*/
const host = '192.168.1.106'
const port = '3001'
const socket = io(`http://${host}:${port}`) // Connect to the URL of the backend server

export { socket }