import { Slider } from "@/components/ui/slider";

function RatingSlider({ value, onChange, language }) {
  const label = language === "fr" ? "Note IMDb min" : "Min IMDb Rating";

  // ✅ Provide fallback if value is null or undefined
  const safeValue = value ?? 6;

  return (
    <div className="flex flex-col min-w-[150px] w-full">
      <label className="uppercase text-xs tracking-wide text-gray-400 font-bold mb-4">
        {label}: <span className="text-white font-medium">{safeValue.toFixed(1)}</span>
      </label>
      <Slider
        min={1}
        max={10}
        step={0.1}
        value={[safeValue]} // ✅ avoid passing [null]
        onValueChange={([v]) => onChange(v)}
        className="mt-5 mb-2 [&_[role=slider]]:bg-yellow-500 [&_[role=slider]]:border-white"
      />
    </div>
  );
}

export default RatingSlider;
