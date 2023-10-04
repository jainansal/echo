"use client";

import { io } from "socket.io-client";
import { useState, useEffect } from "react";
let socket;

import Message from "./Message";

const Chat = () => {
  // useStates
  const [clientId, setClientId] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 0,
      message: "Hello",
      sender: "Echo",
    },
  ]);

  // useEffects
  useEffect(() => {
    socket = io("http://localhost:4000");

    // Event handlers
    const handleWelcome = (data) => {
      setClientId(data);
    };
    const handleEnterUser = (data) => {
      const message = {
        id: messages.length,
        message: `${data} has joined the chat`,
        sender: "Echo",
      };
      setMessages((prev) => [...prev, message]);
    };
    const handleLeaveUser = (data) => {
      const message = {
        id: messages.length,
        message: `${data} has left the chat`,
        sender: "Echo",
      };
      setMessages((prev) => [...prev, message]);
    };
    const handleNewMessage = (data) => {
      const message = {
        id: messages.length,
        message: data.message,
        sender: data.id,
      };
      setMessages((prev) => [...prev, message]);
    };

    // Event definitions
    socket.on("welcome", handleWelcome);
    socket.on("enter-user", handleEnterUser);
    socket.on("leave-user", handleLeaveUser);
    socket.on("new-message", handleNewMessage);

    return () => {
      socket.disconnect();
      socket.off("welcome", handleWelcome);
      socket.off("enter-user", handleEnterUser);
      socket.off("leave-user", handleLeaveUser);
      socket.off("new-message", handleNewMessage);
    };
  }, []);

  // Functions
  const renderMessages = () => {
    return messages.map((message) => {
      return (
        <Message
          message={message.message}
          sender={message.sender}
          clientId={clientId}
          key={message.id}
        />
      );
    });
  };

  const sendMessage = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      socket.emit("new-message", e.target.value);
      e.target.value = "";
    }
  };

  return (
    <div className="bg-slate-900 p-3 h-3/4 w-3/4 lg:w-1/2 rounded-lg flex flex-col gap-2">
      {/* Conversation */}
      <div className="h-full rounded echo-overlay flex flex-col gap-2">
        {renderMessages()}
      </div>

      {/* User Input */}
      <div className="bg-slate-800 rounded p-3 flex items-center">
        <input
          type="text"
          placeholder="New message..."
          className="h-full w-full"
          onKeyDown={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
