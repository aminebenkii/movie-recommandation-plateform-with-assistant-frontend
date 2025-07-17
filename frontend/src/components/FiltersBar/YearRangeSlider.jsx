import { DualSlider } from "@/components/ui/dualslider";

function YearRangeSlider({ minYear, maxYear, onChange, language }) {
  const label = language === "fr" ? "Plage d’années" : "Year Range";
  const currentYear = new Date().getFullYear();
  const minLimit = 1950;

  const handleValueChange = ([min, max]) => {
    onChange({ min, max });
  };

  return (
    <div className="flex flex-col min-w-[200px] w-full">
      <label className="uppercase text-xs tracking-wide text-gray-400 font-bold mb-4">
        {label}:{" "}
        <span className="text-white font-medium">
          {minYear} – {maxYear}
        </span>
      </label>
      <DualSlider
        min={minLimit}
        max={currentYear}
        step={1}
        value={[minYear, maxYear]}
        onValueChange={handleValueChange}
        className="mt-5 mb-2 [&_[role=slider]]:bg-yellow-500 [&_[role=slider]]:border-white"
      />
    </div>
  );
}

export default YearRangeSlider;
