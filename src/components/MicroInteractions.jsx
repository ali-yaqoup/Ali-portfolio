import { useState, useRef } from 'react'
import gsap from 'gsap'

export function MagneticButton({ children, className = "", strength = 0.3 }) {
  const buttonRef = useRef(null)
  
  const handleMouseMove = (e) => {
    const btn = buttonRef.current
    if (!btn) return
    
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    gsap.to(btn, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: "power2.out"
    })
  }
  
  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)"
    })
  }
  
  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </button>
  )
}

export function TiltCard({ children, className = "", tiltStrength = 10 }) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    
    gsap.to(card, {
      rotateY: x * tiltStrength,
      rotateX: -y * tiltStrength,
      duration: 0.3,
      ease: "power2.out"
    })
  }
  
  const handleMouseLeave = () => {
    setIsHovered(false)
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out"
    })
  }
  
  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`${className} transition-shadow duration-300`}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {children}
    </div>
  )
}

export function GlowCursor({ children, className = "" }) {
  const containerRef = useRef(null)
  const glowRef = useRef(null)
  
  const handleMouseMove = (e) => {
    const container = containerRef.current
    const glow = glowRef.current
    if (!container || !glow) return
    
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    gsap.to(glow, {
      x: x - 150,
      y: y - 150,
      duration: 0.3,
      ease: "power2.out"
    })
  }
  
  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        ref={glowRef}
        className="absolute w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, rgba(56,189,248,0.12), rgba(34,211,238,0.08))', transform: 'translate(-50%, -50%)' }}
      />
      {children}
    </div>
  )
}

export function RippleButton({ children, className = "", onClick }) {
  const buttonRef = useRef(null)
  
  const createRipple = (e) => {
    const button = buttonRef.current
    if (!button) return
    
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const ripple = document.createElement('span')
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 0;
      height: 0;
      background: rgba(255,255,255,0.3);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
    `
    
    button.appendChild(ripple)
    
    gsap.to(ripple, {
      width: 300,
      height: 300,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => ripple.remove()
    })
    
    if (onClick) onClick(e)
  }
  
  return (
    <button
      ref={buttonRef}
      onClick={createRipple}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
    </button>
  )
}
