import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CommentCard from '../../components/comment/CommentCard'
import { GetCommentsByLetter } from '../../services/commentService'

const CommentCardPage = () => {
  const { letterId } = useParams()
  const [comments, setComments] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await GetCommentsByLetter(letterId)
        setComments(res)
      } catch (err) {
        console.error(err)
      }
    };
    load()
  }, [letterId])

  return (
    <div>
      <h2>Comments</h2>
      {comments.map((comment) => (
        <CommentCard key={comment._id} comment={comment} />
      ))}
    </div>
  )
}

export default CommentCardPage