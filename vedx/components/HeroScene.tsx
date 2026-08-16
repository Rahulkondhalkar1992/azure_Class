'use client'

import { useEffect, useRef } from 'react'

export default function HeroScene() {
  const stage = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = stage.current
    if (!node) return
    const onMove = (event: MouseEvent) => {
      const box = node.getBoundingClientRect()
      const x = ((event.clientX - box.left) / box.width - 0.5) * 8
      const y = ((event.clientY - box.top) / box.height - 0.5) * 5
      node.style.setProperty('--tilt-x', `${x}deg`)
      node.style.setProperty('--tilt-y', `${-y}deg`)
    }
    const reset = () => {
      node.style.setProperty('--tilt-x', '0deg')
      node.style.setProperty('--tilt-y', '0deg')
    }
    node.addEventListener('mousemove', onMove)
    node.addEventListener('mouseleave', reset)
    return () => {
      node.removeEventListener('mousemove', onMove)
      node.removeEventListener('mouseleave', reset)
    }
  }, [])

  return (
    <div className="hero-canvas" aria-label="Ved-X  AI humanoid">
      <div className="think-stage" ref={stage}>
        <div className="humanoid">
          <div className="humanoid-body">
            <img
              src="/hero/hero-humanoid.png"
              alt="Futuristic AI humanoid"
              width={1024}
              height={1024}
              className="humanoid-photo"
              draggable={false}
            />
            <div className="humanoid-hand-layer" aria-hidden="true">
              <img
                src="/hero/hero-humanoid.png"
                alt=""
                width={1024}
                height={1024}
                className="humanoid-photo"
                draggable={false}
              />
            </div>
            <span className="humanoid-lid left" />
            <span className="humanoid-lid right" />
            <span className="humanoid-eye-glow left" />
            <span className="humanoid-eye-glow right" />
          </div>
        </div>
      </div>
    </div>
  )
}
