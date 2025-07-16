// src/components/MessageBubble.jsx
import { cn } from "@/lib/utils";

const MessageBubble = ({ sender, text }) => {
  const isUser = sender === "user";

  return (
    <div
      className={cn(
        "max-w-md px-4 py-2 rounded-lg mb-2 text-sm",
        isUser
          ? "bg-primary text-white self-end"
          : "bg-muted text-muted-foreground self-start"
      )}
    >
      {text}
    </div>
  );
};

export default MessageBubble;
