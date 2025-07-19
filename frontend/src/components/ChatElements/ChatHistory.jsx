

import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

function ChatHistory({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to bottom when messages update
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="space-y-3">
      {messages.map((msg, index) => (
        <MessageBubble key={index} role={msg.role} content={msg.content} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

export default ChatHistory;
