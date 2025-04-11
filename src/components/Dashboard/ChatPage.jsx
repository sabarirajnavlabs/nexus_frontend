"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";
import { useConfig } from '@/components/config-provider';

const ChatPage = ({ model }) => {
  const { theme } = useTheme();
  const { backgroundColor } = useConfig();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(model);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL_2}/nexus/v1/models`,
          {
            method: "GET",
            headers: {
              Token: Cookies.get("__session") || "",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched models:", data.data);
        const models = data.data.map((model) => model.id);
        
        if (models && models.length > 0) {
          setModels(models);
          // If no model was selected yet, select the first one
          if (!selectedModel) {
            setSelectedModel(models[0]);
          }
        } else {
          // Fallback models if API returns empty
          setModels(['gpt-4', 'claude-3-haiku-20240307', 'gemini-pro', 'llama3-8b-8192']);
        }
      } catch (error) {
        console.error("Failed to fetch models:", error);
        // Fallback models if API fails
        setModels(['gpt-4', 'claude-3-haiku-20240307', 'gemini-pro', 'llama3-8b-8192']);
      }
    };

    fetchModels();
    
    // Only set selectedModel from prop if it exists
    if (model) {
      setSelectedModel(model);
    }
  }, [model, selectedModel]);

  const handleSendMessage = async () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { text: input, sender: "user" }]);
      setInput("");
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_2}/nexus/v1/chat/completions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Token: Cookies.get("__session") || "",
          },
          body: JSON.stringify({
            model: selectedModel,
            messages: [
              {
                role: "user",
                content: input,
              },
            ],
            stream: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let partialMessage = "";
      let fullMessage = "";

      let assistantMessageIndex;
      setMessages((prev) => {
        assistantMessageIndex = prev.length;
        return [...prev, { text: "", sender: "assistant" }];
      });

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        partialMessage += chunk;

        const lines = partialMessage.split("\n");
        partialMessage = lines.pop();

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const json = JSON.parse(line.replace(/^data:\s*/, ""));
            const content = json.choices[0]?.delta?.content;
            if (content) {
              fullMessage += content;

              setMessages((prev) => {
                const updatedMessages = [...prev];
                updatedMessages[assistantMessageIndex] = {
                  ...updatedMessages[assistantMessageIndex],
                  text: fullMessage,
                };
                return updatedMessages;
              });
            }
          } catch (err) {
            console.error("Error parsing JSON chunk:", err);
          }
        }
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div
      className={`w-full h-full flex flex-col rounded-md ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
      style={{ 
        backgroundColor,
        color: theme === 'dark' ? 'white' : 'inherit'
      }}
    >
      {/* Dropdown and Header */}
      <div className={`flex items-center justify-between p-4 border-b shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="relative">
          {/* Select Dropdown */}
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className={`p-2 px-4 pr-10 rounded-lg appearance-none border-gray-200 border-2 w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
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
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex my-2 ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-lg ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : theme === 'dark' ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {selectedFile && (
        <div className={`relative flex items-center p-4 space-x-4 rounded-lg shadow-md mx-52 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
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
              className="bi bi-x-circle"
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
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {selectedFile.name}
            </div>
            <div className="text-xs text-gray-500">
              {(selectedFile.size / 1024).toFixed(2)} KB
            </div>
          </div>
        </div>
      )}

      {/* Input Box */}
      <div className="p-4 flex items-center px-52">
        <div className="relative flex-1">
          {/* Input box */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className={`w-full p-3 pl-12 pr-12 border rounded-lg outline-none ${
              theme === 'dark' 
                ? 'bg-gray-700 text-white border-gray-600' 
                : 'bg-white text-gray-900 border-gray-300'
            }`}
            style={theme === 'dark' ? { color: 'white' } : {}}
          />

          {/* Upload button */}
          <label className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-paperclip text-gray-500"
              viewBox="0 0 16 16"
            >
              <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z" />
            </svg>
          </label>

          {/* Send button */}
          <button
            onClick={handleSendMessage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-send"
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
