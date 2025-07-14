import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import AttendanceList from "./AttendanceList";
import StudentAttendance from "./StudentAttendance";
import Navbar from "./components/Navbar"; // ✅ Add this only if using navbar

const AppRoutes = () => {
  const location = useLocation();
  const userRole = localStorage.getItem("userRole");

  // ✅ Redirect to /login if user not logged in
  useEffect(() => {
    if (!userRole && location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }, [userRole, location]);

  // ✅ Prevent login page access if already logged in
  if (userRole && location.pathname === "/login") {
    return (
      <Navigate to={userRole === "teacher" ? "/attendance" : "/"} replace />
    );
  }

  return (
    <div>
      {/* ✅ Optional: Navbar visible when logged in */}
      {userRole && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/attendance" element={<AttendanceList />} />
        <Route path="/student-attendance" element={<StudentAttendance />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
