import { useState, useEffect } from 'react'
import { config, blog, projects } from './data/site'
import { Centered } from './layouts/Centered'
import { Split } from './layouts/Split'
import { Poster } from './layouts/Poster'
import { BlogDetail } from './pages/BlogDetail'
import { ProjectDetail } from './pages/ProjectDetail'
import { CaseStudyDetail } from './pages/CaseStudyDetail'

type Route =
  | { type: 'home' }
  | { type: 'blog'; slug: string }
  | { type: 'project'; slug: string }

function parseHash(hash: string): Route {
  const m = hash.match(/^#\/(blog|project)\/(.+)$/)
  if (m) return { type: m[1] as 'blog' | 'project', slug: m[2] }
  return { type: 'home' }
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))
  const [layout] = useState(config.layout)

  useEffect(() => {
    function onHashChange() {
      setRoute(parseHash(window.location.hash))
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  function navigate(type: 'blog' | 'project', slug: string) {
    window.location.hash = `/${type}/${slug}`
  }

  function goHome() {
    history.replaceState(null, '', window.location.pathname + window.location.search)
    setRoute({ type: 'home' })
    window.scrollTo(0, 0)
  }

  if (route.type === 'blog') {
    const post = blog.find(p => p.slug === route.slug)
    if (post) return <BlogDetail post={post} onBack={goHome} />
  }

  if (route.type === 'project') {
    const project = projects.find(p => p.slug === route.slug)
    if (project) {
      if (project.sections) return <CaseStudyDetail project={project} onBack={goHome} />
      return <ProjectDetail project={project} onBack={goHome} />
    }
  }

  const layoutProps = {
    onBlog:    (slug: string) => navigate('blog', slug),
    onProject: (slug: string) => navigate('project', slug),
  }

  return (
    <>
      {layout === 'centered' && <Centered {...layoutProps} />}
      {layout === 'split'    && <Split    {...layoutProps} />}
      {layout === 'poster'   && <Poster   {...layoutProps} />}

      {/* TODO: add button back later
      <div className="variant-switcher">
        {(['centered', 'split', 'poster'] as Layout[]).map(l => (
          <button
            key={l}
            className={`v-btn${layout === l ? ' active' : ''}`}
            onClick={() => { setLayout(l); window.scrollTo(0, 0) }}
          >
            {l}
          </button>
        ))}
      </div>
      */}
    </>
  )
}
