import { useContext } from "react";
import { AuthContext } from "../../components/auth/authContext";
import { Link, useNavigate } from "react-router-dom";
import { SignOutUser } from "../../services/authService";
import SilentLettersLogo from "../../../images/Logo/SilentLettersLogo.png";
import "../../styling/Layout/NavbarStyle.css";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignout = async () => {
    await SignOutUser();
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={SilentLettersLogo} alt="Silent Letters" className="logo" />
      </div>

      <div className="nav-right-group">
        <div className="nav-links">
          <Link to="/letters" className="nav-link">Home Page</Link>
          {!user && (
            <>
              <Link to="/login" className="nav-link">Log in</Link>
            </>
          )}
          {user && (
            <>
              <Link to="/letters/create" className="nav-link">Create New Letter</Link>
              <Link to="/tags" className="nav-link">Tags</Link>
              <Link to="/tags/create" className="nav-link">Create New Tag</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
            </>
          )}
        </div>

        {user && (
          <button onClick={handleSignout} className="signout-button">
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
