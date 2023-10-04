"use client";

import { io } from "socket.io-client";
import { useState, useEffect } from "react";

import Message from "./Message";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 0,
      message: "Hello",
      sender: "Echo",
    },
  ]);

  useEffect(() => {
    const socket = io("http://localhost:4000");

    // Event handlers
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

    // Event definitions
    socket.on("enter-user", handleEnterUser);
    socket.on("leave-user", handleLeaveUser);

    return () => {
      socket.disconnect();
      socket.off("enter-user", handleEnterUser);
      socket.off("leave-user", handleLeaveUser);
    };
  }, []);

  const renderMessages = () => {
    return messages.map((message) => {
      return (
        <Message
          message={message.message}
          sender={message.sender}
          key={message.id}
        />
      );
    });
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
        />
      </div>
    </div>
  );
};

export default Chat;
