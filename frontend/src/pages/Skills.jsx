import { useEffect, useState } from "react";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/skills", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setSkills(data);
      } catch (err) {
        setMessage("Failed to load skills");
      }
    };

    fetchSkills();
  }, []);

  const handleEnroll = async (skillId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/enrollments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            skillPathId: skillId,
          }),
        }
      );

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Enrollment failed");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">
          Skill Paths
        </h1>

        {message && (
          <p className="mt-4 text-blue-600 font-medium">{message}</p>
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {skill.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {skill.description}
              </p>

              {/* Topics (simulate structured learning) */}
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500">
                  Topics Covered:
                </p>
                <ul className="text-sm text-gray-700 mt-2 space-y-1">
                  {skill.title === "DSA" && (
                    <>
                      <li>• Arrays</li>
                      <li>• Strings</li>
                      <li>• Linked Lists</li>
                    </>
                  )}
                  {skill.title === "Web Development" && (
                    <>
                      <li>• HTML</li>
                      <li>• CSS</li>
                      <li>• JavaScript</li>
                    </>
                  )}
                </ul>
              </div>

              <button
                onClick={() => handleEnroll(skill._id)}
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Enroll
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;