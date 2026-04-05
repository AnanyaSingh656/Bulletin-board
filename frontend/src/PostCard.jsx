/*One concept before code — props here are read-only.
PostCard doesn't own any data. It just receives a post object and displays it. 
When like/delete happens, it calls the backend, then reports back to App.jsx via the functions passed as props.*/

import axios from 'axios';

// each card gets a different border color based on post id
const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#ff9f43'];

// picks a color from the array using post id
const getColor = (id) => colors[id % colors.length];
// example: id=7, colors has 6 items → 7%6 = 1 → colors[1] = '#feca57'

// ─────────────────────────────────────────────────────
// post       = the post object (title, content, likes etc)
// onLike     = function from App.jsx to update liked post
// onDelete   = function from App.jsx to remove deleted post
// ─────────────────────────────────────────────────────
function PostCard({ post, onLike, onDelete }) {

  // ─── LIKE BUTTON CLICKED ───────────────────────────
  const handleLike = async () => {

    // PATCH request → backend adds 1 like to this post in DB
    // :id in the URL tells backend WHICH post to like

    // const response = await axios.patch(               IGNORE since it was for local PC
    //   `http://localhost:5000/posts/${post.id}/like`
    // );

    axios.patch(`https://bulletinboard-backend-2m1u.onrender.com/posts/${post.id}/like`)

    // backend sends back the updated post with new like count
    // tell App.jsx to update this post in the posts array
    onLike(response.data);
  };

  // ─── DELETE BUTTON CLICKED ─────────────────────────
  const handleDelete = async () => {

    // DELETE request → backend removes this post from DB
    //await axios.delete(`http://localhost:5000/posts/${post.id}`);  IGNORE since it was for local PC
    axios.delete(`https://bulletinboard-backend-2m1u.onrender.com/posts/${post.id}`)

    // no response data needed — just tell App.jsx which id was deleted
    onDelete(post.id);
  };

  // format the timestamp into a readable date
  // example: "4/4/2026, 10:30:00 AM"
  const date = new Date(post.created_at).toLocaleString();

  // ─── RENDER ────────────────────────────────────────
  return (
    <div
      className="post-card"
      style={{ borderLeft: `6px solid ${getColor(post.id)}` }}
      // each card gets a unique color on the left border
    >

      {/* post title */}
      <h3>{post.title}</h3>

      {/* post content */}
      <p className="post-content">{post.content}</p>

      {/* when it was posted */}
      <p className="post-date">🕐 {date}</p>

      {/* action buttons */}
      <div className="post-actions">

        {/* shows current like count, clicking adds 1 */}
        <button className="like-btn" onClick={handleLike}>
            ❤️{post.likes} Likes
        </button>

        <button className="delete-btn" onClick={handleDelete}>
            Delete
        </button>

      </div>
    </div>
  );
}

export default PostCard;