import { Link } from "react-router-dom"
import "../../styling/Letter/LetterCardStyle.css"

const LetterCard = ({ letter }) => {
  return (
    <div className="letter-card">
      <div className="letter-card-content">
        <h3 className="letter-title">{letter.title}</h3>
        <p className="letter-author">
          {letter.isAnonymous ? "Anonymous" : letter.author?.username}
        </p>
        <p className="letter-preview">
          {letter.content.substring(0, 100)}...
        </p>
      </div>
      <Link to={`/letters/${letter._id}`} className="read-more-link">
        Read More
      </Link>
    </div>
  )
}

export default LetterCard