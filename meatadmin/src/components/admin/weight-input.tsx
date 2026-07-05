"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  formatGramsToWeight,
  isSimpleWeight,
  parseWeightToGrams,
} from "@/lib/weight";

type WeightInputProps = {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  placeholder?: string;
  className?: string;
};

export function WeightInput({
  value,
  onChange,
  id,
  placeholder = "500",
  className,
}: WeightInputProps) {
  const [gramsText, setGramsText] = useState("");

  useEffect(() => {
    const grams = parseWeightToGrams(value);
    if (grams === null) return;
    setGramsText(String(grams));
  }, [value]);

  if (!isSimpleWeight(value)) {
    return (
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={className}
      />
    );
  }

  function handleChange(raw: string) {
    const cleaned = raw.replace(/[^\d]/g, "");
    setGramsText(cleaned);

    if (!cleaned) {
      onChange("");
      return;
    }

    const grams = parseInt(cleaned, 10);
    if (!Number.isFinite(grams) || grams <= 0) {
      onChange("");
      return;
    }

    onChange(formatGramsToWeight(grams));
  }

  const preview = gramsText ? formatGramsToWeight(parseInt(gramsText, 10)) : "";

  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <Input
        id={id}
        type="text"
        inputMode="numeric"
        value={gramsText}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1"
      />
      {preview && (
        <span className="shrink-0 text-sm font-medium text-muted-foreground">{preview}</span>
      )}
    </div>
  );
}
