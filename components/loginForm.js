// "use client"; // Ensure this component is treated as a client-side component

// import { useState, useEffect } from "react";
// import { signIn, useSession } from "next-auth/react";
// import { useUser } from "../context/userContext";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation"; // No need for useRoute
// import { FaGoogle } from "react-icons/fa"; // Import Google icon

// const LoginForm = () => {
//   const { data: session, status } = useSession();
//   const { updateUser } = useUser();
//   const [loading, setLoading] = useState(false); // Manage loading state
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "authenticated") {
//       updateUser(session.user); // Store user in context
//       router.push("/dashboard"); // Redirect to dashboard
//     }
//   }, [status, session, updateUser, router]);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     signIn("credentials", { email, password }).finally(() => {
//       setLoading(false);
//     });
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

//         <div className="mb-4 text-center text-gray-400">
//           <p>This app uses Google Sign-In only.</p>
//         </div>

//         <motion.button
//           onClick={() => signIn("google")}
//           className="w-full p-4 flex items-center justify-center bg-red-600 rounded-lg hover:bg-red-700 transition duration-300"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.98 }}
//         >
//           <FaGoogle className="mr-2 text-white" size={20} /> Sign In with Google
//         </motion.button>

//         <div className="my-4 text-center text-gray-400">or</div>

//         {/* Optional: Include your custom login form here if needed */}
//         {/* <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button type="submit">Sign In</button>
//         </form> */}
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
  const [messageVisible, setMessageVisible] = useState(false);
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

  // Show a loading screen while waiting for the sign-in
  if (loading) {
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
      className="relative flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-teal-500 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-fixed bg-cover"
        style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
      ></motion.div>

      {/* Main Content */}
      <div className="relative z-10 bg-gray-800 p-10 rounded-lg shadow-xl text-white w-80 sm:w-96 md:w-1/3">
        <h1 className="text-3xl font-bold mb-4 text-center animate__animated animate__fadeIn animate__delay-1s">
          Welcome Back
        </h1>

        <div className="mb-4 text-center text-gray-400 animate__animated animate__fadeIn animate__delay-2s">
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

        <div className="my-4 text-center text-gray-400 animate__animated animate__fadeIn animate__delay-3s">
          or
        </div>

        {/* Message about sign-in issue */}
        {messageVisible && (
          <div className="text-center text-gray-300 mt-4 animate__animated animate__fadeIn animate__delay-4s">
            <p>
              Due to less time, there is an issue where you need to click the
              sign-out button twice to log in. I hope you like this platform! I
              did my best.
            </p>
          </div>
        )}

        {/* Show message after login attempts */}
        <motion.div className="absolute bottom-0 left-0 right-0 p-4 text-center text-gray-300 animate__animated animate__fadeIn animate__delay-5s">
          <button
            onClick={() => setMessageVisible(true)}
            className="text-sm text-gray-400 hover:text-gray-200"
          >
            Learn More
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoginForm;
