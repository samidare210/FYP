import React, { useState, useContext } from 'react';
import { socket } from '../../SocketChatbot'; 
import { Loading } from 'react-simple-chatbot';

import { ChatBotContext } from './ChatBotCompo';

const Guiding = ({ triggerNextStep, ...props }) => {
    const [arrived, setArrived] = useState(false);
    const { mission } = useContext(ChatBotContext);

    socket.on('/nav/state', (state) => {
        if (state === 'STOP') {
            console.log('Navigation state has stopped.');
            setArrived(true);
            triggerNextStep();
        }
    })

    const startMission = (map, mission) => {
        socket.emit('/nav/state/config', 'START'); // Start
        console.log('Emitted signal to start navigation...');
    
        socket.emit('/mission/start/', `{ mission_id: '${mission}', map_id: '${map}' }`); 
        console.log('Emitted signal to start mission...');
        console.log(`{ mission_id: '${mission}', map_id: '${map}' }`);
    }

    startMission(props.map, mission);
    // *testing only
    setTimeout(function() {
        console.log('Navigation state has stopped.');
        setArrived(true)
        triggerNextStep();
    }, 3000)

    return (
        <>
            Please follow me<Loading />
        </>
    )
}

export default Guiding;