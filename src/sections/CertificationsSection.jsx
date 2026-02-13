import { useEffect, useRef, useState } from 'react'
import { Award, BadgeCheck, Sparkles } from 'lucide-react'
import AnimatedSection, { StaggerChildren } from '../components/AnimatedSection'
import certificationsData from '../certifications.json'
export default function CertificationsSection() {
  const certifications = certificationsData
    
  return (
    <section id="certifications" className="py-6 relative section-gradient-dark">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[var(--body-text)] text-sm font-medium mb-4">
            <Award size={16} className="text-[var(--accent-icon)]" />
            Achievements
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">Certifications</h2>
          <div className="w-20 h-1 bg-accent-cyan mx-auto rounded" />
        </AnimatedSection>

        <StaggerChildren className="grid md:grid-cols-2 gap-6" staggerDelay={100}>
          {certifications.map((cert, index) => (
            <div 
              key={index}
              className="glass rounded-2xl p-6 hover:border-[var(--accent-cyan)] transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-[rgba(56,189,248,0.06)] border-2 flex items-center justify-center" style={{borderColor: 'rgba(255,255,255,0.06)'}}>
                    <Award size={28} className="text-[var(--accent-icon)]" />
                  </div>
                  {cert.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[var(--accent-primary)] rounded-full flex items-center justify-center">
                      <BadgeCheck size={14} className="text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold group-hover:text-[var(--accent-icon)] transition-colors">{cert.name}</h3>
                  <p className="text-[var(--body-text)] text-sm">{cert.organization}</p>
                  <span className="text-[var(--accent-icon)] text-sm font-medium">{cert.year}</span>
                </div>
              </div>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
