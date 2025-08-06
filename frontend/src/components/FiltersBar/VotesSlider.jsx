import { useLanguage } from "../../context/LanguageContext";
import { Slider } from "@/components/ui/slider";

function VotesSlider({ value, onChange }) {
  
  const { language } = useLanguage();
  const label = language === "fr" ? "Votes IMDb min" : "Min IMDb Votes";

  // ✅ Fallback if value is null or undefined
  const safeValue = value ?? 1000;

  const formattedValue =
    language === "fr"
      ? safeValue.toLocaleString("fr-FR")
      : safeValue.toLocaleString("en-US");

  return (
    <div className="flex flex-col min-w-[100px] w-full">
      <label className="uppercase text-[10px] tracking-wide text-gray-400 font-bold mb-[22px]">
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
