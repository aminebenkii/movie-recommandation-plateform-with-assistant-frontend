// src/components/SeenButton.jsx
import { useState } from "react";
import { Button } from "./ui/button";
import { CheckIcon } from "lucide-react";
import api from "../utils/api";

const SeenButton = ({ movieId }) => {
  const [seen, setSeen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      await api.post("/seen", { movie_id: movieId }); // TMDb ID
      setSeen(true);
    } catch (err) {
      console.error("Failed to mark as seen:", err);
      // Optionally: toast for feedback
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={seen || loading}
      variant={seen ? "outline" : "default"}
      className="text-sm"
    >
      {seen ? (
        <>
          <CheckIcon className="w-4 h-4 mr-1" /> Seen
        </>
      ) : loading ? (
        "Marking..."
      ) : (
        "Mark as Seen"
      )}
    </Button>
  );
};

export default SeenButton;
