// components/YearBadge.jsx
function YearBadge({ year }) {
  if (!year) return null;

  return (
    <div className="inline-block bg-white/80 text-black px-3 py-0.5 rounded-full text-s font-semibold shadow-md">
      {year}
    </div>
  );
}

export default YearBadge;
