import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditTodo() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        TaskTitle: "",
        Description: "",
        DueDate: "",
        Priority: "",
        Status: "",
    });

    useEffect(() => {
        fetchTask();
    }, []);

    const fetchTask = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/v1/todolist/get/${id}`
            );

            setFormData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(
                `http://localhost:3000/api/v1/todolist/update/${id}`,
                formData
            );

            alert("Task Updated Successfully");

            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-lg w-[500px]"
            >
                <h1 className="text-3xl font-bold mb-6">
                    Edit Task
                </h1>

                <input
                    type="text"
                    name="TaskTitle"
                    value={formData.TaskTitle}
                    onChange={handleChange}
                    placeholder="Task Title"
                    className="w-full border p-3 rounded mb-4"
                />

                <textarea
                    name="Description"
                    value={formData.Description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full border p-3 rounded mb-4"
                />

                <input
                    type="date"
                    name="DueDate"
                    value={formData.DueDate?.split("T")[0]}
                    onChange={handleChange}
                    className="w-full border p-3 rounded mb-4"
                />

                <select
                    name="Priority"
                    value={formData.Priority}
                    onChange={handleChange}
                    className="w-full border p-3 rounded mb-4"
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

                <select
                    name="Status"
                    value={formData.Status}
                    onChange={handleChange}
                    className="w-full border p-3 rounded mb-4"
                >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                >
                    Update Task
                </button>

            </form>
        </div>
    );
}

export default EditTodo;