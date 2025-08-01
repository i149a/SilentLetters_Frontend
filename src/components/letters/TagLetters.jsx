import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetLettersByTag } from '../../services/letterService'
import LetterCard from '../letters/LetterCard'
import '../../styling/Tag/TagLettersStyle.css'

export default function TagLetters() {
  const { tagId } = useParams();
  const [letters, setLetters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tagInfo, setTagInfo] = useState(null);

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        setIsLoading(true);
        const response = await GetLettersByTag(tagId);
        
        if (!Array.isArray(response)) {
          throw new Error(`Invalid response format. Expected array, got ${typeof response}`);
        }
        
        setLetters(response);
        
        if (response.length > 0 && response[0].tags) {
          const currentTag = response[0].tags.find(t => t._id === tagId);
          if (currentTag) setTagInfo(currentTag);
        }
      } catch (err) {
        console.error('Error:', { 
          message: err.message,
          response: err.response?.data 
        });
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLetters();
  }, [tagId]);

  if (isLoading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading letters...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <p className="error-message">Error: {error}</p>
      <button 
        className="retry-button"
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="tag-letters-container">
      <div className="tag-header">
        <h2 className="tag-title">
          {tagInfo 
            ? `Letters tagged with "${tagInfo.title}"`
            : 'Letters by tag'
          }
        </h2>
        {tagInfo && (
          <p className="tag-description">
            {tagInfo.description || `Explore all letters with the ${tagInfo.title} tag`}
          </p>
        )}
      </div>
      
      {letters.length === 0 ? (
        <div className="no-letters-message">
          <p>No letters found with this tag</p>
          <button 
            className="browse-button"
            onClick={() => window.location.href = '/letters'}
          >
            Browse All Letters
          </button>
        </div>
      ) : (
        <div className="letters-grid">
          {letters.map(letter => (
            <LetterCard key={letter._id} letter={letter} />
          ))}
        </div>
      )}
    </div>
  );
}