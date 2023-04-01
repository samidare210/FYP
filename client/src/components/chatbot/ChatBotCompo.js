import React, { useState, createContext, useEffect } from 'react';
import ChatBot from 'react-simple-chatbot';

import { socket } from '../../SocketChatbot'; 
import Guiding from './Guiding';
import Directions from "./Directions";

import './chatbot.css';

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
		{ loc: 'room 101', mission: 'Mission_01', 
            directions: [
                { step: 'start', prim: 'Lab X', secd: '10'},
                { step: 'straight', prim: 'Head straight to', secd: '20' },
                { step: 'turn left', prim: 'Turn left towards', secd: '30' },
                { step: 'turn right', prim: 'Turn right towards', secd: '40' },
                { step: 'slight left', prim: 'Slight left towards', secd: '50' },
                { step: 'slight right', prim: 'Slight right towards', secd: '60' },
                { step: 'end', prim: 'Room A', secd: 'Destination' },
            ] 
        }, 
		{ loc: 'room 102', mission: 'Mission_02', 
            directions: [
                { step: 'start', prim: 'Lab X', secd: '10'},
                { step: 'straight', prim: 'Head straight to', secd: '20' },
                { step: 'turn left', prim: 'Turn left towards', secd: '30' },
                { step: 'turn right', prim: 'Turn right towards', secd: '40' },
                { step: 'slight left', prim: 'Slight left towards', secd: '50' },
                { step: 'slight right', prim: 'Slight right towards', secd: '60' },
                { step: 'end', prim: 'Room B', secd: 'Destination' },
            ] 
        }, 
		{ loc: 'room 103', mission: 'Mission_03', 
            directions: [
                { step: 'start', prim: 'Lab X', secd: '10'},
                { step: 'straight', prim: 'Head straight to', secd: '20' },
                { step: 'turn left', prim: 'Turn left towards', secd: '30' },
                { step: 'turn right', prim: 'Turn right towards', secd: '40' },
                { step: 'slight left', prim: 'Slight left towards', secd: '50' },
                { step: 'slight right', prim: 'Slight right towards', secd: '60' },
                { step: 'end', prim: 'Room C', secd: 'Destination' },
            ] 
        },
	]},
	{ from: 'room 101', to: [
		{ loc: 'start', mission: 'Mission_0' }, 
	]},
	{ from: 'room 102', to: [
		{ loc: 'start', mission: 'Mission_0' }, 
	]},
	{ from: 'room 103', to: [
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
const locations = /(room 101|room 102|room 103)/i;

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

        setCurrentLocation(null);
        setKey(key + 1); // Reflash the chatbot

        return 'reflash'
    }

    return (
        <ChatBotContext.Provider value={{ mission, directions }}>
            <ChatBot
                key={key}
                headerTitle="Diablo Robot"
                recognitionEnable={true}
                recognitionLang="en"
                botAvatar="https://en.directdrive.com/public/uploads/images/20220221/cdb6e9eb92407c33c3c7d7e58004f615.png"
                userAvatar="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
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
                        message: `You have arrived to your requested destination.`,
                        trigger: () => {
                            setCurrentLocation(pendingLocation);
                            return 'options'
                        }
                    },
                    {
                        id: 'options',
                        message: 'Would you like to send me back to the start?',
                        trigger: 'sections'
                    },
                    {
                        id: 'sections',
                        options: [
                            { 
                                value: 1, 
                                label: 'Yes, you may now go.', 
                                trigger: 'backToStart'
                            },
                        ]
                    }, 
                    {
                        id: 'backToStart',
                        message: 'I will see you back at the start',
                        trigger: 'emitBackToStart'
                    }, 
                    {
                        id: 'emitBackToStart',
                        message: '.',
                        trigger: () => { 
                            backToStart();
                        }
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