import { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { GetLetterById, DeleteLetter } from "../../services/letterService";
import {
  GetCommentsByLetter,
  DeleteComment,
} from "../../services/commentService";
import { CheckSession } from "../../services/authService";
import "../../styling/Letter/LetterStyle.css";

const LetterPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [letter, setLetter] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch letter and current user session
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [letterData, userData] = await Promise.all([
          GetLetterById(id),
          CheckSession(),
        ]);

        setLetter(letterData);
        setUserId(userData?.id || null);
        setIsAuthor(userData?.id === letterData.author?._id);
        setIsLoggedIn(!!userData?.id);
      } catch (err) {
        setError("Failed to load letter");
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Fetch comments for this letter with refresh trigger
  useEffect(() => {
    const fetchComments = async () => {
      try {
        console.log("Fetching comments for letter id:", id); // debug
        const commentsData = await GetCommentsByLetter(id);
        console.log("Comments data received:", commentsData); // debug
        setComments(Array.isArray(commentsData) ? commentsData : []);
      } catch (err) {
        console.error("Failed to fetch comments", err);
      }
    };

    fetchComments();

    // Clear any refresh flags in the URL
    if (location.search.includes("refresh")) {
      navigate(location.pathname, { replace: true });
    }
  }, [id, location.search]);

  // Handle comment refresh when coming back from comment form
  useEffect(() => {
    if (location.state?.refreshComments) {
      const fetchComments = async () => {
        try {
          const commentsData = await GetCommentsByLetter(id);
          setComments(Array.isArray(commentsData) ? commentsData : []);
        } catch (err) {
          console.error("Failed to fetch comments", err);
        }
      };
      fetchComments();

      // Clear the refresh flag
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  const handleDeleteLetter = async () => {
    if (!window.confirm("Are you sure you want to delete this letter?")) return;

    setIsDeleting(true);
    try {
      await DeleteLetter(id);
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Failed to delete letter");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditLetter = () => {
    navigate(`/letters/${id}/edit`, { state: { letter } });
  };

  const handleAddComment = () => {
    navigate(`/letters/${id}/comments/new`);
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;
    try {
      await DeleteComment(commentId);
      setComments((prev) =>
        prev.filter((comment) => comment._id !== commentId)
      );
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  const handleEditComment = (commentId) => {
    navigate(`/comments/${commentId}/edit`, { state: { fromLetter: id } });
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!letter) return <div className="not-found">Letter not found</div>;

  return (
    <div className="letter-page-container">
      <div className="letter-actions-top">
        {isAuthor && (
          <>
            <button onClick={handleEditLetter} className="edit-button">
              Edit Letter
            </button>
            <button
              onClick={handleDeleteLetter}
              className="delete-button"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Letter"}
            </button>
          </>
        )}
      </div>

      <div className="letter-content">
        {/* Letter Header */}
        <div className="letter-header">
          <h1 className="letter-title">{letter.title}</h1>
          <p className="letter-meta">
            {letter.isAnonymous ? "Anonymous" : `By ${letter.author?.username}`}
            <span className="letter-date">
              {new Date(letter.createdAt).toLocaleDateString()}
            </span>
          </p>
        </div>

        {/* Letter Image */}
        {letter.image && (
          <div className="letter-image-container">
            <img
              src={letter.image}
              alt={letter.title}
              className="letter-image"
            />
          </div>
        )}

        {/* Letter Content */}
        <div className="letter-text">
          <p>{letter.content}</p>
        </div>

        {/* Tags */}
        {letter.tags?.length > 0 && (
          <div className="letter-tags">
            <h3>Tags:</h3>
            <div className="tags-list">
              {letter.tags.map((tag) => (
                <Link key={tag._id} to={`/tags/${tag._id}`} className="tag">
                  {tag.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="comments-section">
          <div className="comments-header">
            <h3>Comments</h3>
            {isLoggedIn && (
              <button onClick={handleAddComment} className="add-comment-button">
                Add Comment
              </button>
            )}
          </div>

          {comments.length > 0 ? (
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment._id} className="comment">
                  <div className="comment-header">
                    <span className="comment-author">
                      {comment.author?.username || "Anonymous"}
                    </span>
                    <span className="comment-date">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                    {/* Add these action buttons */}
                    {(userId === comment.author?._id ||
                      (!comment.author && isAuthor)) && (
                      <div className="comment-actions">
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="delete-comment-btn"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="comment-text">{comment.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-comments">No comments yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LetterPage;
