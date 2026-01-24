import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../config";

function StudentDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const name = localStorage.getItem("name");

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/enrollments/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setEnrollments(data);
      } catch (error) {
        console.error("Failed to load enrollments");
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900">
          Student Dashboard
        </h1>
        {name && (
          <p className="text-gray-600 mt-1">
            Welcome back, <span className="font-medium">{name}</span> 👋
          </p>
        )}

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
            <p className="text-gray-500 font-medium">Enrolled Skill Paths</p>
            <p className="text-3xl font-bold mt-2 text-blue-600">
              {enrollments.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
            <p className="text-gray-500 font-medium">Average Progress</p>
            <p className="text-3xl font-bold mt-2 text-green-600">
              {enrollments.length === 0
                ? "0%"
                : `${Math.round(
                    enrollments.reduce(
                      (acc, e) => acc + e.progress,
                      0
                    ) / enrollments.length
                  )}%`}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
            <p className="text-gray-500 font-medium">Account Type</p>
            <p className="text-3xl font-bold mt-2 text-purple-600">Student</p>
          </div>
        </div>

        {/* Enrollments */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            My Learning Paths
          </h2>

          {enrollments.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">
                You haven’t enrolled in any skill paths yet.
              </p>
              <Link 
                to="/skills" 
                className="inline-block mt-4 text-blue-600 font-semibold hover:underline"
              >
                Browse Available Courses &rarr;
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border border-gray-100 flex flex-col justify-between h-full"
                >
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                      {item.skillPath.title}
                    </h3>
                    
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{item.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <Link
                    to={`/course/${item._id}`}
                    className="mt-6 block w-full text-center bg-blue-50 text-blue-700 font-bold py-2.5 rounded-lg hover:bg-blue-100 transition"
                  >
                    {item.progress > 0 ? "Continue Learning" : "Start Course"}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;