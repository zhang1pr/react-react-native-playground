import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProjectGallery from './ProjectGallery'
import ProjectView from './ProjectView'

export default function Playground() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectGallery />} />
        <Route path="/:projectId" element={<ProjectView />} />
      </Routes>
    </BrowserRouter>
  )
}
