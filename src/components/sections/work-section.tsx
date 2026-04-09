import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"

const courses = [
  {
    number: "01",
    title: "Парадоксальный сталкинг",
    category: "Книга",
    price: "1 000 ₽",
    direction: "left",
    image: "https://cdn.poehali.dev/projects/97701dc1-edd8-4a67-adcd-82c0ea3fc857/files/7b91280e-4929-4256-b56e-06601ec3144e.jpg",
  },
  {
    number: "02",
    title: "Генератор речевых парадоксов",
    category: "Веб-приложение",
    price: "250 ₽",
    direction: "right",
    image: "https://cdn.poehali.dev/projects/97701dc1-edd8-4a67-adcd-82c0ea3fc857/bucket/3a47cdb6-53a4-4ffd-81be-c9247969e412.png",
  },
  {
    number: "03",
    title: "Генератор терапевтических историй",
    category: "Веб-приложение",
    price: "250 ₽",
    direction: "left",
    image: "https://cdn.poehali.dev/projects/97701dc1-edd8-4a67-adcd-82c0ea3fc857/bucket/5b54d477-4f5a-49f5-8c4e-306151b0bc4a.png",
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
          className={`mb-8 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Курсы
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Наши программы</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
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
  course: { number: string; title: string; category: string; price: string; direction: string; image: string }
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
      className={`group flex flex-col overflow-hidden rounded-xl border border-foreground/10 bg-foreground/5 backdrop-blur-sm transition-all duration-700 hover:border-foreground/20 hover:bg-foreground/10 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-64"
          style={{ objectPosition: course.number === "02" ? "center 20%" : "center center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute left-4 top-4 font-mono text-xs text-foreground/60">{course.number}</span>
        <span className="absolute right-4 top-4 rounded-full border border-foreground/20 bg-black/40 px-3 py-1 font-mono text-xs text-foreground/80 backdrop-blur-sm">
          {course.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
        <h3 className="mb-4 font-sans text-xl font-light text-foreground md:text-2xl">{course.title}</h3>
        <div className="flex items-center justify-between">
          <span className="font-sans text-2xl font-light text-foreground">{course.price}</span>
          <MagneticButton variant="secondary" size="sm" onClick={() => scrollToSection?.(4)}>
            Купить
          </MagneticButton>
        </div>
      </div>
    </div>
  )
}