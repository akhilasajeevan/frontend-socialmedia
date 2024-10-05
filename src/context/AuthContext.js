// import React, { createContext, useState, useEffect } from "react";
// import { loginAPI, registerAPI } from "../services/api"; // Make sure these API functions exist
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [isUser, setIsUser] = useState(false);

//   const login = async (email, password) => {
//     const userData = await loginAPI(email, password);
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData.user));
//     localStorage.setItem("token", userData.token);
//     setIsUser(true);
//     navigate("/");
//   };

//   const register = async (userDetails) => {
//     const userData = await registerAPI(userDetails);
//     setUser(userData);
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, [isUser]);

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;


import React, { createContext, useState, useEffect } from "react";
import { loginAPI, registerAPI } from "../services/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isUser, setIsUser] = useState(false);

  const login = async (email, password) => {
    const userData = await loginAPI(email, password);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData.user));
    localStorage.setItem("token", userData.token);
    setIsUser(true);
    navigate("/"); // Navigate to home after login
  };

  const register = async (userDetails) => {
    const userData = await registerAPI(userDetails);
    setUser(userData);
  };

  // Modify logout function to remove user and token
  const logout = () => {
    setUser(null);
    setIsUser(false); // Update the state to indicate no user is logged in
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Also remove the token
    navigate("/login"); // Redirect to login page after logout
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [isUser]);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
