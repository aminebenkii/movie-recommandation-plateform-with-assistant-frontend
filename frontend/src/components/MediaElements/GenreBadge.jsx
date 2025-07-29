// components/GenreNameBadge.jsx
function GenreBadge({ name }) {
  if (!name) return null;

  return (
    <span className="inline-block bg-zinc-800 text-zinc-200 px-4 py-2 rounded-full text-xs font-medium border border-zinc-700 shadow-sm hover:bg-zinc-700 transition-colors duration-150">
      {name}
    </span>
  );
}

export default GenreBadge;
