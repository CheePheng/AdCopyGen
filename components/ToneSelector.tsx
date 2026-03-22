"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Tone, TONE_LABELS } from "@/lib/types";

interface ToneSelectorProps {
  value: Tone;
  onChange: (tone: Tone) => void;
}

const TONES = Object.keys(TONE_LABELS) as Tone[];

export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <Select
      value={value}
      onValueChange={(val) => onChange(val as Tone)}
    >
      <SelectTrigger
        className={cn(
          "w-full h-10 rounded-xl transition-all duration-200",
          "backdrop-blur-sm bg-white/50 dark:bg-slate-800/50",
          "border border-white/20 dark:border-slate-700/50",
          "focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50",
          "hover:border-violet-300 dark:hover:border-violet-600",
          "text-sm"
        )}
      >
        <SelectValue placeholder="Select a tone..." />
      </SelectTrigger>
      <SelectContent className="backdrop-blur-sm bg-white/95 dark:bg-slate-900/95 border border-white/20 dark:border-slate-700/50 rounded-xl shadow-xl">
        {TONES.map((tone) => (
          <SelectItem
            key={tone}
            value={tone}
            className="rounded-lg cursor-pointer hover:bg-violet-50 dark:hover:bg-violet-900/20 focus:bg-violet-50 dark:focus:bg-violet-900/20"
          >
            {TONE_LABELS[tone]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
