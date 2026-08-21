import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import AddTodo from "./pages/AddTodo";
import Login from "./pages/Login";
import EditTodo from "./pages/EditTodo";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddTodo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit/:id" element={<EditTodo/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;