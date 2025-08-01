import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { CreateComment, UpdateComment, GetCommentById } from '../../services/commentService';
import "../../styling/Comment/CommentFormStyle.css";

const CommentForm = () => {
  const { id, commentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const editingComment = location.pathname.includes('/comments/') && location.pathname.includes('/edit');
  const fromLetter = location.state?.fromLetter;

  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editingComment && commentId) {
      const fetchComment = async () => {
        try {
          const data = await GetCommentById(commentId);
          setContent(data.content);
          setIsAnonymous(!data.author);
        } catch (err) {
          setError('Failed to load comment for editing');
          console.error("Error loading comment:", err);
          navigate(fromLetter ? `/letters/${fromLetter}` : '/');
        }
      };
      fetchComment();
    }
  }, [editingComment, commentId, fromLetter, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!content.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    try {
      setIsLoading(true);

      if (editingComment) {
        await UpdateComment(commentId, { content });
      } else {
        await CreateComment({
          content,
          letterId: id,
          isAnonymous
        });
      }

      navigate(`/letters/${id}`);
    } catch (err) {
      console.error('API Error:', err);
      setError(
        err.response?.data?.message ||
        err.message ||
        'Failed to save comment. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    const returnPath = fromLetter ? `/letters/${fromLetter}` : `/letters/${id}`;
    navigate(returnPath);
  };

  return (
    <div className="comment-form-container">
      <h2 className="comment-title">{editingComment ? "Edit Comment" : "Add Comment"}</h2>
      {error && <div className="form-error">{error}</div>}

      <form onSubmit={handleSubmit} className="comment-form">
        <div className="form-group">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your comment here..."
            required
            className="form-textarea comment-textarea"
          />
        </div>

        {!editingComment && (
          <div className="anonymous-checkbox-container">
            <label className="anonymous-checkbox-label">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={() => setIsAnonymous(!isAnonymous)}
                className="anonymous-checkbox"
              /> 
              Post Anonymously
            </label>
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            onClick={handleCancel}
            className="cancel-button"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isLoading} 
            className="submit-button comment-submit-button"
          >
            {isLoading ? (editingComment ? 'Updating...' : 'Posting...') : (editingComment ? 'Update' : 'Post Comment')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;