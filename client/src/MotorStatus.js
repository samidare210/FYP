import React from 'react'

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

// Socket
import { socket } from "./SocketControls"

export default function MotorStatus() {

  const currentTime = new Date();
  currentTime.setUTCHours(currentTime.getUTCHours() + 8);

  const [data, setData] = React.useState([{
    x: currentTime,
    y: 0
  }])

  const [dataRight, setDataRight] = React.useState([{
    x: currentTime,
    y: 0
  }])

  const [series, setSeries] = React.useState([
    { data: data },
    { data: dataRight }
  ])

  socket.on('msg_motorStatus', (arg) => { 

    setData([
      ...data, { 
        x: currentTime.getTime(), 
        y: Math.round(arg.left_wheel_vel * 100) / 100
      }
    ])

    setDataRight([
      ...dataRight, { 
        x: currentTime.getTime(), 
        y: Math.round(arg.right_wheel_vel * 100) / 100
        
      }
    ])

    setSeries([{ data: data }, { data: dataRight }])
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
        fontFamily: 'Arial',
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
        fontFamily: 'Arial',
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
    colors: ['#00b0ff', '#ff9800'],
    series: [
      {
        name: 'Left Wheel'
      },
      {
        name: 'Right Wheel'
      }
    ],
    xaxis: {
      type: 'datetime',
      range: 100000
    },
    yaxis: {
      max: 7,
      min: -7,
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
            <ApexChart
              height={350}
              options={options}
              series={[
                {
                  data: data, 
                  name: "Left Wheel", 
                  color: "#00b0ff"
                },
                {
                  data: dataRight, 
                  name: "Right Wheel", 
                  color: "#ff9800"
                }
              ]}
            />
          </Mui.Paper>

          <MotorState></MotorState>
        </Main>
      </Mui.Box>
    </DrawerContext>
  )
}