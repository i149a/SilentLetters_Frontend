import { useState, useContext } from "react";
import { Login, CheckSession } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../components/auth/authContext";
import "../../styling/Auth/LoginStyle.css";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext); // Access global auth context

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Perform login
      const data = await Login(form);
      localStorage.setItem("token", data.token);

      // 2. Get full user data and update context (for Navbar/Profile)
      const userData = await CheckSession();
      setUser(userData);

      // 3. Navigate to homepage
      navigate("/letters");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome Back</h2>
      {error && <p className="login-error">{error}</p>}

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="login-input"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Your password"
          className="login-input"
          onChange={handleChange}
          required
        />
        <button type="submit" className="login-button">
          Sign In
        </button>
      </form>

      <div className="login-links">
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="login-link">
            Create one
          </Link>
        </p>
        <p>
          <Link to="/forget-password" className="login-link">
            Forgot password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
