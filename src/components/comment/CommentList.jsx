import CommentCard from './CommentCard'

const CommentList = ({ comments, onDelete, onUpdate }) => {
  if (!comments.length) return <p>No comments yet.</p>
  return (
    <div>
      {comments.map((comment) => (
        <CommentCard
          key={comment._id}
          comment={comment}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  )
}

export default CommentList