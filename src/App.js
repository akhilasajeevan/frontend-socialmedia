


import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Feed from "./components/Feed/Feed";
import CreatePost from "./components/Feed/CreatePost";
import Profile from "./components/Profile/Profile"; // Import Profile Component
import ProtectedRoute from "./components/Auth/ProtectedRoute"; // Import ProtectedRoute
import Navbar from "./components/Navbar";
import SearchUsers from './components/SearchUsers'; // Import SearchUsers component

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchUsers />
            </ProtectedRoute>
          }
        
        />
      </Routes>
    </>
  );
};

export default App;
