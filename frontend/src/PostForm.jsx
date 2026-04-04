/*One concept before code: why async/await?
When React calls the backend, it takes a little time to get a response. 
async/await just means "wait here until the backend replies, then continue."*/

import { useState } from 'react';
import axios from 'axios';

function PostForm({ onPostCreated }) {  // onPostCreated is the function we received from App.jsx

  // these store whatever the user types in the form
  const [title,   setTitle]   = useState('');
  const [content, setContent] = useState('');

  // ─── RUNS WHEN USER CLICKS "POST IT" BUTTON ─────────
  const handleSubmit = async () => {

    // dont send if fields are empty
    if (!title || !content) return;

    // send POST request to our backend with title and content
    // async/await = wait here until backend responds
    const response = await axios.post('http://localhost:5000/posts', {
      title,    // same as title: title
      content,  // same as content: content
    });

    // backend replied with the newly created post
    // now tell App.jsx about it so it appears on screen
    onPostCreated(response.data);

    // clear the form after submitting
    setTitle('');
    setContent('');
  };

  // ─── RENDER ──────────────────────────────────────────
  return (
    <div className="form-container">
      <h2>Start a New Post</h2>

      {/* title input — updates title state on every keystroke */}
      <input
        type="text"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* content input — updates content state on every keystroke */}
      <textarea
        placeholder="Hello there! What's on your mind today?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* clicking this triggers handleSubmit */}
      <button onClick={handleSubmit}>
        Post it!
      </button>
    </div>
  );
}

export default PostForm;