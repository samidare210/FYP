import React, { useState } from 'react'

export const Context = React.createContext();
export default function DrawerContext(props) {
    const [open, setOpen] = useState(false)

    return (
        <Context.Provider value={{ open, setOpen }}>
            {props.children}
        </Context.Provider>
    ) 
}