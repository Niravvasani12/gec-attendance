import "./Home.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthorBadge from "./components/AuthorBadge";

const API_BASE = import.meta.env.VITE_API_URL;

const Home = () => {
  const [studentNumber, setStudentNumber] = useState("");
  const [standard, setStandard] = useState("");
  const [division, setDivision] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    if (!userRole) {
      navigate("/login");
    }
  }, [userRole, navigate]);

  const handleAttendance = async () => {
    const time = new Date().toLocaleString();
    const newRecord = {
      studentNumber,
      standard,
      division,
      enrollment,
      time,
      role: userRole,
    };

    localStorage.setItem("studentEnrollment", enrollment);

    try {
      const response = await fetch(`${API_BASE}/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecord),
      });

      if (response.ok) {
        navigate("/student-attendance");
      } else {
        alert("Failed to submit attendance");
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-footer">
          <AuthorBadge />
        </div>
      </div>

      <div className="login-right">
        <div className="login-form">
          <h2>Enter Your Attendance</h2>

          <label>
            Student Name:
            <input
              type="text"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
              placeholder="Enter Student Name"
              required
            />
          </label>

          <label>
            Standard:
            <select
              value={standard}
              onChange={(e) => setStandard(e.target.value)}
            >
              <option value="">--Select Semester--</option>
              <option value="1 sem">First Sem</option>
              <option value="2 sem">Second Sem</option>
              <option value="3 sem">Third Sem</option>
              <option value="4 sem">Fourth Sem</option>
              <option value="5 sem">Fifth Sem</option>
              <option value="6 sem">Sixth Sem</option>
              <option value="7 sem">Seventh Sem</option>
            </select>
          </label>

          <label>
            Division:
            <select
              value={division}
              onChange={(e) => setDivision(e.target.value)}
            >
              <option value="">--Select Branch--</option>
              <option value="IT">Information Tech.</option>
              <option value="CS">Computer Science</option>
              <option value="CIVIL">Civil</option>
              <option value="MECH">Mech.</option>
            </select>
          </label>

          <label>
            Enrollment:
            <input
              type="number"
              value={enrollment}
              onChange={(e) => setEnrollment(e.target.value)}
              placeholder="Enter enrollment"
              required
            />
          </label>

          <button onClick={handleAttendance}>Mark Attendance</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
