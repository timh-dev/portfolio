import { } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { BlogPost } from '../data/site'

type Props = { post: BlogPost; onBack: () => void }

export function BlogDetail({ post, onBack }: Props) {
  return (
    <div className="detail-root">
      <button className="detail-back" onClick={onBack}>Back</button>
      <div className="detail-eyebrow">
        <span>{post.category}</span>
        {post.publishedAt && <><span>·</span><span>{post.publishedAt}</span></>}
      </div>
      <h1 className="detail-title">{post.title}</h1>
      {post.description && <p className="detail-description">{post.description}</p>}
      <hr style={{ border: 'none', borderTop: '1px solid rgba(30,53,168,0.12)', margin: '0 0 40px' }} />
      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
      </div>
      <button className="detail-back" style={{ marginTop: '48px' }} onClick={onBack}>Back</button>
    </div>
  )
}
