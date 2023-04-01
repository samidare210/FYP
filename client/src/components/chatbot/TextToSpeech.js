import React, { useState } from 'react';

const TextToSpeech = ({ inputRef, onTranscriptChange }) => {
  const WebkitSpeechRecognition = window.webkitSpeechRecognition;
  const languages = [
    {
      name: "English",
      code: "en",
    },
    {
      name: "中文 (普通話)",
      code: "zh",
    },
    {
      name: "中文 (廣東話)",
      code: "yue-Hant-HK",
    },
  ];

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [language, setLanguage] = useState(languages[0]);

  const recognition = new WebkitSpeechRecognition();
  recognition.maxSpeechInputTime = 5000;
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = language.code;

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
    setInputValue(transcript);
    onTranscriptChange(transcript);
  };

  const setInputValue = (value) => {
    const inputElement = inputRef.current?.input?.current;
    if (inputElement) {
      inputElement.value = value;
    }
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
    const selectedLanguage = languages.find((language) => language.code === event.target.value);
    setLanguage(selectedLanguage);
    recognition.lang = selectedLanguage.code;
  };

  return (
    <>
      <button onClick={toggleListening}>{isListening ? 'Stop' : 'Start'}</button>
      <select value={language.code} onChange={handleLanguageChange}>
        {languages.map((language) => (
          <option key={language.code} value={language.code}>{language.name}</option>
        ))}
      </select>
      <p>{transcript}</p>
    </>
  );
};

export default TextToSpeech;