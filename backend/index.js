// ─── IMPORTS ─────
const express = require('express');   // web server
const cors    = require('cors');      // allows React to call this server
const pool    = require('./db');      // our database connection

const app = express();    // create the app
app.use(cors());          // enable cross-origin requests
app.use(express.json());  // allow reading JSON from request body

// ─── ROUTES ──────

//1. GET all posts — called when React loads the page
app.get('/posts', async (req, res) => {
  try {
    // Query DB: get all posts, newest first
    const result = await pool.query(
      'SELECT * FROM posts ORDER BY created_at DESC'
    );
    res.json(result.rows); // send the array of posts to React
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//2. POST — create a new post
app.post('/posts', async (req, res) => {
  try {
    const { title, content } = req.body; // get data sent from React form

    const result = await pool.query(
      'INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *', // $1 and $2 are placeholders, safer than putting values directly
      [title, content]
    );
    res.json(result.rows[0]); // send the newly created post back
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//3. PATCH — add 1 like to a post
app.patch('/posts/:id/like', async (req, res) => {
  try {
    const { id } = req.params; // get the post id from the URL

    const result = await pool.query(
      'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *',
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//4. DELETE — remove a post
app.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── START SERVER ──────-
app.listen(5000, () => {
  console.log('✅ Backend server running on http://localhost:5000');
});