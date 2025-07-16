// src/components/TrailerButton.jsx
import { Button } from "./ui/button";
import { PlayIcon } from "lucide-react";

const TrailerButton = ({ url }) => {
  if (!url) return null; // Graceful fallback if no trailer URL

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex"
    >
      <Button variant="outline" size="sm" className="gap-1">
        <PlayIcon className="w-4 h-4" />
        Trailer
      </Button>
    </a>
  );
};

export default TrailerButton;
