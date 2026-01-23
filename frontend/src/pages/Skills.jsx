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

  const handleEnroll = async (skillPathId) => {
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
            skillPathId,
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
    <div>
      <h2>Available Skill Paths</h2>

      {message && <p>{message}</p>}

      <ul>
        {skills.map((skill) => (
          <li key={skill._id}>
            <strong>{skill.title}</strong> – {skill.description}
            <br />
            <button onClick={() => handleEnroll(skill._id)}>
              Enroll
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Skills;
