import { io } from "socket.io-client";

export const init = (username) => {
  const socket = io("http://localhost:4000", { query: { username } });
  return socket;
}
