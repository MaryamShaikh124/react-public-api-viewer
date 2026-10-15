
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchPosts() {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );

      setPosts(response.data.slice(0, 12));
    } catch (err) {
      setError("Unable to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>Public API Data Viewer</h1>
        <p>Explore posts fetched from a public API.</p>
        <button onClick={fetchPosts}>Refresh Posts</button>
      </header>

      <main className="container">
        {loading && <p className="message">Loading posts...</p>}

        {error && (
          <div className="error-box">
            <p>{error}</p>
            <button onClick={fetchPosts}>Try Again</button>
          </div>
        )}

        {!loading && !error && (
          <>
            <h2>Latest Posts</h2>
            <p className="count">
              Showing {posts.length} posts
            </p>

            <div className="posts-grid">
              {posts.map((post) => (
                <div className="post-card" key={post.id}>
                  <span className="post-number">
                    Post #{post.id}
                  </span>

                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <footer>
        <p>Assignment 5 | React JS and Axios</p>
      </footer>
    </div>
  );
}

export default App;
