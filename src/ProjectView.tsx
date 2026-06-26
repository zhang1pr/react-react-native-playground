import { Suspense, lazy } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getProjectById } from './projects'
import './ProjectView.css'

export default function ProjectView() {
  const { projectId } = useParams()
  const project = projectId ? getProjectById(projectId) : undefined

  if (!project) {
    return <Navigate to="/" replace />
  }

  const ProjectApp = lazy(project.load)

  return (
    <div className="project-view">
      <nav className="project-nav">
        <Link to="/">← All projects</Link>
        <span className="project-nav-title">{project.name}</span>
      </nav>
      <Suspense fallback={<p className="project-loading">Loading project…</p>}>
        <ProjectApp />
      </Suspense>
    </div>
  )
}
