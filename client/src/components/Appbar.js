import { useContext } from 'react'

// Mui 
import * as Mui from '@mui/material'
import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu'

import { Context } from './DrawerContext'

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

	return (
		<AppBar position="fixed" open={open}>
			<Mui.Toolbar>
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
				<Mui.Typography variant="h6" noWrap component="div">
					Diablo Control
				</Mui.Typography>
			</Mui.Toolbar>
		</AppBar>
	)
}