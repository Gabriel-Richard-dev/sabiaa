// Efeitos no estilo Magic UI (magicui.design), reescritos no mínimo necessário.
import { motion, useInView, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useRef } from 'react'

/** BlurFade: revela o bloco com blur + subida quando entra na viewport. */
export function BlurFade({ children, delay = 0, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/** NumberTicker: conta de 0 até value quando aparece na tela. */
export function NumberTicker({ value, suffix = '', className }) {
  const ref = useRef(null)
  const emVista = useInView(ref, { once: true, margin: '-40px' })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { damping: 30, stiffness: 120 })

  useEffect(() => {
    if (emVista) mv.set(value)
  }, [emVista, mv, value])

  useEffect(
    () => spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = Math.round(v) + suffix
    }),
    [spring, suffix],
  )

  return <span ref={ref} className={className}>0{suffix}</span>
}

/** DotPattern: fundo pontilhado com máscara radial. */
export function DotPattern({ className = '' }) {
  return (
    <svg aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full fill-violet-soft ${className}`}>
      <defs>
        <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1.6" cy="1.6" r="1.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  )
}

/** ShimmerButton: botão 3D com um brilho que atravessa em loop. */
export function ShimmerButton({ href, children, className = '' }) {
  return (
    <a href={href} className={`btn-3d relative overflow-hidden ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </a>
  )
}

/**
 * LoopVideo: toca o vídeo inteiro uma vez e, no fim, volta para `loopStart`
 * (segundos) em vez de reiniciar do zero — evita o corte seco do `loop` nativo.
 */
export function LoopVideo({ src, loopStart = 0, className }) {
  const ref = useRef(null)
  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      playsInline
      loop={loopStart === 0}
      onEnded={() => {
        const v = ref.current
        if (!v || loopStart === 0) return
        v.currentTime = loopStart
        v.play()
      }}
      className={className}
    />
  )
}
