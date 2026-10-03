import React, { useState, useEffect } from 'react';
import { Bot, Mic, MicOff, Volume2, X, Send, Sparkles } from 'lucide-react';
import { queryAIChatbot } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export const VoiceAssistant = () => {
  const { language } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [chatLog, setChatLog] = useState([
    {
      sender: 'bot',
      text: 'Namaste! I am your AgriSmart Voice AI. Click the microphone and ask me anything about your crops, weather, or fertilizers!'
    }
  ]);

  // Handle Speech Recognition setup
  const startVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your query below.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language.includes('Hindi') ? 'hi-IN' : 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputQuery(transcript);
      handleSend(transcript);
    };

    recognition.start();
  };

  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // Stop any active speech
    const cleanText = text.replace(/[*_#`]/g, ''); // Strip markdown
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setChatLog((prev) => [...prev, userMsg]);
    setInputQuery('');

    const response = await queryAIChatbot(query, language);
    const botReply = response.data?.reply || 'I am processing your farming query. Please ask about crops, fertilizers, or diseases.';
    
    setChatLog((prev) => [...prev, { sender: 'bot', text: botReply }]);
    speakText(botReply);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Action Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center space-x-2 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold shadow-2xl shadow-emerald-500/40 hover:scale-105 transition-all duration-300 animate-bounce"
        >
          <Bot className="w-6 h-6 animate-pulse" />
          <span className="text-sm">AgriSmart AI Assistant</span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-200 animate-ping"></span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[520px] glassmorphism rounded-3xl shadow-2xl flex flex-col border border-emerald-500/30 overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">AgriSmart Voice AI</h3>
                <span className="text-[10px] text-emerald-100 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Language: {language}</span>
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/50 dark:bg-gray-900/50">
            {chatLog.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none shadow-md'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-none border border-gray-200 dark:border-gray-700 shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.sender === 'bot' && (
                    <button
                      onClick={() => speakText(msg.text)}
                      className="mt-2 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center space-x-1 hover:underline"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Read Aloud</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input & Voice Bar */}
          <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center space-x-2">
            <button
              onClick={startVoiceInput}
              className={`p-2.5 rounded-full transition-all ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200'
              }`}
              title="Click to Speak"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isListening ? 'Listening...' : 'Type or speak your farming query...'}
              className="flex-1 text-xs bg-gray-100 dark:bg-gray-900 border-none rounded-xl px-3.5 py-2.5 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <button
              onClick={() => handleSend()}
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
