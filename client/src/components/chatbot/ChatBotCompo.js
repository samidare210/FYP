import React, { useState, createContext, useEffect } from 'react';
import ChatBot from 'react-simple-chatbot';

import { socket } from '../../SocketChatbot'; 
import Guiding from './Guiding';
import Directions from "./Directions";

import './chatbot.css';
import { borderRadius } from '@mui/system';

export const ChatBotContext = createContext();

/* 
    Steps
    1. greet
    2. help
    3. userInput -> searchKeywords() -> searchLocation() -> getMission() -> guilding
    4. guilding -> startMission() -> checkMission() -> arrived
    7. arrived
    8. options

    <showDirection />
    startGuiding

    Tasks
    1. Fix bug related to passing mission values to variable
    2. Added steps feature for chatbot
    3. Added speech to text (*similar to google search)
    4. Added language selections
    5. Added support to phone and tablet ratio.
*/

var map = 'Map_01'

const missions = [
	{ from: 'start' , to: [
		{ loc: 'a204a', mission: 'Mission_01', 
            directions: [
                { step: 'start', prim: 'Current Location', secd: 'Lab A204'},
                { step: 'straight', prim: 'Head straight to', secd: '' },
                { step: 'turn left', prim: 'Turn left towards', secd: '' },
                { step: 'turn right', prim: 'Turn right towards', secd: '' },
                { step: 'slight left', prim: 'Slight left towards', secd: '' },
                { step: 'slight right', prim: 'Slight right towards', secd: '' },
                { step: 'end', prim: 'Destination', secd: 'Room A204a' },
            ] 
        }, 
		{ loc: 'a204b', mission: 'Mission_02', 
            directions: [
                { step: 'start', prim: 'Current Location', secd: 'Lab A204'},
                { step: 'straight', prim: 'Head straight to', secd: '' },
                { step: 'turn left', prim: 'Turn left towards', secd: '' },
                { step: 'turn right', prim: 'Turn right towards', secd: '' },
                { step: 'slight left', prim: 'Slight left towards', secd: '' },
                { step: 'slight right', prim: 'Slight right towards', secd: '' },
                { step: 'end', prim: 'Destination', secd: 'Room A204a' },
            ] 
        }, 
		{ loc: 'a204c', mission: 'Mission_03', 
            directions: [
                { step: 'start', prim: 'Current Location', secd: 'Lab A204'},
                { step: 'straight', prim: 'Head straight to', secd: '' },
                { step: 'turn left', prim: 'Turn left towards', secd: '' },
                { step: 'turn right', prim: 'Turn right towards', secd: '' },
                { step: 'slight left', prim: 'Slight left towards', secd: '' },
                { step: 'slight right', prim: 'Slight right towards', secd: '' },
                { step: 'end', prim: 'Destination', secd: 'Room A204a' },
            ] 
        },
        { loc: 'a204d', mission: 'Mission_04', 
            directions: [
                { step: 'start', prim: 'Current Location', secd: 'Lab A204'},
                { step: 'straight', prim: 'Head straight to', secd: '' },
                { step: 'turn left', prim: 'Turn left towards', secd: '' },
                { step: 'turn right', prim: 'Turn right towards', secd: '' },
                { step: 'slight left', prim: 'Slight left towards', secd: '' },
                { step: 'slight right', prim: 'Slight right towards', secd: '' },
                { step: 'end', prim: 'Destination', secd: 'Room A204a' },
            ] 
        },
        { loc: 'a204e', mission: 'Mission_05', 
            directions: [
                { step: 'start', prim: 'Current Location', secd: 'Lab A204'},
                { step: 'straight', prim: 'Head straight to', secd: '' },
                { step: 'turn left', prim: 'Turn left towards', secd: '' },
                { step: 'turn right', prim: 'Turn right towards', secd: '' },
                { step: 'slight left', prim: 'Slight left towards', secd: '' },
                { step: 'slight right', prim: 'Slight right towards', secd: '' },
                { step: 'end', prim: 'Destination', secd: 'Room A204a' },
            ] 
        }
	]},
	{ from: 'a204a', to: [
		{ loc: 'start', mission: 'Mission_0' }, 
	]},
	{ from: 'a204b', to: [
		{ loc: 'start', mission: 'Mission_0' }, 
	]},
	{ from: 'a204c', to: [
		{ loc: 'start', mission: 'Mission_0' }, 
	]},
    { from: 'a204d', to: [
		{ loc: 'start', mission: 'Mission_0' }, 
	]},
    { from: 'a204e', to: [
		{ loc: 'start', mission: 'Mission_0' }, 
	]},
]

function getMission(from, to) {
	let fromObj = missions.find((item) => item.from === from);

	if (fromObj) {
		let toObj = fromObj.to.find((item) => item.loc === to);
		if (toObj) {
			return toObj.mission;
		}
	}
	return null;
}

function getDirections(from, to) {
    let fromObj = missions.find((item) => item.from === from);

	if (fromObj) {
		let toObj = fromObj.to.find((item) => item.loc === to);
		if (toObj) {
			return toObj.directions;
		}
	}
	return null;
}

// Define the keywords and locations
const keywords = /(where is|direction to|go to)/i;
const locations = /(a204a|a204b|a204c|a204d|a204e)/i;

var currentLocation = null;
var pendingLocation = null;

// Define the location path
const path = {
    from: "",
    to: ""
}

// Set current location of the robot
function setCurrentLocation(location) {
    currentLocation = location;
}

// Set pending locatin of the robot
function setPendingLocation(location) {
    pendingLocation = location;
}

// Set start to point path
function setPath(loc1, loc2) {
    path.from = loc1;
    path.to = loc2;
}

const ChatBotCompo = () => { 
    const [key, setKey] = useState(null);
    const [mission, setMission] = useState(null);
    const [directions, setDirections] = useState(null);

    const searchKeywords = (value) => {
        let response = '';
        const valueToLower = value.toLowerCase();
    
        if (keywords.test(valueToLower)) { 
           
            if (valueToLower.match(/where is|direction to|go to/i)) {   // Check question keywords
    
                if (valueToLower.match(locations)) {    // Check location keywords
    
                    const location = valueToLower.match(locations)[0];
                    setPendingLocation(location);
    
                    if (currentLocation == null) {
                        currentLocation = 'start';
                    }
                    setPath(currentLocation, pendingLocation);  // Set path
                    console.log(path);

                    let mission = null;
                    mission = getMission(path.from, path.to);   // Get corresponding mission
                    console.log(mission);

                    if (mission !== null) { // Start step 'guiding'
                        setMission(mission);
                        setDirections(getDirections(path.from, path.to));
                        response = 'directions';
                    } else {    // Exception
                        response = 'error_04';
                    }
                } else {    // Exception
                    response = 'error_02'
                }
            }
        } else {    // Exception
            response = 'error_01';
        } 
        return response;
    }

    const backToStart = () => {
        setPendingLocation('start');
        setPath(currentLocation, pendingLocation);
        console.log(path);

        let mission = null;
        mission = getMission(path.from, path.to);
        console.log(mission);

        socket.emit('/nav/state/config', 'START');
        console.log('Emitted signal to start navigation...');
    
        socket.emit('/mission/start/', `{ mission_id: '${mission}', map_id: '${map}' }`); 
        console.log('Emitted signal to start mission...');

        setKey(key + 1); // Reflash the chatbot

        return 'reflash'
    }

    const avatarStyle = {
        width: "60px",
        height: "60px",
        backgroundColor: "white",
        borderRadius: "4px"
    }

    return (
        <ChatBotContext.Provider value={{ mission, directions }}>
            <ChatBot
                key={key}
                headerTitle="Diablo Robot"
                recognitionEnable={true}
                recognitionLang="en"
                hideHeader={true}
                // avatarStyle={avatarStyle}
                steps={[
                    {
                        id: 'greet',
                        message: 'Hi, I\'m Diablo Robot.',
                        trigger: 'help'
                    },
                    {
                        id: 'help',
                        message: 'How may I help you?',
                        trigger: 'userInput'
                    },
                    {
                        id: 'userInput',
                        user: true,
                        trigger: ({ value }) => {
                            return searchKeywords(value);
                        }
                    },
                    {
                        id: 'directions',
                        component: <Directions directions={directions} />,
                        waitAction: true,
                        trigger: 'guiding'
                    },
                    {
                        id: 'guiding',
                        component: <Guiding mission={mission} map={map} />,
                        asMessage: true,
                        waitAction: true,
                        replace: true,
                        trigger: 'arrived'
                    },
                    {
                        id: 'arrived',
                        message: `You have arrived to your requested to ${pendingLocation}.`,
                        trigger: () => {
                            setCurrentLocation(pendingLocation);
                            return 'options'
                        }
                    },
                    {
                        id: 'options',
                        message: 'Would you like me to lead you back to the start',
                        trigger: 'sections'
                    },
                    {
                        id: 'sections',
                        options: [
                            { 
                                value: 1, 
                                label: 'Yes', 
                                trigger: 'backToStart'
                            },
                            { 
                                value: 2, 
                                label: 'No', 
                                trigger: 'backToStart'
                            },
                        ]
                    }, 
                    {
                        id: 'backToStart',
                        message: 'I will see you back at the start',
                        trigger: () => { 
                            backToStart();
                        }
                    }, 
                    {
                        id: 'reflash',
                        message: 'Good Bye',
                        end: true
                    },
                    {   // Exception : Failed to find keyword
                        id: 'error_01',
                        message: "I'm sorry, I didn't understand. Please try again.",
                        trigger: 'userInput'
                    },
                    {   // Exception : Failed to find location keyword
                        id: 'error_02',
                        message: "I'm sorry, I didn't recognize the location.",
                        trigger: 'userInput'
                    },  
                    {   // Exception : Already at the location
                        id: 'error_03',
                        message: "I'm sorry, you are already at the location.",
                        trigger: 'userInput'
                    },
                    {   // Exception : Failed to find mission
                        id: 'error_04',
                        message: 'My apologies, I have failed to find the path corresponds to your reqested location.',
                        trigger: 'userInput'
                    }
                ]}
            />
        </ChatBotContext.Provider>
    );
};

export default ChatBotCompo;