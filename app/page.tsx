export default function HomePage() {
  return (
    <main className="container py-16 sm:py-20">
      <section className="rounded-2xl border border-border bg-surface p-6 shadow-soft sm:p-10">
        <p className="mb-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary-dark">
          Итерация 0 — фундамент
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
          Структура проекта и дизайн-система для B2B-лендинга ООО «Элтехника» готовы
        </h1>
        <p className="mt-4 max-w-3xl text-base text-muted sm:text-lg">
          На следующем этапе будет реализован Header, Hero и первый конверсионный CTA. Данные по
          контенту, референсам и юридическим формулировкам будут использованы строго в согласованных
          рамках.
        </p>
      </section>
    </main>
  );
}
