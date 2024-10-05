import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);

  console.log(user);

  const [userPosts, setUserPosts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [showPosts, setShowPosts] = useState(false); // Toggle for showing posts
  const [updatedData, setUpdatedData] = useState({
    username: "",
    bio: "",
    profilePicture: "",

    email: "",
    phone: "",
    place: "",
    dateOfBirth: "",
  });

  console.log(user);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect if no token
    } else {
      // Fetch user profile data (Using dummy data here)
      const fetchProfileData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/users/me",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          setUpdatedData(response.data);

          // const res = {
          //   data: {
          //     username: 'john',
          //     bio: 'Just a dummy bio',
          //     profilePicture: '',
          //     name: 'John ',
          //     email: 'john@example.com',
          //     phone: '9890876662',
          //     place: 'india, kerala',
          //     dateOfBirth: '2000-01-01',
          //   },
          // };

          // Update user data state
          // setUserData(res.data);

          // Set updatedData to handle edits
          // setUpdatedData(res.data);
        } catch (err) {
          console.error("Error fetching profile data", err);
        }
      };

      fetchProfileData();
    }
  }, [token, navigate]);

  // Fetch user posts when toggled
  const handleShowPosts = async () => {
    if (!showPosts && userPosts.length === 0) {
      try {
        const res = await axios.get("http://localhost:5000/api/posts/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserPosts(res.data);
      } catch (err) {
        console.error("Error fetching user posts", err);
      }
    }
    setShowPosts((prev) => !prev); // Toggle the showPosts state
  };

  // Handle profile data input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle profile update submission
  const handleProfileUpdate = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/users/me",
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUpdatedData(res.data); // Update displayed data
      setUser(res.data);
      setEditMode(false); // Exit edit mode after saving
    } catch (err) {
      console.error("Error updating profile", err);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={user?.avatar || "./logo192.png"}
          alt="Profile"
          className="profile-picture"
        />

        {editMode && (
          <input
            type="text"
            name="profilePicture"
            value={updatedData.profilePicture}
            onChange={handleInputChange}
            placeholder="Profile Picture URL"
          />
        )}

        {/* Profile Info */}
        <div className="profile-info">
          {editMode ? (
            <>
              <input
                type="text"
                name="username"
                value={updatedData?.username}
                onChange={handleInputChange}
                placeholder="Username"
              />
              <input
                type="email"
                name="email"
                value={updatedData.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
              <input
                type="tel"
                name="phone"
                value={updatedData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
              />
              <input
                type="text"
                name="place"
                value={updatedData.place}
                onChange={handleInputChange}
                placeholder="Place"
              />
              <input
                type="date"
                name="dateOfBirth"
                value={updatedData.dateOfBirth}
                onChange={handleInputChange}
                placeholder="Date of Birth"
              />
              <textarea
                name="bio"
                value={updatedData.bio}
                onChange={handleInputChange}
                placeholder="Bio"
              />
              <button onClick={handleProfileUpdate}>Save Changes</button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </>
          ) : (
            <>
              {user?.username ? (
                <>
                  <h2>{user.name}</h2>
                  <p>Username: {user.username}</p>
                  <p>Email: {user.email}</p>
                  <p>Phone: {user.phone}</p>
                  <p>Place: {user.place}</p>
                  <p>
                    Date of Birth:{" "}
                    {new Date(user.dateOfBirth).toLocaleDateString()}
                  </p>
                  <p>Bio: {user.bio || "No bio available"}</p>
                </>
              ) : (
                <p>Loading profile...</p>
              )}
              <button onClick={() => setEditMode(true)}>Edit Profile</button>
            </>
          )}
        </div>
      </div>

      {/* Show/Hide Posts */}
      <div className="profile-posts-toggle">
        <button onClick={handleShowPosts}>
          {showPosts ? "Hide Your Posts" : "Show Your Posts"}
        </button>
      </div>

      {/* Posts Section */}
      {showPosts && (
        <div className="profile-posts">
          <h3>Your Posts</h3>
          {userPosts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            userPosts.map((post) => (
              <div key={post._id} className="post">
                <h4>{post.content}</h4>
                <small>{new Date(post.createdAt).toLocaleString()}</small>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
