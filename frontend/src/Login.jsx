import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import AuthorBadge from "./components/AuthorBadge";

const Login = () => {
  const [role, setRole] = useState("student");
  const [teacherName, setTeacherName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role === "teacher") {
      if (teacherName === "Faculty" && password === "Faculty123") {
        localStorage.setItem("userRole", role);
        localStorage.setItem("teacherName", teacherName);
        navigate("/attendance");
      } else {
        alert("Invalid teacher name or password.");
      }
    } else {
      localStorage.setItem("userRole", role);
      navigate("/");
    }
  };

  return (
    <div className="login-page">
      {/* Left: Branding + Badge */}
      <div className="login-left">
        <div className="gec-logo" />
        <h2 className="college-title">
          Government Engineering College, Bhavnagar
        </h2>
        <div className="login-footer">
          <AuthorBadge />
        </div>
      </div>

      {/* Right: Form */}
      <div className="login-right">
        <div className="login-form">
          <h2>Login</h2>

          <label>
            Select Role:
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </label>

          {role === "teacher" && (
            <>
              <label>
                Teacher Name:
                <input
                  type="text"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  placeholder="Enter Teacher Name"
                  required
                />
              </label>

              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  required
                />
              </label>
            </>
          )}

          <button onClick={handleLogin}>Log In</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
