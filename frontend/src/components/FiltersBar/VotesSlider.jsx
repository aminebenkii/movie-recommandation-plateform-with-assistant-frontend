import { Slider } from "@/components/ui/slider";

function VotesSlider({ value, onChange, language }) {
  const label = language === "fr" ? "Votes IMDb min" : "Min IMDb Votes";

  // ✅ Fallback if value is null or undefined
  const safeValue = value ?? 1000;

  const formattedValue =
    language === "fr"
      ? safeValue.toLocaleString("fr-FR")
      : safeValue.toLocaleString("en-US");

  return (
    <div className="flex flex-col min-w-[150px] w-full">
      <label className="uppercase text-xs tracking-wide text-gray-400 font-bold mb-4">
        {label}: <span className="text-white font-medium">{formattedValue}</span>
      </label>
      <Slider
        min={0}
        max={1000000}
        step={1000}
        value={[safeValue]} // ✅ always defined
        onValueChange={([v]) => onChange(v)}
        className="mt-5 mb-2 [&_[role=slider]]:bg-yellow-500 [&_[role=slider]]:border-white"
      />
    </div>
  );
}

export default VotesSlider;
