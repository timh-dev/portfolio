import { } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Project } from '../data/site'

type Props = { project: Project; onBack: () => void }

export function ProjectDetail({ project, onBack }: Props) {
  const hasLinks = project.liveUrl || project.codeUrl

  return (
    <div className="detail-root">
      <button className="detail-back" onClick={onBack}>Back</button>
      <div className="detail-eyebrow">
        <span>{project.tag}</span>
      </div>
      <h1 className="detail-title">{project.title}</h1>
      <p className="detail-description">{project.description}</p>
      <div className="detail-stack">
        {project.stack.map((s, i) => <span key={i} className="detail-pill">{s}</span>)}
      </div>
      {hasLinks && (
        <div className="detail-links">
          {project.liveUrl && <a className="detail-link" href={project.liveUrl} target="_blank" rel="noreferrer">Live ↗</a>}
          {project.codeUrl && <a className="detail-link" href={project.codeUrl} target="_blank" rel="noreferrer">Code ↗</a>}
        </div>
      )}
      {!hasLinks && project.writeup && (
        <hr style={{ border: 'none', borderTop: '1px solid rgba(30,53,168,0.12)', margin: '0 0 40px' }} />
      )}
      {project.writeup && (
        <div className="prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.writeup}</ReactMarkdown>
        </div>
      )}
      <button className="detail-back" style={{ marginTop: '48px' }} onClick={onBack}>Back</button>
    </div>
  )
}
