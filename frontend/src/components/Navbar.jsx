import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "10px" }}>
        Home
      </Link>

      {!token && (
        <>
          <Link to="/login" style={{ marginRight: "10px" }}>
            Login
          </Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {token && role === "student" && (
        <>
          <Link to="/skills" style={{ marginLeft: "10px" }}>
            Skills
          </Link>
          <Link to="/my-enrollments" style={{ marginLeft: "10px" }}>
            My Enrollments
          </Link>
          <button
            onClick={handleLogout}
            style={{ marginLeft: "10px" }}
          >
            Logout
          </button>
        </>
      )}

      {token && role === "admin" && (
        <>
          <Link to="/admin" style={{ marginLeft: "10px" }}>
            Admin Dashboard
          </Link>
          <Link to="/admin/add-skill" style={{ marginLeft: "10px" }}>
            Add Skill
          </Link>
          <button
            onClick={handleLogout}
            style={{ marginLeft: "10px" }}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
