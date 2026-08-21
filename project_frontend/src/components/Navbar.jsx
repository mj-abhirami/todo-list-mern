import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        Todo App
      </h1>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/add">Add Task</Link>
      </div>
    </nav>
  );
}

export default Navbar;