// import React, { useState } from 'react';
// import { ThemeProvider } from 'styled-components';
// import ChatBot from 'react-simple-chatbot';

// let WebkitSpeechRecognition = window.webkitSpeechRecognition;

// const languages = [
//     {
//         no: "16",
//         name: "English",
//         native: "English",
//         code: "en",
//     },
//     {
//         no: "10",
//         name: "Chinese (Simplified)",
//         native: "中文简体",
//         code: "zh-CN",
//     },
//     {
//         no: "11",
//         name: "Chinese (Traditional)",
//         native: "中文繁體",
//         code: "zh-TW",
//     }
// ];

// const theme = {
//     background: '#f5f8fb',
//     fontFamily: 'Helvetica Neue',
//     headerBgColor: '#000',
//     headerFontColor: '#fff',
//     headerFontSize: '15px',
//     botBubbleColor: '#000',
//     botFontColor: '#fff',
//     userBubbleColor: '#fff',
//     userFontColor: '#4a4a4a',
// };

// const steps = [
//     {
//         id: 'greet',
//         message: 'Hi, I\'m Diablo Robot.',
//         trigger: 'help',
//     },
//     {
//         id: 'help',
//         message: 'How may I help you?',
//         trigger: 'end',
//     },
//     {
//         id: 'end',
//         message: 'Thanks for chatting with me!',
//         end: true,
//     },
// ];

// const SpeechToText = ({ onTranscriptChange }) => {
//     const [isListening, setIsListening] = useState(false);
//     const [transcript, setTranscript] = useState('');
//     const [language, setLanguage] = useState(languages[0]); // Set the default language to English.

//     const recognition = new WebkitSpeechRecognition();
//     recognition.maxSpeechInputTime = 10000; // set timeout to 10 seconds
//     recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.lang = language.code; // Set the language of recognition to the currently selected language.

//     recognition.onstart = () => {
//         setIsListening(true);
//     };

//     recognition.onend = () => {
//         setIsListening(false);
//     };

//     recognition.onresult = (event) => {
//         const transcript = Array.from(event.results)
//             .map((result) => result[0])
//             .map((result) => result.transcript)
//             .join('');
//         setTranscript(transcript);
//         onTranscriptChange(transcript);
//     };

//     const toggleListening = () => {
//         if (isListening) {
//             recognition.stop();
//         } else {
//             recognition.start();
//         }
//         setIsListening(!isListening);
//     };

//     const handleLanguageChange = (event) => {
//         const selectedLanguage = languages.find(language => language.code === event.target.value);
//         setLanguage(selectedLanguage);
//         recognition.lang = selectedLanguage.code; // Update the language of recognition when the language is changed.
//     };

//     return (
//         <div>
//             <ThemeProvider theme={theme}>
//                 <ChatBot steps={steps} />
//             </ThemeProvider>
//             <button onClick={toggleListening}>{isListening ? 'Stop' : 'Start'}</button>
//             <select value={language.code} onChange={handleLanguageChange}>
//                 {languages.map(language => (
//                     <option key={language.code} value={language.code}>{language.name}</option>
//                 ))}
//             </select>
//             <p>{transcript}</p>
//         </div>
//     );
// };

// export default SpeechToText;