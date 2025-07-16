// src/components/GenreBadge.jsx
import { Badge } from "./ui/badge";

const GenreBadge = ({ genre }) => {
  return (
    <Badge variant="secondary" className="text-xs lowercase">
      {genre}
    </Badge>
  );
};

export default GenreBadge;
