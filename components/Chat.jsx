import Message from "./Message";

const Chat = () => {
  const conversation = [
    {
      id: 1,
      message: "Hi there",
      sender: "User211",
    },
    {
      id: 2,
      message: "Giddy up",
      sender: "User332",
    },
  ];

  const renderMessages = () => {
    return conversation.map((message) => {
      return <Message message={message.message} sender={message.sender} key={message.id} />;
    });
  }

  return (
    <div className="bg-slate-900 p-3 h-3/4 w-3/4 lg:w-1/2 rounded-lg flex flex-col gap-2">
      {/* Conversation */}
      <div className="h-full rounded echo-overlay flex flex-col gap-2">
        {renderMessages()}
      </div>

      {/* User Input */}
      <div className="bg-slate-800 rounded p-3 flex items-center">
        <input
          type="text"
          placeholder="New message..."
          className="h-full w-full"
        />
      </div>
    </div>
  );
};

export default Chat;
