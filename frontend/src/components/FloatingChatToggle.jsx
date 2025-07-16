// src/components/FloatingChatToggle.jsx
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const FloatingChatToggle = ({ onClick }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button onClick={onClick} size="icon" variant="default" className="rounded-full shadow-lg">
        <MessageCircle className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default FloatingChatToggle;
