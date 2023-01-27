import React from 'react';

// Socket.io
import io from 'socket.io-client'

// Mui
import * as Mui from '@mui/material'

// Components
import DrawerContext from './components/DrawerContext'
import AppBar from './components/Appbar'
import Drawer from './components/Drawer'
import Main from './components/Main'
import MotorState from './components/MotorState'

// ApexCharts
import ApexChart from 'react-apexcharts'

/*
  Note that the frontend is running at the port 3000
  and the backend is running at the port 3001.
*/
const host = '192.168.1.106'
const port = '3001'
const socket = io.connect(`http://${host}:${port}`) // Connect to the URL of the backend server
// Setup SSL in package
// HTTPS=true SSL_CRT_FILE=./ssl/192.168.1.106.pem SSL_KEY_FILE=./ssl/192.168.1.106-key.pem

export default function MotorStatus() {

  const currentTime = new Date();
  currentTime.setUTCHours(currentTime.getUTCHours() + 8);

  const [value, setValue] = React.useState([{
    x: currentTime,
    y: [
      { data: 0 },
      { data: 0 }
    ]
  }])

  const [series, setSeries] = React.useState([{
    data: value
  }])

  socket.on('msg_test', (arg) => {
    setValue([
      ...value, { 
        x: currentTime.getTime(), 
        y: [
          { data: arg.left_wheel_vel.toFixed(2) },
          { data: arg.right_wheel_vel.toFixed(2) }
        ]
      }
    ])
    setSeries([{ data: value }])
  })

  const [options, setOptions] = React.useState({
    chart: {
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    title: {
      text: 'Motor Velocity',
      align: 'left',
      offsetX: 20,
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        fontFamily:  'Arial',
        color: 'rgba(0, 0, 0, 1)'
      }
    },
    subtitle: {
      text: 'Left & Right Wheel',
      align: 'left',
      margin: 0,
      offsetX: 20,
      style: {
        fontSize: '12px',
        fontWeight: 'normal',
        fontFamily:  'Arial',
        color: 'rgba(0, 0, 0, 0.6)'
      }
    },
    dataLabels: { 
      enabled: false
    },
    stroke: {
      width: [2, 2]
    },
    markers: { 
      size: 0 
    },
    colors: ['#00b0ff','#ff9800'],
    series: [
      {
        name: 'Left Wheel',
      },
      {
        name: 'Right Wheel',
      }
    ],
    xaxis: {
      type: 'datetime',
      range: 100000,
      // categories: ['13:05:24', '13:05:25', '13:05:26', '13:05:27', '13:05:28', '13:05:29', '13:05:30', '13:05:31']
    },
    yaxis: {
      max: 5,
      min: -5,
      axisTicks: { show: false },
      axisBorder: { show: true }
    },
    legend: {
      horizontalAlign: 'left',
      offsetX: 0
    }
  })

  return (
    <DrawerContext>
      <Mui.Box sx={{ display: 'flex' }}>
        <Mui.CssBaseline />
        <AppBar />
        <Drawer />

        <Main>
          <Mui.Paper elevation={4} sx={{ width: 800, pt: 2 }}>
            <ApexChart height={400} options={options} series={series} />
          </Mui.Paper>

          <MotorState></MotorState>
        </Main>
      </Mui.Box>
    </DrawerContext>
  )
}