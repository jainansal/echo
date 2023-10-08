"use client";

import { useState } from "react";

import { ChevronDown } from "react-feather";

const Message = ({ message, sender, repliedTo, clientId, handleReply }) => {
  if (!sender) {
    return <div className="self-center break-words">{message}</div>;
  }

  // useState
  const [showOptions, setShowOptions] = useState(false);

  // Functions
  const handleHover = () => {
    setShowOptions(true);
    setTimeout(() => setShowOptions(false), 2000);
  };
  const setReply = () => {
    handleReply(message);
  };

  return (
    <div
      className={`rounded p-2 bg-slate-800 max-w-[75%] ${
        sender.id === clientId ? "self-end" : "self-start"
      }`}
    >
      {repliedTo && (
        <p className="text-xs p-1 bg-slate-900 rounded-sm mb-1 max-w-full">
          {repliedTo}
        </p>
      )}
      <div className="flex items-center justify-between relative">
        <p className="text-xs font-thin text-slate-500 cursor-pointer">
          {sender.username}
        </p>
        <ChevronDown
          size={16}
          className="cursor-pointer"
          onMouseEnter={handleHover}
        />
        {showOptions && (
          <div className="absolute top-3 right-0 bg-slate-950 rounded p-2">
            <p
              className="text-sm font-thin text-slate-500 cursor-pointer hover:text-slate-300"
              onClick={setReply}
            >
              Reply
            </p>
          </div>
        )}
      </div>
      <p className="break-words">{message}</p>
    </div>
  );
};

export default Message;
