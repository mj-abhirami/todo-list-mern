import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddTodo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Map frontend state fields to backend schema fields
    const payload = {
      TaskTitle: formData.title,
      Description: formData.description,
      DueDate: formData.dueDate,
      Priority: formData.priority,
      Status: formData.status
    };

    axios.post("http://localhost:3000/api/v1/todolist/create", payload)
      .then(() => {
        alert("Task Added Successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding task:", error);
        alert("Failed to add task. Please check details.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Add New Task
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="block mb-2 font-semibold">
              Task Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter task title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-semibold">
              Description
            </label>

            <textarea
              name="description"
              rows="4"
              placeholder="Enter task description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block mb-2 font-semibold">
              Due Date
            </label>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block mb-2 font-semibold">
              Priority
            </label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block mb-2 font-semibold">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option>Pending</option>
              <option>Completed</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Save Task
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default AddTodo;