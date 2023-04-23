import React, { useState, useEffect, useContext } from 'react';
import { socket } from '../../SocketChatbot';
import { Loading } from 'react-simple-chatbot';
import { ChatBotContext } from './ChatBotCompo';

const Guiding = ({ triggerNextStep }) => {
    const { mission, missionList } = useContext(ChatBotContext);

    useEffect(() => {
		// Check the nav state (START, STOP)
		socket.on('/nav/state', (state) => {			
			console.log(`Received nav state: `, state)
            if (state === 'STOP') {
                console.log('Navigation state has stopped.');
                triggerNextStep();
            }
		})
    }, [])

    const startMission = (mid) => {
        const filtered = missionList.filter(({mission_id}) =>  mission_id === mid);
        if (filtered.length === 0) {
            alert(`[Error]: No mission named ${mid} found`);
        } else {
            socket.emit('/nav/state/config', 'START');
            console.log('Emitted signal to start navigation...');
        
            socket.emit('/mission/start', mid); 
            console.log('Emitted signal to start mission...', mid);
        }
    }

    // startMission(mission);

    // *testing only
    // setTimeout(function() {
    //     console.log('Navigation state has stopped.');
    //     triggerNextStep();
    // }, 10000)

    return (
        <>
            Please follow me<Loading />
        </>
    )
}

export default Guiding;