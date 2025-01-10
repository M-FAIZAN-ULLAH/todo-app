// "use client";
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// const TodoList = () => {
//   const [todos, setTodos] = useState([]);
//   const [newTodo, setNewTodo] = useState("");

//   useEffect(() => {
//     // Fetch user's todos (replace with API call)
//     const fetchedTodos = [
//       { id: 1, title: "Learn Next.js", completed: false },
//       { id: 2, title: "Create Todo App", completed: true },
//     ];
//     setTodos(fetchedTodos);
//   }, []);

//   const addTodo = () => {
//     if (newTodo.trim()) {
//       const newTodoObj = {
//         id: Math.random(),
//         title: newTodo,
//         completed: false,
//       };
//       setTodos([newTodoObj, ...todos]);
//       setNewTodo("");
//     }
//   };

//   const toggleComplete = (id) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo
//       )
//     );
//   };

//   const deleteTodo = (id) => {
//     setTodos(todos.filter((todo) => todo.id !== id));
//   };

//   return (
//     <motion.div
//       className="flex flex-col bg-gray-900 p-6 rounded-lg"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1 }}
//     >
//       <div className="flex justify-between mb-4">
//         <input
//           type="text"
//           className="p-2 bg-gray-700 text-white rounded-lg w-2/3"
//           value={newTodo}
//           onChange={(e) => setNewTodo(e.target.value)}
//           placeholder="Add a new todo"
//         />
//         <motion.button
//           onClick={addTodo}
//           className="ml-2 p-2 bg-blue-600 text-white rounded-lg"
//           whileHover={{ scale: 1.05 }}
//         >
//           Add
//         </motion.button>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         {/* Incomplete Todos */}
//         <div>
//           <h2 className="text-xl text-white mb-3">Incomplete</h2>
//           {todos
//             .filter((todo) => !todo.completed)
//             .map((todo) => (
//               <motion.div
//                 key={todo.id}
//                 className="bg-gray-800 p-4 rounded-lg mb-3"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <div className="flex justify-between items-center">
//                   <span className="text-white">{todo.title}</span>
//                   <div className="space-x-2">
//                     <motion.button
//                       onClick={() => toggleComplete(todo.id)}
//                       className="bg-green-600 p-1 rounded-lg"
//                       whileHover={{ scale: 1.1 }}
//                     >
//                       ✔
//                     </motion.button>
//                     <motion.button
//                       onClick={() => deleteTodo(todo.id)}
//                       className="bg-red-600 p-1 rounded-lg"
//                       whileHover={{ scale: 1.1 }}
//                     >
//                       🗑️
//                     </motion.button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//         </div>

//         {/* Completed Todos */}
//         <div>
//           <h2 className="text-xl text-white mb-3">Completed</h2>
//           {todos
//             .filter((todo) => todo.completed)
//             .map((todo) => (
//               <motion.div
//                 key={todo.id}
//                 className="bg-gray-800 p-4 rounded-lg mb-3"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <div className="flex justify-between items-center">
//                   <span className="text-white line-through">{todo.title}</span>
//                   <motion.button
//                     onClick={() => toggleComplete(todo.id)}
//                     className="bg-yellow-600 p-1 rounded-lg"
//                     whileHover={{ scale: 1.1 }}
//                   >
//                     ✖
//                   </motion.button>
//                 </div>
//               </motion.div>
//             ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default TodoList;

"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useUser } from "../context/userContext";
import { useRouter } from "next/navigation";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const { getUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchTodos = async () => {
      const user = getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      const response = await fetch("/api/todos");
      const data = await response.json();
      setTodos(data);
    };

    fetchTodos();
  }, [getUser, router]);

  const addTodo = async () => {
    if (newTodo.trim()) {
      const user = getUser();
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
    }
  };

  const toggleComplete = async (id) => {
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
  };

  const deleteTodo = async (id) => {
    await fetch("/api/todos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <motion.div
      className="flex flex-col bg-gray-900 p-6 rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="flex justify-between mb-4">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {todos.map((todo) => (
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
                <motion.button
                  onClick={() => toggleComplete(todo.id)}
                  className="bg-green-600 p-1 rounded-lg"
                  whileHover={{ scale: 1.1 }}
                >
                  ✔
                </motion.button>
                <motion.button
                  onClick={() => deleteTodo(todo.id)}
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
    </motion.div>
  );
};

export default TodoList;
