const Chat = () => {
  return (
    <div className="bg-slate-900 p-4 h-3/4 w-3/4 lg:w-1/2 rounded-lg flex flex-col gap-2">
      {/* Conversation */}
      <div className="h-full rounded echo-overlay"></div>

      {/* User Input */}
      <div className="h-16 bg-slate-800 rounded"></div>
    </div>
  );
};

export default Chat;
