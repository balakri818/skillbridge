import { useEffect, useState } from "react";

function MyEnrollments() {
  const [enrollments, setEnrollments] = useState([]);

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
        console.error("Failed to fetch enrollments");
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <div>
      <h2>My Enrolled Skill Paths</h2>

      {enrollments.length === 0 && <p>No enrollments yet</p>}

      <ul>
        {enrollments.map((item) => (
          <li key={item._id}>
            <strong>{item.skillPath.title}</strong>
            <br />
            Progress: {item.progress}%
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyEnrollments;
