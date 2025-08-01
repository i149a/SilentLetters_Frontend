import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { GetLetterById } from '../../services/letterService'

const LetterCardPage = () => {
  const { id } = useParams()
  const [letter, setLetter] = useState(null)

  useEffect(() => {
    const fetchLetter = async () => {
      const data = await GetLetterById(id)
      setLetter(data)
    }
    fetchLetter()
  }, [id])

  if (!letter) return <p>Loading...</p>

  return (
    <div>
      <h2>{letter.title}</h2>
      <p>By: {letter.isAnonymous ? 'Anonymous' : letter.author?.username}</p>
      <p>{letter.content}</p>
      {letter.image && <img src={letter.image} alt="Letter Visual" />}
    </div>
  )
}

export default LetterCardPage