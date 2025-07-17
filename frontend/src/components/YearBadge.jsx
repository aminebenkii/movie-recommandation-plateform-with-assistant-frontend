// components/YearBadge.jsx
function YearBadge({ year }) {
  if (!year) return null;

  return (
    <div className="inline-block bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-extrabold shadow-md">
      {year}
    </div>
  );
}

export default YearBadge;
