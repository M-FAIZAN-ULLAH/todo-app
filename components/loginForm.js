// "use client"; // Ensure this component is treated as a client-side component
// import { useState, useEffect } from "react";
// import { signIn, useSession } from "next-auth/react";
// import { useUser } from "../context/userContext";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation"; // No need for useRoute

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { data: session, status } = useSession();
//   const { updateUser } = useUser();
//   const [loading, setLoading] = useState(true); // Loader state
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "authenticated") {
//       updateUser(session.user);
//       router.push("/dashboard");
//     }
//     setLoading(false); // Once the session is resolved, stop loading
//   }, [status, session, updateUser, router]);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     signIn("credentials", { email, password });
//   };

//   if (loading) {
//     // Show a loading spinner or animation until the Google button is visible
//     return (
//       <motion.div
//         className="flex items-center justify-center h-screen bg-gray-900"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//       >
//         <div className="text-white">Loading...</div>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       className="flex items-center justify-center h-screen bg-gray-900"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1 }}
//     >
//       <div className="bg-gray-800 p-10 rounded-lg shadow-xl text-white w-80">
//         <h1 className="text-3xl font-bold mb-4 text-center">Welcome Back</h1>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full p-3 bg-gray-700 rounded-lg text-white"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="mb-6">
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full p-3 bg-gray-700 rounded-lg text-white"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <motion.button
//             type="submit"
//             className="w-full p-3 bg-blue-600 rounded-lg"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             Sign In
//           </motion.button>
//         </form>

//         <div className="my-4 text-center text-gray-400">or</div>

//         <motion.button
//           onClick={() => signIn("google")}
//           className="w-full p-3 bg-red-600 rounded-lg"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.98 }}
//         >
//           Sign In with Google
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// };

// export default LoginForm;

"use client"; // Ensure this component is treated as a client-side component

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useUser } from "../context/userContext";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // No need for useRoute
import { FaGoogle } from "react-icons/fa"; // Import Google icon

const LoginForm = () => {
  const { data: session, status } = useSession();
  const { updateUser } = useUser();
  const [loading, setLoading] = useState(false); // Manage loading state
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      updateUser(session.user); // Store user in context
      router.push("/dashboard"); // Redirect to dashboard
    }
  }, [status, session, updateUser, router]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    signIn("credentials", { email, password }).finally(() => {
      setLoading(false);
    });
  };

  if (loading) {
    // Show a loading spinner or animation until the Google button is visible
    return (
      <motion.div
        className="flex items-center justify-center h-screen bg-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-white">Loading...</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex items-center justify-center h-screen bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl text-white w-80">
        <h1 className="text-3xl font-bold mb-4 text-center">Welcome Back</h1>

        <div className="mb-4 text-center text-gray-400">
          <p>This app uses Google Sign-In only.</p>
        </div>

        <motion.button
          onClick={() => signIn("google")}
          className="w-full p-4 flex items-center justify-center bg-red-600 rounded-lg hover:bg-red-700 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaGoogle className="mr-2 text-white" size={20} /> Sign In with Google
        </motion.button>

        <div className="my-4 text-center text-gray-400">or</div>

        {/* Optional: Include your custom login form here if needed */}
        {/* <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
        </form> */}
      </div>
    </motion.div>
  );
};

export default LoginForm;
