import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Skills() {
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  const handleEnroll = async (e, skill) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to enroll in a skill path.");
        navigate("/login");
        return;
      }

      const res = await fetch("http://localhost:5000/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ skillPathId: skill._id })
      });
      if (res.ok) {
        alert("Enrolled successfully! Check out My Enrollments.");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to enroll");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchSkills = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/skills", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setSkills(data);
    };

    fetchSkills();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Skill Paths</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {skills.map((skill) => (
          <div
            key={skill._id}
            onClick={() => navigate("/skill", { state: { skill } })}
            className="cursor-pointer p-6 bg-white shadow rounded hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold">{skill.title}</h2>
              <p className="text-gray-600 mt-2">{skill.description}</p>
            </div>
            
            <button
              onClick={(e) => handleEnroll(e, skill)}
              className="mt-6 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 w-fit"
            >
              Enroll Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;