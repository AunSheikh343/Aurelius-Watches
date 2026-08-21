import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({ post }) {
  return (
    <article className="blog-card">
      <Link to={`/blog/${post.id}`}>
        <img src={post.image} alt={post.title} />
      </Link>
      <div>
        <span className="category">{post.category} • {post.date}</span>
        <h3><Link to={`/blog/${post.id}`}>{post.title}</Link></h3>
        <p>{post.excerpt}</p>
        <Link className="text-link" to={`/blog/${post.id}`}>Read article →</Link>
      </div>
    </article>
  );
}
