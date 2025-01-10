// "use client"; // Ensure this file runs only on the client side

// import { createContext, useContext, useState, useEffect } from "react";

// const UserContext = createContext();

// export function UserProvider({ children }) {
//   const [user, setUser] = useState(null);

//   // Make sure to persist user data across refresh
//   const updateUser = (userData) => {
//     setUser(userData);
//     // Persist user data to localStorage or sessionStorage
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   // Retrieve persisted user data on load
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, setUser, updateUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// export function useUser() {
//   return useContext(UserContext);
// }

// "use client"; // Ensure this file runs only on the client side

// import { createContext, useContext, useState, useEffect } from "react";

// const UserContext = createContext();

// export function UserProvider({ children }) {
//   const [user, setUser] = useState(null);

//   // Make sure to persist user data across refresh
//   const updateUser = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const getUser = () => {
//     return user || JSON.parse(localStorage.getItem("user"));
//   };

//   const signOutUser = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   return (
//     <UserContext.Provider
//       value={{ user, setUser, updateUser, getUser, signOutUser }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// }

// export function useUser() {
//   return useContext(UserContext);
// }

"use client"; // Ensure this file runs only on the client side

import { createContext, useContext, useState, useEffect } from "react";
import { signOut } from "next-auth/react"; // Import signOut from next-auth

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Make sure to persist user data across refresh
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const getUser = () => {
    return user || JSON.parse(localStorage.getItem("user"));
  };

  const signOutUser = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user data from localStorage
    signOut({ redirect: false }); // Call next-auth's signOut method to clear session
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, updateUser, getUser, signOutUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
