import { useContext, useEffect, useState } from 'react'

// Mui 
import * as Mui from '@mui/material'
import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu'

import { Context } from './DrawerContext'
import { socket } from '../SocketChatbot';

const drawerWidth = 320

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}))

export default function Appbar() {
	const { open, setOpen } = useContext(Context);

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const [missionList, setMissionList] = useState([])
	useEffect(() => {

		// Check mission list
		socket.on('/mission/list', ({list}) => {			
			console.log(`received mission list: `, list)
			setMissionList(list)
		})

		// Check the nav state (START, STOP)
		socket.on('/nav/state', (state) => {			
			console.log(`received nav state: `, state)
		})
	}, [])

	return (
		<AppBar position="fixed" open={open}>
			<Mui.Toolbar>
			{/* <Mui.IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={() => {
						const filtered = missionList.filter(({mission_id}) => mission_id === 'Mission_1680515746')
						if (filtered.length === 0) {
							alert('no mission named Mission_1680515746 found')
						} else {
              const mission = filtered[0]
							socket.emit('/nav/state/config', 'START');
							console.log('Emitted signal to start navigation...');
					
							socket.emit('/mission/start', mission); 
							console.log('Emitted signal to start mission...', mission);
						}
					}}
					edge="start"
					sx={{
						mr: 2,
						...(open && { display: 'none' })
					}}
				>
					<MenuIcon />
				</Mui.IconButton> */}
				<Mui.IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={handleDrawerOpen}
					edge="start"
					sx={{
						mr: 2,
						...(open && { display: 'none' })
					}}
				>
					<MenuIcon />
				</Mui.IconButton>
				<Mui.Typography
					variant="h6"
					noWrap
					component="a"
					href="/"
					sx={{
						mr: 2,
						display: { xs: 'none', md: 'flex' },
						fontFamily: 'monospace',
						fontWeight: 600,
						color: 'inherit',
						textDecoration: 'none',
						textTransform: 'uppercase'
					}}
				>
					diablo control
				</Mui.Typography>
			</Mui.Toolbar>
		</AppBar>
	)
}