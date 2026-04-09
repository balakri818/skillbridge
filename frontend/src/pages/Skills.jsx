import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Skills() {
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

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
            className="cursor-pointer p-6 bg-white shadow rounded"
          >
            <h2 className="text-xl font-bold">{skill.title}</h2>
            <p className="text-gray-600 mt-2">{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;