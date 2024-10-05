// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const Navbar = () => {
//   const { user } = useContext(AuthContext);
//   return (
//     <div>
//       <nav
//         style={{
//           backgroundColor: "gray",
//           padding: "5px",
//           display: "flex",
//           justifyContent: "space-between",
//         }}
//       >
//         <h3>Blog</h3>
//         <Link to={"/create-post"}>
//         <h4>New Post</h4>
//         </Link>
//         <Link to={"/register"}>
//           <h4>Register</h4>
//         </Link>
//         <Link to={"/login"}>
//           <h4>Login</h4>
//         </Link>

//         <Link to={"/profile"}>
//           <h4>{user?.username}</h4>
//         </Link>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;


import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Destructure logout from context

  return (
    <div>
      <nav
        style={{
          backgroundColor: "gray",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Blog</h3>
        <div style={{ display: "flex", gap: "15px" }}>
          {user ? (
            <>
              <Link to="/create-post">
                <h4>New Post</h4>
              </Link>
              <Link to="/profile">
                <h4>{user.username}</h4> {/* Display username */}
              </Link>
              <button
                onClick={logout}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "black",
                  cursor: "pointer",
                }}
              >
                <h4>Logout</h4>
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <h4>Login</h4>
              </Link>
              <Link to="/register">
                <h4>Register</h4>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
