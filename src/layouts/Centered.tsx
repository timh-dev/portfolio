import React, { useState, useEffect } from 'react'
import { config, intro, experience, projects, blog } from '../data/site'

type Props = {
  onBlog: (slug: string) => void
  onProject: (slug: string) => void
}

export function Centered({ onBlog, onProject }: Props) {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const ids = ['v1-hero', 'v1-exp', 'v1-proj', 'v1-blog']
    const obs = new IntersectionObserver(
      es => { es.forEach(e => { if (e.isIntersecting) setActive(e.target.id.replace('v1-', '')) }) },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('v1-' + id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <div id="v1-hero" className="v1-hero">
        <img src={`sketches/${config.heroSketch}`} alt="" className="v1-sketch" />
        <div className="v1-header">
          <div className="v1-name">{config.name}</div>
          <div className="v1-sub">{config.role}&nbsp;·&nbsp;{config.location}</div>
        </div>
        <p className="v1-desc">{intro}</p>
      </div>

      <div id="v1-exp" className="v1-section">
        <div className="v1-eyebrow">Experience</div>
        {experience.map((e, i) => (
          <div className="v1-exp-item" key={i}>
            <div className="v1-date">{e.date}</div>
            <div>
              <div className="v1-role">{e.role}</div>
              <div className="v1-co">@ {e.company}</div>
              <p className="v1-edesc">{e.desc}</p>
              {e.bullets && (
                <ul className="v1-bullets">
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      <div id="v1-proj" className="v1-section">
        <div className="v1-eyebrow">Projects</div>
        {projects.map((p, i) => (p.writeup || p.sections) ? (
          <button className="v1-proj-item is-link" key={i} onClick={() => onProject(p.slug)}>
            <div className="v1-ptag">{p.tag}</div>
            <div className="v1-ptitle">{p.title}</div>
            <p className="v1-pdesc">{p.description}</p>
            <div className="v1-pstack">{p.stack.map(s => <span className="v1-pill" key={s}>{s}</span>)}</div>
            {(p.liveUrl || p.codeUrl) && (
              <div className="v1-plinks">
                {p.liveUrl && <span className="v1-plink">live ↗</span>}
                {p.codeUrl && <span className="v1-plink">code ↗</span>}
              </div>
            )}
          </button>
        ) : (
          <div className="v1-proj-item" key={i}>
            <div className="v1-ptag">{p.tag}</div>
            <div className="v1-ptitle">{p.title}</div>
            <p className="v1-pdesc">{p.description}</p>
            <div className="v1-pstack">{p.stack.map(s => <span className="v1-pill" key={s}>{s}</span>)}</div>
            {(p.liveUrl || p.codeUrl) && (
              <div className="v1-plinks">
                {p.liveUrl && <a className="v1-plink" href={p.liveUrl}  target="_blank" rel="noreferrer">live ↗</a>}
                {p.codeUrl && <a className="v1-plink" href={p.codeUrl}  target="_blank" rel="noreferrer">code ↗</a>}
              </div>
            )}
          </div>
        ))}
      </div>

      <div id="v1-blog" className="v1-section">
        <div className="v1-eyebrow">Blog</div>
        {blog.map((post, i) => (
          <button className="v1-blog-item" key={i} onClick={() => onBlog(post.slug)}>
            <span className="v1-wdate">{post.publishedAt || 'Draft'}</span>
            <span className="v1-wcat">{post.category}</span>
            <span className="v1-wtitle">{post.title}</span>
          </button>
        ))}
      </div>

      <div className="v1-bottom">
        <span className="v1-copy">{config.initials}</span>
        <ul className="v1-nav">
          {(['exp', 'proj', 'blog'] as const).map(id => (
            <li key={id}>
              <a href={`#v1-${id}`} className={active === id ? 'active' : ''} onClick={go(id)}>
                {{ exp: 'Experience', proj: 'Projects', blog: 'Blog' }[id]} →
              </a>
            </li>
          ))}
          {config.links.github   && <li><a href={config.links.github}   target="_blank" rel="noreferrer">GitHub</a></li>}
          {config.links.linkedin && <li><a href={config.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>}
          {config.links.twitter  && <li><a href={config.links.twitter}  target="_blank" rel="noreferrer">X</a></li>}
          <li><a href={`mailto:${config.email}`}>Email</a></li>
        </ul>
      </div>
    </>
  )
}
