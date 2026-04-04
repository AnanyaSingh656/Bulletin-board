/*Theory: main file, holds all posts in state and renders the page
All post data lives here.
Child components just display it or trigger changes.*/

/*Job1: On page load → calls backend GET /posts → stores in state
Job2: Passes posts down to PostCard components
Job3: Passes functions down to PostForm (for creating posts)*/



//CODE:

// React hooks we need
import { useState, useEffect } from 'react';
//useState = store data and update UI when it changes
/*Flow: Data comes (from API)
→ setPosts(data) : updates state
→ React re-renders
→ UI shows updated posts*/

//useEffect = do something when page loads (like fetch data)
/*Flow:Component loads
→ useEffect runs
→ fetch request sent (/posts)
→ backend returns data (JSON)
→ data stored in state
→ UI updates & shows posts*/


// axios = makes HTTP requests to our backend
import axios from 'axios';

import PostForm from './PostForm'; // Components we'll build next
import PostCard from './PostCard';

import './index.css'; // Global styles

function App() {

  // posts = the array of all posts from database
  // setPosts = function to update that array
  const [posts, setPosts] = useState([]); // starts as empty array

  // ─── FETCH ALL POSTS ON PAGE LOAD ─────────
  useEffect(() => {
    axios.get('http://localhost:5000/posts') // axios.get sends a GET request to our backend
      .then(response => {
        setPosts(response.data); // response.data = the array of posts from DB
      })
      .catch(err => console.error(err));
  }, []); // ← empty [] means "run only once when page loads"


  // ─── CALLED WHEN A NEW POST IS CREATED ──────────────
  // PostForm will call this after successfully posting to backend
  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]); // add new post to TOP of the list
  };


  // ─── CALLED WHEN A POST IS LIKED ────────────────────
  // updatedPost comes from backend with the new like count
  const handleLike = (updatedPost) => {
    setPosts(posts.map(p => 
      p.id === updatedPost.id ? updatedPost : p
      // if this post's id matches → replace it, else keep it
    ));
  };


  // ─── CALLED WHEN A POST IS DELETED ──────────────────
  const handleDelete = (deletedId) => {
    setPosts(posts.filter(p => p.id !== deletedId));
    // filter out the deleted post from the array
  };


  // ─── RENDER ─────────────────────────────────────────
  return (
    <div>
      <h1>📌 Community Bulletin Board</h1>
      <p className="subtitle">Share your thoughts with the world!</p>

      {/* Form to create new posts — we pass handlePostCreated as a prop */}
      <PostForm onPostCreated={handlePostCreated} />

      {/* If no posts, show a message */}
      {posts.length === 0 ? (
        <p className="empty-msg">No posts yet. Be the first! 🎉</p>
      ) : (
        // Loop through posts and render a card for each
        posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}

export default App;