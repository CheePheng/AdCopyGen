"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  CopyType,
  Tone,
  Framework,
  VariationCount,
  GenerateRequest,
} from "@/lib/types";
import { CopyTypeSelector } from "@/components/CopyTypeSelector";
import { ToneSelector } from "@/components/ToneSelector";
import { FrameworkSelector } from "@/components/FrameworkSelector";

interface InputFormProps {
  onGenerate: (data: GenerateRequest) => void;
  isLoading: boolean;
}

const VARIATION_OPTIONS: VariationCount[] = [3, 5, 10];

const labelClass =
  "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block";

const inputClass = cn(
  "h-10 w-full rounded-xl transition-all duration-200",
  "backdrop-blur-sm bg-white/50 dark:bg-slate-800/50",
  "border border-white/20 dark:border-slate-700/50",
  "focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50",
  "hover:border-violet-300 dark:hover:border-violet-600",
  "placeholder:text-muted-foreground/60 text-sm px-3"
);

const textareaClass = cn(
  "w-full rounded-xl transition-all duration-200 min-h-0 resize-none",
  "backdrop-blur-sm bg-white/50 dark:bg-slate-800/50",
  "border border-white/20 dark:border-slate-700/50",
  "focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50",
  "hover:border-violet-300 dark:hover:border-violet-600",
  "placeholder:text-muted-foreground/60 text-sm px-3 py-2.5"
);

export function InputForm({ onGenerate, isLoading }: InputFormProps) {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [copyType, setCopyType] = useState<CopyType>("ad-headlines");
  const [framework, setFramework] = useState<Framework | undefined>(undefined);
  const [keyBenefits, setKeyBenefits] = useState("");
  const [competitor, setCompetitor] = useState("");
  const [charLimit, setCharLimit] = useState("");
  const [numberOfVariations, setNumberOfVariations] = useState<VariationCount>(5);
  const [cooldown, setCooldown] = useState(false);

  const isValid =
    productName.trim().length > 0 &&
    description.trim().length > 0 &&
    targetAudience.trim().length > 0 &&
    tone &&
    copyType;

  const isDisabled = !isValid || isLoading || cooldown;

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isDisabled) return;

      const request: GenerateRequest = {
        productName: productName.trim(),
        description: description.trim(),
        targetAudience: targetAudience.trim(),
        tone,
        copyType,
        numberOfVariations,
        ...(framework && { framework }),
        ...(keyBenefits.trim() && { keyBenefits: keyBenefits.trim() }),
        ...(competitor.trim() && { competitor: competitor.trim() }),
        ...(charLimit && !isNaN(Number(charLimit)) && Number(charLimit) > 0
          ? { charLimit: Number(charLimit) }
          : {}),
      };

      onGenerate(request);

      setCooldown(true);
      setTimeout(() => setCooldown(false), 2000);
    },
    [
      isDisabled,
      productName,
      description,
      targetAudience,
      tone,
      copyType,
      numberOfVariations,
      framework,
      keyBenefits,
      competitor,
      charLimit,
      onGenerate,
    ]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      {/* Product / Service Name */}
      <div>
        <label className={labelClass}>Product / Service Name</label>
        <Input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="e.g. AdCopyGen"
          required
          className={inputClass}
        />
      </div>

      {/* Short Description */}
      <div>
        <label className={labelClass}>Short Description</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What does it do? What problem does it solve?"
          required
          rows={3}
          className={textareaClass}
        />
      </div>

      {/* Target Audience */}
      <div>
        <label className={labelClass}>Target Audience</label>
        <Input
          type="text"
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          placeholder="e.g. SaaS founders, busy moms"
          required
          className={inputClass}
        />
      </div>

      {/* Tone of Voice */}
      <div>
        <label className={labelClass}>Tone of Voice</label>
        <ToneSelector value={tone} onChange={setTone} />
      </div>

      {/* Copy Type */}
      <div>
        <label className={labelClass}>Copy Type</label>
        <CopyTypeSelector value={copyType} onChange={setCopyType} />
      </div>

      {/* Copywriting Framework */}
      <div>
        <FrameworkSelector value={framework} onChange={setFramework} />
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 dark:border-slate-700/30" />

      {/* Key Benefits / USPs */}
      <div>
        <label className={labelClass}>
          Key Benefits / USPs{" "}
          <span className="normal-case tracking-normal font-normal text-muted-foreground/60">
            (optional)
          </span>
        </label>
        <Textarea
          value={keyBenefits}
          onChange={(e) => setKeyBenefits(e.target.value)}
          placeholder="Enter key selling points..."
          rows={3}
          className={textareaClass}
        />
      </div>

      {/* Competitor / Differentiation */}
      <div>
        <label className={labelClass}>
          Competitor / Differentiation{" "}
          <span className="normal-case tracking-normal font-normal text-muted-foreground/60">
            (optional)
          </span>
        </label>
        <Input
          type="text"
          value={competitor}
          onChange={(e) => setCompetitor(e.target.value)}
          placeholder="What makes this different?"
          className={inputClass}
        />
      </div>

      {/* Character Limit */}
      <div>
        <label className={labelClass}>
          Character Limit{" "}
          <span className="normal-case tracking-normal font-normal text-muted-foreground/60">
            (optional)
          </span>
        </label>
        <Input
          type="number"
          value={charLimit}
          onChange={(e) => setCharLimit(e.target.value)}
          placeholder="e.g. 150 for tweets"
          min={1}
          className={inputClass}
        />
      </div>

      {/* Number of Variations */}
      <div>
        <label className={labelClass}>Number of Variations</label>
        <div className="flex gap-3">
          {VARIATION_OPTIONS.map((count) => {
            const isSelected = numberOfVariations === count;
            return (
              <motion.button
                key={count}
                type="button"
                onClick={() => setNumberOfVariations(count)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={cn(
                  "flex-1 h-10 rounded-xl border text-sm font-semibold transition-all duration-200 cursor-pointer",
                  isSelected
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 border-transparent text-white shadow-md shadow-violet-500/20"
                    : "backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-foreground hover:border-violet-300 dark:hover:border-violet-600"
                )}
              >
                {count}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Generate Button */}
      <motion.button
        type="submit"
        disabled={isDisabled}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        animate={isLoading ? { opacity: [1, 0.85, 1] } : { opacity: 1 }}
        className={cn(
          "relative w-full h-14 rounded-xl font-bold text-white text-base",
          "bg-gradient-to-r from-violet-600 to-purple-600",
          "shadow-lg shadow-violet-500/25",
          "transition-all duration-200",
          "flex items-center justify-center gap-2.5",
          !isDisabled &&
            "hover:from-violet-500 hover:to-purple-500 hover:shadow-violet-500/40",
          isDisabled && "opacity-60 cursor-not-allowed"
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Sparkles className="size-5" />
            <span>Generate Copy</span>
          </>
        )}
      </motion.button>
    </form>
  );
}
