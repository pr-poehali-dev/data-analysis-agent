import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-reveal"
import { Divider } from "@/components/steampunk-decorations"

export function AboutSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-start overflow-y-auto px-4 pt-24 md:items-center md:px-12 md:pt-0 lg:px-16"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="mx-auto w-full max-w-5xl pb-12 md:pb-0">
        <div
          className={`mb-6 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <p className="mb-2 font-mono text-[10px] tracking-[0.4em] uppercase text-copper/60">/ О нас</p>
          <h2 className="font-display text-3xl font-bold tracking-wider md:text-5xl metal-emboss">
            Путь к себе <span className="copper-gradient-text font-black">настоящему</span>
          </h2>
          <Divider className="mt-3 max-w-xs" />
        </div>

        <p
          className={`mb-8 max-w-2xl font-serif text-sm leading-relaxed text-foreground/60 italic transition-all duration-700 md:mb-10 md:text-base ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          Мы создаём пространство для глубокого самоисследования — через видео, практики и методические материалы. Каждая программа — шаг к более осознанной жизни.
        </p>

        <div
          className={`mb-8 grid grid-cols-3 gap-4 transition-all duration-700 md:mb-10 md:gap-8 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          {[
            { value: "3000+", label: "Учеников" },
            { value: "5 лет", label: "Опыта" },
            { value: "12+", label: "Курсов" },
          ].map((stat, i) => (
            <div key={i} className="border-l-2 border-copper/30 pl-3 md:pl-6">
              <div className="text-2xl font-bold metal-emboss-light md:text-4xl font-display">{stat.value}</div>
              <div className="mt-1 font-mono text-[10px] tracking-wider text-foreground/40 md:text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        <div
          className={`flex flex-wrap gap-3 transition-all duration-700 md:gap-4 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "450ms" }}
        >
          <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection?.(5)}>
            Начать путь
          </MagneticButton>
          <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection?.(1)}>
            Смотреть курсы
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}