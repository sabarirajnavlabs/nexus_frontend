"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const ChatPage = ({ model }) => {
  const { theme } = useTheme();
  const [selectedModel, setSelectedModel] = useState(model || "GPT 3.5 Turbo");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
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
        <div className="relative">
          {/* Select Dropdown */}
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className={`p-2 px-4 pr-10 rounded-lg appearance-none ${
              theme === "dark"
                ? "bg-[#0C0C0C] text-white"
                : "bg-white text-black"
            } border-gray-200 border-2 w-full`}
          >
            {models.map((model, index) => (
              <option key={index} value={model}>
                {model}
              </option>
            ))}
          </select>

          {/* Rotated SVG (Arrow Icon) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-code absolute inset-y-0 right-3 my-auto transform rotate-90 pointer-events-none"
            viewBox="0 0 16 16"
          >
            <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8z" />
          </svg>
        </div>

        {/* Header */}
        {/* <h1 className="text-3xl font-bold">Chat with AI</h1> */}
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

      {selectedFile && (
        <div className="relative flex items-center p-4 space-x-4 bg-gray-100 rounded-lg shadow-md mx-52">
          {/* Close (X) Button */}
          <button
            onClick={() => setSelectedFile(null)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>

          {/* Display Image */}
          <Image
            className="rounded-md border border-gray-300"
            src={URL.createObjectURL(selectedFile)}
            width={50}
            height={50}
            alt="Selected file preview"
          />

          {/* File Details */}
          <div>
            <div className="text-sm font-medium text-gray-700">
              {selectedFile.name}
            </div>
            <div className="text-xs text-gray-500">
              {(selectedFile.size / 1024).toFixed(2)} KB
            </div>
          </div>
        </div>
      )}

      {/* Input Box */}
      <div className="p-4  flex items-center px-52">
        <div className="relative flex-1">
          {/* Input box */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className="w-full p-3 pl-12 pr-12 border rounded-lg outline-none"
          />

          {/* File upload button (left inside input box) */}
          <label className="absolute inset-y-0 left-2 flex items-center cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-paperclip"
              viewBox="0 0 16 16"
            >
              <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z" />
            </svg>
          </label>

          {/* Arrow button (right inside input box) */}
          <button
            onClick={handleSendMessage}
            className="absolute inset-y-0 right-2 flex items-center bg-blue-500 text-white px-2 my-2 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-send"
              viewBox="0 0 16 16"
            >
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
