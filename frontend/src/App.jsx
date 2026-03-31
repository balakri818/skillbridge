import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/Register";
import Dashboard from "./pages/StudentDashboard";
import Skills from "./pages/Skills";
import MyEnrollments from "./pages/MyEnrollments";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/skills"
          element={
            <ProtectedRoute>
              <Skills />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-enrollments"
          element={
            <ProtectedRoute>
              <MyEnrollments />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;