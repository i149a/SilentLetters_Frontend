import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckSession } from "../../services/authService";
import { GetMyLetters } from "../../services/letterService";
import { GetMyTags } from "../../services/tagService";
import "../../styling/User/ProfileStyle.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("letters");
  const [letters, setLetters] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await CheckSession();
        const profilePicture = session.picture
          ? `${session.picture}?${new Date().getTime()}`
          : "/images/Default_Logo/DefaultAvatar.jpg";

        setUser({
          id: session._id,
          username: session.username,
          email: session.email,
          picture: profilePicture
        });

        const myLetters = await GetMyLetters();
        setLetters(myLetters);

        const myTags = await GetMyTags();
        setTags(myTags);
      } catch (error) {
        console.error("Session error:", error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate, location.state?.refresh]);

  const handleUpdatePicture = () => {
    navigate("/update-picture");
  };

  const handleUpdatePassword = () => {
    navigate("/update-password");
  };

  if (isLoading) return <div className="profile-loading">Loading profile...</div>;
  if (!user) return <div className="profile-error">Failed to load profile</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-info">
          <img
            src={user.picture}
            alt="Profile"
            className="profile-picture"
            onError={(e) => {
              e.target.src = "/images/Default_Logo/DefaultAvatar.jpg";
            }}
          />
          <div className="profile-details">
            <h1 className="profile-username">{user.username || "User"}</h1>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>

        <div className="profile-actions">
          <button onClick={handleUpdatePicture} className="profile-action-btn">
            Update Picture
          </button>
          <button onClick={handleUpdatePassword} className="profile-action-btn">
            Update Password
          </button>
        </div>
      </div>

      <div className="profile-tabs">
        <button
          onClick={() => setActiveTab("letters")}
          className={`tab-btn ${activeTab === "letters" ? "active" : ""}`}
        >
          My Letters
        </button>
        <button
          onClick={() => setActiveTab("tags")}
          className={`tab-btn ${activeTab === "tags" ? "active" : ""}`}
        >
          My Tags
        </button>
      </div>

      <div className="profile-content">
        {activeTab === "letters" && (
          <div className="letters-section">
            <div className="section-header">
              <h2>My Letters</h2>
              <button
                onClick={() => navigate("/letters/create")}
                className="create-btn"
              >
                Create New Letter
              </button>
            </div>

            {letters.length > 0 ? (
              <div className="letters-list">
                {letters.map((letter) => (
                  <div key={letter._id} className="letter-card">
                    <h3 className="letter-title">{letter.title}</h3>
                    <p className="letter-preview">
                      {letter.content.substring(0, 100)}...
                    </p>
                    <button
                      onClick={() => navigate(`/letters/${letter._id}`)}
                      className="read-more-btn"
                    >
                      Read More
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>You haven't written any letters yet</p>
                <button
                  onClick={() => navigate("/letters/create")}
                  className="create-btn"
                >
                  Write Your First Letter
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "tags" && (
          <div className="tags-section">
            <div className="section-header">
              <h2>My Tags</h2>
              <button
                onClick={() => navigate("/tags/create")}
                className="create-btn"
              >
                Create New Tag
              </button>
            </div>

            {tags.length > 0 ? (
              <div className="tags-list">
                {tags.map((tag) => (
                  <div key={tag._id} className="tag-card">
                    {tag.picture && (
                      <img 
                        src={tag.picture} 
                        alt={tag.title}
                        className="tag-picture"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <h3 className="tag-title">{tag.title}</h3>
                    <button
                      onClick={() => navigate(`/tags/${tag._id}`)}
                      className="view-tag-btn"
                    >
                      View Tag
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>You haven't created any tags yet</p>
                <button
                  onClick={() => navigate("/tags/create")}
                  className="create-btn"
                >
                  Create Your First Tag
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;