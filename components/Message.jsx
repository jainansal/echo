const Message = ({ message, sender, clientId }) => {
  if (!sender) {
    return <div className="self-center break-words">{message}</div>;
  }

  return (
    <div
      className={`rounded p-2 bg-slate-800 max-w-[75%] ${
        sender.id === clientId ? "self-end" : "self-start"
      }`}
    >
      <p className="text-xs font-thin text-slate-500 cursor-pointer">
        {sender.username}
      </p>
      <p className="break-words">{message}</p>
    </div>
  );
};

export default Message;
