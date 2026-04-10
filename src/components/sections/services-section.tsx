import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { useState } from "react"
import { CornerBracket, Divider, GearDecoration } from "@/components/steampunk-decorations"

const livePractices = [
  {
    number: "01",
    title: "Парадоксальный сталкинг",
    category: "Книга",
    price: "1 000 \u20BD",
    image: "https://cdn.poehali.dev/projects/97701dc1-edd8-4a67-adcd-82c0ea3fc857/files/7b91280e-4929-4256-b56e-06601ec3144e.jpg",
  },
  {
    number: "02",
    title: "Генератор речевых парадоксов",
    category: "Веб-приложение",
    price: "250 \u20BD",
    image: "https://cdn.poehali.dev/projects/97701dc1-edd8-4a67-adcd-82c0ea3fc857/bucket/3a47cdb6-53a4-4ffd-81be-c9247969e412.png",
  },
  {
    number: "03",
    title: "Генератор терапевтических историй",
    category: "Веб-приложение",
    price: "250 \u20BD",
    image: "https://cdn.poehali.dev/projects/97701dc1-edd8-4a67-adcd-82c0ea3fc857/bucket/5b54d477-4f5a-49f5-8c4e-306151b0bc4a.png",
  },
]

const tabs = [
  {
    id: "video",
    title: "Видеокурсы",
    description: "Глубокие практики самопознания в формате структурированных видеоуроков — в своём темпе, в удобное время",
    cards: [
      {
        number: "01",
        title: "3D Гимнастика",
        category: "Видеокурс",
        price: "500 \u20BD",
        image: "https://cdn.poehali.dev/projects/97701dc1-edd8-4a67-adcd-82c0ea3fc857/files/abd59135-7636-41f1-b999-a66d9b3a4f4b.jpg",
      },
      {
        number: "02",
        title: "Парадоксальная терапия",
        category: "Видеокурс",
        price: "1 000 \u20BD",
        image: "https://cdn.poehali.dev/projects/97701dc1-edd8-4a67-adcd-82c0ea3fc857/bucket/dc24097a-9ae6-4bbe-a442-532b5febd541.png",
      },
    ],
  },
  {
    id: "materials",
    title: "Методические материалы",
    description: "Рабочие тетради, упражнения и техники для самостоятельной работы с собой",
    cards: [
      {
        number: "01",
        title: "Интенсив 4-6 часов парадоксальный сталкинг!",
        category: "Интенсив",
        price: "500 \u20BD",
        image: "https://cdn.poehali.dev/projects/97701dc1-edd8-4a67-adcd-82c0ea3fc857/bucket/ef4ca3a5-da68-4135-81a5-ba1f55855f89.png",
      },
    ],
  },
  {
    id: "live",
    title: "Живые практики",
    description: "Онлайн-сессии и медитации для углублённой работы с внутренним миром",
    cards: livePractices,
  },
  {
    id: "personal",
    title: "Личный путь",
    description: "Индивидуальные программы, выстроенные под ваш запрос и уровень готовности",
    cards: [],
  },
]

export function ServicesSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)
  const [activeTab, setActiveTab] = useState(0)

  const current = tabs[activeTab]

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-start overflow-y-auto px-6 pt-24 md:px-12 lg:px-16"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="mx-auto w-full max-w-7xl pb-12">
        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <p className="mb-2 font-mono text-[10px] tracking-[0.4em] uppercase text-copper/60">/ Что вы получите</p>
          <h2 className="font-display text-5xl font-bold tracking-wider md:text-6xl lg:text-7xl metal-emboss">
            Программы
          </h2>
          <Divider className="mt-4 max-w-xs" />
        </div>

        <div
          className={`mb-8 flex flex-wrap gap-2 transition-all duration-700 delay-150 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(i)}
              className={`border px-5 py-2 font-sans text-xs uppercase tracking-widest transition-all duration-300 ${
                activeTab === i
                  ? "border-copper/60 bg-copper/15 text-copper shadow-[0_0_12px_hsl(var(--copper)/0.15)]"
                  : "border-copper/15 bg-background/30 text-foreground/50 hover:border-copper/30 hover:text-foreground/80"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div
          className={`transition-all duration-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          key={activeTab}
        >
          <p className="mb-6 max-w-xl font-serif text-sm leading-relaxed text-foreground/60 italic md:text-base">
            {current.description}
          </p>

          {current.cards.length === 0 ? (
            <div className="relative flex items-center justify-center steampunk-card py-20">
              <CornerBracket position="top-left" className="left-2 top-2" />
              <CornerBracket position="top-right" className="right-2 top-2" />
              <CornerBracket position="bottom-left" className="bottom-2 left-2" />
              <CornerBracket position="bottom-right" className="bottom-2 right-2" />
              <div className="flex flex-col items-center gap-3">
                <GearDecoration size={30} speed="slow" className="opacity-30" />
                <p className="font-mono text-sm text-foreground/40">Скоро появятся материалы</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              {current.cards.map((item, i) => (
                <div
                  key={i}
                  className="group relative flex w-52 flex-col overflow-hidden steampunk-card transition-all duration-300 hover:border-copper/40 hover:shadow-[0_0_20px_hsl(var(--copper)/0.15)]"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <CornerBracket position="top-left" className="left-0.5 top-0.5 z-10" />
                  <CornerBracket position="top-right" className="right-0.5 top-0.5 z-10" />

                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <span className="absolute left-3 top-3 font-mono text-xs text-copper/70">{item.number}</span>
                    <span className="absolute right-3 top-3 border border-copper/30 bg-background/60 px-2 py-0.5 font-mono text-[10px] text-foreground/80 backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <h3 className="mb-3 font-sans text-sm font-light tracking-wide text-foreground">{item.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-bold metal-emboss-light">{item.price}</span>
                      <MagneticButton variant="secondary" size="sm" onClick={() => scrollToSection?.(5)}>
                        Купить
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}