const Message = ({ message, sender }) => {
  return (
    <div
      className={`rounded p-2 bg-slate-800 ${
        sender === "User332" ? "self-end" : "self-start"
      }`}
    >
      <p className="text-xs font-thin text-slate-500">{sender}</p>
      <p>{message}</p>
    </div>
  );
};

export default Message;