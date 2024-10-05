
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
      const userId = localStorage.getItem('user'); 

      console.log(token,);
      

      if (!token || !userId) {
        setMessage('You need to log in to create a post.');
        return; 
      }

      
      const  response = await axios.post('http://localhost:5000/api/posts', 
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

    catch (error) {
      console.error('Error saving post:', error.response || error); 
      setMessage('Failed to save post. Please try again.');
    }
  };

  return (
    <div className="container">

      <div className="main-content">
        <div className="form-container">
          <h1>Create post</h1>
          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              required
            />
            <button type="submit">Post</button>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
