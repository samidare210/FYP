import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';

// Socket
import { socket } from "../SocketChatbot"

// let WebkitSpeechRecognition = window.webkitSpeechRecognition;

const config = {
    width: "800px"
};

const languages = [
    {
        name: "English",
        code: "en"
    },
    {
        name: "中文 (普通話)",
        code: "zh"
    },
    {
        name: "中文 (廣東話)",
        code: "yue-Hant-HK"
    }
];

const steps = [
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
        // trigger: async ({ value }) => {
        //     const result = await searchKeywords(value);
        //     console.log(result);
        //     return result;
        // }
        trigger: ({ value }) => {
            return searchKeywords(value);
        }
    },
    {
        id: 'response_01',
        message: 'Where would you like to go?',
        trigger: 'searchLocation'
    },
    {
        id: 'searchLocation',
        user: true,
        trigger: ({ value }) => {
            return searchLocation(value);
        }
    },
    {
        id: 'guiding',
        message: 'Please follow me.',
        trigger: () => {
            startGuiding();
            return checkArrival();
        }
    },
    {
        id: 'arrived',
        message: 'You have arrived to your requested distination.',
        trigger: 'options'
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
                trigger: 'response_01'
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
        message: 'I will see you back at the start. Good Bye.',
        trigger: () => { 
            return emitBackToStart(); 
        }
    },

    // Exception : Failed to find keyword
    {
        id: 'error_01',
        message: 'Sorry, I didn\'t understand. Please try again.',
        trigger: 'userInput'
    },

    // Exception : Failed to find mission
    {
        id: 'error_02',
        message: 'My apologies, I have failed to find the path corresponds to your reqested location.',
        trigger: 'userInput'
    }
];

var map = 'Map_01'
var mission = null;

const missions = [
	{ from: 'start' , to: [
		{ loc: 'a204a', mission: 'Mission_01', 
            steps: ['l', 'r', 'l']}, 
		{ loc: 'a204b', mission: 'Mission_02', 
            steps: ['l', 'l', 'r']}, 
		{ loc: 'a204c', mission: 'Mission_03', 
            steps: ['r', 'l', 'r']},
        { loc: 'a204d', mission: 'Mission_04', 
            steps: ['r', 'r', 'l']},
        { loc: 'a204e', mission: 'Mission_05', 
            steps: ['l', 'l', 'l']} 
	]},
	{ from: 'a204a', to: [
		{ loc: 'start', mission: 'Mission_04' }, 
		{ loc: 'a204b', mission: 'Mission_05' }, 
		{ loc: 'a204c', mission: 'Mission_06' }, 
	]},
	{ from: 'a204b', to: [
		{ loc: 'start', mission: 'Mission_07' }, 
		{ loc: 'a204a', mission: 'Mission_08' }, 
		{ loc: 'a204c', mission: 'Mission_09' }, 
	]},
	{ from: 'a204c', to: [
		{ loc: 'start', mission: 'Mission_10' }, 
		{ loc: 'a204a', mission: 'Mission_11' }, 
		{ loc: 'a204b', mission: 'Mission_12' },
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

// Define the keywords and locations
const keywords = /(hi|hello|hey|where is|direction to|direction|go to)/i;
const locations = /(a204a|a204b|a204c)/i;

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
function setSTP() {
    if (currentLocation == null) {
        currentLocation = 'start';
    }
    path.from = currentLocation;
    path.to = pendingLocation;
}

// Set point to start path
function setPTS() {
    path.from = currentLocation;
    path.to = 'start';
}

// === Async Functions ===
// async function searchKeywords(inputValue) {
//     let valueToLower = inputValue.toLowerCase();
//     if (keywords.test(valueToLower)) {

//         // Check if the user is greeting the chatbot
//         if (valueToLower.match(/hi|hello|hey/i)) {
//             return 'help';
//         }

//         // Check if the user is asking for directions
//         if (valueToLower.match(/where is|direction to|go to/i)) {
//             const missionStatus = await searchLocation(inputValue);
//             console.log(missionStatus);
//             return missionStatus;
//         } else if (valueToLower.match(/direction/i)) {
//             return 'response_01';
//         }

//     // Exception
//     } else {
//         return 'error_01';
//     }
// }

// async function searchLocation(inputValue) {
//     let location;
//     if (inputValue.match(locations)) {
//         location = inputValue.match(locations)[0].toLowerCase();
//         setPendingLocation(location);
//         emitPath();
//         const found = await new Promise((resolve) => {
//             socket.on('msg_missionFound', (found) => {
//                 resolve(found);
//             })
//         });
//         if (found === true) {
//             return 'guiding';
//         } else {
//             return 'error_02';
//         }
//     } else {
//         return 'error_01';
//     }
// }

// === Testing Functions ===
function searchKeywords(inputValue) {
    let valueToLower = inputValue.toLowerCase();
    if (keywords.test(valueToLower)) {

        // Check if the user is greeting the chatbot
        if (valueToLower.match(/hi|hello|hey/i)) {
            return 'help';
        }

        // Check if the user is asking for directions
        if (valueToLower.match(/where is|direction to|go to/i)) {
            return searchLocation(inputValue);

        } else if (valueToLower.match(/direction/i)) {
            return 'response_01';
        }

    // Exception
    } else {
        return 'error_01';
    }
}

function searchLocation(inputValue) {
    let location;
    if (inputValue.match(locations)) {

        location = inputValue.match(locations)[0].toLowerCase();
        setPendingLocation(location);
        setSTP();

        mission = getMission(path.from, path.to);
        console.log(`{\n\tfrom:\t${path.from},\n\tto:\t${path.to},\n\tmission:\t${mission}\n}`);

        if (mission !== null) {
            socket.emit('/nav/state/config', 'START');
            socket.emit('/mission/start', `{ mission_id: '${mission}', map_id: '${map}' }`);
            return 'guiding';
        } else {
            return 'error_02';
        }
    } else {
        return 'error_01';
    }
}

function startGuiding() {
    socket.emit('msg_guiding');
}

function checkArrival() {
    // socket.on('msg_arrived', () => {
    //     return 'arrived';
    // }); 
    return 'arrived';
}

// function emitPath() {
//     if (currentLocation == null) {
//         currentLocation = "start";
//     }
//     path.from = currentLocation;
//     path.to = pendingLocation;
//     socket.emit('msg_path', path);
// }

function emitBackToStart() {
    path.from = currentLocation;
    path.to = 'start';
    socket.emit('msg_path', path);
    return 'greet';
}

const ChatBotCompo = ({ onTranscriptChange }) => {
    // const [isListening, setIsListening] = useState(false);
    // const [transcript, setTranscript] = useState('');
    // const [language, setLanguage] = useState(languages[0]); // Set the default language to English.

    // const recognition = new WebkitSpeechRecognition();
    // recognition.maxSpeechInputTime = 5000; // set timeout to 5 seconds
    // recognition.continuous = true; // Set the recognition to continuous.
    // recognition.interimResults = true;
    // recognition.lang = language.code; // Set the language of recognition to the currently selected language.

    // recognition.onstart = () => {
    //     setIsListening(true);
    // };

    // recognition.onend = () => {
    //     setIsListening(false);
    // };

    // recognition.onresult = (event) => {
    //     const transcript = Array.from(event.results)
    //         .map((result) => result[0])
    //         .map((result) => result.transcript)
    //         .join('');
    //     setTranscript(transcript);
    //     onTranscriptChange(transcript);
    // };

    // const toggleListening = () => {
    //     if (isListening) {
    //         recognition.stop();
    //     } else {
    //         recognition.start();
    //     }
    //     setIsListening(!isListening);
    // };

    // const handleLanguageChange = (event) => {
    //     const selectedLanguage = languages.find(language => language.code === event.target.value);
    //     setLanguage(selectedLanguage);
    //     recognition.lang = selectedLanguage.code; // Update the language of recognition when the language is changed.
    // };

    return (
        <div>
            <ChatBot
                headerTitle="Welcome, let's chat with Diablo!"
                recognitionEnable={true}
                recognitionLang="en"
                steps={steps}
                {...config}
            />
            {/* <button onClick={toggleListening}>{isListening ? 'Stop' : 'Start'}</button>
            <select value={language.code} onChange={handleLanguageChange}>
                {languages.map(language => (
                    <option key={language.code} value={language.code}>{language.name}</option>
                ))}
            </select>
            <p>{transcript}</p> */}
        </div>
    );
};

export default ChatBotCompo;