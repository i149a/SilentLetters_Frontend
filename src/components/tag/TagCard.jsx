import { Link } from "react-router-dom"
import "../../styling/Tag/TagCardStyle.css"

const TagCard = ({ tag }) => {
  return (
    <div className="tag-card">
      <div className="tag-card-content">
        <h3 className="tag-title">{tag.title || tag.name}</h3>
        {tag.description && (
          <p className="tag-description">{tag.description}</p>
        )}
      </div>
      <Link to={`/tags/${tag._id}`} className="view-tag-link">
        View Tag
      </Link>
    </div>
  )
}

export default TagCard