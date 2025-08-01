import { useState, useEffect } from "react"
import { GetAllTags } from "../../services/tagService"
import TagCard from "../../components/tag/TagCard"
import "../../styling/Tag/TagListStyle.css"

const TagCardPage = () => {
  const [tags, setTags] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await GetAllTags()
        setTags(data)
      } catch (err) {
        setError("Failed to load tags.")
        console.error("Error loading tags:", err)
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
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>
        Try Again
      </button>
    </div>
  )

  return (
    <div className="tag-list-container">
      <div className="tag-list-header-container">
        <h1 className="tag-list-header">All Tags</h1>
      </div>

      {tags.length === 0 ? (
        <div className="tag-list-empty">
          <p>No tags available yet.</p>
        </div>
      ) : (
        <div className="tag-grid">
          {tags.map(tag => (
            <TagCard key={tag._id} tag={tag} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TagCardPage