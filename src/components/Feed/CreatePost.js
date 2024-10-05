


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Feed.css'

// const CreatePost = ({ onPostCreated, existingPost }) => {
//   const [content, setContent] = useState(existingPost ? existingPost.content : ''); 
//   const [message, setMessage] = useState(''); 

//   useEffect(() => {
//     if (existingPost) {
//       setContent(existingPost.content);
//     }
//   }, [existingPost]);

//   const handleSubmit = async (e) => {
//     e.preventDefault(); 
//     try {
//       const token = localStorage.getItem('token'); 
//       const userId = localStorage.getItem('userId'); 

//       if (!token || !userId) {
//         setMessage('You need to log in to create a post.');
//         return; 
//       }

//       let response;
//       if (existingPost) {
//         response = await axios.put(`http://localhost:5000/api/posts/${existingPost._id}`, 
//         { content }, 
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//       } else {
//         response = await axios.post('http://localhost:5000/api/posts', 
//         {
//           content,
//           user: userId 
//         }, 
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//       }

//       setMessage('Post saved successfully!'); 
//       setContent(''); 
      
//       if (onPostCreated && typeof onPostCreated === 'function') {
//         onPostCreated(response.data);  // Ensure onPostCreated is a function before calling it
//       }

//     } catch (error) {
//       console.error('Error saving post:', error.response || error); 
//       setMessage('Failed to save post. Please try again.');
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
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default CreatePost;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreatePost.css'

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
        onPostCreated(response.data); 
      }

    } catch (error) {
      console.error('Error saving post:', error.response || error); 
      setMessage('Failed to save post. Please try again.');
    }
  };

  return (
    <div className="container">

      <div className="main-content">
        <div className="form-container">
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
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
