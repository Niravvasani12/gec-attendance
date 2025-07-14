import { useEffect, useState } from "react";
import "./AttendanceList.css";
import AuthorBadge from "./components/AuthorBadge";

const AttendanceList = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const userRole = localStorage.getItem("userRole");

  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (userRole === "teacher") {
      fetch(`${API_BASE}/attendance`)
        .then((res) => res.json())
        .then((data) => {
          setAttendanceRecords(data);
        })
        .catch((err) => console.error("Fetch error:", err));
    } else {
      const records = JSON.parse(localStorage.getItem("attendance")) || [];
      setAttendanceRecords(records);
    }
  }, [userRole, API_BASE]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      const response = await fetch(`${API_BASE}/attendance/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (!response.ok) {
        alert("Delete failed: " + result.error);
        return;
      }

      setAttendanceRecords((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Network or server error while deleting");
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm("Delete ALL attendance records?")) return;

    try {
      const response = await fetch(`${API_BASE}/attendance`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (!response.ok) {
        alert("Failed to clear: " + result.error);
        return;
      }

      setAttendanceRecords([]);
    } catch (err) {
      console.error("Clear all error:", err);
      alert("Error clearing all records");
    }
  };

  return (
    <div className="login-page">
      {/* Branding */}
      <div className="login-left">
        <div className="gec-logo" />
        <h2 className="college-title">
          Government Engineering College, Bhavnagar
        </h2>
        <h2 className="college-title">
          Hey Teacher, You can Manage Students Attandance{" "}
        </h2>
        <AuthorBadge />
      </div>

      {/* Records */}
      <div className="login-right">
        <div className="login-form">
          <h2>
            {userRole === "teacher"
              ? "All Attendance Records"
              : "Your Attendance Records"}
          </h2>

          {userRole === "teacher" && attendanceRecords.length > 0 && (
            <button className="clear-button" onClick={handleClearAll}>
              Clear All
            </button>
          )}

          {attendanceRecords.length === 0 ? (
            <p>No attendance records found.</p>
          ) : (
            <ul className="attendance-list">
              {attendanceRecords.map((record) => (
                <li key={record._id || record.time} className="attendance-item">
                  <strong>Student Number:</strong> {record.studentNumber} <br />
                  <strong>Standard:</strong> {record.standard} <br />
                  <strong>Division:</strong> {record.division} <br />
                  <strong>Enrollment:</strong> {record.enrollment} <br />
                  <strong>Time:</strong> {record.time}
                  {userRole === "teacher" && (
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(record._id)}
                    >
                      Delete
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceList;
