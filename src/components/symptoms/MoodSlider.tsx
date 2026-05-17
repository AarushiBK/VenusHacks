import { getMoodLabel } from "../../lib/moodLabels";

interface MoodSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function MoodSlider({ value, onChange }: MoodSliderProps) {
  return (
    <div className="px-1">
      <p className="text-center font-display text-xl font-semibold text-ink">
        {getMoodLabel(value)}
      </p>
      <div className="mt-8">
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="mood-slider w-full"
          aria-label="How pleasant or unpleasant you feel"
        />
        <p className="mt-2 flex justify-between text-xs text-muted">
          <span>Very unpleasant</span>
          <span>Very pleasant</span>
        </p>
      </div>
    </div>
  );
}
