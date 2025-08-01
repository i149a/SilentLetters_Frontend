import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CommentList from '../../components/comment/CommentCard'
import { GetCommentsByLetter, DeleteComment } from '../../services/commentService'

const CommentListPage = () => {
  const { letterId } = useParams()
  const [comments, setComments] = useState([])

  const fetchComments = async () => {
    try {
      const res = await GetCommentsByLetter(letterId)
      setComments(res)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await DeleteComment(id)
      fetchComments()
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchComments();
  }, [letterId])

  return (
    <div>
      <h2>All Comments</h2>
      <CommentList comments={comments} onDelete={handleDelete} />
    </div>
  )
}

export default CommentListPage
