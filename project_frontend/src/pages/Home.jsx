import { useState, useEffect } from "react";
import axios from "axios";
import TodoCard from "../components/TodoCard";
import { Link } from "react-router-dom";

function Home() {
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    // Fetch tasks from the backend when the component loads
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/todolist/get")
            .then(response => {
                // The backend returns an object with a getToDoList array field
                setTasks(response.data.getToDoList || []);
            })
            .catch(error => {
                console.error("Error fetching tasks:", error);
            });
    }, []);

    // Filter tasks by status and search query
    const filteredTasks = tasks.filter(task => {
        const matchesSearch =
            (task.TaskTitle || "").toLowerCase().includes(search.toLowerCase()) ||
            (task.Description || "").toLowerCase().includes(search.toLowerCase());

        const matchesFilter =
            filter === "All" ||
            (task.Status || "").toLowerCase() === filter.toLowerCase();

        return matchesSearch && matchesFilter;
    });

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `http://localhost:3000/api/v1/todolist/delete/${id}`
            );

            setTasks(prev =>
                prev.filter(task => task._id !== id)
            );

            alert("Task deleted successfully!");
        } catch (error) {
            console.error("Delete Error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto p-8">

                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-4xl font-bold">
                        My Tasks
                    </h1>

                    <Link
                        to="/add"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
                    >
                        + Add Task
                    </Link>
                </div>

                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-3 border rounded-lg mb-6"
                />

                <div className="flex gap-3 mb-6">
                    <button
                        onClick={() => setFilter("All")}
                        className={`${filter === "All" ? "bg-blue-600 text-white" : "bg-white border text-gray-700"} px-4 py-2 rounded-lg`}
                    >
                        All
                    </button>

                    <button
                        onClick={() => setFilter("Pending")}
                        className={`${filter === "Pending" ? "bg-blue-600 text-white" : "bg-white border text-gray-700"} px-4 py-2 rounded-lg`}
                    >
                        Pending
                    </button>

                    <button
                        onClick={() => setFilter("Completed")}
                        className={`${filter === "Completed" ? "bg-blue-600 text-white" : "bg-white border text-gray-700"} px-4 py-2 rounded-lg`}
                    >
                        Completed
                    </button>
                </div>

                {/* Render the dynamically fetched cards */}
                <div className="grid md:grid-cols-2 gap-5">
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map(task => (
                            <TodoCard
                                key={task._id}
                                _id={task._id}
                                title={task.TaskTitle}
                                description={task.Description}
                                dueDate={task.DueDate ? new Date(task.DueDate).toLocaleDateString() : ""}
                                priority={task.Priority}
                                status={task.Status}
                                handleDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center col-span-2 py-10">No tasks found.</p>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Home;