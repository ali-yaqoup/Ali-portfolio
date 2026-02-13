import { useEffect, useRef, useState } from 'react'
import {
  Languages,
  Briefcase,
  GraduationCap,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  Globe,
  BadgeCheck,
  Sparkles
} from 'lucide-react'
import './Timeline.css'

function useInView(ref, threshold = 0.2) {
  const [isInView, setIsInView] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold }
    )
    
    if (ref.current) {
      observer.observe(ref.current)
    }
    
    return () => observer.disconnect()
  }, [ref, threshold])
  
  return isInView
}

function TimelineCard({ children, side, delay = 0, isInView }) {
  return (
    <div 
      className={`timeline-card ${side} ${isInView ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="timeline-dot">
        <span className="dot-pulse"></span>
      </div>
      <div className="timeline-connector"></div>
      <div className="card-content glass-card">
        {children}
      </div>
    </div>
  )
}

function ProgressBar({ level, delay, isInView }) {
  return (
    <div className="progress-container">
      <div 
        className={`progress-bar ${isInView ? 'animate' : ''}`}
        style={{ 
          '--progress-width': `${level}%`,
          transitionDelay: `${delay}ms`
        }}
      >
        <div className="progress-glow"></div>
      </div>
    </div>
  )
}

function SectionBlock({ title, icon: Icon, children, sectionRef, isInView, accentColor = 'primary' }) {
  return (
    <div ref={sectionRef} className={`section-block ${accentColor}`}>
      <div className={`section-title-row ${isInView ? 'visible' : ''}`}>
        <div className="section-icon floating">
          <Icon size={24} />
        </div>
        <h3>{title}</h3>
      </div>
      
      <div className="section-timeline-wrapper">
        <div className="section-timeline-line">
          <div className="line-glow"></div>
        </div>
        <div className="section-timeline-content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function Timeline() {
  const languagesRef = useRef(null)
  const internshipsRef = useRef(null)
  const educationRef = useRef(null)
  const certificationsRef = useRef(null)
  
  const languagesInView = useInView(languagesRef)
  const internshipsInView = useInView(internshipsRef)
  const educationInView = useInView(educationRef)
  const certificationsInView = useInView(certificationsRef)

  const languages = [
    { name: "Arabic", level: 100, proficiency: "Native" },
    { name: "English", level: 90, proficiency: "Professional" }
  ]

  const internships = [
    {
      role: "Full Stack Developer Intern",
      company: "Tech Solutions Inc.",
      logo: "TS",
      date: "Jun 2023 - Sep 2023",
      achievements: [
        "Developed responsive web applications using React and Node.js",
        "Implemented automated testing reducing bugs by 40%",
        "Collaborated with senior developers on microservices architecture"
      ]
    },
    {
      role: "QA Engineering Intern",
      company: "Quality First Labs",
      logo: "QF",
      date: "Jan 2023 - May 2023",
      achievements: [
        "Created comprehensive test suites using Selenium and Cypress",
        "Reduced regression testing time by 60% through automation",
        "Documented testing procedures and best practices"
      ]
    },
    {
      role: "Software Developer Intern",
      company: "Innovation Hub",
      logo: "IH",
      date: "Jun 2022 - Dec 2022",
      achievements: [
        "Built REST APIs serving 10,000+ daily requests",
        "Optimized database queries improving performance by 35%",
        "Participated in agile sprints and code reviews"
      ]
    }
  ]

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      period: "2020 - 2024",
      description: "Focus on Software Engineering and Quality Assurance"
    }
  ]

  const certifications = [
    {
      name: "AWS Certified Developer",
      organization: "Amazon Web Services",
      year: "2024",
      verified: true
    },
    {
      name: "ISTQB Certified Tester",
      organization: "ISTQB",
      year: "2023",
      verified: true
    },
    {
      name: "React Developer Certification",
      organization: "Meta",
      year: "2023",
      verified: true
    },
    {
      name: "Agile & Scrum Master",
      organization: "Scrum Alliance",
      year: "2023",
      verified: true
    }
  ]

  return (
    <section id="roadmap" className="timeline-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <Sparkles size={16} />
            My Journey
          </span>
          <h2>Career Roadmap</h2>
          <div className="section-line"></div>
        </div>

        <div className="roadmap-sections">
          
          <SectionBlock 
            title="Languages" 
            icon={Languages} 
            sectionRef={languagesRef} 
            isInView={languagesInView}
            accentColor="primary"
          >
            {languages.map((lang, index) => (
              <TimelineCard 
                key={index} 
                side="right" 
                delay={100 + index * 100} 
                isInView={languagesInView}
              >
                <div className="language-item">
                  <div className="language-header">
                    <Globe size={18} className="lang-icon" />
                    <span className="lang-name">{lang.name}</span>
                    <span className="lang-level">{lang.proficiency}</span>
                  </div>
                  <ProgressBar 
                    level={lang.level} 
                    delay={200 + index * 150} 
                    isInView={languagesInView} 
                  />
                </div>
              </TimelineCard>
            ))}
          </SectionBlock>

          <SectionBlock 
            title="Internships" 
            icon={Briefcase} 
            sectionRef={internshipsRef} 
            isInView={internshipsInView}
            accentColor="secondary"
          >
            {internships.map((internship, index) => (
              <TimelineCard 
                key={index} 
                side={index % 2 === 0 ? 'left' : 'right'} 
                delay={100 + index * 150}
                isInView={internshipsInView}
              >
                <div className="internship-content">
                  <div className="company-logo">
                    <span>{internship.logo}</span>
                  </div>
                  <div className="internship-details">
                    <h4>{internship.role}</h4>
                    <div className="company-info">
                      <Building2 size={14} />
                      <span>{internship.company}</span>
                    </div>
                    <div className="date-info">
                      <Calendar size={14} />
                      <span>{internship.date}</span>
                    </div>
                    <ul className="achievements">
                      {internship.achievements.map((achievement, i) => (
                        <li key={i}>
                          <CheckCircle2 size={14} />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TimelineCard>
            ))}
          </SectionBlock>

          <SectionBlock 
            title="Education" 
            icon={GraduationCap} 
            sectionRef={educationRef} 
            isInView={educationInView}
            accentColor="tertiary"
          >
            {education.map((edu, index) => (
              <TimelineCard 
                key={index} 
                side="right" 
                delay={100}
                isInView={educationInView}
              >
                <div className="education-content">
                  <div className="edu-icon floating">
                    <GraduationCap size={28} />
                  </div>
                  <div className="edu-details">
                    <h4>{edu.degree}</h4>
                    <div className="institution">
                      <Building2 size={14} />
                      <span>{edu.institution}</span>
                    </div>
                    <div className="period">
                      <Calendar size={14} />
                      <span>{edu.period}</span>
                    </div>
                    <p className="edu-description">{edu.description}</p>
                  </div>
                </div>
              </TimelineCard>
            ))}
          </SectionBlock>

          <SectionBlock 
            title="Licenses & Certifications" 
            icon={Award} 
            sectionRef={certificationsRef} 
            isInView={certificationsInView}
            accentColor="qa"
          >
            {certifications.map((cert, index) => (
              <TimelineCard 
                key={index} 
                side={index % 2 === 0 ? 'left' : 'right'} 
                delay={100 + index * 100}
                isInView={certificationsInView}
              >
                <div className="certification-content">
                  <div className="cert-badge">
                    <Award size={24} />
                    {cert.verified && (
                      <div className="verified-badge">
                        <BadgeCheck size={14} />
                      </div>
                    )}
                  </div>
                  <div className="cert-info">
                    <h4>{cert.name}</h4>
                    <span className="cert-org">{cert.organization}</span>
                    <span className="cert-year">{cert.year}</span>
                  </div>
                </div>
              </TimelineCard>
            ))}
          </SectionBlock>

        </div>
      </div>
    </section>
  )
}
