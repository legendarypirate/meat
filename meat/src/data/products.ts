import type { MeatType } from "./meatCategories";
import type { BundleInfo } from "./bundles";
import { images } from "./images";

export type Product = {
  id: string;
  slug: string;
  name: string;
  nameEn?: string;
  description: string;
  longDescription: string;
  price: number;
  priceUnit: string;
  image: string;
  images: string[];
  badge?: string;
  badgeVariant?: "green" | "dark" | "olive";
  grade?: string;
  category: "beef" | "dry-aged" | "bundles";
  meatTypes?: MeatType[];
  cutType?: string;
  weight?: string;
  sizes?: { label: string; weight: string }[];
  highlights?: { icon: string; title: string; description: string }[];
  cookingTips?: string[];
  bundle?: BundleInfo;
};

export const products: Product[] = [
  {
    id: "1",
    slug: "tomahawk-ribeye",
    name: "Tomahawk Ribeye",
    description:
      "Өндөр чанарын ястай рибай, 45 хоног хатаасан. Гэр бүлийн хоолонд төгс.",
    longDescription:
      "Манай Tomahawk Ribeye нь монголын өндөр уулын бэлчээр дээр өссөн үхрийн махаас бэлтгэгддэг. 45 хоногийн удаан хатаалтын процесс нь махны амт, зөөлөн байдлыг нэмэгдүүлдэг.",
    price: 120000,
    priceUnit: "хэсэг",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
    ],
    badge: "15 МИНУТ ХУГАЦАА",
    badgeVariant: "green",
    grade: "ДЭЭД ЗЭРЭГЛЭЛ",
    category: "beef",
    meatTypes: ["steak", "yastai"],
    cutType: "ribeye",
    weight: "900г",
    sizes: [
      { label: "510 гр", weight: "510" },
      { label: "620 гр", weight: "620" },
      { label: "900 гр (Томахавк)", weight: "900" },
    ],
    highlights: [
      {
        icon: "utensils",
        title: "Марbling",
        description: "BMS 7-9 зэрэглэлийн өндөр чанар",
      },
      {
        icon: "clock",
        title: "Хатаалт",
        description: "28 хоногийн удаан хатаалт",
      },
      {
        icon: "map-pin",
        title: "Гарал үүсэл",
        description: "Хөвсгөл аймгийн бэлчээр",
      },
      {
        icon: "truck",
        title: "Хүргэлт",
        description: "Вакуум савлагаатай хүргэлт",
      },
    ],
    cookingTips: [
      "Махыг хөргөгчөөс гаргаж 30-45 минут өрөөний температурт байлгана.",
      "Энгийн давс, хар перцээр амтлаад, илүүдэл давс хэрэглэхгүй.",
      "Reverse sear аргаар 120°C-д 45 минут, дараа нь өндөр гал дээр шарна.",
      "Амраах хугацаа 5-10 минут, дулаан мах дахин тархахад шаардлагатай.",
    ],
  },
  {
    id: "2",
    slug: "bone-in-ribeye",
    name: "Дээд зэрэглэлийн ястай рибай",
    description: "28 хоног хатаасан, премиум зэрэглэлийн ястай рибай стейк.",
    longDescription:
      "Мах бэлтгэгчийн сонголт болсон энэхүү ястай рибай нь монголын уламжлалт мах бэлтгэх арга барил болон орчин үеийн хатаалтын технологийг нэгтгэсэн шилдэг бүтээгдэхүүн юм.",
    price: 224000,
    priceUnit: "хэсэг бүр",
    image:
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
    ],
    badge: "28 ХОНОГ ХАТААСАН",
    badgeVariant: "dark",
    grade: "ДЭЭД ЗЭРЭГЛЭЛ",
    category: "dry-aged",
    meatTypes: ["steak", "yastai"],
    cutType: "ribeye",
    weight: "510г",
    sizes: [
      { label: "510 гр", weight: "510" },
      { label: "620 гр", weight: "620" },
      { label: "900 гр (Томахавк)", weight: "900" },
    ],
    highlights: [
      {
        icon: "utensils",
        title: "Марbling",
        description: "BMS 7-9 зэрэглэлийн өндөр чанар",
      },
      {
        icon: "clock",
        title: "Хатаалт",
        description: "28 хоногийн удаан хатаалт",
      },
      {
        icon: "map-pin",
        title: "Гарал үүсэл",
        description: "Хөвсгөл аймгийн бэлчээр",
      },
      {
        icon: "truck",
        title: "Хүргэлт",
        description: "Вакуум савлагаатай хүргэлт",
      },
    ],
    cookingTips: [
      "Махыг хөргөгчөөс гаргаж 30-45 минут өрөөний температурт байлгана.",
      "Энгийн давс, хар перцээр амтлаад, илүүдэл давс хэрэглэхгүй.",
      "Reverse sear аргаар 120°C-д 45 минут, дараа нь өндөр гал дээр шарна.",
      "Амраах хугацаа 5-10 минут, дулаан мах дахин тархахад шаардлагатай.",
    ],
  },
  {
    id: "3",
    slug: "30-day-ribeye",
    name: "30 хоног амраасан Рибай стейк",
    description: "1.5 фунт | Ястай | Дээд зэрэглэлийн",
    longDescription:
      "30 хоногийн удаан хатаалтын процессоор бэлтгэгдсэн энэхүү рибай стейк нь гүн, төгс амттай.",
    price: 75900,
    priceUnit: "кг",
    image:
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
    ],
    badge: "ПРЕМИУМ зэрэглэл",
    badgeVariant: "green",
    grade: "ДЭЭД ЗЭРЭГЛЭЛИЙН",
    category: "dry-aged",
    meatTypes: ["steak", "yastai"],
    cutType: "ribeye",
    weight: "680г",
  },
  {
    id: "4",
    slug: "new-york-strip",
    name: "Ястай Рибай",
    description: "Премиум зэрэглэлийн ястай рибай, богино хугацаанд бэлтгэхэд тохиромжтой.",
    longDescription: "Монголын бэлчээр дээр өссөн үхрийн махаас бэлтгэгдсэн.",
    price: 75900,
    priceUnit: "кг",
    image:
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
    ],
    badge: "45 ХОНОГ ХАТААСАН",
    badgeVariant: "olive",
    category: "dry-aged",
    meatTypes: ["steak", "yastai"],
    cutType: "ribeye",
    weight: "500г",
  },
  {
    id: "5",
    slug: "filet-mignon",
    name: "Филе Мignon",
    description: "Хамгийн зөөлөн, өндөр чанарын филе мignon зүсэг.",
    longDescription: "Зөөлөн, тархах амттай премиум филе мignon.",
    price: 89900,
    priceUnit: "кг",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    ],
    badge: "ПРЕМИУМ зэрэглэл",
    badgeVariant: "green",
    category: "beef",
    meatTypes: ["steak", "tsul"],
    cutType: "filet",
    weight: "300г",
  },
  {
    id: "6",
    slug: "daily-meal-bundle",
    name: "Өдрийн хоолны багц",
    description: "Гэр бүлийн 3–4 хоолонд зориулсан, урьдчилан бэлтгэсэн махны багц.",
    longDescription:
      "Өдөр бүрийн хоолонд хурдан, хялбар ашиглах махны багц. Бөмбөлөг, үрлэс, ширхэг мах зэрэг олон төрлийг нэг багцаар авахад тохиромжтой.",
    price: 89900,
    priceUnit: "багц",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=800&q=80",
    ],
    badge: "БАГЦ",
    badgeVariant: "green",
    category: "bundles",
    weight: "1.4 кг",
    bundle: {
      totalWeight: "1.4 кг",
      serves: "3–4 хүн, 3–4 хоол",
      regularTotalPrice: 112000,
      items: [
        {
          name: "Махны бөмбөлөг",
          quantity: "500 гр",
          description: "Шинээр бэлтгэсэн, 12–15 ширхэг",
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80",
          individualPrice: 35000,
        },
        {
          name: "Үрлэс мах",
          quantity: "400 гр",
          description: "Хачир, шөлнд зориулсан",
          image:
            "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400&q=80",
          individualPrice: 28000,
        },
        {
          name: "Ширхэг мах",
          quantity: "500 гр",
          description: "Шөл, пюретэй хоолонд",
          image:
            "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=400&q=80",
          individualPrice: 49000,
        },
      ],
      extras: ["Вакуум савлагаа", "Хадгалах зөвлөмжийн карт"],
      bundleBenefits: [
        "Нэг багцаар олон төрлийн мах",
        "Тус бүрийг тусад нь сонгох шаардлагагүй",
        "Өдрийн хоолны төлөвлөгөөнд тохирсон хэмжээ",
        "Багцын үнээр хэмнэлт",
      ],
      regularOrderDrawbacks: [
        "3 төрлийг тусад нь сонгох хэрэгтэй",
        "Нийт үнэ илүү өндөр",
        "Жингийг өөрөө тооцох шаардлагатай",
        "Олон бүтээгдэхүүн тусад хадгалах",
      ],
    },
    highlights: [
      {
        icon: "utensils",
        title: "3 төрөл",
        description: "Бөмбөлөг, үрлэс, ширхэг",
      },
      {
        icon: "clock",
        title: "Хурдан",
        description: "15–30 минутад бэлтгэнэ",
      },
      {
        icon: "map-pin",
        title: "1.4 кг",
        description: "Гэр бүлийн хэмжээ",
      },
      {
        icon: "truck",
        title: "Хүргэлт",
        description: "Нэг удаагийн хүйтэн хүргэлт",
      },
    ],
  },
  {
    id: "7",
    slug: "family-bbq-bundle",
    name: "Гэр бүлийн BBQ багц",
    description: "4–6 хүнд зориулсан гадуурх BBQ болон гэрт шарах бүрэн багц.",
    longDescription:
      "Амралт, хурим, гэр бүлийн уулзалтад зориулсан бүрэн BBQ багц. Стейк, филе, махны хавтгай зэрэг дээд зэрэглэлийн зүсгүүдийг нэг дор.",
    price: 269000,
    priceUnit: "багц",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    ],
    badge: "ХАМГИЙН ЭРЭЛТИЙ",
    badgeVariant: "dark",
    grade: "ДЭЭД ЗЭРЭГЛЭЛ",
    category: "bundles",
    weight: "2.1 кг",
    bundle: {
      totalWeight: "2.1 кг",
      serves: "4–6 хүн",
      regularTotalPrice: 318000,
      items: [
        {
          name: "Ястай рибай стейк",
          quantity: "2 × 300 гр",
          description: "28 хоног хатаасан",
          image:
            "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=400&q=80",
          individualPrice: 145000,
        },
        {
          name: "Филе Mignon",
          quantity: "2 × 200 гр",
          description: "Зөөлөн, өндөр чанар",
          image:
            "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80",
          individualPrice: 110000,
        },
        {
          name: "Махны хавтгай",
          quantity: "600 гр",
          description: "BBQ, burger-д зориулсан",
          image:
            "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400&q=80",
          individualPrice: 45000,
        },
        {
          name: "BBQ амтлагч + жорын карт",
          quantity: "1 багц",
          description: "Давс, перц, тусгай хольц",
          image:
            "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80",
          individualPrice: 18000,
        },
      ],
      extras: [
        "Вакуум савлагаа",
        "BBQ жорын карт",
        "Шарах зөвлөмж",
        "Нэг удаагийн хүйтэн хүргэлт",
      ],
      bundleBenefits: [
        "4–6 хүнд бүрэн BBQ хоол",
        "Стейк + филе + хавтгай нэг багцад",
        "Амтлагч, жорын карт багтсан",
        "₮49,000 хүртэл хэмнэнэ",
        "Нэг захиалга, нэг хүргэлт",
      ],
      regularOrderDrawbacks: [
        "4 бүтээгдэхүүнийг тусад сонгоно",
        "Жингийг гараар тооцно",
        "Амтлагч тусад авна",
        "Илүү өндөр нийт үнэ",
        "Олон удаагийн хадгалалт шаардлагатай",
      ],
    },
    highlights: [
      {
        icon: "utensils",
        title: "4 зүйл",
        description: "Бүрэн BBQ сет",
      },
      {
        icon: "clock",
        title: "4–6 хүн",
        description: "Уулзалтад бэлэн",
      },
      {
        icon: "map-pin",
        title: "2.1 кг",
        description: "Нийт жин",
      },
      {
        icon: "truck",
        title: "Хэмнэлт",
        description: "15% хямдралтай",
      },
    ],
  },
  {
    id: "8",
    slug: "steak-tasting-bundle",
    name: "Стейк амталах багц",
    description: "3 төрлийн премиум стейкийг жижиг хэмжээгээр амталах багц.",
    longDescription:
      "Анх удаа стейк захиалж байгаа эсвэл олон төрлийг харьцуулахыг хүсэж байвал энэ багц танд тохирно. Рибай, филе, томахавк зүсгийг нэг багцаар.",
    price: 189000,
    priceUnit: "багц",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    ],
    badge: "ШИНЭ БАГЦ",
    badgeVariant: "olive",
    grade: "ДЭЭД ЗЭРЭГЛЭЛ",
    category: "bundles",
    weight: "1.2 кг",
    bundle: {
      totalWeight: "1.2 кг",
      serves: "2–3 хүн",
      regularTotalPrice: 234000,
      items: [
        {
          name: "Ястай рибай",
          quantity: "350 гр",
          description: "28 хоног хатаасан",
          image:
            "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=400&q=80",
          individualPrice: 78000,
        },
        {
          name: "Филе Mignon",
          quantity: "250 гр",
          description: "Хамгийн зөөлөн зүсэг",
          image:
            "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80",
          individualPrice: 67450,
        },
        {
          name: "Tomahawk зүсэг",
          quantity: "600 гр",
          description: "Ястай, тайлбарлагах зүсэг",
          image:
            "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80",
          individualPrice: 88550,
        },
      ],
      extras: ["Стейк жорын карт", "Reverse sear заавар", "Вакуум савлагаа"],
      bundleBenefits: [
        "3 төрлийн стейкийг харьцуулах боломж",
        "Жижиг хэмжээгээр амтлахад тохиромжтой",
        "Жор, заавар багтсан",
        "Тусад авахад илүү үнэтэй",
      ],
      regularOrderDrawbacks: [
        "3 төрлийг тусад захиална",
        "Илүү их хэмжээ, илүү өндөр үнэ",
        "Амтлал харьцуулахад хэцүү",
        "Жор, заавар өөрөө хайна",
      ],
    },
    cookingTips: [
      "Багцын стейк бүрийг өөр өөр температур, хугацаагаар бэлтгэнэ.",
      "Эхлээд филе, дараа нь рибай, сүүлд томахавк зүсгийг шарвал амтыг илүү сайн мэдрэх боломжтой.",
      "Жорын картаар reverse sear аргыг дагана.",
      "Стейк бүрийг амраах хугацааг алдахгүй байх хэрэгтэй.",
    ],
    highlights: [
      {
        icon: "utensils",
        title: "3 стейк",
        description: "Рибай, филе, томахавк",
      },
      {
        icon: "clock",
        title: "2–3 хүн",
        description: "Амталах хэмжээ",
      },
      {
        icon: "map-pin",
        title: "1.2 кг",
        description: "Нийт жин",
      },
      {
        icon: "truck",
        title: "Хэмнэлт",
        description: "19% хямдралтай",
      },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
