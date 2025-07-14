import { useEffect, useState } from "react";
import "./Home.css";
import AuthorBadge from "./components/AuthorBadge";

const API_BASE = import.meta.env.VITE_API_URL;

const StudentAttendance = () => {
  const [records, setRecords] = useState([]);
  const enrollment = localStorage.getItem("studentEnrollment");

  useEffect(() => {
    if (!enrollment) return;

    fetch(`${API_BASE}/attendance/${enrollment}`)
      .then((res) => res.json())
      .then((data) => setRecords(data))
      .catch((err) => console.error("Error fetching records:", err));
  }, [enrollment]);

  return (
    <div className="login-page">
      {/* Left side: Branding */}
      <div className="login-left">
        <div className="gec-logo" />
        <h2 className="college-title">
          Government Engineering College, Bhavnagar
        </h2>
        <div className="login-footer">
          <AuthorBadge />
        </div>
      </div>

      {/* Right side: Attendance Records */}
      <div className="login-right">
        <div className="login-form">
          <h2>Your Attendance Records</h2>

          {records.length === 0 ? (
            <p className="no-record">No attendance found.</p>
          ) : (
            <ul className="attendance-list">
              {records.map((r, i) => (
                <li key={i} className="attendance-item">
                  <strong>Name:</strong> {r.studentNumber} <br />
                  <strong>Standard:</strong> {r.standard} <br />
                  <strong>Division:</strong> {r.division} <br />
                  <strong>Enrollment:</strong> {r.enrollment} <br />
                  <strong>Time:</strong> {r.time}
                </li>
              ))}
            </ul>
          )}

          <button className="omg" onClick={() => (window.location.href = "/")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
