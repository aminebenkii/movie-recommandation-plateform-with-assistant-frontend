// components/GenreNameBadge.jsx
function GenreNameBadge({ name }) {
  if (!name) return null;

  return (
    <span className="inline-block bg-white/10 text-white px-3 py-1 rounded-full text-xs font-medium tracking-wide shadow-sm hover:bg-white/20 transition">
      {name}
    </span>
  );
}

export default GenreNameBadge;
