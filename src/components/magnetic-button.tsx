import type React from "react"
import { useRef } from "react"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "ghost"
  size?: "default" | "lg" | "sm"
  onClick?: () => void
}

export function MagneticButton({
  children,
  className = "",
  variant = "primary",
  size = "default",
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>()

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    positionRef.current = { x: x * 0.15, y: y * 0.15 }
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      if (ref.current) {
        ref.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`
      }
    })
  }

  const handleMouseLeave = () => {
    positionRef.current = { x: 0, y: 0 }
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      if (ref.current) {
        ref.current.style.transform = "translate3d(0px, 0px, 0)"
      }
    })
  }

  const variants = {
    primary:
      "bg-gradient-to-r from-copper via-brass to-copper text-background font-semibold hover:shadow-[0_0_20px_hsl(var(--copper)/0.4)] border border-brass/50 active:scale-[0.98]",
    secondary:
      "bg-background/60 text-foreground hover:bg-background/80 backdrop-blur-xl border border-copper/30 hover:border-copper/60 hover:shadow-[0_0_12px_hsl(var(--copper)/0.2)]",
    ghost:
      "bg-transparent text-foreground hover:bg-copper/10 border border-transparent hover:border-copper/20",
  }

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    default: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  }

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        relative overflow-hidden rounded-sm font-sans font-medium tracking-wider uppercase
        transition-all duration-300 ease-out will-change-transform
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      style={{
        transform: "translate3d(0px, 0px, 0)",
        contain: "layout style paint",
      }}
    >
      <span className="relative z-10">{children}</span>
    </button>
  )
}

export default MagneticButton
