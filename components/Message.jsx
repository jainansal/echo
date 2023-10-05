const Message = ({ message, sender, clientId }) => {
  if (!sender) {
    return <div className="self-center">{message}</div>;
  }

  return (
    <div
      className={`rounded p-2 bg-slate-800 ${
        sender.id === clientId ? "self-end" : "self-start"
      }`}
    >
      <p className="text-xs font-thin text-slate-500">{sender.username}</p>
      <p>{message}</p>
    </div>
  );
};

export default Message;
