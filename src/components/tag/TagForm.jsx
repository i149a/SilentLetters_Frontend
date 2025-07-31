import { useState } from 'react'
import { CreateTag } from '../../services/tagService'
import "../../styling/Tag/TagFormStyle.css"

export default function TagForm({ onSuccess }) {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await CreateTag({ title, image })
      setTitle('')
      setImage('')
      if (onSuccess) onSuccess()
    } catch (error) {
      alert('Failed to create tag')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="tag-form">
      <input
        type="text"
        placeholder="Tag Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="tag-input"
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="tag-input"
      />
      <button type="submit" className="tag-submit-button">Create Tag</button>
    </form>
  )
}
