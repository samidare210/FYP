import React, { useState } from 'react';
import io from 'socket.io-client';
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
        waitAction: true,
        message: 'Follow me.',
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
    {
        id: 'error',
        message: 'Sorry, I didn\'t understand. Please try again.',
        trigger: 'userInput'
    }
];

const keywords = /(hi|hello|hey|where is|direction to|direction|go to)/i;
const locations = /(a204a|a204b|a204c|a204d|a204e")/i;

var currentLocation = null;
var pendingLocation = null;

const locationPair = {
    from: "",
    to: ""
} 

function searchKeywords(inputValue) {
    let valueToLower = inputValue.toLowerCase();
    if (keywords.test(valueToLower)) {
        if (valueToLower.match(/hi|hello|hey/i)) {
            return 'help';
        }

        if (valueToLower.match(/where is|direction to|go to/i)) {
            return searchLocation(inputValue);
        } else if (valueToLower.match(/direction/i)) {
            return 'response_01';
        }
    } else {
        return 'error';
    }
}

function searchLocation(inputValue) {
    let location;
    if (inputValue.match(locations)) {
        location = inputValue.match(locations)[0].toLowerCase();
        setPendingLocation(location);
        emitLocations();
        socket.on("msg_missionFound", (missionFound) => {
            if (missionFound === true) {
                return 'guiding';
            } else {
                return 'error';
            }
        })
        return 'leading';
    } else {
        return 'error';
    }
}

function setCurrentLocation(location) {
    currentLocation = location;
}

function setPendingLocation(location) {
    pendingLocation = location;
}

function startGuiding() {
    socket.emit('msg_guiding', 'start');
}

function checkArrival() {

}

function emitLocations() {
    if (currentLocation == null) {
        currentLocation = "start";
        locationPair.from = currentLocation;
        locationPair.to = pendingLocation;
        socket.emit('msg_chatbot', locationPair);
    } else {
        locationPair.from = currentLocation;
        locationPair.to = pendingLocation;
        socket.emit('msg_chatbot', locationPair);
    }
}

function emitBackToStart() {
    socket.emit('msg_chatbot', locationPair);
    return 'greet';
}

const ChatBotCompo = ({ onTranscriptChange }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [language, setLanguage] = useState(languages[0]); // Set the default language to English.

    const recognition = new WebkitSpeechRecognition();
    recognition.maxSpeechInputTime = 5000; // set timeout to 5 seconds
    recognition.continuous = true;
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