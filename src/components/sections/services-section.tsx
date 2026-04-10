import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { useState } from "react"

const livePractices = [
  {
    number: "01",
    title: "Парадоксальный сталкинг",
    category: "Книга",
    price: "1 000 ₽",
    image: "https://cdn.poehali.dev/projects/97701dc1-edd8-4a67-adcd-82c0ea3fc857/files/7b91280e-4929-4256-b56e-06601ec3144e.jpg",
  },
  {
    number: "02",
    title: "Генератор речевых парадоксов",
    category: "Веб-приложение",
    price: "250 ₽",
    image: "https://cdn.poehali.dev/projects/97701dc1-edd8-4a67-adcd-82c0ea3fc857/bucket/3a47cdb6-53a4-4ffd-81be-c9247969e412.png",
  },
  {
    number: "03",
    title: "Генератор терапевтических историй",
    category: "Веб-приложение",
    price: "250 ₽",
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
        price: "",
        image: "https://cdn.poehali.dev/projects/97701dc1-edd8-4a67-adcd-82c0ea3fc857/files/abd59135-7636-41f1-b999-a66d9b3a4f4b.jpg",
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
        price: "500 ₽",
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
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Программы
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Что вы получите</p>
        </div>

        {/* Tabs */}
        <div
          className={`mb-8 flex flex-wrap gap-2 transition-all duration-700 delay-150 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(i)}
              className={`rounded-full border px-4 py-2 font-mono text-xs transition-all duration-300 ${
                activeTab === i
                  ? "border-foreground/60 bg-foreground/15 text-foreground"
                  : "border-foreground/15 bg-foreground/5 text-foreground/50 hover:border-foreground/30 hover:text-foreground/80"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div
          className={`transition-all duration-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          key={activeTab}
        >
          <p className="mb-6 max-w-xl text-sm leading-relaxed text-foreground/70 md:text-base">
            {current.description}
          </p>

          {current.cards.length === 0 ? (
            <div className="flex items-center justify-center rounded-xl border border-foreground/10 bg-foreground/5 py-20">
              <p className="font-mono text-sm text-foreground/40">Скоро появятся материалы</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              {current.cards.map((item, i) => (
                <div
                  key={i}
                  className="group flex w-52 flex-col overflow-hidden rounded-xl border border-foreground/10 bg-foreground/5 backdrop-blur-sm transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/10"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-28 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ objectPosition: item.number === "02" ? "center 20%" : "center center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute left-4 top-4 font-mono text-xs text-foreground/60">{item.number}</span>
                    <span className="absolute right-4 top-4 rounded-full border border-foreground/20 bg-black/40 px-3 py-1 font-mono text-xs text-foreground/80 backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <h3 className="mb-3 font-sans text-sm font-light text-foreground">{item.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-base font-light text-foreground">{item.price}</span>
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