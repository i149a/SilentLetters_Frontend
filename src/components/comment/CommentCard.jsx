const CommentCard = ({ comment, onDelete, onUpdate }) => {
  const { content, author, createdAt, _id } = comment;
  return (
    <div>
      <p>{content}</p>
      <small>
        {author ? author.username : 'Anonymous'} | {new Date(createdAt).toLocaleString()}
      </small>
      {onDelete && <button onClick={() => onDelete(_id)}>Delete</button>}
      {onUpdate && <button onClick={() => onUpdate(comment)}>Edit</button>}
    </div>
  )
}

export default CommentCard