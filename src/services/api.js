

import axios from 'axios';

// Set the base URL for your API
const API_URL = 'http://localhost:5000/api'; // Replace with your actual API URL

// Function to handle user login
export const loginAPI = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password }); // Match this with your backend route
    return response.data; // Assuming the response contains the token
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message); // Use optional chaining for safer access
    throw error; // Re-throw the error for the calling function to handle it
  }
};

// Function to handle user registration
export const registerAPI = async (userDetails) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userDetails);
    return response.data; // Assuming the response contains the user data
  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
    throw error; // Re-throw the error for the calling function to handle it
  }
};

// Fetch posts
export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data; // Return posts data
  } catch (error) {
    console.error('Error fetching posts:', error.response?.data || error.message);
    throw error; // Re-throw the error for handling in the calling component
  }
};

// Create a new post
export const createPost = async (content) => {
  try {
    const token = localStorage.getItem('token'); // Get token from localStorage
    const response = await axios.post(`${API_URL}/posts`, { content }, {
      headers: {
        Authorization: `Bearer ${token}`, // Send the token in the headers
      },
    });
    return response.data; // Return the newly created post
  } catch (error) {
    console.error('Error creating post:', error.response?.data || error.message); // Log the error for debugging
    throw error; // Re-throw the error for handling in the calling component
  }
};

// Like/Unlike a post
export const toggleLikePost = async (postId) => {
  try {
    const token = localStorage.getItem('token'); // Get token from localStorage
    const response = await axios.put(`${API_URL}/posts/${postId}/like`, {}, {
      headers: {
        Authorization: `Bearer ${token}`, // Send the token in the headers
      },
    });
    return response.data; // Return the updated post with likes
  } catch (error) {
    console.error('Error liking/unliking post:', error.response?.data || error.message);
    throw error; // Re-throw the error for handling in the calling component
  }
};
