import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreateTag } from '../../services/tagService'
import "../../styling/Tag/TagFormStyle.css"

export default function TagForm({ onSuccess }) {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await CreateTag({ title, image })
      navigate("/tags") // Redirect to All Tags page after creation
    } catch (error) {
      alert('Failed to create tag')
    }
  }

  return (
    <div className="tag-form-container">
      <h2 className="form-title">Create New Tag</h2>
      <form onSubmit={handleSubmit} className="tag-form">
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            placeholder="Enter tag title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="tag-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Logo URL</label>
          <input
            type="url"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="tag-input"
          />
        </div>
        <button type="submit" className="tag-submit-button">Create Tag</button>
      </form>
    </div>
  )
}