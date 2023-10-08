"use client";

import { useState } from "react";
import Chat from "@/components/Chat";

const Home = () => {
  // useStates
  const [username, setUsername] = useState("");

  // Functions
  const handleUsername = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      setUsername(e.target.value);
      e.target.value = "";
    }
  };

  return (
    <div className="echo-view flex items-center justify-center flex-col gap-2">
      {!username && (
        <input
          type="text"
          placeholder="What should people call you?"
          onKeyDown={handleUsername}
          className="bg-slate-900 p-4 rounded-lg w-1/2 text-center"
        />
      )}
      {username && <Chat username={username} />}
    </div>
  );
};

export default Home;
