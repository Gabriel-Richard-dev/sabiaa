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

// posição, largura e duração do balanço de cada nuvem
const NUVENS = [
  'top-6 -left-10 w-48 opacity-60 motion-safe:animate-[nuvem_16s_ease-in-out_infinite]',
  'top-24 right-[8%] w-32 opacity-40 motion-safe:animate-[nuvem_12s_ease-in-out_infinite]',
  'bottom-10 left-[38%] w-40 opacity-35 motion-safe:animate-[nuvem_19s_ease-in-out_infinite]',
  'bottom-24 -right-12 w-56 opacity-50 motion-safe:animate-[nuvem_22s_ease-in-out_infinite]',
]

/** Nuvens: fundo com nuvens violeta balançando devagar. */
export function Nuvens() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {NUVENS.map((c) => (
        <svg
          key={c}
          viewBox="0 0 120 60"
          className={`absolute fill-violet-soft ${c}`}
        >
          <circle cx="36" cy="38" r="20" />
          <circle cx="62" cy="28" r="26" />
          <circle cx="88" cy="40" r="17" />
          <rect x="16" y="38" width="90" height="20" rx="10" />
        </svg>
      ))}
    </div>
  )
}

/** ShimmerButton: botão 3D com um brilho que atravessa em loop. */
export function ShimmerButton({ href, children, className = '' }) {
  return (
    <a href={href} className={`btn-pilula relative overflow-hidden ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </a>
  )
}

/**
 * LoopVideo: toca o vídeo inteiro uma vez e, no fim, volta para `loopStart`
 * (segundos) em vez de reiniciar do zero — evita o corte seco do `loop` nativo.
 */
// ida e volta (celular, levelup, cores, cosmeticos, idle1, idle2) já vem gravada no arquivo:
//   split[a][b];[b]trim=start_frame=1,setpts=PTS-STARTPTS,reverse,trim=start_frame=1,setpts=PTS-STARTPTS[r];[a][r]concat=n=2:v=1:a=0
// voltar o currentTime quadro a quadro travava: cada seek decodificava desde o único keyframe.
export function LoopVideo({ src, loopStart = 0, className }) {
  const ref = useRef(null)

  // lazy: só baixa e toca perto da tela; fora dela pausa para poupar CPU
  useEffect(() => {
    const v = ref.current
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { rootMargin: '200px' },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      preload="none"
      muted
      playsInline
      loop={loopStart === 0}
      onEnded={() => {
        const v = ref.current
        if (!v || loopStart === 0) return
        v.currentTime = loopStart
        v.play()
      }}
      // todos os vídeos são 640x640: reserva o espaço antes de carregar (sem pulo de layout)
      className={`aspect-square ${className}`}
    >
      {/* webm tem metade do tamanho; mp4 fica de reserva para Safari antigo */}
      <source src={src.replace(/\.mp4$/, '.webm')} type="video/webm" />
      <source src={src} type="video/mp4" />
    </video>
  )
}
