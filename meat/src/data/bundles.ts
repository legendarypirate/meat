export type BundleItem = {
  name: string;
  quantity: string;
  description?: string;
  image: string;
  individualPrice: number;
};

export type BundleInfo = {
  items: BundleItem[];
  totalWeight: string;
  serves: string;
  regularTotalPrice: number;
  extras: string[];
  bundleBenefits: string[];
  regularOrderDrawbacks: string[];
};

export function getBundleSavings(bundle: BundleInfo, bundlePrice: number) {
  const savingsAmount = bundle.regularTotalPrice - bundlePrice;
  const savingsPercent = Math.round(
    (savingsAmount / bundle.regularTotalPrice) * 100,
  );
  return { savingsAmount, savingsPercent };
}

export function isBundleProduct(product: { category: string; bundle?: BundleInfo }) {
  return product.category === "bundles" && Boolean(product.bundle);
}
