"use client";

import { init } from "@/util/socket";
import { useState, useEffect, useRef } from "react";
import { X, Send, Plus, File } from "react-feather";
import { InfinitySpin } from "react-loader-spinner";
import Message from "./Message";

let socket;

const Chat = ({ username }) => {
  const cloud = `dkap9vgv4`;

  // useRef
  const messagesEndRef = useRef(null);

  // useStates
  const [clientId, setClientId] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [replyTo, setReplyTo] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(true);

  // useEffects
  useEffect(() => {
    socket = init(username);

    // Event handlers
    const handleWelcome = (data) => {
      setClientId(data);
      setLoading(false);
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
        img: data.img,
        repliedTo: data.repliedTo,
      };
      setMessages((prev) => [...prev, message]);
    };

    // Event definitions
    socket.on("welcome", handleWelcome);
    socket.on("enter-user", handleEnterUser);
    socket.on("leave-user", handleLeaveUser);
    socket.on("new-message", handleNewMessage);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      socket.disconnect();
      socket.off("welcome", handleWelcome);
      socket.off("enter-user", handleEnterUser);
      socket.off("leave-user", handleLeaveUser);
      socket.off("new-message", handleNewMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          img={message.img}
          key={index}
          handleReply={handleReply}
        />
      );
    });
  };

  const sendMessage = async (e) => {
    if ((e === "click" || e.key === "Enter") && (newMessage !== "" || file)) {
      let fileLink;
      if (file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "echoch");
        data.append("cloud_name", cloud);
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloud}/upload`,
          {
            method: "POST",
            body: data,
          }
        );
        const res = await response.json();
        fileLink = res.secure_url;
      }
      const data = {
        message: newMessage,
        img: fileLink,
        replyTo,
      };
      socket.emit("new-message", data);
      setNewMessage("");
      setReplyTo("");
      setFile("");
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
        {loading ? (
          <div className="flex items-center justify-center h-full flex-col">
            <InfinitySpin width="200" color="#96ADC8" />
            Establishing a connection with the server...
          </div>
        ) : (
          renderMessages()
        )}
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
          <label>
            <Plus size={20} className="cursor-pointer" />
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/jpg"
            />
          </label>
          <input
            type="text"
            placeholder="New message..."
            className="h-full w-full"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={sendMessage}
          />
          <Send
            size={20}
            className="cursor-pointer"
            onClick={() => sendMessage("click")}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
