


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Profile.css';

// const Profile = () => {
//   const [userData, setUserData] = useState({
//     name: '',
//     bio: '',
//     profilePicture: '',
//   });
//   const [userPosts, setUserPosts] = useState([]);
//   const [editMode, setEditMode] = useState(false);
//   const [showPosts, setShowPosts] = useState(false);  // State to control visibility of posts
//   const [updatedData, setUpdatedData] = useState({
//     name: '',
//     bio: '',
//     profilePicture: '',
//   });
//   const navigate = useNavigate();

//   console.log(userData);
  

//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (!token) {
//       navigate('/login'); // Redirect if no token
//     } else {
//       // Fetch user profile data
//       const fetchProfileData = async () => {
//         try {
//           const res = await axios.get('http://localhost:5000/api/users/me', {
//             headers: { Authorization: `Bearer ${token}` },
//           });

//           console.log(res);
          
//           setUserData(res.data);
//           setUpdatedData({
//             name: res.data.name,
//             bio: res.data.bio,
//             profilePicture: res.data.profilePicture || '',
//           });
//         } catch (err) {
//           console.error('Error fetching profile data', err);
//         }
//       };

//       fetchProfileData();
//     }
//   }, [token, navigate]);

//   // Fetch user's posts only when needed
//   const handleShowPosts = async () => {
//     if (!showPosts && userPosts.length === 0) {
//       try {
//         const res = await axios.get('http://localhost:5000/api/posts/user/me', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUserPosts(res.data);
//       } catch (err) {
//         console.error('Error fetching user posts', err);
//       }
//     }
//     setShowPosts((prev) => !prev);  // Toggle the showPosts state
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleProfileUpdate = async () => {
//     try {
//       await axios.put(
//         'http://localhost:5000/api/users/me',
//         updatedData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setUserData(updatedData);
//       setEditMode(false);
//     } catch (err) {
//       console.error('Error updating profile', err);
//     }
//   };

//   return (
//     <div className="profile-container" >
//       <div className="profile-header">
//         <img
//           src={userData.profilePicture || './logo192.png'}
//           alt="Profile"
//           className="profile-picture"
//         />
//         {editMode ? (
//           <input
//             type="text"
//             name="profilePicture"
//             value={updatedData.profilePicture}
//             onChange={handleInputChange}
//             placeholder="Profile Picture URL"
//           />
//         ) : null}
//         <div className="profile-info">
//           {editMode ? (
//             <>
//               <input
//                 type="text"
//                 name="name"
//                 value={updatedData.name}
//                 onChange={handleInputChange}
//                 placeholder="Name"
//               />
//               <textarea
//                 name="bio"
//                 value={updatedData.bio}
//                 onChange={handleInputChange}
//                 placeholder="Bio"
//               />
//               <button onClick={handleProfileUpdate}>Save Changes</button>
//               <button onClick={() => setEditMode(false)}>Cancel</button>
//             </>
//           ) : (
//             <>
//               <h2>{userData?.name}</h2>
//               <p>{userData.bio}</p>
//               <button onClick={() => setEditMode(true)}>Edit Profile</button>
//             </>
//           )}
//         </div>
//       </div>

//       <div className="profile-posts-toggle">
//         {/* Button to toggle post visibility */}
//         <button onClick={handleShowPosts}>
//           {showPosts ? 'Hide Your Posts' : 'Show Your Posts'}
//         </button>
//       </div>

//       {showPosts && (  // Conditionally render posts based on `showPosts` state
//         <div className="profile-posts">
//           <h3>Your Posts</h3>
//           {userPosts.length === 0 ? (
//             <p>No posts yet.</p>
//           ) : (
//             userPosts.map((post) => (
//               <div key={post._id} className="post">
//                 <h4>{post.content}</h4>
//                 <small>{new Date(post.createdAt).toLocaleString()}</small>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState({
    username: '', // Changed to `username`
    bio: '',
    profilePicture: '',
  });

  const [user,setUser]= useState({})
  const [userPosts, setUserPosts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [showPosts, setShowPosts] = useState(false); // State to control visibility of posts
  const [updatedData, setUpdatedData] = useState({
    username: '', // Changed to `username`
    bio: '',
    profilePicture: '',
  });
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirect if no token
    } else {
      // Fetch user profile data
      const fetchProfileData = async () => {
        try {
          const res = await axios.get('http://localhost:5000/api/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          });

          setUser(res.data)
          

          // Set user data to use `username`
          setUserData({
            username: res.data.username, // Set this to `username`
            bio: res.data.bio,
            profilePicture: res.data.profilePicture || '',
          });

          // Set updated data for edit mode
          setUpdatedData({
            username: res.data.username, // Update to `username`
            bio: res.data.bio,
            profilePicture: res.data.profilePicture || '',
          });
        } catch (err) {
          console.error('Error fetching profile data', err);
        }
      };

      fetchProfileData();
    }
  }, [token, navigate]);

  // Fetch user's posts only when needed
  const handleShowPosts = async () => {
    if (!showPosts && userPosts.length === 0) {
      try {
        const res = await axios.get('http://localhost:5000/api/posts/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserPosts(res.data);
      } catch (err) {
        console.error('Error fetching user posts', err);
      }
    }
    setShowPosts((prev) => !prev); // Toggle the showPosts state
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle profile update
  const handleProfileUpdate = async () => {
    try {
      await axios.put(
        'http://localhost:5000/api/users/me',
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserData(updatedData);
      setEditMode(false); // Exit edit mode after saving changes
    } catch (err) {
      console.error('Error updating profile', err);
    }
  };

  console.log(userData);
  

  return (
    <div className="profile-container">
      <div className="profile-header">
        {/* Profile Picture */}
        <img
          src={userData.avatar || './logo192.png'}
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
                value={updatedData.username}
                onChange={handleInputChange}
                placeholder="Username"
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
              {userData.username ? (
                <>
                  <h2>{userData.username}</h2>
                  <p>{userData.bio || 'No bio available'}</p>
                </>
              ) : (
                <p>Loading profile...</p>
              )}
              <button onClick={() => setEditMode(true)}>Edit Profile</button>
            </>
          )}
        </div>
      </div>

      {/* Button to toggle post visibility */}
      <div className="profile-posts-toggle">
        <button onClick={handleShowPosts}>
          {showPosts ? 'Hide Your Posts' : 'Show Your Posts'}
        </button>
      </div>

      {/* Conditionally render posts based on `showPosts` state */}
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
