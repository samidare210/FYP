import React, { useState } from 'react'

import * as Mui from '@mui/material'
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset'
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

export default function ListItemCtrl() {
    const [open, setOpen] = React.useState(false)

    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <>
            <Mui.ListItemButton onClick={handleClick}>
                <Mui.ListItemIcon>
                    <VideogameAssetIcon />
                </Mui.ListItemIcon>
                <Mui.ListItemText primary='Controls Panel'/>
                { open ? <ExpandLess /> : <ExpandMore />}
            </Mui.ListItemButton>
            <Mui.Collapse in={open} timeout='auto' unmountOnExit>
                <Mui.Box>
                    <Mui.Typography variant='h6'>Hello</Mui.Typography>
                </Mui.Box>
            </Mui.Collapse>
        </>
    )
}