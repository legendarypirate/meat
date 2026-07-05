import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FillImage } from "@/components/ui/FillImage";
import { images } from "@/data/images";
import { heroSecondaryNav } from "@/data/navigation";
import { categoryHref, type StoreCategory } from "@/lib/api";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-[#1a2e1a]">
      <FillImage
        src={images.hero}
        alt="Premium ribeye steak"
        size="hero"
        className="object-cover opacity-60"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e1a]/95 via-[#1a2e1a]/70 to-transparent" />

      <Container className="relative z-10 flex min-h-[85vh] flex-col justify-between py-8">
        <nav className="hidden items-center gap-6 lg:flex">
          {heroSecondaryNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 flex-col justify-center py-16 lg:max-w-2xl">
          <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-200">
            (ШИНЭ) Зарлал + Зугаалт
          </span>

          <h1 className="text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
            Төгс хэрчилт
            <br />
            Чанарын мах
          </h1>

          <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
            Монголын бэлчээр дээр өссөн үхрийн мах. Бэлчээрээс таны ширээнд
            хүртэл чанарын баталгаатай.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              href="/products"
              icon={<Plus className="h-4 w-4" />}
              size="lg"
            >
              Бүх бүтээгдэхүүн
            </Button>
            <Button href="/about" variant="secondary" size="lg">
              Бидний тухай
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function CategoryGrid() {
  const categories = [
    {
      title: "Сонгомол бүтээгдэхүүн",
      subtitle: "Хамгийн сайн сонголт",
      image: images.meatCounter,
      size: "categoryLarge" as const,
      href: "/products",
    },
    {
      title: "Хэрхэн хамгийн сайн",
      subtitle: "КУДАЙДАН АВАХ",
      image: images.steakGrill,
      size: "categorySmall" as const,
      href: "/products",
    },
    {
      title: "Тухай",
      subtitle: "ТАНЫ ЦАГ",
      image: images.kitchen,
      size: "categorySmall" as const,
      href: "/about",
    },
    {
      title: "Мах бэлтгэлийн арга",
      subtitle: "ИЛҮҮ ДЭЛГЭРЭНГҮЙ",
      image: images.meatPrep,
      size: "categorySmall" as const,
      href: "/about#process",
    },
  ];

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-3xl font-bold lg:text-4xl">
            Сонгомол бүтээгдэхүүн
          </h2>
          <Link
            href="/products"
            className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Бүгдийг харах
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:gap-5">
          {categories.map((cat, i) => (
            <Link
              key={cat.title}
              href={cat.href}
              className={`group relative overflow-hidden rounded-2xl ${
                i === 0
                  ? "min-h-[320px] lg:row-span-2 lg:min-h-[520px]"
                  : i === 1
                    ? "min-h-[240px] lg:col-span-2"
                    : "min-h-[240px]"
              }`}
            >
              <FillImage
                src={cat.image}
                alt={cat.title}
                size={cat.size}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-white/70">
                  {cat.title}
                </p>
                <p className="mt-1 text-xl font-bold text-white lg:text-2xl">
                  {cat.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function MeatCategorySection({ categories }: { categories: StoreCategory[] }) {
  return (
    <section id="categories" className="bg-white py-16 lg:py-24">
      <Container>
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              Ангилал
            </p>
            <h2 className="mt-2 text-3xl font-bold lg:text-4xl">
              Махны ангилал
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              Стейк, цул мах, ястай мах зэрэг зүсэг төрөл бүрээр сонгон
              захиалаарай.
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Бүх бүтээгдэхүүн
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {categories.length === 0 ? (
          <p className="text-sm text-muted">Ангилал одоогоор байхгүй байна.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={categoryHref(cat.slug)}
                className="group relative min-h-[280px] overflow-hidden rounded-2xl lg:min-h-[320px]"
              >
                <FillImage
                  src={cat.image}
                  alt={cat.name}
                  size="card"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white">{cat.name}</h3>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-green-300 opacity-0 transition-opacity group-hover:opacity-100">
                    Үзэх
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export function AboutProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Бэлчээрээс",
      description:
        "Монголын өндөр уулын бэлчээр дээр чөлөөтэй өссөн, байгалийн хооллоор тэжээгдсэн үхрийн мах.",
    },
    {
      num: "02",
      title: "Мах бэлтгэгч",
      description:
        "Мэргэжлийн аргаар бэлтгэгдсэн, чанарын хяналттай бүтээгдэхүүн.",
    },
    {
      num: "03",
      title: "Таны ширээнд",
      description:
        "Вакуум савлагаатай, хөргүүрийн хяналттай хүргэлтээр шинэ байдал хадгалагдан хүрнэ.",
    },
  ];

  return (
    <section id="process" className="bg-white py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <FillImage
                src={images.pasture}
                alt="Cattle on pasture"
                size="productMain"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 h-40 w-40 overflow-hidden rounded-xl border-4 border-white shadow-xl sm:h-48 sm:w-48">
              <FillImage
                src={images.soil}
                alt="Hands holding soil"
                size="thumbnail"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold lg:text-4xl">
              Бэлчээрээс
              <br />
              Таны ширээнд
            </h2>

            <div className="mt-10 space-y-8">
              {steps.map((step) => (
                <div key={step.num} className="flex gap-6">
                  <span className="text-4xl font-bold text-border">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Testimonial() {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container className="max-w-4xl text-center">
        <blockquote className="text-2xl leading-relaxed text-foreground sm:text-3xl lg:text-4xl">
          &ldquo;Чанар нь зүйрлэшгүй юм. Хүнс бүрээс фермийн түүх, хайрлалтын
          туршлагаас мэдрэгддэг, Бурхант бол эзэн шиг таны хоолонд эргэн ирэх
          хэрэг юм.&rdquo;
        </blockquote>
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <FillImage
              src={images.profile}
              alt="John Doe"
              size="avatar"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-semibold">Жон Доу</p>
            <p className="text-sm text-muted">Байнгын захиалагч</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
