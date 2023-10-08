"use client";

import { init } from "@/util/socket";
import { useState, useEffect, useRef } from "react";
import { X, Send, Plus, File } from "react-feather";
import Message from "./Message";

let socket;

const Chat = ({ username }) => {
  if (!username) {
    return <></>;
  }

  // useRef
  const messagesEndRef = useRef(null);

  // useStates
  const [clientId, setClientId] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [replyTo, setReplyTo] = useState("");
  const [file, setFile] = useState("");

  // useEffects
  useEffect(() => {
    socket = init(username);

    // Event handlers
    const handleWelcome = (data) => {
      setClientId(data);
    };
    const handleEnterUser = (data) => {
      const message = {
        id: messages?.length,
        message: `${data} has joined the chat`,
      };
      setMessages((prev) => [...prev, message]);
    };
    const handleLeaveUser = (data) => {
      const message = {
        id: messages?.length,
        message: `${data} has left the chat`,
      };
      setMessages((prev) => [...prev, message]);
    };
    const handleNewMessage = (data) => {
      const message = {
        id: messages?.length,
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const removeReply = () => {
    setReplyTo("");
  };

  const removeFile = () => {
    setFile("");
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
        {file && (
          <div className="flex items-center gap-2">
            <File size={16} />
            <p className="text-xs break-words p-1 bg-slate-900 rounded">
              {file.name}
            </p>
            <X
              size={16}
              className="cursor-pointer justify-self-end"
              onClick={removeFile}
            />
          </div>
        )}
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
        <div className="flex w-full gap-2">
          {/* <label>
            <Plus size={20} className="cursor-pointer" />
            <input
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </label> */}
          <input
            type="text"
            placeholder="New message..."
            className="h-full w-full"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={sendMessage}
          />
          <Send size={20} className="cursor-pointer" onClick={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
