function MessageBubble({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-4 py-2 rounded-lg whitespace-pre-wrap break-words shadow-md
          ${isUser 
            ? "bg-yellow-400 text-black rounded-br-none" 
            : "bg-gray-700 text-white rounded-bl-none"}`}
      >
        {content}
      </div>
    </div>
  );
}

export default MessageBubble;
