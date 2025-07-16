// src/components/ChatInput.jsx
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  };

  return (
    <div className="flex gap-2 p-4 border-t">
      <Input
        placeholder="Ask for a movie..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <Button onClick={handleSubmit}>Send</Button>
    </div>
  );
};

export default ChatInput;
