// src/pages/EditProjectPage.jsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://project-management-api-4641927fee65.herokuapp.com";

function EditProjectPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { projectId } = useParams(); // <== ADD
  const navigate = useNavigate(); // <== ADD

  useEffect(() => {
    axios
      .get(`${API_URL}/projects/${projectId}`)
      .then((response) => {
        const project = response.data;
        setTitle(project.title);
        setDescription(project.description);
      })
      .catch((error) => console.log(error));
  }, [projectId]); // <== ADD



  const handleFormSubmit = (e) => {
    e.preventDefault();
 
    const requestBody = { title, description };

    axios
      .put(`${API_URL}/projects/${projectId}`, requestBody)
      .then((response) => {
        console.log("EditProjectPage", "put-response", response);
        navigate(`/projects/${projectId}`);
      })
      .catch((error) => console.log("EditProjectPage", "put-response", error));
  }




  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Project</button>
      </form>
    </div>
  );
}

export default EditProjectPage;
