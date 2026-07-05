import { images } from "./images";

export type MeatType = "steak" | "tsul" | "yastai";

export type MeatCategory = {
  slug: string;
  name: string;
  description: string;
  image: string;
  href: string;
};

export const meatCategories: MeatCategory[] = [
  {
    slug: "steak",
    name: "Стейк",
    description: "Рибай, филе, T-bone зэрэг премиум стейк зүсэг",
    image: images.steakRibeye,
    href: "/products?type=steak",
  },
  {
    slug: "tsul",
    name: "Цул мах",
    description: "Ясгүй, цэвэр зүсэгт цул мах",
    image: images.steakRaw,
    href: "/products?type=tsul",
  },
  {
    slug: "yastai",
    name: "Ястай мах",
    description: "Ястай рибай, томахавк зэрэг ястай зүсэг",
    image: images.steakRaw,
    href: "/products?type=yastai",
  },
  {
    slug: "dry-aged",
    name: "Удаан хатаасан",
    description: "28–45 хоног хатаасан онцгой амттай мах",
    image: images.steakRibeye,
    href: "/products?category=dry-aged",
  },
  {
    slug: "beef",
    name: "Үхрийн мах",
    description: "Монголын бэлчээрийн үхрийн мах",
    image: images.meatCounter,
    href: "/products?category=beef",
  },
  {
    slug: "bundles",
    name: "Багц бүтээгдэхүүн",
    description: "Гэр бүлийн хоолонд зориулсан багцууд",
    image: images.meatPrep,
    href: "/bundles",
  },
];
