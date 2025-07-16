// src/components/ChatBox.jsx
import MessageBubble from "./MessageBubble";

const ChatBox = ({ messages, isLoading }) => {
  return (
    <div className="flex flex-col gap-2 p-4 overflow-y-auto h-full">
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
      ))}

      {isLoading && (
        <MessageBubble sender="assistant" text="..." />
      )}
    </div>
  );
};

export default ChatBox;
