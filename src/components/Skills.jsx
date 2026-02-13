import AnimatedSection, { StaggerChildren } from './AnimatedSection'
import skillsData from '../skills.json'
import { Sparkles } from 'lucide-react'

export default function Skills() {
  const skills = skillsData

  return (
    <section id="skills" className="py-24 section-gradient-light">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[var(--body-text)] text-sm font-medium mb-4">
            <Sparkles size={14} className="mr-1 text-[var(--accent-icon)]" />
            My Toolbox
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">Skills & Technologies</h2>
          <div className="w-20 h-1 mx-auto rounded" style={{background: 'var(--accent-icon)'}} />
        </AnimatedSection>
        
        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={100}>
          {skills.map((category, index) => (
            <div 
              key={index}
              className="glass rounded-2xl p-6 hover:border-[var(--accent-icon)] transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold text-white mb-6 pb-3 border-b border-white/10">
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.skills.map((skill, i) => (
                  <li key={i} className="flex items-center gap-3 text-[var(--body-text)] hover:text-white transition-colors">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-icon)] flex-shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
