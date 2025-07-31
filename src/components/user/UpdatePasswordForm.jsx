import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Import navigate
import { UpdatePassword } from "../../services/authService";
import "../../styling/User/UpdatePasswordStyle.css";

const UpdatePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate(); // <-- Create navigate instance

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      setMessageType("error");
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      setMessage(
        "Password must be at least 8 characters and include uppercase, lowercase, and a number"
      );
      setMessageType("error");
      return;
    }

    try {
      await UpdatePassword({ oldPassword: currentPassword, newPassword });

      // Show success message briefly, then redirect
      setMessage("Password updated successfully");
      setMessageType("success");

      setTimeout(() => {
        navigate("/profile"); // <-- Redirect to profile page
      }, 1500); // delay 1.5s so user can see success message

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage(error.response?.data?.msg || "Error updating password");
      setMessageType("error");
    }
  };

  return (
    <div className="password-form-container">
      <h2 className="form-title">Update Password</h2>
      <form onSubmit={handleSubmit} className="password-form">
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="form-input"
          />
          <p className="password-hint">
            Must be at least 8 characters with uppercase, lowercase, and a
            number
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-btn">
          Update Password
        </button>

        {message && <div className={`message ${messageType}`}>{message}</div>}
      </form>
    </div>
  );
};

export default UpdatePasswordForm;
