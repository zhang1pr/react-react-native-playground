import { Link } from 'react-router-dom'
import { projects } from './projects'
import './ProjectGallery.css'

export default function ProjectGallery() {
  return (
    <div className="gallery">
      <header className="gallery-header">
        <h1>React Playground</h1>
        <p>Select a project to open</p>
      </header>
      <ul className="gallery-grid">
        {projects.map((project) => (
          <li key={project.id}>
            <Link className="gallery-card" to={`/${project.id}`}>
              <span className="gallery-card-name">{project.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
