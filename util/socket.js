import { io } from "socket.io-client";

export const init = (username) => {
  const socket = io("https://echo-73ju.onrender.com", { query: { username } });
  return socket;
}
