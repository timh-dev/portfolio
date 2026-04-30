import React, { useState, useEffect } from 'react'
import { config, intro, experience, projects, blog } from '../data/site'

type Props = {
  onBlog: (slug: string) => void
  onProject: (slug: string) => void
}

export function Poster({ onBlog, onProject }: Props) {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const ids = ['v3-hero', 'v3-exp', 'v3-proj', 'v3-blog']
    const obs = new IntersectionObserver(
      es => { es.forEach(e => { if (e.isIntersecting) setActive(e.target.id.replace('v3-', '')) }) },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('v3-' + id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <div id="v3-hero" className="v3-hero">
        <img src={`sketches/${config.heroSketch}`} alt="" className="v3-sketch" />
        <div className="v3-caption">
          <div className="v3-name">{config.name}</div>
          <div className="v3-right-caption">
            <span className="v3-loc">{config.location}</span>
            <span className="v3-role-label">{config.role}</span>
          </div>
        </div>
      </div>

      <div className="v3-content">
        <p className="v3-intro">{intro}</p>

        <div className="v3-block" id="v3-exp">
          <span className="v3-label">Experience</span>
          {experience.map((e, i) => (
            <div className="v3-exp-row" key={i}>
              <div className="v3-exp-left">
                <span className="v3-exp-role">{e.role}</span>
                <span className="v3-exp-co">@ {e.company}</span>
              </div>
              <span className="v3-exp-date">{e.date.replace('\n', ' ')}</span>
            </div>
          ))}
        </div>

        <div className="v3-block" id="v3-proj">
          <span className="v3-label">Projects</span>
          {projects.map((p, i) => (p.writeup || p.sections) ? (
            <button className="v3-proj-row is-link" key={i} onClick={() => onProject(p.slug)}>
              <div className="v3-ptop">
                <span className="v3-ptitle">{p.title}</span>
                <span className="v3-ptag">{p.tag}</span>
              </div>
              <p className="v3-pdesc">{p.description}</p>
            </button>
          ) : (
            <div className="v3-proj-row" key={i}>
              <div className="v3-ptop">
                <span className="v3-ptitle">{p.title}</span>
                <span className="v3-ptag">{p.tag}</span>
              </div>
              <p className="v3-pdesc">{p.description}</p>
            </div>
          ))}
        </div>

        <div className="v3-block" id="v3-blog">
          <span className="v3-label">Blog</span>
          {blog.map((post, i) => (
            <button className="v3-blog-row" key={i} onClick={() => onBlog(post.slug)}>
              <div className="v3-btop">
                <span className="v3-btitle">{post.title}</span>
                <span className="v3-bdate">{post.publishedAt || 'Draft'}</span>
              </div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: '40px', paddingBottom: '80px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {config.links.github   && <a href={config.links.github}   target="_blank" rel="noreferrer" style={{ fontSize: '11px', color: 'var(--ink-dim)' }}>GitHub</a>}
          {config.links.linkedin && <a href={config.links.linkedin} target="_blank" rel="noreferrer" style={{ fontSize: '11px', color: 'var(--ink-dim)' }}>LinkedIn</a>}
          {config.links.twitter  && <a href={config.links.twitter}  target="_blank" rel="noreferrer" style={{ fontSize: '11px', color: 'var(--ink-dim)' }}>X</a>}
          <a href={`mailto:${config.email}`} style={{ fontSize: '11px', color: 'var(--ink-dim)' }}>{config.email}</a>
        </div>
      </div>

      <div className="v3-bottom">
        <span className="v3-copy">{config.initials}</span>
        <ul className="v3-nav">
          {(['exp', 'proj', 'blog'] as const).map((id) => (
            <li key={id}>
              <a href={`#v3-${id}`} className={active === id ? 'active' : ''} onClick={go(id)}>
                {{ exp: 'Experience', proj: 'Projects', blog: 'Blog' }[id]} →
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
