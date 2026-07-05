import Link from "next/link";
import { Share2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import {
  footerCompanyLinks,
  footerHelpLinks,
  footerShopLinks,
} from "@/data/navigation";

export function Footer() {
  return (
    <footer className="mt-auto bg-surface">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="text-2xl font-bold text-primary"
            >
              Бурхант
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Дээд зэрэглэлийн мах, чанарын баталгаатай. Монголын бэлчээрээс
              таны ширээнд хүртэл.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                className="rounded-full bg-white p-2 text-xs font-bold text-muted transition-colors hover:text-primary"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="#"
                className="rounded-full bg-white p-2 text-xs font-bold text-muted transition-colors hover:text-primary"
                aria-label="Instagram"
              >
                <Share2 className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Дэлгүүр
            </h4>
            <ul className="mt-4 space-y-2">
              {footerShopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Тусламж
            </h4>
            <ul className="mt-4 space-y-2">
              {footerHelpLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Бурхант гэр бүлд нэгдэх
            </h4>
            <p className="mt-4 text-sm text-muted">
              Шинэ бүтээгдэхүүн, зөвлөмж мэдээлэл авах.
            </p>
            <form className="mt-4 flex">
              <input
                type="email"
                placeholder="И-мэйл хаяг"
                className="flex-1 rounded-l-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="rounded-r-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Нэгдэх
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            © 2024 Бурхант. Бүх эрх хуулиар хамгаалагдсан.
          </p>
          <div className="flex gap-6">
            {footerCompanyLinks.slice(0, 2).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
