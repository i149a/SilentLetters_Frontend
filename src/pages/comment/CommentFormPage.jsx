import CommentForm from '../../components/comment/CommentForm'

const CommentFormPage = () => {
  const letterId = 'PLACEHOLDER_LETTER_ID'
  return (
    <div>
      <CommentForm letterId={letterId} />
    </div>
  )
}

export default CommentFormPage