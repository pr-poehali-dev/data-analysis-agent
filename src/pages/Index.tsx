import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { WorkSection } from "@/components/sections/work-section"
import { ServicesSection } from "@/components/sections/services-section"
import { CoursesSection } from "@/components/sections/courses-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { MagneticButton } from "@/components/magnetic-button"
import { GearDecoration, SteamPipe } from "@/components/steampunk-decorations"
import { useRef, useEffect, useState } from "react"

export default function Index() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const scrollThrottleRef = useRef<number>()

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current) {
      const sectionWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({
        left: sectionWidth * index,
        behavior: "smooth",
      })
      setCurrentSection(index)
    }
  }

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (Math.abs(e.touches[0].clientY - touchStartY.current) > 10) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY
      const touchEndX = e.changedTouches[0].clientX
      const deltaY = touchStartY.current - touchEndY
      const deltaX = touchStartX.current - touchEndX

      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentSection < 5) {
          scrollToSection(currentSection + 1)
        } else if (deltaY < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, { passive: true })
      container.addEventListener("touchmove", handleTouchMove, { passive: false })
      container.addEventListener("touchend", handleTouchEnd, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchmove", handleTouchMove)
        container.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentSection])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()

        if (!scrollContainerRef.current) return

        scrollContainerRef.current.scrollBy({
          left: e.deltaY,
          behavior: "instant",
        })

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const newSection = Math.round(scrollContainerRef.current.scrollLeft / sectionWidth)
        if (newSection !== currentSection) {
          setCurrentSection(newSection)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [currentSection])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollThrottleRef.current) return

      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) {
          scrollThrottleRef.current = undefined
          return
        }

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const scrollLeft = scrollContainerRef.current.scrollLeft
        const newSection = Math.round(scrollLeft / sectionWidth)

        if (newSection !== currentSection && newSection >= 0 && newSection <= 5) {
          setCurrentSection(newSection)
        }

        scrollThrottleRef.current = undefined
      })
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
      if (scrollThrottleRef.current) {
        cancelAnimationFrame(scrollThrottleRef.current)
      }
    }
  }, [currentSection])

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#8B4513"
            colorB="#CD7F32"
            speed={0.4}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor="#3d2b1f"
            upColor="#8B4513"
            downColor="#2a1a0e"
            leftColor="#CD7F32"
            rightColor="#B87333"
            intensity={0.7}
            radius={1.8}
            momentum={15}
            maskType="alpha"
            opacity={0.95}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Decorative gears */}
      <GearDecoration className="fixed right-8 top-20 z-10 opacity-20 hidden md:block" size={100} speed="slow" />
      <GearDecoration className="fixed right-[72px] top-[105px] z-10 opacity-15 hidden md:block" size={50} speed="fast" />
      <GearDecoration className="fixed left-6 bottom-16 z-10 opacity-15 hidden md:block" size={70} speed="normal" />

      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-opacity duration-700 md:px-12 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-copper/30 to-transparent" />
        
        <button
          onClick={() => scrollToSection(0)}
          className="flex items-center gap-3 transition-transform hover:scale-105"
        >
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden border border-copper/40 bg-background/50 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-copper/60">
            <img src="https://cdn.poehali.dev/projects/97701dc1-edd8-4a67-adcd-82c0ea3fc857/files/2b24859b-968e-48f4-a012-39c1873a003f.jpg" alt="Логотип" className="h-full w-full object-cover" />
          </div>
          <span className="font-display text-lg font-bold tracking-widest uppercase metal-emboss-light">Магазин простых сложностей</span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {[
            { label: "Главная", index: 0 },
            { label: "Живые практики", index: 1 },
            { label: "Программы", index: 2 },
            { label: "Курсы", index: 3 },
            { label: "О нас", index: 4 },
            { label: "Контакты", index: 5 },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.index)}
              className={`group relative font-sans text-xs font-medium uppercase tracking-widest transition-colors ${
                currentSection === item.index ? "text-copper" : "text-foreground/60 hover:text-copper/80"
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 h-[1px] transition-all duration-300 bg-copper ${
                  currentSection === item.index ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>
      </nav>

      {/* Section dots */}
      <div
        className={`fixed right-6 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-4 transition-opacity duration-700 md:right-10 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            className="group relative flex items-center justify-center"
          >
            <div
              className={`h-2 w-2 transition-all duration-500 ${
                currentSection === i
                  ? "scale-125 bg-copper shadow-[0_0_8px_hsl(var(--copper)/0.5)]"
                  : "bg-foreground/20 hover:bg-copper/50"
              }`}
              style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
            />
          </button>
        ))}
        <SteamPipe direction="vertical" className="absolute -left-1 top-0 h-full" />
      </div>

      {/* Hero section */}
      <div
        ref={scrollContainerRef}
        className="flex h-screen w-full snap-x snap-mandatory overflow-x-auto"
        style={{ scrollbarWidth: "none", scrollSnapType: "x mandatory" }}
        data-scroll-container
      >
        <section className="flex h-screen w-screen shrink-0 snap-start items-center justify-center px-6 md:px-12">
          <div
            className={`text-center transition-all duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <div className="mb-4 flex justify-center">
              <GearDecoration size={40} speed="slow" className="opacity-40" />
            </div>
            <p className="mb-4 font-mono text-xs tracking-[0.3em] uppercase text-copper/70">
              Est. MMXX
            </p>
            <h1 className="mb-6 font-display text-5xl font-bold leading-[1.1] tracking-wider md:text-7xl lg:text-8xl metal-emboss">
              Магазин
              <br />
              <span className="copper-gradient-text font-black">простых</span>
              <br />
              сложностей
            </h1>
            <p className="mx-auto mb-10 max-w-lg font-serif text-base font-light leading-relaxed text-foreground/60 md:text-lg italic">
              Пространство для глубокого самоисследования через видео, практики и авторские методики
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection(2)}>
                Каталог
              </MagneticButton>
              <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection(4)}>
                О нас
              </MagneticButton>
            </div>

            <div className="mt-12 flex items-center justify-center gap-6">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-copper/40" />
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-foreground/30">scroll</span>
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-copper/40" />
            </div>
          </div>
        </section>

        <WorkSection scrollToSection={scrollToSection} />
        <ServicesSection scrollToSection={scrollToSection} />
        <CoursesSection scrollToSection={scrollToSection} />
        <AboutSection scrollToSection={scrollToSection} />
        <ContactSection />
      </div>
    </main>
  )
}