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
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          SkillBridge
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-6 text-gray-700 font-medium">
          {!token && (
            <>
              <Link
                to="/login"
                className="hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-blue-600 transition"
              >
                Register
              </Link>
            </>
          )}

          {token && role === "student" && (
            <>
              <Link
                to="/skills"
                className="hover:text-blue-600 transition"
              >
                Skills
              </Link>
              <Link
                to="/my-enrollments"
                className="hover:text-blue-600 transition"
              >
                My Enrollments
              </Link>
              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition"
              >
                Logout
              </button>
            </>
          )}

          {token && role === "admin" && (
            <>
              <Link
                to="/admin"
                className="hover:text-blue-600 transition"
              >
                Dashboard
              </Link>
              <Link
                to="/admin/add-skill"
                className="hover:text-blue-600 transition"
              >
                Add Skill
              </Link>
              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition"
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
