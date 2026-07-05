import { FillImage } from "@/components/ui/FillImage";
import { images } from "@/data/images";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AboutProcessSection } from "@/components/home/HomeSections";

export const metadata = {
  title: "Бидний тухай | Бурхант",
  description: "Бурхант — дээд зэрэглэлийн мах, бэлчээрээс таны ширээнд.",
};

const values = [
  {
    title: "Чанар",
    description:
      "Бид зөвхөн шилдэг бэлчээр, шилдэг малчдыг сонгон ажилладаг. Бүтээгдэхүүн бүр чанарын хяналтаар дамжина.",
  },
  {
    title: "Уламжлал",
    description:
      "Монголын мянган жилийн мах бэлтгэх уламжлалыг орчин үеийн стандартаар хадгалж, сайжруулдаг.",
  },
  {
    title: "Ил тод байдал",
    description:
      "Малын гарал үүсэл, хатаалтын хугацаа, бэлтгэх арга — бүгдийг ил тод мэдээлнэ.",
  },
];

export default function AboutPage() {
  return (
    <>
      <HeaderWrapper />
      <main>
        <section className="bg-[#1a2e1a] py-20 text-white lg:py-28">
          <Container>
            <p className="text-xs font-bold uppercase tracking-wider text-green-300">
              Бидний түүх
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold lg:text-6xl">
              Бэлчээрээс таны ширээнд
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              Бурхант нь монголын бэлчээр дээр өссөн малын мах болон орчин
              үеийн чанарын стандартыг нэгтгэсэн премиум махны брэнд юм.
            </p>
          </Container>
        </section>

        <AboutProcessSection />

        <section id="herdsmen" className="py-16 lg:py-24">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <FillImage
                  src={images.pasture}
                  alt="Малчид"
                  size="productMain"
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold lg:text-4xl">Манай малчид</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Хөвсгөл, Архангай, Өвөрхангай аймгийн малчидтай урт хугацааны
                  хамтын ажиллагаатай. Тэд бидэнд хамгийн сайн чанарын мал
                  хөөрөгддөг.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Мал бүр бэлчээр дээр чөлөөтэй өсдөг, байгалийн хооллоор
                  тэжээгддэг. Энэ нь махны амт, чанарт шууд нөлөөлдөг.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section id="process" className="bg-surface py-16 lg:py-24">
          <Container>
            <h2 className="text-center text-3xl font-bold lg:text-4xl">
              Бидний үнэт зүйлс
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl bg-white p-8 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-primary">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section id="news" className="py-16 lg:py-24">
          <Container>
            <h2 className="text-3xl font-bold lg:text-4xl">Мэдээ мэдээлэл</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "Шинэ Tomahawk Ribeye нэвтэрлээ",
                  date: "2024.06.15",
                  excerpt:
                    "45 хоног хатаасан шинэ Tomahawk Ribeye одоо захиалга авч байна.",
                },
                {
                  title: "Зуны бэлчээрээс шинэ бүтээгдэхүүн",
                  date: "2024.05.20",
                  excerpt:
                    "Зуны бэлчээр дээр өссөн малын мах одоо бэлэн боллоо.",
                },
              ].map((article) => (
                <article
                  key={article.title}
                  className="rounded-xl border border-border p-6"
                >
                  <time className="text-xs font-semibold text-primary">
                    {article.date}
                  </time>
                  <h3 className="mt-2 text-lg font-bold">{article.title}</h3>
                  <p className="mt-2 text-sm text-muted">{article.excerpt}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-primary-dark py-16 text-white lg:py-20">
          <Container className="text-center">
            <h2 className="text-3xl font-bold">Бидэнтэй танилцах уу</h2>
            <p className="mx-auto mt-4 max-w-lg text-white/80">
              Дээд зэрэглэлийн махны туршлагыг өөрөө мэдрээрэй.
            </p>
            <Button href="/products" className="mt-8" size="lg">
              Бүтээгдэхүүн үзэх
            </Button>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
