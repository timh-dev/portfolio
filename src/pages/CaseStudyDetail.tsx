import React, { useState, useEffect } from 'react'
import type { Project, ProjectSection, ProjectAsset } from '../data/site'

type Props = { project: Project; onBack: () => void }

export function CaseStudyDetail({ project, onBack }: Props) {
  const [activeSection, setActiveSection] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (!project.sections?.length) return
    const ids = project.sections.map((_, i) => `cs-section-${i}`)
    const onScroll = () => {
      const doc = document.documentElement
      const maxScroll = doc.scrollHeight - window.innerHeight
      setScrollProgress(maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0)
      const marker = window.innerHeight * 0.28
      let next = 0
      ids.forEach((id, i) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= marker) next = i
      })
      setActiveSection(next)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [project])

  const scrollTo = (i: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(`cs-section-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="cs-root">
      <div className="cs-layout">
        <aside className="cs-sidebar">
          <button className="cs-back-btn" onClick={onBack}>← Back</button>

          <div className="cs-progress-wrap">
            <div className="cs-progress-label">Progress</div>
            <div className="cs-progress-track">
              <div className="cs-progress-fill" style={{ height: `${Math.max(4, scrollProgress * 100)}%` }} />
            </div>
            <div className="cs-progress-pct">{Math.round(scrollProgress * 100)}%</div>
          </div>

          {project.sections && project.sections.length > 0 && (
            <div className="cs-toc">
              <div className="cs-toc-label">In this article</div>
              {project.sections.map((s, i) => (
                <a
                  key={i}
                  href={`#cs-section-${i}`}
                  className={`cs-toc-item${activeSection === i ? ' active' : ''}`}
                  onClick={scrollTo(i)}
                >
                  <span className={`cs-toc-dot${activeSection === i ? ' active' : ''}`} />
                  <span className="cs-toc-text">{s.title}</span>
                </a>
              ))}
            </div>
          )}
        </aside>

        <main className="cs-main">
          <header className="cs-header">
            {project.status && <span className="cs-status-chip">{project.status}</span>}
            <h1 className="cs-title">{project.title}</h1>
            {project.subtitle && <p className="cs-subtitle">{project.subtitle}</p>}
            <p className="cs-desc">{project.description}</p>
            <div className="cs-stack">
              {project.stack.map(s => <span key={s} className="cs-pill">{s}</span>)}
            </div>
          </header>

          {project.intro && (
            <div className="cs-abstract">
              <div className="cs-abstract-label">Abstract</div>
              <p className="cs-abstract-body">{project.intro}</p>
            </div>
          )}

          <div className="cs-sections">
            {project.sections?.map((section, i) => (
              <ArticleSection key={i} index={i} section={section} />
            ))}
          </div>

          <button className="cs-back-btn" style={{ marginTop: '64px' }} onClick={onBack}>← Back</button>
        </main>
      </div>
    </div>
  )
}

function ArticleSection({ index, section }: { index: number; section: ProjectSection }) {
  return (
    <section id={`cs-section-${index}`} className="cs-section">
      <div className="cs-section-head">
        <div className="cs-section-meta">
          <span className="cs-section-num">Section {index + 1}</span>
          {section.status && <span className="cs-status-chip subtle">{section.status}</span>}
        </div>
        <h2 className="cs-section-title">{section.title}</h2>
        <p className="cs-section-desc">{section.description}</p>
      </div>
      <div className="cs-paragraphs">
        {section.paragraphs.map((p, i) => <p key={i} className="cs-para">{p}</p>)}
      </div>
      {section.assets && section.assets.length > 0 && (
        <div className="cs-assets">
          {section.assets.map((asset, i) => <MediaPlacement key={i} asset={asset} />)}
        </div>
      )}
    </section>
  )
}

function MediaPlacement({ asset }: { asset: ProjectAsset }) {
  const align = asset.align ?? 'center'
  return (
    <div className="cs-media-wrap">
      {align === 'center' && (
        <div className="cs-media-center">
          <AssetRenderer asset={asset} />
        </div>
      )}
      {align === 'left' && (
        <div className="cs-media-left">
          <div className="cs-media-img-col"><AssetRenderer asset={asset} /></div>
          {asset.sideNote && (
            <div className="cs-media-note-col">
              <div className="cs-media-note-label">Note</div>
              <p className="cs-media-note">{asset.sideNote ?? asset.description}</p>
            </div>
          )}
        </div>
      )}
      {align === 'right' && (
        <div className="cs-media-right">
          {asset.sideNote && (
            <div className="cs-media-note-col">
              <div className="cs-media-note-label">Note</div>
              <p className="cs-media-note">{asset.sideNote ?? asset.description}</p>
            </div>
          )}
          <div className="cs-media-img-col"><AssetRenderer asset={asset} /></div>
        </div>
      )}
      {asset.bodyBelow && (
        <p className="cs-media-below">{asset.bodyBelow}</p>
      )}
    </div>
  )
}

function AssetRenderer({ asset }: { asset: ProjectAsset }) {
  if (asset.format === 'diagram' && asset.diagramId) {
    return <ArchitectureDiagram diagramId={asset.diagramId} title={asset.title} />
  }
  if (asset.src) {
    const resolvedSrc = asset.src.startsWith('/')
      ? `${import.meta.env.BASE_URL}${asset.src.slice(1)}`
      : asset.src
    return (
      <div className="cs-img-wrap">
        <img src={resolvedSrc} alt={asset.title} className="cs-img" loading="lazy" />
      </div>
    )
  }
  return (
    <div className="cs-img-placeholder">
      <p className="cs-img-placeholder-title">{asset.title}</p>
      <p className="cs-img-placeholder-desc">{asset.description}</p>
    </div>
  )
}

function ArchitectureDiagram({ diagramId, title }: { diagramId: string; title: string }) {
  return (
    <div className="cs-diagram">
      <div className="cs-diagram-header">{title}</div>
      {diagramId === 'current-state'       && <CurrentStateDiagram />}
      {diagramId === 'future-state'        && <FutureStateDiagram />}
      {diagramId === 'langhome-architecture' && <LangHomeArchDiagram />}
      {diagramId === 'langhome-future'     && <LangHomeFutureDiagram />}
    </div>
  )
}

function DBox({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return <div className={`cs-dbox ${className}`} style={style}>{children}</div>
}
function DLabel({ children }: { children: React.ReactNode }) {
  return <div className="cs-dlabel">{children}</div>
}
function DArrow() {
  return <div className="cs-darrow">↓</div>
}
function DGrid({ children, cols = 2 }: { children: React.ReactNode; cols?: number }) {
  return <div className={`cs-dgrid cs-dgrid-${cols}`}>{children}</div>
}
function DGroup({ children }: { children: React.ReactNode }) {
  return <div className="cs-dgroup">{children}</div>
}

function CurrentStateDiagram() {
  return (
    <div className="cs-diagram-body">
      <DLabel>Client</DLabel>
      <DBox>React + TypeScript + Vite</DBox>
      <DArrow />
      <DLabel>Application Runtime</DLabel>
      <DGroup>
        <DBox>FastAPI Routers</DBox>
        <DArrow />
        <DBox>Services Layer</DBox>
        <DArrow />
        <DGrid cols={3}>
          <DBox>Repositories + ORM</DBox>
          <DBox>Ingestion Parser</DBox>
          <DBox>Geospatial Utils</DBox>
        </DGrid>
      </DGroup>
      <DGrid cols={2}>
        <div>
          <DArrow />
          <DLabel>Data</DLabel>
          <DBox>PostgreSQL + PostGIS</DBox>
        </div>
        <div>
          <DArrow />
          <DLabel>Platform</DLabel>
          <DBox>Dagster Assets + Jobs</DBox>
          <DBox style={{ marginTop: '6px' }}>MLflow Tracking</DBox>
        </div>
      </DGrid>
    </div>
  )
}

function FutureStateDiagram() {
  return (
    <div className="cs-diagram-body">
      <DLabel>Clients</DLabel>
      <DGrid cols={3}>
        <DBox>Web App</DBox>
        <DBox>Mobile Apps</DBox>
        <DBox>Partner Integrations</DBox>
      </DGrid>
      <DArrow />
      <DLabel>Edge + Access</DLabel>
      <DGroup>
        <DGrid cols={4}>
          <DBox>CDN + Edge Cache</DBox>
          <DBox>WAF / Rate Limiting</DBox>
          <DBox>API Gateway / BFF</DBox>
          <DBox>Auth + Identity</DBox>
        </DGrid>
      </DGroup>
      <DArrow />
      <DGrid cols={2}>
        <div>
          <DLabel>Core Product Services</DLabel>
          <DGroup>
            <DGrid cols={2}>
              <DBox>Activity Service</DBox>
              <DBox>Profile Service</DBox>
              <DBox>Route + Geo Service</DBox>
              <DBox>Analytics Service</DBox>
            </DGrid>
          </DGroup>
        </div>
        <div>
          <DLabel>Ingestion + Events</DLabel>
          <DGroup>
            <DGrid cols={2}>
              <DBox>Upload Service</DBox>
              <DBox>Event Bus</DBox>
              <DBox>Async Workers</DBox>
              <DBox>Stream Enrichment</DBox>
            </DGrid>
          </DGroup>
        </div>
      </DGrid>
      <DArrow />
      <DGrid cols={2}>
        <div>
          <DLabel>Data Plane</DLabel>
          <DGroup>
            <DGrid cols={2}>
              <DBox>OLTP Store</DBox>
              <DBox>Geo Index</DBox>
              <DBox>Object Storage</DBox>
              <DBox>Lakehouse</DBox>
            </DGrid>
          </DGroup>
        </div>
        <div>
          <DLabel>ML Platform</DLabel>
          <DGroup>
            <DGrid cols={2}>
              <DBox>Feature Pipelines</DBox>
              <DBox>Training Jobs</DBox>
              <DBox>Model Registry</DBox>
              <DBox>Batch Inference</DBox>
            </DGrid>
          </DGroup>
        </div>
      </DGrid>
    </div>
  )
}

function LangHomeArchDiagram() {
  return (
    <div className="cs-diagram-body">
      <DLabel>User Input</DLabel>
      <DGrid cols={2}>
        <DBox>Gradio Chat UI</DBox>
        <DBox>CLI Interface</DBox>
      </DGrid>
      <DArrow />
      <DLabel>Agent Layer</DLabel>
      <DGroup>
        <DBox>LightingAgent</DBox>
        <DArrow />
        <DGrid cols={3}>
          <DBox>System Prompt</DBox>
          <DBox>Scene Memory</DBox>
          <DBox>Capability Payload</DBox>
        </DGrid>
      </DGroup>
      <DArrow />
      <DLabel>LLM Providers</DLabel>
      <DGrid cols={2}>
        <DBox>Google Gemini API</DBox>
        <DBox>Ollama (Local)</DBox>
      </DGrid>
      <DArrow />
      <DLabel>Structured Scene Plan (JSON)</DLabel>
      <DBox>Scene Name + Actions Array</DBox>
      <DArrow />
      <DGrid cols={2}>
        <div>
          <DLabel>Execution</DLabel>
          <DBox>Home Assistant REST API</DBox>
          <DBox style={{ marginTop: '6px' }}>Color Format Conversion</DBox>
        </div>
        <div>
          <DLabel>Devices</DLabel>
          <DBox>Philips Hue (XY + CT)</DBox>
          <DBox style={{ marginTop: '6px' }}>WiZ RGBWW (RGB + CT)</DBox>
        </div>
      </DGrid>
    </div>
  )
}

function LangHomeFutureDiagram() {
  return (
    <div className="cs-diagram-body">
      <DLabel>Input Sources</DLabel>
      <DGrid cols={3}>
        <DBox>Chat UI</DBox>
        <DBox>Voice (Whisper)</DBox>
        <DBox>MCP Server</DBox>
      </DGrid>
      <DArrow />
      <DLabel>Agent Core</DLabel>
      <DGroup>
        <DGrid cols={2}>
          <DBox>LightingAgent</DBox>
          <DBox>Scene Memory + RAG</DBox>
        </DGrid>
        <DArrow />
        <DBox>Multi-Provider LLM (Gemini / Ollama / Claude)</DBox>
      </DGroup>
      <DArrow />
      <DLabel>Tool Surface</DLabel>
      <DGroup>
        <DGrid cols={4}>
          <DBox>Lighting</DBox>
          <DBox>Climate</DBox>
          <DBox>Media</DBox>
          <DBox>Automation</DBox>
        </DGrid>
      </DGroup>
      <DArrow />
      <DLabel>Execution Layer</DLabel>
      <DGrid cols={2}>
        <DGroup>
          <DBox>Home Assistant API</DBox>
          <DBox style={{ marginTop: '6px' }}>Event Bus + Triggers</DBox>
        </DGroup>
        <DGroup>
          <DBox>Hue / WiZ / Z-Wave</DBox>
          <DBox style={{ marginTop: '6px' }}>Thermostats / Speakers</DBox>
        </DGroup>
      </DGrid>
    </div>
  )
}
