'use client'

import { animate, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function Counter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { once: true, margin: '-40px' })
  const target = Number(value.replace(/\D/g, ''))
  const suffix = value.replace(/[0-9]/g, '')
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!visible) return
    const controls = animate(0, target, { duration: 1.5, ease: 'easeOut', onUpdate: (latest) => setCount(Math.round(latest)) })
    return controls.stop
  }, [visible, target])

  return <motion.div ref={ref} className="stat" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><strong>{count}{suffix}</strong><span>{label}</span></motion.div>
}

export default function AnimatedStats({ stats }: { stats: readonly (readonly [string, string])[] }) {
  return <div className="stats">{stats.map(([value, label]) => <Counter key={label} value={value} label={label} />)}</div>
}
