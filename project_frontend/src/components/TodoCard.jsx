import { Link } from "react-router-dom";

function TodoCard({
  _id,
  title,
  description,
  dueDate,
  priority,
  status,
  handleDelete,
}) {

  const confirmDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      handleDelete(_id);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition">
      
      <h2 className="text-2xl font-bold mb-2">
        {title}
      </h2>

      <p className="text-gray-600 mb-4">
        {description}
      </p>

      <div className="space-y-2">
        <p>
          📅 <span className="font-medium">Due Date:</span> {dueDate}
        </p>

        <p>
          🔥 <span className="font-medium">Priority:</span> {priority}
        </p>

        <p>
          ✅ <span className="font-medium">Status:</span> {status}
        </p>
      </div>

      <div className="flex gap-3 mt-5">
        
        <Link
          to={`/edit/${_id}`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
        >
          Edit
        </Link>

        <button
          onClick={confirmDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>

      </div>
    </div>
  );
}

export default TodoCard;