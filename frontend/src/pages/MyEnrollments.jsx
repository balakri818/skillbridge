import { useEffect, useState } from "react";

function MyEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [error, setError] = useState("");

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

        // ✅ SAFETY CHECK
        if (Array.isArray(data)) {
          setEnrollments(data);
        } else {
          setEnrollments([]);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load enrollments");
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">
          My Enrollments
        </h1>

        {error && (
          <p className="mt-4 text-red-500">{error}</p>
        )}

        {enrollments.length === 0 ? (
          <p className="mt-6 text-gray-600">
            You have not enrolled in any skill yet.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  {item?.skillPath?.title || "Skill"}
                </h2>

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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyEnrollments;