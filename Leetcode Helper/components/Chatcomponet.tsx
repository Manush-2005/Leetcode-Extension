import React from 'react'
import { Bot,X } from "lucide-react";
import { useState } from 'react';
import { Button } from './ui/Button';
import {useChat} from "ai/react";
import { Input } from './ui/Input';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'



const Chatcomponet = ({que}:{que:string}) => {

  const quename = que;
  console.log(quename);

 

  const [messages, setMessages] = useState([
    {
      id: '1',
      role: "assistant",
      content: 'Hello! How can I help you today?',
    }
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = { id: Date.now().toString(), role: 'user', content: input };
      setMessages([...messages, newMessage]);
      setInput('');

      try {
        const response = await axios.post('http://localhost:3001/askquestion', {
          name: quename,
          que: input

          
        });

        console.log(response.data.answer);
        const aiMessage = { id: Date.now().toString(), role: 'assistant', content: response.data.answer };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error('Error fetching AI response:', error);
      }
    }
  };



 
  const [isCardVisible,setIsCardVisible] = useState(false);

  const handleIconClick = () => {
    setIsCardVisible(!isCardVisible);
  }
  return (
    <>
       <div
        className="dark z-50"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
        }}
      >
        {!isCardVisible && (
          <div className="flex gap-2 items-center justify-between h-20 rounded-t-lg p-4">
            <div className="flex gap-2 items-center justify-start">
              <div className="bg-white rounded-full p-2" onClick={handleIconClick}>
                <Bot color="#000" className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">AI HELP</h3>
              </div>
            </div>
          </div>
        )}
      </div>
      {isCardVisible && (
        <div
          className="fixed bottom-0 right-0 w-[350px] h-[500px] bg-background z-50"
          style={{ overflow: 'auto' }}
        >
          <div className="relative p-4 bg-background h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
              <div className="text-center">
                <h1 className="font-bold text-3xl text-white">
                  LeetCode <span className="text-whisperOrange">Whisper</span>
                </h1>
                <p className="text-sm text-muted-foreground">
                  Your Companion to Beat LeetCode!
                </p>
              </div>
              <div className="bg-white rounded-full p-2 cursor-pointer" onClick={handleIconClick}>
                <X color="#000" className="h-6 w-6" />
              </div>
            </div>
           
            <div className="flex-1 overflow-y-auto mb-4">
              {messages.map((message) => (
                <div key={message.id} className={`p-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-white'}`}>
                    {message.role === 'user' ? 'User: ' : 'AI: '}
                    <ReactMarkdown>
                    {message.content}
                    </ReactMarkdown>
                    
                  </span>
                </div>
              ))}
            </div>
            <div className="flex">
           <Input  className="flex-1 p-2 rounded-l-lg border border-gray-300" value={input} onChange={(e) => setInput(e.target.value)} />
              <button
                className="p-2 bg-blue-500 text-white rounded-r-lg"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}


    
    
    </>
  )
}

export default Chatcomponet