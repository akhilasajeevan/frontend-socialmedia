


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Feed.css'

// const CreatePost = ({ onPostCreated, existingPost }) => {
//   // Initialize content based on whether an existing post is passed
//   const [content, setContent] = useState(existingPost ? existingPost.content : ''); 
//   const [message, setMessage] = useState(''); // State for messages (success or error)

//   // Reset the content if existingPost changes (useful for modal scenarios)
//   useEffect(() => {
//     if (existingPost) {
//       setContent(existingPost.content);
//     }
//   }, [existingPost]);

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission
//     try {
//       const token = localStorage.getItem('token'); // Ensure this is set correctly
//       const userId = localStorage.getItem('userId'); // Ensure this is set correctly

//       if (!token || !userId) {
//         setMessage('You need to log in to create a post.');
//         return; // Early return if no token or user ID found
//       }

//       let response;
//       if (existingPost) {
//         // Update existing post
//         response = await axios.put(`http://localhost:5000/api/posts/${existingPost._id}`, 
//         { content }, 
//         {
//           headers: {
//             Authorization: `Bearer ${token}` // Pass the token in the header
//           }
//         });
//       } else {
//         // Create new post
//         response = await axios.post('http://localhost:5000/api/posts', 
//         {
//           content,
//           user: userId // Ensure the user ID is included here
//         }, 
//         {
//           headers: {
//             Authorization: `Bearer ${token}` // Pass the token in the header
//           }
//         });
//       }

//       console.log('Response:', response.data); // Log the API response
//       setMessage('Post saved successfully!'); // Set success message
//       setContent(''); // Clear content after posting
//       onPostCreated(response.data); // Call the parent function to add the new or updated post to the feed
//     } catch (error) {
//       console.error('Error saving post:', error.response || error); // Log full error response
//       if (error.response) {
//         setMessage(`Error: ${error.response.data.message || 'Failed to save post.'}`); // Display error message from server
//       } else {
//         setMessage('Failed to save post. Please try again.'); // Generic error message
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>{existingPost ? 'Edit Post' : 'Create a Post'}</h2>
//       <form onSubmit={handleSubmit}>
//         <textarea
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           placeholder="What's on your mind?"
//           required
//         />
//         <button type="submit">{existingPost ? 'Update' : 'Post'}</button>
//       </form>
//       {message && <p>{message}</p>} {/* Display message if present */}
//     </div>
//   );
// };

// export default CreatePost;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Feed.css'

const CreatePost = ({ onPostCreated, existingPost }) => {
  const [content, setContent] = useState(existingPost ? existingPost.content : ''); 
  const [message, setMessage] = useState(''); 

  useEffect(() => {
    if (existingPost) {
      setContent(existingPost.content);
    }
  }, [existingPost]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const token = localStorage.getItem('token'); 
      const userId = localStorage.getItem('userId'); 

      if (!token || !userId) {
        setMessage('You need to log in to create a post.');
        return; 
      }

      let response;
      if (existingPost) {
        response = await axios.put(`http://localhost:5000/api/posts/${existingPost._id}`, 
        { content }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        response = await axios.post('http://localhost:5000/api/posts', 
        {
          content,
          user: userId 
        }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      setMessage('Post saved successfully!'); 
      setContent(''); 
      
      if (onPostCreated && typeof onPostCreated === 'function') {
        onPostCreated(response.data);  // Ensure onPostCreated is a function before calling it
      }

    } catch (error) {
      console.error('Error saving post:', error.response || error); 
      setMessage('Failed to save post. Please try again.');
    }
  };

  return (
    <div>
      <h2>{existingPost ? 'Edit Post' : 'Create a Post'}</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          required
        />
        <button type="submit">{existingPost ? 'Update' : 'Post'}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreatePost;
