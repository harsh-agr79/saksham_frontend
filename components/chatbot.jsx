'use client';

import React, { useState } from 'react';
import { HfInference } from '@huggingface/inference';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X as CloseIcon } from 'lucide-react';

const client = new HfInference(`${process.env.NEXT_PUBLIC_HUGGING_FACE}`); // Replace with your Hugging Face token

export const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const userData = {
    interestedDomains: [
      'Artificial Intelligence',
      'Web Development',
      'Data Analysis',
      'Cloud Computing',
      'Blockchain',
    ],
  };

  const initialPrompt = [
    {
      role: 'system',
      content: `You are a career guidance assistant for a platform specializing in career development. Provide concise answers and, after sufficient user input, recommend career paths:
      - Interested Domains: ${userData.interestedDomains.join(', ')}.

      Use this data to provide personalized recommendations when the user asks for guidance.`,
    },
  ];

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, { sender: 'user', text: input }]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const chatCompletion = await client.chatCompletion({
        model: "deepseek-ai/DeepSeek-R1",
        messages: [
          ...(messages.length === 0 ? initialPrompt : []),
          ...messages.map((msg) => ({ role: "user", content: msg.text })),
          userMessage,
        ],
        provider: "together",
	    max_tokens: 500
      });

      const botMessage = {
        sender: 'SamBot',
        text: chatCompletion?.choices[0]?.message?.content || "Sorry, I couldn't understand that.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Error querying Hugging Face API:', err);
      setError('An error occurred while fetching the response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chatbot Trigger */}
      {!isOpen && (
        <div
          className="fixed bottom-[65px] right-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          Chat Support
        </div>
      )}

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="fixed bottom-[65px] right-4 w-96 bg-gray-900 text-white shadow-lg rounded-lg">
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h2 className="text-lg font-bold text-white">Saksham Chat Bot</h2>
            <CloseIcon
              className="cursor-pointer text-gray-400 hover:text-white"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-md ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-right text-white'
                    : 'bg-gray-700 text-left text-white'
                }`}
              >
                <p className="font-medium">
                  {message.sender === 'user' ? 'You' : 'Bot'}:
                </p>
                <p>{message.text}</p>
              </div>
            ))}
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <div className="flex items-center p-4 border-t border-gray-700 space-x-2">
            <Input
              className="bg-gray-800 text-white border-gray-700"
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="bg-purple-600 hover:bg-blue-700 text-white"
            >
              {loading ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
