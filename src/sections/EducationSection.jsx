import { useEffect, useRef, useState } from 'react'
import { GraduationCap, Building2, Calendar, Sparkles } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import educationData from '../education.json'
export default function EducationSection() {
  const education = educationData

  return (
    <section id="education" className="py-6 relative section-gradient-light">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatedSection className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[var(--body-text)] text-sm font-medium mb-4">
            <GraduationCap size={16} className="text-[var(--accent-icon)]" />
            Education
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">Academic Background</h2>
          <div className="w-20 h-1 mx-auto rounded" style={{ background: 'var(--accent-icon)' }} />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-4">
          {education.map((edu, index) => (
            <div key={index} className="glass rounded-xl p-5 hover:border-[var(--accent-icon)] transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[rgba(56,189,248,0.06)] border flex items-center justify-center" style={{borderColor: 'rgba(255,255,255,0.06)'}}>
                  <GraduationCap size={18} className="text-[var(--accent-icon)]" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">{edu.degree}</h3>
                  <p className="text-[var(--body-text)] text-sm">{edu.institution}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[var(--accent-icon)] text-sm">
                <Calendar size={14} />
                <span>{edu.period}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
