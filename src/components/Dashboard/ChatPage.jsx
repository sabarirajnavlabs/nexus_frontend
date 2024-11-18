"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const ChatPage = ({ model }) => {
  const { theme } = useTheme();
  const [selectedModel, setSelectedModel] = useState(model || "GPT 3.5 Turbo");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const models = [
    "GPT 3.5 Turbo",
    "Anthropic Claude v2",
    "Llama 3 8B",
    "Titan Text Lite",
  ];

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
  };

  useEffect(() => {
    setSelectedModel(model || "GPT 3.5 Turbo");
  }, [model]);

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
          {models.map((model, index) => (
            <option key={index} value={model}>
              {model}
            </option>
          ))}
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
