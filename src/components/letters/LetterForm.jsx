import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { CreateLetter, UpdateLetter } from "../../services/letterService";
import { GetAllTags } from "../../services/tagService";
import "../../styling/Letter/LetterFormStyle.css";

const LetterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // Detect editing mode
  const editingLetter = location.state?.letter;

  // Initialize form state
  const [form, setForm] = useState({
    title: editingLetter?.title || "",
    content: editingLetter?.content || "",
    image: editingLetter?.image || "",
    isPublic: editingLetter?.isPublic || false,
    isAnonymous: editingLetter?.isAnonymous || false,
    tags: editingLetter?.tags?.map((tag) => tag._id) || []
  });

  const [availableTags, setAvailableTags] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await GetAllTags();
        setAvailableTags(tags);
      } catch (err) {
        setError("Failed to load tags. Please try again later.");
      }
    };
    fetchTags();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Toggle tag selection
  const handleTagToggle = (tagId) => {
    setForm((prev) => {
      const newTags = prev.tags.includes(tagId)
        ? prev.tags.filter((id) => id !== tagId)
        : [...prev.tags, tagId];
      return { ...prev, tags: newTags };
    });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!form.title.trim() || !form.content.trim()) {
      setError("Title and content are required");
      setIsLoading(false);
      return;
    }

    try {
      if (editingLetter) {
        await UpdateLetter(id, form); // Update existing letter
      } else {
        await CreateLetter(form); // Create new letter
      }

      // Navigate to public letters if Make Public is checked, else profile
      if (form.isPublic) {
        navigate("/public-letters");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save letter");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="letter-form-container">
      <h2 className="form-title">{editingLetter ? "Edit Letter" : "Create a Letter"}</h2>
      {error && <div className="form-error">{error}</div>}

      <form onSubmit={handleSubmit} className="letter-form">
        {/* Title */}
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        {/* Content */}
        <div className="form-group">
          <label className="form-label">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            className="form-textarea"
            required
          />
        </div>

        {/* Image URL */}
        <div className="form-group">
          <label className="form-label">Image URL (optional)</label>
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Visibility Options */}
        <div className="visibility-options">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isPublic"
              checked={form.isPublic}
              onChange={handleChange}
              className="checkbox-input"
            />
            <span className="checkbox-custom"></span>
            Make Public
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isAnonymous"
              checked={form.isAnonymous}
              onChange={handleChange}
              className="checkbox-input"
            />
            <span className="checkbox-custom"></span>
            Post Anonymously
          </label>
        </div>

        {/* Tags */}
        <div className="form-group">
          <label className="form-label">Tags</label>
          <div className="centered-tags-container">
            {availableTags.length > 0 ? (
              availableTags.map((tag) => (
                <button
                  type="button"
                  key={tag._id}
                  className={`tag-button ${
                    form.tags.includes(tag._id) ? "tag-selected" : ""
                  }`}
                  onClick={() => handleTagToggle(tag._id)}
                >
                  {tag.title}
                </button>
              ))
            ) : (
              <p className="no-tags">No tags available</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button type="submit" disabled={isLoading} className="submit-button">
            {isLoading
              ? editingLetter
                ? "Updating..."
                : "Creating..."
              : editingLetter
              ? "Update Letter"
              : "Create Letter"}
          </button>

          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/profile")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LetterForm;
