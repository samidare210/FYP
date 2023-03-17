import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';

// Socket
import { socket } from "../Socket"

let WebkitSpeechRecognition = window.webkitSpeechRecognition;

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
        message: 'Would you like to ask for more directions?',
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

function searchKeywords(inputValue) {
    let valueToLower = inputValue.toLowerCase();
    if (keywords.test(valueToLower)) {

        // Check if the user is greeting the chatbot
        if (valueToLower.match(/hi|hello|hey/i)) {
            return 'help';
        }

        // Check if the user is asking for directions
        if (valueToLower.match(/where is|direction to|go to/i)) {
            var missionStatus = searchLocation(inputValue).then((result) => {
                return result;
            });
            console.log(missionStatus);
            return missionStatus;
        } else if (valueToLower.match(/direction/i)) {
            return 'response_01';
        }

    // Exception
    } else {
        return 'error_01';
    }
}

async function searchLocation(inputValue) {
    let location;
    if (inputValue.match(locations)) {
        location = inputValue.match(locations)[0].toLowerCase();
        setPendingLocation(location);
        emitPath();
        const found = await new Promise((resolve) => {
            socket.on('msg_missionFound', (found) => {
                resolve(found);
            })
        });
        if (found === true) {
            console.log(found);
            return 'guilding';
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

function emitPath() {
    if (currentLocation == null) {
        currentLocation = "start";
    }
    path.from = currentLocation;
    path.to = pendingLocation;
    socket.emit('msg_path', path);
}

function emitBackToStart() {
    path.from = currentLocation;
    path.to = 'start';
    socket.emit('msg_path', path);
    return 'greet';
}

const ChatBotCompo = ({ onTranscriptChange }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [language, setLanguage] = useState(languages[0]); // Set the default language to English.

    const recognition = new WebkitSpeechRecognition();
    recognition.maxSpeechInputTime = 5000; // set timeout to 5 seconds
    recognition.continuous = true; // Set the recognition to continuous.
    recognition.interimResults = true;
    recognition.lang = language.code; // Set the language of recognition to the currently selected language.

    recognition.onstart = () => {
        setIsListening(true);
    };

    recognition.onend = () => {
        setIsListening(false);
    };

    recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join('');
        setTranscript(transcript);
        onTranscriptChange(transcript);
    };

    const toggleListening = () => {
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
        setIsListening(!isListening);
    };

    const handleLanguageChange = (event) => {
        const selectedLanguage = languages.find(language => language.code === event.target.value);
        setLanguage(selectedLanguage);
        recognition.lang = selectedLanguage.code; // Update the language of recognition when the language is changed.
    };

    return (
        <div>
            <ChatBot
                headerTitle="Welcome, let's chat with Diablo!"
                recognitionEnable={true}
                recognitionLang="en"
                steps={steps}
                {...config}
            />
            <button onClick={toggleListening}>{isListening ? 'Stop' : 'Start'}</button>
            <select value={language.code} onChange={handleLanguageChange}>
                {languages.map(language => (
                    <option key={language.code} value={language.code}>{language.name}</option>
                ))}
            </select>
            <p>{transcript}</p>
        </div>
    );
};

export default ChatBotCompo;