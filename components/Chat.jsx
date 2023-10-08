"use client";

import { init } from "@/util/socket";
import { useState, useEffect, useRef } from "react";

import { X } from "react-feather";
import Message from "./Message";

let socket;

const Chat = ({ username }) => {
  // useRef
  const messagesEndRef = useRef(null);

  // useStates
  const [clientId, setClientId] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [replyTo, setReplyTo] = useState("");

  // useEffects
  useEffect(() => {
    socket = init(username);

    // Event handlers
    const handleWelcome = (data) => {
      setClientId(data);
    };
    const handleEnterUser = (data) => {
      const message = {
        id: messages.length,
        message: `${data} has joined the chat`,
      };
      setMessages((prev) => [...prev, message]);
    };
    const handleLeaveUser = (data) => {
      const message = {
        id: messages.length,
        message: `${data} has left the chat`,
      };
      setMessages((prev) => [...prev, message]);
    };
    const handleNewMessage = (data) => {
      const message = {
        id: messages.length,
        message: data.message,
        sender: data.sender,
        repliedTo: data.repliedTo,
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Functions
  const renderMessages = () => {
    return messages.map((message, index) => {
      console.log(message);
      return (
        <Message
          message={message.message}
          sender={message.sender}
          repliedTo={message.repliedTo}
          clientId={clientId}
          key={index}
          handleReply={handleReply}
        />
      );
    });
  };

  const sendMessage = (e) => {
    if (e.key === "Enter" && newMessage !== "") {
      const data = {
        message: newMessage,
        replyTo,
      };
      socket.emit("new-message", data);
      setNewMessage("");
      setReplyTo("");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleReply = (message) => {
    setReplyTo(message);
  };

  const removeReply = () => {
    setReplyTo("");
  };

  return (
    <div className="bg-slate-900 p-3 h-3/4 w-3/4 lg:w-1/2 rounded-lg flex flex-col gap-2">
      {/* Conversation */}
      <div className="h-full rounded echo-overlay flex flex-col gap-2">
        {renderMessages()}
        <div ref={messagesEndRef} />
      </div>

      {/* User Input */}
      <div className="bg-slate-800 rounded p-3 flex flex-col gap-1">
        {replyTo && (
          <div className="flex items-center gap-2">
            <p className="text-xs font-thin text-slate-500 cursor-pointer min-w-max">
              Replying to:
            </p>
            <p className="text-xs break-words p-1 bg-slate-900 rounded">
              {replyTo}
            </p>
            <X
              size={16}
              className="cursor-pointer justify-self-end"
              onClick={removeReply}
            />
          </div>
        )}
        <div className="flex w-full">
          <input
            type="text"
            placeholder="New message..."
            className="h-full w-full"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={sendMessage}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
