"use client";

import { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <HeaderWrapper />
      <main className="py-10 lg:py-14">
        <Container>
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              Холбоо барих
            </p>
            <h1 className="mt-2 text-4xl font-bold lg:text-5xl">
              Бидэнтэй холбогдох
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Захиалга, хүргэлт, бөөний худалдааны талаар асууулт байвал
              бидэнтэй холбогдоно уу.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="flex gap-4">
                <MapPin className="h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="font-bold">Хаяг</h3>
                  <p className="mt-1 text-sm text-muted">
                    СBD, 1-р хороо, Бурхант гудамж 15
                    <br />
                    Улаанбаатор хот, Монгол
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="font-bold">Утас</h3>
                  <p className="mt-1 text-sm text-muted">+976 7711-2233</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="font-bold">И-мэйл</h3>
                  <p className="mt-1 text-sm text-muted">info@burkhant.mn</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="font-bold">Ажлын цаг</h3>
                  <p className="mt-1 text-sm text-muted">
                    Даваа–Баасан: 09:00 – 20:00
                    <br />
                    Бямба: 10:00 – 18:00
                    <br />
                    Ням: Амарна
                  </p>
                </div>
              </div>

              <div id="delivery" className="rounded-xl bg-primary-light/40 p-6">
                <h3 className="font-bold text-primary-dark">
                  Хүргэлт ба Буцаалт
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Улаанбаатор хотод 24 цагийн дотор хүйтэн гинжийн хүргэлт.
                  Бүтээгдэхүүн гэмтсэн тохиолдолд 48 цагийн дотор бүрэн буцаалт
                  хийнэ.
                </p>
              </div>

              <div id="privacy" className="rounded-xl bg-surface p-6">
                <h3 className="font-bold">Нууцлалын бодлого</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Таны хувийн мэдээллийг зөвхөн захиалга болон хүргэлтийн
                  зорилгоор ашиглана. Гуравдагч этгээдэд хуваалцахгүй.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-surface p-8">
              <h2 className="text-xl font-bold">Мессеж илгээх</h2>
              {submitted ? (
                <div className="mt-6 rounded-lg bg-primary-light p-6 text-center">
                  <p className="font-semibold text-primary">
                    Таны мессеж амжилттай илгээгдлээ!
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    Бид удахгүй тань руу холбогдох болно.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium" htmlFor="name">
                      Нэр
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      className="mt-1 w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium" htmlFor="email">
                      И-мэйл
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-1 w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium" htmlFor="message">
                      Мессеж
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="mt-1 w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-primary"
                    />
                  </div>
                  <Button type="submit" fullWidth size="lg">
                    Илгээх
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
