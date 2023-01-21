import React from 'react'

export const Context = React.createContext();
export default function DrawerContext(props) {
    const [open, setOpen] = React.useState(false)

    return (
        <Context.Provider value={{ open, setOpen }}>
            {props.children}
        </Context.Provider>
    ) 
}