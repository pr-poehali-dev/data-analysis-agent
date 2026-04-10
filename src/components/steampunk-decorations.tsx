export function GearDecoration({ className = "", size = 60, speed = "normal" }: { className?: string; size?: number; speed?: "normal" | "slow" | "fast" }) {
  const animClass = speed === "fast" ? "animate-gear-spin" : speed === "slow" ? "animate-gear-spin-reverse" : "animate-gear-spin"
  const teeth = 12
  const outerR = size / 2
  const innerR = outerR * 0.65
  const toothH = outerR * 0.18
  
  const path = Array.from({ length: teeth }, (_, i) => {
    const angle = (i / teeth) * Math.PI * 2
    const nextAngle = ((i + 0.5) / teeth) * Math.PI * 2
    const midAngle = ((i + 0.25) / teeth) * Math.PI * 2
    const x1 = Math.cos(angle) * (outerR - toothH) + outerR
    const y1 = Math.sin(angle) * (outerR - toothH) + outerR
    const x2 = Math.cos(midAngle) * outerR + outerR
    const y2 = Math.sin(midAngle) * outerR + outerR
    const x3 = Math.cos(nextAngle) * (outerR - toothH) + outerR
    const y3 = Math.sin(nextAngle) * (outerR - toothH) + outerR
    return `L ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3}`
  }).join(' ')

  return (
    <div className={`${animClass} ${className}`} style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d={`M ${outerR - toothH} ${outerR} ${path} Z`}
          fill="none"
          stroke="hsl(var(--copper))"
          strokeWidth="1.5"
          opacity="0.4"
        />
        <circle cx={outerR} cy={outerR} r={innerR} fill="none" stroke="hsl(var(--copper))" strokeWidth="1" opacity="0.3" />
        <circle cx={outerR} cy={outerR} r={innerR * 0.4} fill="none" stroke="hsl(var(--brass))" strokeWidth="1.5" opacity="0.25" />
        <circle cx={outerR} cy={outerR} r={3} fill="hsl(var(--copper))" opacity="0.4" />
      </svg>
    </div>
  )
}

export function SteamPipe({ className = "", direction = "horizontal" }: { className?: string; direction?: "horizontal" | "vertical" }) {
  const isH = direction === "horizontal"
  return (
    <div className={`relative ${className}`}>
      <div className={`${isH ? 'h-[2px] w-full' : 'w-[2px] h-full'} bg-gradient-to-${isH ? 'r' : 'b'} from-transparent via-copper/30 to-transparent`} />
      {isH ? (
        <>
          <div className="absolute left-[20%] top-1/2 -translate-y-1/2 rivet" />
          <div className="absolute left-[50%] top-1/2 -translate-y-1/2 rivet" />
          <div className="absolute left-[80%] top-1/2 -translate-y-1/2 rivet" />
        </>
      ) : (
        <>
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 rivet" />
          <div className="absolute top-[50%] left-1/2 -translate-x-1/2 rivet" />
          <div className="absolute top-[80%] left-1/2 -translate-x-1/2 rivet" />
        </>
      )}
    </div>
  )
}

export function CornerBracket({ className = "", position = "top-left" }: { className?: string; position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const rotations: Record<string, string> = {
    "top-left": "rotate-0",
    "top-right": "rotate-90",
    "bottom-right": "rotate-180",
    "bottom-left": "-rotate-90",
  }

  return (
    <div className={`absolute ${className} ${rotations[position]}`} style={{ width: 24, height: 24 }}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 2 L2 18 M2 2 L18 2" stroke="hsl(var(--copper))" strokeWidth="2" opacity="0.5" />
        <circle cx="4" cy="4" r="2" fill="hsl(var(--brass))" opacity="0.4" />
      </svg>
    </div>
  )
}

export function SteamParticles({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-steam rounded-full bg-steam/20"
          style={{
            width: 4 + i * 2,
            height: 4 + i * 2,
            left: `${20 + i * 15}%`,
            bottom: 0,
            animationDelay: `${i * 0.6}s`,
          }}
        />
      ))}
    </div>
  )
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-copper/30" />
      <GearDecoration size={20} speed="slow" />
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-copper/30" />
    </div>
  )
}

export default GearDecoration
