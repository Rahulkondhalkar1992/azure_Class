import { useId } from 'react'

export default function BrandLockup({ compact = false }: { compact?: boolean }) {
  const raw = useId().replace(/:/g, '')
  const g = `vedx-g-${raw}`
  const s = `vedx-s-${raw}`

  return (
    <span className={`brand ${compact ? 'brand-compact' : ''}`}>
      <span className="brand-mark" aria-hidden="true">
        <i className="brand-glow" />
        <svg viewBox="0 0 80 80" className="brand-svg">
          <defs>
            <linearGradient id={g} x1="12%" y1="0%" x2="88%" y2="100%">
              <stop offset="0%" stopColor="#7af6ff" />
              <stop offset="45%" stopColor="#3b8bff" />
              <stop offset="100%" stopColor="#1554d4" />
            </linearGradient>
            <linearGradient id={s} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,.55)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          <g transform="translate(40 40)">
            <g className="brand-blades">
              {[0, 120, 240].map((deg) => (
                <g key={deg} transform={`rotate(${deg})`}>
                  <rect x="-8.5" y="-31" width="17" height="34" rx="8.5" fill={`url(#${g})`} />
                  <path d="M-3.5 -24 C -3.5 -12 3.5 -10 3.5 0" fill="none" stroke={`url(#${s})`} strokeWidth="2.2" strokeLinecap="round" />
                </g>
              ))}
            </g>
          </g>
        </svg>
      </span>
      <span className="brand-word">
        Ved<span className="brand-x">-X</span>
        <span className="brand-gap" aria-hidden="true" />
        <span className="brand-ai">AI</span>
      </span>
    </span>
  )
}
