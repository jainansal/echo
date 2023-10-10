import { io } from "socket.io-client";

export const init = (username) => {
  const socket = io(process.env.NEXT_PUBLIC_API_URL, { query: { username } });
  return socket;
}
