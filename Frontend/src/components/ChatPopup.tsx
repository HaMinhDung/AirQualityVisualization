"use client";
import { useState } from 'react';
import axios from 'axios';

const ChatPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        setMessages(prev => [...prev, { text: inputMessage, isUser: true }]);
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/chatbot', {
                message: inputMessage
            });
            
            setMessages(prev => [...prev, { text: response.data.response, isUser: false }]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, { text: "Sorry, I couldn't process your request.", isUser: false }]);
        }

        setInputMessage('');
        setIsLoading(false);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col">
                    {/* Header */}
                    <div className="bg-blue-500 text-white p-4 rounded-t-lg">
                        <h3 className="font-semibold">Chat with AI Assistant</h3>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-lg ${
                                        message.isUser
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                                    Typing...
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Form */}
                    <form onSubmit={handleSubmit} className="p-4 border-t">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatPopup; 