import { useState, useEffect } from "react";
import { ForgetPassword } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import "../../styling/Auth/ForgetPasswordStyle.css";

const ForgetPasswordForm = () => {
  const [form, setForm] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, newPassword, confirmPassword } = form;

    // Clear previous messages
    setMessage("");
    setError("");

    if (!emailRegex.test(email)) {
      return setError("Please enter a valid email address");
    }
    if (!passwordRegex.test(newPassword)) {
      return setError(
        "Password must contain at least 8 characters, one uppercase letter and one number"
      );
    }
    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      await ForgetPassword({ email, newPassword });
      setMessage(`Password reset successful! Redirecting to login in ${countdown} seconds...`);
      
      // Start countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate("/login", { replace: true });
        clearInterval(timer);
      }, 3000);

      // Clear form
      setForm({
        email: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.response?.data?.msg || err.message || "Error resetting password. Please try again.");
    }
  };

  // Update message during countdown
  useEffect(() => {
    if (countdown > 0 && message.includes("Redirecting")) {
      setMessage(`Password reset successful! Redirecting to login in ${countdown} seconds...`);
    }
  }, [countdown, message]);

  return (
    <div className="forget-container">
      <h2 className="forget-title">Reset Your Password</h2>
      {error && <div className="forget-error">{error}</div>}
      {message && <div className="forget-success">{message}</div>}
      
      <form onSubmit={handleSubmit} className="forget-form">
        <input
          type="email"
          name="email"
          placeholder="Your email address"
          className="forget-input"
          value={form.email}
          onChange={handleChange}
          required
        />
        
        <input
          type="password"
          name="newPassword"
          placeholder="New password"
          className="forget-input"
          value={form.newPassword}
          onChange={handleChange}
          required
        />
        <p className="password-hint">
          Must be at least 8 characters with 1 uppercase letter and 1 number
        </p>
        
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          className="forget-input"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        
        <button type="submit" className="forget-button">
          Reset Password
        </button>
      </form>

      <div className="forget-links">
        <p>
          <Link to="/login" className="forget-link">
            ← Return to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;