"use client";
import { motion } from "framer-motion";
import { useUser } from "../context/userContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, signOutUser } = useUser();
  const router = useRouter();

  const handleSignOut = () => {
    signOutUser(); // Sign out the user
    router.push("/login"); // Redirect to login after sign-out
  };

  return (
    <motion.div
      className="flex justify-between items-center bg-gray-900 p-4 shadow-md"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-white font-semibold text-xl">Todo Dashboard</div>

      <div className="flex items-center space-x-4">
        <span className="text-white">{user?.name || user?.email}</span>
        <motion.button
          onClick={handleSignOut}
          className="bg-red-600 text-white px-4 py-2 rounded-lg transition-colors hover:bg-red-500"
          whileHover={{ scale: 1.05 }}
        >
          Sign Out
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Navbar;
