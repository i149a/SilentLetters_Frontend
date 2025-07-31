import { useState } from "react"
import { Register } from "../../services/authService"
import { useNavigate, Link } from "react-router-dom"
import "../../styling/Auth/RegisterStyle.css"

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    picture: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { username, email, password, confirmPassword, picture } = form

    if (!username || !email || !password || !confirmPassword) {
      return setError("All fields except picture are required")
    }

    if (!emailRegex.test(email)) return setError("Please enter a valid email address")
    if (!passwordRegex.test(password)) return setError("Password must contain at least 8 characters, one uppercase letter and one number")
    if (password !== confirmPassword) return setError("Passwords do not match")

    try {
      await Register({ username, email, password, picture })
      navigate("/login")
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.")
    }
  }

  return (
    <div className="register-container">
      <h2 className="register-title">Create Your Account</h2>
      {error && <p className="register-error">{error}</p>}
      
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="register-input"
          onChange={handleChange}
          required
        />
        
        <input
          type="email"
          name="email"
          placeholder="Email address"
          className="register-input"
          onChange={handleChange}
          required
        />
        
        <input
          type="password"
          name="password"
          placeholder="Create password"
          className="register-input"
          onChange={handleChange}
          required
        />
        <p className="password-hint">
          Must be at least 8 characters with 1 uppercase letter and 1 number
        </p>
        
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          className="register-input"
          onChange={handleChange}
          required
        />
        
        <input
          type="text"
          name="picture"
          placeholder="Profile picture URL (optional)"
          className="register-input"
          onChange={handleChange}
        />
        
        <button type="submit" className="register-button">
          Create Account
        </button>
      </form>

      <div className="register-links">
        <p>
          Already have an account?{" "}
          <Link to="/login" className="register-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterForm