import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"

const courses = [
  {
    number: "01",
    title: "Парадоксальный сталкинг",
    category: "Книга",
    price: "1 000 ₽",
    direction: "left",
  },
  {
    number: "02",
    title: "Парадоксальный сталкинг",
    category: "Веб-приложение",
    price: "250 ₽",
    direction: "right",
  },
]

export function WorkSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Курсы
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Наши программы</p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {courses.map((course, i) => (
            <CourseCard key={i} course={course} index={i} isVisible={isVisible} scrollToSection={scrollToSection} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CourseCard({
  course,
  index,
  isVisible,
  scrollToSection,
}: {
  course: { number: string; title: string; category: string; price: string; direction: string }
  index: number
  isVisible: boolean
  scrollToSection?: (index: number) => void
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      return course.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
    }
    return "translate-x-0 opacity-100"
  }

  return (
    <div
      className={`group flex items-center justify-between border-b border-foreground/10 py-6 transition-all duration-700 hover:border-foreground/20 md:py-8 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex items-baseline gap-4 md:gap-8">
        <span className="font-mono text-sm text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-base">
          {course.number}
        </span>
        <div>
          <h3 className="mb-1 font-sans text-2xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-3xl lg:text-4xl">
            {course.title}
          </h3>
          <p className="font-mono text-xs text-foreground/50 md:text-sm">{course.category}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 md:gap-8">
        <span className="font-sans text-lg font-light text-foreground md:text-2xl">{course.price}</span>
        <MagneticButton variant="secondary" size="sm" onClick={() => scrollToSection?.(4)}>
          Купить
        </MagneticButton>
      </div>
    </div>
  )
}