import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";
import { fetchPosts } from "../../services/api";
import "./Feed.css";
import { AuthContext } from "../../context/AuthContext";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  console.log(user);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    loadPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]); // Add new post to the beginning of the list
  };

  const handlePostUpdate = (updatedPost) => {
    setPosts(
      posts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
    ); // Update specific post
  };

  const handlePostDeleted = (deletedPostId) => {
    setPosts(posts.filter((post) => post._id !== deletedPostId)); // Remove deleted post from state
  };

  return (
    <div className="feed-container">
      <h1>Feed</h1>

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            onPostUpdate={handlePostUpdate}
            onPostDeleted={handlePostDeleted}
          />
        ))
      )}
    </div>
  );
};

export default Feed;
