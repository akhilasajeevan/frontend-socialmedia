import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <nav
        style={{
          backgroundColor: "gray",
          padding: "5px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3>Blog</h3>
        <h4>New Post</h4>
        <Link to={"/register"}>
          <h4>Register</h4>
        </Link>
        <Link to={"/login"}>
          <h4>Login</h4>
        </Link>

        <Link to={"/profile"}>
          <h4>{user?.username}</h4>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
