import AnimatedSection, { StaggerChildren } from './AnimatedSection'
import { TiltCard } from './MicroInteractions'
import servicesData from '../services.json'
import { Code2, TestTube2, Layers, Cpu, Database, Sparkles } from 'lucide-react'

const iconMap = { Code2, TestTube2, Layers, Cpu, Database }

export default function Services() {
  const services = servicesData

  return (
    <section id="services" className="py-24 section-gradient-light">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[var(--body-text)] text-sm font-medium mb-4">
            <Sparkles size={16} className="text-[var(--accent-cyan)]" />
            What I Do
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">My Services</h2>
          <div className="w-20 h-1 bg-accent-cyan mx-auto rounded" />
        </AnimatedSection>
        
        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon]
            return (
              <TiltCard key={i} className="group glass rounded-2xl p-8 text-center hover:glow transition-all duration-500">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`} style={{background: 'linear-gradient(135deg, rgba(56,189,248,0.08), rgba(34,211,238,0.06))'}}>
                  {Icon ? <Icon size={28} className="text-white" /> : null}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
                <p className="text-[var(--body-text)]">{service.description}</p>
              </TiltCard>
            )
          })}
        </StaggerChildren>
      </div>
    </section>
  )
}
