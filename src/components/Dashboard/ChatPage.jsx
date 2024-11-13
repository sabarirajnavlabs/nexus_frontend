"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const ChatPage = () => {
  const { theme } = useTheme();
  const [selectedModel, setSelectedModel] = useState("Model 1");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
  };

  return (
    <div
      className={`w-[83vw] h-[88vh] flex flex-col rounded-md ${
        theme === "dark" ? "bg-[#0C0C0C] text-white" : "bg-white text-black"
      }`}
    >
      {/* Dropdown and Header */}
      <div className="flex items-center justify-between p-4 border-b shadow-lg">
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="p-2 px-4 rounded-lg bg-gray-200 text-black"
        >
          <option>Model 1</option>
          <option>Model 2</option>
          <option>Model 3</option>
        </select>
        <h1 className="text-3xl font-bold">Chat with AI</h1>
        <div className="w-8 h-8 relative">
          <Image
            src={"/vscode.png"}
            layout="fill"
            objectFit="contain"
            alt="AI Icon"
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`my-2 p-3 rounded-lg max-w-lg ${
              message.sender === "user"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-300 text-black self-start"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-4 border-t flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type a message..."
          className="flex-1 p-3 border rounded-lg outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="p-3 bg-blue-500 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
