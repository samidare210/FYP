import React, { useRef } from 'react';
import ChatBot from 'react-simple-chatbot';
import TextToSpeech from './TextToSpeech';

const MyChatBot = () => {
  const inputRef = useRef();

  const steps = [
    {
      id: '1',
      message: 'Hello! What is your name?',
      trigger: 'name',
    },
    {
      id: 'name',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'Hi {previousValue}! How can I help you today?',
      end: true,
    },
  ];

  const handleTranscriptChange = (transcript) => {
    console.log('Transcript:', transcript);
  };

  return (
    <div>
      <TextToSpeech inputRef={inputRef} onTranscriptChange={handleTranscriptChange} />
      <ChatBot ref={inputRef} steps={steps} />
    </div>
  );
};

export default MyChatBot;