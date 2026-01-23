import { useState } from "react";

function AddSkill() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleAddSkill = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to add skill");
        return;
      }

      setMessage("Skill added successfully");
      setTitle("");
      setDescription("");
    } catch (error) {
      setMessage("Error adding skill");
    }
  };

  return (
    <div>
      <h2>Add New Skill</h2>

      <input
        type="text"
        placeholder="Skill Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <textarea
        placeholder="Skill Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br /><br />

      <button onClick={handleAddSkill}>Add Skill</button>

      <p>{message}</p>
    </div>
  );
}

export default AddSkill;
