import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-reveal"
import { Divider, GearDecoration } from "@/components/steampunk-decorations"

export function AboutSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 md:gap-16 lg:gap-24">
          <div>
            <div
              className={`mb-6 transition-all duration-700 md:mb-12 ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
              }`}
            >
              <p className="mb-3 font-mono text-[10px] tracking-[0.4em] uppercase text-copper/60">/ О нас</p>
              <h2 className="mb-3 font-sans text-3xl font-light leading-[1.1] tracking-wider text-foreground md:mb-4 md:text-6xl lg:text-7xl steampunk-text-glow">
                Путь к
                <br />
                себе
                <br />
                <span className="copper-gradient-text">настоящему</span>
              </h2>
              <Divider className="mt-4 max-w-xs" />
            </div>

            <div
              className={`space-y-3 transition-all duration-700 md:space-y-4 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <p className="max-w-md font-serif text-sm leading-relaxed text-foreground/70 italic md:text-lg">
                Мы создаём пространство для глубокого самоисследования — через видео, практики и методические материалы, проверенные годами работы.
              </p>
              <p className="max-w-md font-serif text-sm leading-relaxed text-foreground/70 italic md:text-lg">
                Каждая программа — это шаг к более осознанной, наполненной и настоящей жизни.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-6 md:space-y-12">
            {[
              { value: "3000+", label: "Учеников", sublabel: "Прошли наши программы", direction: "right" },
              { value: "5", label: "Лет", sublabel: "Опыта в саморазвитии", direction: "left" },
              { value: "12+", label: "Курсов", sublabel: "Видео и методик", direction: "right" },
            ].map((stat, i) => {
              const getRevealClass = () => {
                if (!isVisible) {
                  return stat.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
                }
                return "translate-x-0 opacity-100"
              }

              return (
                <div
                  key={i}
                  className={`flex items-baseline gap-4 border-l-2 border-copper/40 pl-4 transition-all duration-700 md:gap-8 md:pl-8 ${getRevealClass()}`}
                  style={{
                    transitionDelay: `${300 + i * 150}ms`,
                    marginLeft: i % 2 === 0 ? "0" : "auto",
                    maxWidth: i % 2 === 0 ? "100%" : "85%",
                  }}
                >
                  <div className="text-3xl font-light text-copper md:text-6xl lg:text-7xl steampunk-text-glow">{stat.value}</div>
                  <div>
                    <div className="font-sans text-base font-light tracking-wide text-foreground md:text-xl">{stat.label}</div>
                    <div className="font-mono text-xs text-foreground/40">{stat.sublabel}</div>
                  </div>
                </div>
              )
            })}
            
            <div className="flex justify-end pr-4">
              <GearDecoration size={50} speed="slow" className="opacity-20" />
            </div>
          </div>
        </div>

        <div
          className={`mt-8 flex flex-wrap gap-3 transition-all duration-700 md:mt-16 md:gap-4 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "750ms" }}
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
