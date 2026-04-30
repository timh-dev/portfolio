import { } from 'react'
import { config, intro, experience, projects, blog } from '../data/site'

type Props = {
  onBlog: (slug: string) => void
  onProject: (slug: string) => void
}

export function Split({ onBlog, onProject }: Props) {
  return (
    <div className="v2-root">
      <aside className="v2-left">
        <img src={`sketches/${config.heroSketch}`} alt="" className="v2-sketch" />
        <div className="v2-name">{config.name}</div>
        <div className="v2-sub">{config.role}</div>
        <div className="v2-sub" style={{ marginTop: '3px', opacity: 0.65 }}>{config.location}</div>
        <div className="v2-links">
          {config.links.github   && <a className="v2-link" href={config.links.github}   target="_blank" rel="noreferrer">GitHub</a>}
          {config.links.linkedin && <a className="v2-link" href={config.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
          {config.links.twitter  && <a className="v2-link" href={config.links.twitter}  target="_blank" rel="noreferrer">X</a>}
          <a className="v2-link" href={`mailto:${config.email}`}>{config.email}</a>
        </div>
      </aside>

      <main className="v2-right">
        <div className="v2-intro">
          <p className="v2-intro-text">{intro}</p>
        </div>

        <div className="v2-section">
          <span className="v2-section-num">01_ Experience</span>
          {experience.map((e, i) => (
            <div className="v2-exp-item" key={i}>
              <div className="v2-date-small">{e.date.replace('\n', ' ')}</div>
              <div className="v2-exp-role">{e.role}</div>
              <div className="v2-exp-co">@ {e.company}</div>
              <p className="v2-exp-desc">{e.desc}</p>
            </div>
          ))}
        </div>

        <div className="v2-section">
          <span className="v2-section-num">02_ Projects</span>
          {projects.map((p, i) => (p.writeup || p.sections) ? (
            <button className="v2-proj-item is-link" key={i} onClick={() => onProject(p.slug)}>
              <div className="v2-ptag">{p.tag}</div>
              <div className="v2-ptitle">{p.title}</div>
              <p className="v2-pdesc">{p.description}</p>
            </button>
          ) : (
            <div className="v2-proj-item" key={i}>
              <div className="v2-ptag">{p.tag}</div>
              <div className="v2-ptitle">{p.title}</div>
              <p className="v2-pdesc">{p.description}</p>
            </div>
          ))}
        </div>

        <div className="v2-section">
          <span className="v2-section-num">03_ Blog</span>
          {blog.map((post, i) => (
            <button className="v2-blog-item" key={i} onClick={() => onBlog(post.slug)}>
              <div className="v2-wmeta">{post.publishedAt || 'Draft'}&nbsp;·&nbsp;{post.category}</div>
              <div className="v2-wtitle">{post.title}</div>
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
