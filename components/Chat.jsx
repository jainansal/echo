const Chat = () => {
  return (
    <div className="bg-slate-900 p-4 h-3/4 w-3/4 lg:w-1/2 rounded-lg flex flex-col gap-2">
      {/* Conversation */}
      <div className="h-full rounded echo-overlay"></div>

      {/* User Input */}
      <div className="bg-slate-800 rounded p-4 flex items-center">
        <input
          type="text"
          placeholder="New message..."
          className="h-full w-full"
        />
        <i class="fa-solid fa-paper-plane fa-lg"></i>
      </div>
    </div>
  );
};

export default Chat;
