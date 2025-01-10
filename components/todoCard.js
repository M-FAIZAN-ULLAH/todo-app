"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useUser } from "../context/userContext";
import { useRouter } from "next/navigation";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [tab, setTab] = useState("incomplete"); // Track tab state
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [confirmComplete, setConfirmComplete] = useState(null);
  const { getUser } = useUser();
  const router = useRouter();

  // Fetch todos
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      const user = getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      const response = await fetch("/api/todos");
      const data = await response.json();
      setTodos(data);
      setLoading(false);
    };

    fetchTodos();
  }, [getUser, router]);

  // Add a new todo
  const addTodo = async () => {
    if (newTodo.trim()) {
      const user = getUser();
      setLoading(true);
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTodo }),
      });

      const data = await response.json();
      setTodos([data, ...todos]);
      setNewTodo("");
      setLoading(false);
    }
  };

  // Toggle completion status
  const toggleComplete = async (id) => {
    if (confirmComplete) {
      const updatedTodo = todos.find((todo) => todo.id === id);
      const response = await fetch("/api/todos", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, completed: !updatedTodo.completed }),
      });

      const data = await response.json();
      setTodos(todos.map((todo) => (todo.id === id ? data : todo)));
      setConfirmComplete(null);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    if (confirmDelete) {
      await fetch("/api/todos", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      setTodos(todos.filter((todo) => todo.id !== id));
      setConfirmDelete(null);
    }
  };

  // Filter todos by search term
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  );

  // Filter incomplete and complete todos
  const filteredByStatus =
    tab === "incomplete"
      ? filteredTodos.filter((todo) => !todo.completed)
      : filteredTodos.filter((todo) => todo.completed);

  return (
    <motion.div
      className="flex flex-col bg-gray-900 p-6 rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          className="p-2 bg-gray-700 text-white rounded-lg w-2/3"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <motion.button
          onClick={addTodo}
          className="ml-2 p-2 bg-blue-600 text-white rounded-lg"
          whileHover={{ scale: 1.05 }}
        >
          Add
        </motion.button>
      </div>

      {/* Tabs for completed/incomplete */}
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setTab("incomplete")}
          className={`px-4 py-2 rounded-lg ${
            tab === "incomplete" ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          Incomplete
        </button>
        <button
          onClick={() => setTab("completed")}
          className={`px-4 py-2 rounded-lg ${
            tab === "completed" ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          Completed
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          className="p-2 bg-gray-700 text-white rounded-lg w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search todos"
        />
      </div>

      {/* Show loader if fetching data */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredByStatus.map((todo) => (
            <motion.div
              key={todo.id}
              className="bg-gray-800 p-4 rounded-lg mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center">
                <span
                  className={
                    todo.completed ? "text-white line-through" : "text-white"
                  }
                >
                  {todo.title}
                </span>
                <div className="space-x-2">
                  {/* Complete Button with Confirmation */}
                  <motion.button
                    onClick={() => setConfirmComplete(todo.id)}
                    className="bg-green-600 p-1 rounded-lg"
                    whileHover={{ scale: 1.1 }}
                  >
                    {todo.completed ? "🔄" : "✔"}
                  </motion.button>
                  {/* Delete Button with Confirmation */}
                  <motion.button
                    onClick={() => setConfirmDelete(todo.id)}
                    className="bg-red-600 p-1 rounded-lg"
                    whileHover={{ scale: 1.1 }}
                  >
                    🗑️
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Confirmation Modals */}
      {confirmComplete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
          <div className="bg-gray-800 p-6 rounded-lg">
            <p className="text-white">Are you sure you completed this task?</p>
            <button
              onClick={() => toggleComplete(confirmComplete)}
              className="mr-2 px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Yes
            </button>
            <button
              onClick={() => setConfirmComplete(null)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg"
            >
              No
            </button>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
          <div className="bg-gray-800 p-6 rounded-lg">
            <p className="text-white">
              Are you sure you want to delete this task?
            </p>
            <button
              onClick={() => deleteTodo(confirmDelete)}
              className="mr-2 px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Yes
            </button>
            <button
              onClick={() => setConfirmDelete(null)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg"
            >
              No
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TodoList;
