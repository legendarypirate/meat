import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Newsletter() {
  return (
    <section className="bg-primary-dark">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 rounded-t-3xl px-6 py-12 lg:flex-row lg:items-center lg:px-12 lg:py-16">
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold text-white lg:text-4xl">
              Махны мэдээ, зөвлөмж авах
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Шинэ бүтээгдэхүүн, мах бэлтгэх зөвлөмж, онцгой санал мэдээлэл
              хүлээн авах.
            </p>
          </div>
          <form className="flex w-full max-w-md gap-0">
            <input
              type="email"
              placeholder="И-мэйл хаяг"
              className="flex-1 rounded-l-lg bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none ring-1 ring-white/20 focus:ring-white/40"
            />
            <Button
              variant="ghost"
              className="rounded-l-none rounded-r-lg bg-white text-primary hover:bg-white/90"
            >
              Бүртгүүлэх
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}
