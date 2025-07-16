// src/components/RatingBadge.jsx
import { Badge } from "./ui/badge";

const formatVotes = (votes) => {
  if (votes >= 1_000_000) return `${(votes / 1_000_000).toFixed(1)}M`;
  if (votes >= 1_000) return `${(votes / 1_000).toFixed(1)}k`;
  return votes;
};

const RatingBadge = ({ rating, votes }) => {
  return (
    <Badge variant="outline" className="text-xs px-2 py-1">
      ⭐ {rating} ({formatVotes(votes)})
    </Badge>
  );
};

export default RatingBadge;
