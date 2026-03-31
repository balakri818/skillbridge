import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          SkillBridge
        </Link>

        <nav className="flex items-center space-x-6">
          {!token ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/skills">Skills</Link>
              <Link to="/my-enrollments">My Enrollments</Link>

              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white px-4 py-1.5 rounded"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;