"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SignupForm() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, username, password } = e.target.elements;

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        username: username.value,
        password: password.value,
      }),
    });

    if (res.ok) {
      setMessage("Account created! Please login.");
    } else {
      setMessage("Error creating account. Try again.");
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto p-8 bg-gray-800 text-white rounded-xl shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      {message && <p className="text-sm text-green-400">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded text-white"
        >
          Sign Up
        </button>
      </form>
    </motion.div>
  );
}
