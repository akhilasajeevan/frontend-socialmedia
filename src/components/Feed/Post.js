


import React, { useState } from 'react';
import axios from 'axios';
import './Post.css';

const Post = ({ post, onPostDeleted }) => {
  const [message, setMessage] = useState('');
  const [likes, setLikes] = useState(post.likes || []); // Ensure likes is an array
  const userId = localStorage.getItem('userId'); // Get current user ID

  // Check if the current user has liked the post
  const hasLiked = likes.includes(userId);


  console.log(hasLiked);
  

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');

      // Determine whether to like or unlike the post based on the current state
      const response = await axios.put(
        `http://localhost:5000/api/posts/${post._id}/like`, // Use 'like' or 'unlike' endpoint
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLikes(response.data.likes || []); // Update likes state with the new list of likes
      setMessage(hasLiked ? 'Post unliked successfully!' : 'Post liked successfully!');
    } catch (error) {
      console.error('Error liking/unliking post:', error);
      setMessage('Failed to update post. Please try again.');
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Post deleted successfully!');
      onPostDeleted(post._id); // Remove post from feed
    } catch (error) {
      console.error('Error deleting post:', error);
      setMessage('Failed to delete post. Please try again.');
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <img src={post.user.profilePicture} alt={post.user.name} className="profile-pic" />
        <div>
          <h4>{post.user.name}</h4>
          <p>{new Date(post.createdAt).toLocaleString()}</p>
        </div>
      </div>
      <p>{post.content}</p>
      <div>
        <button onClick={handleLike}>
          {hasLiked ? 'Unlike' : 'Like'} ({likes.length})
        </button>
        {post.user._id === userId && (
          <button onClick={handleDelete}>Delete</button>
        )}
      </div>
      {message && <p>{message} {likes.length===0?"liked":""}</p>}
    </div>
  );
};

export default Post;


