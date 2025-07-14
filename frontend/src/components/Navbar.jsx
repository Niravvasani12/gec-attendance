// Navbar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const userRole = localStorage.getItem("userRole");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      {/* Left side: Logo + Toggle Button */}
      <div className="navbar-left">
        <h3 className="navbar-logo">🎓 GEC Attendance</h3>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      {/* Right side: Links (wrapped inside .navbar-right) */}
      <div className={`navbar-right ${menuOpen ? "active" : ""}`}>
        <div className="navbar-links">
          {userRole === "teacher" && (
            <>
              <Link
                to="/"
                className="navbar-link"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/attendance"
                className="navbar-link"
                onClick={() => setMenuOpen(false)}
              >
                View Records
              </Link>
            </>
          )}

          {userRole === "student" && (
            <>
              <Link
                to="/"
                className="navbar-link"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/student-attendance"
                className="navbar-link"
                onClick={() => setMenuOpen(false)}
              >
                My Attendance
              </Link>
            </>
          )}

          {!userRole && (
            <Link
              to="/login"
              className="navbar-link"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>

        {(userRole === "teacher" || userRole === "student") && (
          <button className="navbar-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
