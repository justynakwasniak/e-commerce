import { createContext, useContext, useState, useEffect } from "react";

// Creating User Context
const UserContext = createContext();

// User Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check localStorage for user data
    const savedUser = localStorage.getItem("userData");
    return savedUser ? JSON.parse(savedUser) : null; // Initialize user state
  });

  // Update localStorage whenever the user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("userData", JSON.stringify(user));
    } else {
      localStorage.removeItem("userData"); // Remove user data on logout
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
