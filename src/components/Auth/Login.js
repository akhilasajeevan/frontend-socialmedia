import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { loginAPI } from "../../services/api"; // Import the API service
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    login(email, password);
    e.preventDefault();
    try {
      // const response = await loginAPI(email, password); // Call login API
      // localStorage.setItem('token', response.token); // Store the token
      // localStorage.setItem('userId', response.userId); // Store the user ID
      setMessage("Login successful!"); // Handle successful login
      navigate("/"); // Redirect to the feed page
    } catch (error) {
      console.error("Login failed:", error);
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>} {/* Show error/success message */}
    </div>
  );
};

export default Login;
