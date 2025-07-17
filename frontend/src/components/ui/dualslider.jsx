import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

const DualSlider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-white/10">
      <SliderPrimitive.Range className="absolute h-full bg-yellow-500 rounded-full" />
    </SliderPrimitive.Track>

    {/* Left thumb (min) */}
    <SliderPrimitive.Thumb
      className="block h-4 w-4 rounded-full bg-white border border-white shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 disabled:pointer-events-none disabled:opacity-50"
    />

    {/* Right thumb (max) */}
    <SliderPrimitive.Thumb
      className="block h-4 w-4 rounded-full bg-white border border-white shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 disabled:pointer-events-none disabled:opacity-50"
    />
  </SliderPrimitive.Root>
));

DualSlider.displayName = "DualSlider";

export { DualSlider };
