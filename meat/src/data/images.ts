function q(width: number) {
  return `?auto=format&fit=crop&w=${width}&q=80`;
}

/** Verified working Unsplash URLs (404 IDs removed) */
export const images = {
  steakRaw: `https://images.unsplash.com/photo-1546833999-b9f581a1996d${q(800)}`,
  steakRibeye: `https://images.unsplash.com/photo-1558030006-450675393462${q(800)}`,
  steakGrill: `https://images.unsplash.com/photo-1544025162-d76694265947${q(800)}`,
  meatCounter: `https://images.unsplash.com/photo-1607623814075-e51df1bdc82f${q(800)}`,
  meatPrep: `https://images.unsplash.com/photo-1565299624946-b28f40a0ae38${q(800)}`,
  kitchen: `https://images.unsplash.com/photo-1556910103-1c02745aae4d${q(800)}`,
  pasture: `https://images.unsplash.com/photo-1500595046743-cd271d694d30${q(800)}`,
  soil: `https://images.unsplash.com/photo-1416879595882-3373a0480b5b${q(400)}`,
  profile: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e${q(100)}`,
  hero: `https://images.unsplash.com/photo-1546833999-b9f581a1996d${q(1920)}`,
} as const;

export function img(url: string, width = 800) {
  if (url.includes("auto=format")) return url;
  const base = url.split("?")[0];
  return `${base}${q(width)}`;
}

export const imageSizes = {
  hero: "100vw",
  card: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  categoryLarge: "(max-width: 1024px) 100vw, 50vw",
  categorySmall: "(max-width: 640px) 100vw, 50vw",
  productMain: "(max-width: 1024px) 100vw, 50vw",
  thumbnail: "120px",
  cart: "80px",
  bundleItem: "80px",
  avatar: "48px",
} as const;
