/** Parse stored weight strings like "500 гр", "1.4 кг", "900г" into grams. */
export function parseWeightToGrams(value: string): number | null {
  if (!value?.trim()) return null;

  const normalized = value.trim().toLowerCase().replace(/\s+/g, " ");

  const kgMatch = normalized.match(/^([\d.,]+)\s*(?:кг|kg)$/);
  if (kgMatch) {
    const kg = parseFloat(kgMatch[1].replace(",", "."));
    return Number.isFinite(kg) ? Math.round(kg * 1000) : null;
  }

  const gramMatch = normalized.match(/^([\d.,]+)\s*(?:гр|г|gr|g)?$/);
  if (gramMatch) {
    const grams = parseFloat(gramMatch[1].replace(",", "."));
    return Number.isFinite(grams) ? Math.round(grams) : null;
  }

  return null;
}

/** Format grams for storage/display: 500 → "500 гр", 15000 → "15 кг", 1400 → "1.4 кг". */
export function formatGramsToWeight(grams: number): string {
  if (!grams || grams <= 0) return "";

  if (grams >= 1000) {
    const kg = grams / 1000;
    const formatted = Number.isInteger(kg)
      ? String(kg)
      : parseFloat(kg.toFixed(1)).toString();
    return `${formatted} кг`;
  }

  return `${grams} гр`;
}

export function isSimpleWeight(value: string): boolean {
  if (!value?.trim()) return true;
  return parseWeightToGrams(value) !== null;
}

export function gramsToDisplay(grams: number): { amount: string; unit: "гр" | "кг" } {
  if (grams >= 1000) {
    const kg = grams / 1000;
    const amount = Number.isInteger(kg) ? String(kg) : parseFloat(kg.toFixed(1)).toString();
    return { amount, unit: "кг" };
  }
  return { amount: String(grams), unit: "гр" };
}

export function displayToGrams(amount: string, unit: "гр" | "кг"): number | null {
  const n = parseFloat(amount.replace(",", "."));
  if (!Number.isFinite(n) || n <= 0) return null;
  return unit === "кг" ? Math.round(n * 1000) : Math.round(n);
}

export function sumBundleItemWeights(items: { quantity?: string }[]): string {
  const totalGrams = items.reduce((sum, item) => {
    const grams = parseWeightToGrams(item.quantity ?? "");
    return sum + (grams ?? 0);
  }, 0);
  return totalGrams > 0 ? formatGramsToWeight(totalGrams) : "";
}
