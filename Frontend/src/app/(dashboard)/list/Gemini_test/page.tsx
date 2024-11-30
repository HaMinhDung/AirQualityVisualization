"use client";

import React, { useState } from "react";
import axios from "axios";

const Chat: React.FC = () => {
    const [userInput, setUserInput] = useState("");
    const [chatResponse, setChatResponse] = useState("");

    const handleSendMessage = async () => {
        if (!userInput.trim()) return;

        try {
            const response = await axios.post("http://localhost:5000/chatbot", {
                message: userInput,
            });
            setChatResponse(response.data.response || "No response received.");
        } catch (error) {
            console.error("Error while fetching response:", error);
            setChatResponse("An error occurred while processing your request.");
        }

        setUserInput(""); // Reset input field
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Gemini Chatbot</h1>
            <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter your message..."
                rows={4}
                style={{ width: "100%", padding: "10px", fontSize: "16px" }}
            />
            <button
                onClick={handleSendMessage}
                style={{
                    marginTop: "10px",
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "#007BFF",
                    color: "#FFF",
                    border: "none",
                    borderRadius: "5px",
                }}
            >
                Send
            </button>
            <div style={{ marginTop: "20px" }}>
                <h3>Response:</h3>
                <p style={{ whiteSpace: "pre-wrap" }}>{chatResponse}</p>
            </div>
        </div>
    );
};

export default Chat;
