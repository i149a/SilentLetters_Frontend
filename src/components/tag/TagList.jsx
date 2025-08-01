import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetAllTags } from '../../services/tagService'
import '../../styling/Tag/TagListStyle.css'

export default function TagList() {
  const [tags, setTags] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setIsLoading(true)
        const res = await GetAllTags()
        setTags(res)
      } catch (err) {
        console.error(err)
        setError('Failed to load tags')
      } finally {
        setIsLoading(false)
      }
    }
    fetchTags()
  }, [])

  if (isLoading) return (
    <div className="tag-list-loading">
      <div className="loading-spinner"></div>
      <p>Loading tags...</p>
    </div>
  )

  if (error) return (
    <div className="tag-list-error">
      <p className="error-message">{error}</p>
      <button 
        className="retry-button"
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  )

  if (tags.length === 0) return (
    <div className="tag-list-empty">
      <p>No tags available yet</p>
      <Link to="/create-tag" className="create-tag-link">
        Create First Tag
      </Link>
    </div>
  )

  return (
    <div className="tag-list-container">
      <div className="tag-list-header-container">
        <h2 className="tag-list-header">All Tags</h2>
      </div>
      
      <div className="tag-grid-container">
        <div className="tag-grid">
          {tags.map((tag) => (
            <Link 
              to={`/tags/${tag._id}`} 
              key={tag._id} 
              className="tag-card-link"
            >
              <div className="tag-card">
                <div className="tag-content">
                  <h3 className="tag-title">{tag.title}</h3>
                  {tag.image && (
                    <div className="tag-image-container">
                      <img 
                        src={tag.image} 
                        alt={tag.title} 
                        className="tag-image"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextElementSibling.style.display = 'flex'
                        }}
                      />
                      <div className="tag-image-fallback">
                        {tag.title.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  )}
                  <div className="tag-meta">
                    <span className="tag-author">
                      By: {tag.author?.username || 'Anonymous'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}