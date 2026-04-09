import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

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

        // ✅ SAFETY CHECK (VERY IMPORTANT)
        if (Array.isArray(data)) {
          setEnrollments(data);
        } else {
          setEnrollments([]);
        }
      } catch (error) {
        console.error("Failed to load enrollments");
        setEnrollments([]);
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        {name && (
          <p className="text-gray-600 mt-1">
            Welcome, <span className="font-medium">{name}</span> 👋
          </p>
        )}

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Enrolled Skills</p>
            <p className="text-3xl font-bold mt-2">
              {enrollments.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Average Progress</p>
            <p className="text-3xl font-bold mt-2">
              {enrollments.length === 0
                ? "0%"
                : `${Math.round(
                    enrollments.reduce(
                      (acc, e) => acc + (e.progress || 0),
                      0
                    ) / enrollments.length
                  )}%`}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Account Type</p>
            <p className="text-3xl font-bold mt-2">User</p>
          </div>
        </div>

        {/* Enrollments */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900">
            My Enrollments
          </h2>

          {enrollments.length === 0 ? (
            <p className="mt-4 text-gray-600">
              No enrollments yet.
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((item, index) => (
                <div
                  key={index}
                  onClick={() => navigate("/skill", { state: { skill: item.skillPath } })}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item?.skillPath?.title || "Skill"}
                    </h3>

                    <p className="text-gray-600 mt-2">
                      Progress: {item?.progress || 0}%
                    </p>

                    <div className="mt-4 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-blue-600 rounded-full"
                        style={{
                          width: `${item?.progress || 0}%`,
                        }}
                      ></div>
                    </div>

                    {item?.skillPath?.topics && item.skillPath.topics.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-semibold text-sm mb-2 text-gray-800">Topics Covered:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {item.skillPath.topics.map((t, i) => (
                             <li key={i}>{t.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 text-blue-600 font-semibold text-sm flex items-center">
                    Continue Learning →
                  </div>
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