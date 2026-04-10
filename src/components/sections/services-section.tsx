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

export function ServicesSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-start overflow-y-auto px-6 pt-24 md:px-12 lg:px-16"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="mx-auto w-full max-w-7xl pb-12">
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Программы
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Что вы получите</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-12 lg:gap-x-24">
          {[
            {
              title: "Видеокурсы",
              description: "Глубокие практики самопознания в формате структурированных видеоуроков — в своём темпе, в удобное время",
              direction: "top",
              index: 0,
            },
            {
              title: "Методические материалы",
              description: "Рабочие тетради, упражнения и техники для самостоятельной работы с собой",
              direction: "right",
              index: 1,
            },
            {
              title: "Живые практики",
              description: "Онлайн-сессии и медитации для углублённой работы с внутренним миром",
              direction: "left",
              index: 2,
              isExpandable: true,
            },
            {
              title: "Личный путь",
              description: "Индивидуальные программы, выстроенные под ваш запрос и уровень готовности",
              direction: "bottom",
              index: 3,
            },
          ].map((service) => (
            <ServiceCard
              key={service.index}
              service={service}
              isVisible={isVisible}
              isOpen={service.isExpandable ? isOpen : false}
              onToggle={service.isExpandable ? () => setIsOpen((v) => !v) : undefined}
              scrollToSection={scrollToSection}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  isVisible,
  isOpen,
  onToggle,
  scrollToSection,
}: {
  service: { title: string; description: string; direction: string; index: number; isExpandable?: boolean }
  isVisible: boolean
  isOpen: boolean
  onToggle?: () => void
  scrollToSection?: (index: number) => void
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (service.direction) {
        case "left": return "-translate-x-16 opacity-0"
        case "right": return "translate-x-16 opacity-0"
        case "top": return "-translate-y-16 opacity-0"
        case "bottom": return "translate-y-16 opacity-0"
        default: return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`transition-all duration-700 ${getRevealClass()} ${service.isExpandable ? "md:col-span-2" : ""}`}
      style={{ transitionDelay: `${service.index * 150}ms` }}
    >
      <button
        className={`group w-full text-left ${service.isExpandable ? "cursor-pointer" : "cursor-default"}`}
        onClick={onToggle}
      >
        <div className="mb-3 flex items-center gap-3">
          <div className="h-px w-8 bg-foreground/30 transition-all duration-300 group-hover:w-12 group-hover:bg-foreground/50" />
          <span className="font-mono text-xs text-foreground/60">0{service.index + 1}</span>
        </div>
        <div className="flex items-center gap-3">
          <h3 className="mb-2 font-sans text-2xl font-light text-foreground md:text-3xl">{service.title}</h3>
          {service.isExpandable && (
            <span className={`mb-2 font-mono text-foreground/50 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
              ↓
            </span>
          )}
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-foreground/80 md:text-base">{service.description}</p>
      </button>

      {service.isExpandable && (
        <div
          className={`overflow-hidden transition-all duration-500 ${isOpen ? "max-h-[600px] opacity-100 mt-6" : "max-h-0 opacity-0"}`}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {livePractices.map((item, i) => (
              <div
                key={i}
                className={`group flex flex-col overflow-hidden rounded-xl border border-foreground/10 bg-foreground/5 backdrop-blur-sm transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/10 ${
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: isOpen ? `${i * 100}ms` : "0ms" }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: item.number === "02" ? "center 20%" : "center center" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute left-4 top-4 font-mono text-xs text-foreground/60">{item.number}</span>
                  <span className="absolute right-4 top-4 rounded-full border border-foreground/20 bg-black/40 px-3 py-1 font-mono text-xs text-foreground/80 backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-4">
                  <h3 className="mb-3 font-sans text-lg font-light text-foreground">{item.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xl font-light text-foreground">{item.price}</span>
                    <MagneticButton variant="secondary" size="sm" onClick={() => scrollToSection?.(5)}>
                      Купить
                    </MagneticButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}