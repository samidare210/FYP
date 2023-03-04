import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import RefreshIcon from "@mui/icons-material/Refresh";

import { styled } from "@mui/material/styles";

const ChatContainer = styled("div")({
	display: "flex",
	flexDirection: "column",
	height: "100%",
  });
  
  const ChatHistory = styled("div")({
	flex: 1,
	overflowY: "scroll",
	marginBottom: "10px",
	border: "1px solid #ccc",
  });
  
  const ChatMessage = styled("div")({
	display: "flex",
	flexDirection: (props) => props.isBotMessage ? "row-reverse" : "row",
	alignItems: "flex-start",
	margin: "5px",
  });
  
  const ChatBubble = styled("div")({
	backgroundColor: (props) => props.isBotMessage ? "#F1F0F0" : "#0084FF",
	color: (props) => props.isBotMessage ? "#000" : "#FFF",
	padding: "10px",
	borderRadius: "10px",
	maxWidth: "80%",
	wordBreak: "break-word",
  });
  
  const Chatbot = () => {
	const [chatHistory, setChatHistory] = useState([]);
	const chatEndRef = useRef(null);
  
	const scrollToBottom = () => {
	  chatEndRef.current.scrollIntoView({ behavior: "smooth" });
	};
  
	useEffect(() => {
	  scrollToBottom();
	}, [chatHistory]);
  
	const handleMessageSubmit = async (e) => {
	  e.preventDefault();
	  const message = e.target.message.value;
	  const response = await fetch(`/api/search?q=${message}`);
	  const data = await response.json();
	  setChatHistory([...chatHistory, { message, isBotMessage: false }]);
	  setChatHistory([...chatHistory, { message: data.response, isBotMessage: true }]);
	  e.target.reset();
	};

	return (
		<ChatContainer>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
			<Button variant="contained" endIcon={<RefreshIcon />} onClick={() => window.location.reload()}>
					Refresh</Button>
			</Box>
			<ChatHistory>
				{chatHistory.map((chat, index) => (
					<ChatMessage key={index} isBotMessage={chat.isBotMessage}>
						<ChatBubble isBotMessage={chat.isBotMessage}>
							{chat.message}
						</ChatBubble>
					</ChatMessage>
				))}
				<div ref={chatEndRef} />
			</ChatHistory>
			<form onSubmit={handleMessageSubmit}>
				<Grid container spacing={2} alignItems="center">
					<Grid item xs={11}>
						<TextField fullWidth name="message" label="Type your message" />
					</Grid>
					<Grid item xs={1}>
						<Button fullWidth type="submit" variant="contained" color="primary">Send</Button>
					</Grid>
				</Grid>
			</form>
		</ChatContainer>
	  );
	};	

export default Chatbot;
