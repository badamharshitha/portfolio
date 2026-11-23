import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight, Award, BriefcaseBusiness, ChevronUp, Code2, Download,
  ExternalLink, Mail, MapPin, Menu, Moon, Sun, X, Terminal, Database, Layers3,
} from 'lucide-react'
import { personal } from './data/personal'
import { skillCategories } from './data/skills'
import { projects } from './data/projects'
import { education } from './data/education'
import { certifications } from './data/certifications'

const navItems = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Education', 'Certifications', 'Contact']
const currentYear = new Date().getFullYear()

function Reveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <Reveal className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id))
    }, { rootMargin: '-35% 0px -55%', threshold: 0 })
    navItems.forEach((_, i) => {
      const id = navItems[i].toLowerCase()
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])

  return (
    <nav className={scrolled ? 'navbar scrolled' : 'navbar'} aria-label="Primary navigation">
      <a className="brand" href="#home" aria-label="Go to home"><span>H</span><b>B</b></a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">
        {open ? <X /> : <Menu />}
      </button>
      <div className={open ? 'nav-links open' : 'nav-links'}>
        {navItems.map((item) => (
          <a key={item} className={active === item.toLowerCase() ? 'active' : ''} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>
            {item}
          </a>
        ))}
      </div>
    </nav>
  )
}

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setRoleIndex((index) => (index + 1) % personal.roles.length), 2600)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" className="hero-section">
      <div className="hero-glow glow-one" />
      <div className="hero-glow glow-two" />
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="availability"><span /> Open to opportunities</div>
        <p className="hello">Hello, I'm</p>
        <h1>Harshitha <span>Badam</span></h1>
        <div className="typing-line">
          <span className="prompt">&gt;</span>
          <motion.span key={roleIndex} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>{personal.roles[roleIndex]}</motion.span>
          <i />
        </div>
        <p className="hero-description">
          Building practical digital solutions through code, with a focus on modern web applications and thoughtful problem-solving.
        </p>
        <div className="location"><MapPin size={16} /> {personal.location}</div>
        <div className="hero-actions">
          <a className="button primary" href="#projects">View My Projects <ArrowRight size={18} /></a>
          <a className="button secondary" href="/RESUME_PLACEHOLDER.txt" download="Harshitha_Badam_Resume.txt" title="Actual resume PDF has not been added yet">
            <Download size={18} /> Download Resume
          </a>
        </div>
        <div className="social-row">
          <a href={personal.github} target="_blank" rel="noreferrer" aria-label="GitHub"><b>G</b></a>
          <a href={personal.linkedin} target={personal.linkedin.startsWith('http') ? '_blank' : undefined} rel="noreferrer" aria-label="LinkedIn"><b>in</b></a>
          <a href={`mailto:${personal.email}`} aria-label="Email"><Mail /></a>
        </div>
      </motion.div>

      <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }}>
        <div className="orbit orbit-one"><span>React</span></div>
        <div className="orbit orbit-two"><span>Node</span></div>
        <div className="code-window">
          <div className="code-bar"><i /><i /><i /><span>portfolio.js</span></div>
          <div className="code-content">
            <p><b>const</b> developer = {'{'}</p>
            <p>&nbsp;&nbsp;name: <em>'Harshitha'</em>,</p>
            <p>&nbsp;&nbsp;role: <em>'Full Stack'</em>,</p>
            <p>&nbsp;&nbsp;stack: [<em>'React'</em>, <em>'Node'</em>],</p>
            <p>&nbsp;&nbsp;status: <em>'Building'</em></p>
            <p>{'}'};</p>
          </div>
        </div>
        <div className="floating-card card-java"><Code2 size={18} /><span>JavaScript</span></div>
        <div className="floating-card card-db"><Database size={18} /><span>MongoDB</span></div>
      </motion.div>
    </section>
  )
}

function About() {
  const stats = [
    ['Degree', 'B.Tech CSE'],
    ['College', 'Aditya Engineering College'],
    ['Graduation', '2027'],
    ['CGPA', '8.51'],
    ['DSA Practice', '300+ Problems'],
  ]
  return (
    <section id="about" className="section">
      <SectionHeading eyebrow="01 / About" title="A developer focused on practical impact" />
      <div className="about-grid">
        <Reveal className="about-copy">
          <p>I am a Computer Science Engineering student at Aditya Engineering College with a strong interest in software development. I enjoy building web applications, working with frontend and backend technologies, and solving programming challenges.</p>
          <p>Through my internship experience and academic projects, I have gained practical exposure to application development, database integration, responsive design and software development workflows.</p>
          <p>I believe in continuous learning, improving my problem-solving abilities and developing technology solutions that are useful in real-world situations.</p>
        </Reveal>
        <Reveal className="stats-grid" delay={0.1}>
          {stats.map(([label, value]) => (
            <div className="stat-card" key={label}><span>{label}</span><strong>{value}</strong></div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function Skills() {
  const icons = [Code2, Layers3, Terminal, Database, Award, BriefcaseBusiness]
  return (
    <section id="skills" className="section section-tinted">
      <SectionHeading eyebrow="02 / Expertise" title="Technical skills" text="Technologies and concepts I use to turn ideas into working applications." />
      <div className="skills-grid">
        {skillCategories.map((category, index) => {
          const Icon = icons[index]
          return (
            <Reveal className="skill-card" delay={index * 0.05} key={category.title}>
              <div className="skill-icon"><Icon /></div>
              <h3>{category.title}</h3>
              <div className="badges">{category.items.map((item) => <span key={item}>{item}</span>)}</div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeading eyebrow="03 / Experience" title="Where I’ve applied my skills" />
      <Reveal className="timeline experience-timeline">
        <div className="timeline-node" />
        <div className="experience-card">
          <div className="experience-top">
            <div><span className="role-label">Internship</span><h3>Full Stack Developer Intern</h3><p>Technical Hub (THUB)</p></div>
            <div className="experience-meta"><span>May 2025 – March 2026</span><span><MapPin size={14} /> Kakinada, Andhra Pradesh</span></div>
          </div>
          <ul>
            {['Developed responsive web application interfaces.', 'Worked with React.js for frontend development.', 'Used Node.js and Express.js for backend development.', 'Worked with database integration and reusable UI components.', 'Fixed bugs, participated in testing and contributed to deployment workflows.'].map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="badges"><span>React.js</span><span>Node.js</span><span>Express.js</span><span>MongoDB</span></div>
        </div>
      </Reveal>
    </section>
  )
}

function ProjectPreview({ project }) {
  const edubridge = project.primary
  return (
    <div className={`project-preview ${edubridge ? 'edubridge-preview' : 'bookmate-preview'}`}>
      <div className="browser-bar"><i /><i /><i /><span>{edubridge ? 'EduBridge Dashboard' : 'BookMate Resources'}</span></div>
      {edubridge ? (
        <div className="dashboard-preview">
          <aside><b>EB</b><i /><i /><i /><i /></aside>
          <div className="dashboard-main">
            <div className="dash-header"><span /><b /></div>
            <div className="dash-stats"><i /><i /><i /></div>
            <div className="dash-chart"><span /><span /><span /><span /><span /></div>
          </div>
        </div>
      ) : (
        <div className="book-preview">
          <div className="book-sidebar"><b /><i /><i /><i /></div>
          <div className="book-content"><span /><div><i /><i /><i /></div></div>
        </div>
      )}
    </div>
  )
}

function Projects() {
  return (
    <section id="projects" className="section section-tinted">
      <SectionHeading eyebrow="04 / Featured Work" title="Selected projects" text="A focused showcase of two projects, from full-stack application design to learning resources." />
      <div className="projects-grid">
        {projects.map((project, index) => (
          <Reveal className={`project-card ${project.primary ? 'primary-project' : ''}`} delay={index * 0.08} key={project.title}>
            <ProjectPreview project={project} />
            <div className="project-body">
              {project.primary && <span className="featured-label">Featured full-stack project</span>}
              <h3>{project.title}</h3><p className="project-subtitle">{project.subtitle}</p>
              <p className="project-description">{project.description}</p>
              <ul className="feature-list">{project.features.slice(0, 4).map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <div className="badges">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
              <div className="project-actions">
                {project.github ? <a className="button secondary small" href={project.github} target="_blank" rel="noreferrer"><Code2 size={16} /> Repository</a> : <span className="placeholder-link" title="Repository URL not provided">Repository: add link</span>}
                {project.live ? <a className="button primary small" href={project.live} target="_blank" rel="noreferrer">Live Demo <ExternalLink size={16} /></a> : <span className="placeholder-link" title="Live demo URL not provided">Live demo: add link</span>}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Education() {
  return (
    <section id="education" className="section">
      <SectionHeading eyebrow="05 / Education" title="Academic journey" />
      <div className="timeline education-timeline">
        {education.map((item, index) => (
          <Reveal className="education-row" delay={index * 0.07} key={item.degree}>
            <div className="timeline-node" />
            <div className="education-card">
              <div><span className="degree-period">{item.period}</span><h3>{item.degree}</h3><p>{item.institution}</p><span className="education-detail">{item.detail}</span></div>
              <strong>{item.score}</strong>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Certifications() {
  return (
    <section id="certifications" className="section section-tinted">
      <SectionHeading eyebrow="06 / Credentials" title="Certifications & achievements" />
      <div className="cert-grid">
        {certifications.map((cert, index) => (
          <Reveal className="cert-card" delay={index * 0.04} key={cert.name}>
            <div className="cert-icon"><Award /></div>
            <div><h3>{cert.name}</h3><p>{cert.issuer}</p></div>
            {cert.link ? <a href={cert.link} target="_blank" rel="noreferrer" aria-label={`View ${cert.name}`}><ExternalLink size={16} /></a> : <span className="credential-muted">Certificate</span>}
          </Reveal>
        ))}
      </div>
      <Reveal className="achievement-strip" delay={0.1}>
        <div><strong>300+</strong><span>DSA problems solved</span></div>
        <div><strong>3-Star</strong><span>Java on HackerRank</span></div>
        <div><strong>Full Stack</strong><span>Practical application experience</span></div>
      </Reveal>
    </section>
  )
}

function Contact() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')

  const submit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = 'Please enter a valid email address.'
    if (!values.subject.trim()) nextErrors.subject = 'Please add a subject.'
    if (values.message.trim().length < 10) nextErrors.message = 'Message must be at least 10 characters.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setStatus('Form ready to submit. Connect an email or backend service to receive messages.')
  }

  return (
    <section id="contact" className="section contact-section">
      <Reveal className="contact-intro">
        <span className="eyebrow">07 / Contact</span>
        <h2>Let’s Build Something <span>Together.</span></h2>
        <p>I’m always interested in learning, collaborating and exploring software development opportunities. Feel free to reach out!</p>
        <div className="contact-details">
          <a href={`mailto:${personal.email}`}><div><Mail /></div><span>Email<strong>{personal.email}</strong></span></a>
          <a href={personal.linkedin} target="_blank" rel="noreferrer"><div><b>in</b></div><span>LinkedIn<strong>LinkedIn profile</strong></span></a>
          <a href={personal.github} target="_blank" rel="noreferrer"><div><b>G</b></div><span>GitHub<strong>{personal.github.replace('https://', '')}</strong></span></a>
          <div><div><MapPin /></div><span>Location<strong>{personal.location}</strong></span></div>
        </div>
      </Reveal>
      <Reveal className="contact-form-wrap" delay={0.08}>
        <form className="contact-form" onSubmit={submit} noValidate>
          <div className="form-row">
            <label>Name<input value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} placeholder="Your name" />{errors.name && <small>{errors.name}</small>}</label>
            <label>Email<input type="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} placeholder="you@example.com" />{errors.email && <small>{errors.email}</small>}</label>
          </div>
          <label>Subject<input value={values.subject} onChange={(e) => setValues({ ...values, subject: e.target.value })} placeholder="Project or opportunity" />{errors.subject && <small>{errors.subject}</small>}</label>
          <label>Message<textarea rows="5" value={values.message} onChange={(e) => setValues({ ...values, message: e.target.value })} placeholder="Tell me about the opportunity..." />{errors.message && <small>{errors.message}</small>}</label>
          <button className="button primary" type="submit">Send Message <ArrowRight size={18} /></button>
          {status && <p className="form-status" role="status">{status}</p>}
        </form>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div><a className="brand" href="#home"><span>H</span><b>B</b></a><p>Harshitha Badam</p><small>Full Stack Developer</small></div>
        <div><h3>Navigation</h3>{navItems.slice(0, 4).map((item) => <a href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}</div>
        <div><h3>Explore</h3>{navItems.slice(4).map((item) => <a href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}</div>
        <div><h3>Connect</h3><a href={personal.github} target="_blank" rel="noreferrer">GitHub</a><a href={personal.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={`mailto:${personal.email}`}>Email</a></div>
      </div>
      <div className="footer-bottom"><span>© {currentYear} Harshitha Badam. All rights reserved.</span><a href="#home" aria-label="Back to top"><ChevronUp /></a></div>
    </footer>
  )
}

function App() {
  const [dark, setDark] = useState(true)
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])
  return (
    <>
      <Navbar />
      <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle color theme">{dark ? <Sun /> : <Moon />}</button>
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
