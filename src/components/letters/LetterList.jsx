import { useEffect, useState } from "react"
import { GetPublicLetters } from "../../services/letterService"
import LetterCard from "./LetterCard"
import "../../styling/Letter/LetterListStyle.css"

const LetterList = () => {
  const [letters, setLetters] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const data = await GetPublicLetters()
        setLetters(data)
      } catch (error) {
        console.error("Error fetching letters:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchLetters()
  }, [])

  return (
    <div className="letter-list-container">
      <h2 className="letter-list-title">Public Letters</h2>
      
      {isLoading ? (
        <div className="loading-message">Loading letters...</div>
      ) : letters.length > 0 ? (
        <div className="letters-grid">
          {letters.map((letter) => (
            <LetterCard key={letter._id} letter={letter} />
          ))}
        </div>
      ) : (
        <div className="no-letters-message">
          No public letters available yet. Be the first to share!
        </div>
      )}
    </div>
  )
}

export default LetterList