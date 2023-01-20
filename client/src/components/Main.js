import { useContext } from 'react'

// Mui System
import { styled } from '@mui/material/styles'

import { Context } from './DrawerContext'
import DrawerHeader from './DrawerHeader'

const drawerWidth = 320

const Container = styled(
    'main', { shouldForwardProp: (prop) => prop !== 'open' 
})(({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
)

export default function Main(props) {
    const open = useContext(Context)
    
    return (
        <Container open={open}>
            <DrawerHeader />
            {props.children}
        </Container>
    )
}