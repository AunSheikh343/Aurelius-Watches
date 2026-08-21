import React from "react";
import { Link, useParams } from "react-router-dom";
import { blogPosts } from "../data/products";

export default function BlogDetails() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === Number(id));

  if (!post) return <div className="empty section container"><h1>404</h1><h2>Article not found</h2><Link className="btn dark" to="/blogs">Back to Journal</Link></div>;

  return (
    <article className="article container">
      <span className="eyebrow">{post.category} • {post.date}</span>
      <h1>{post.title}</h1>
      <img src={post.image} alt={post.title}/>

      <div className="article-body">
        <p>{post.excerpt}</p>
        <h2>Start with the details</h2>
        <p>A great watch should feel natural on the wrist. Consider your usual wardrobe, the occasions you attend and the case size that feels comfortable. A simple dial can be surprisingly versatile, while a more detailed chronograph can become the focal point of an outfit.</p>
        <h2>Choose for the life you actually live</h2>
        <p>Think about how you will use the watch. If you travel or spend time outdoors, prioritize durability. If your watch is mainly for formal occasions, proportions and finishing may matter more than additional features.</p>
        <h2>Make it yours</h2>
        <p>The best timepiece is ultimately the one you enjoy wearing. Choose a design that feels like you, take care of it and let it become part of your story.</p>
        <Link className="back-link" to="/blogs">← Back to journal</Link>
      </div>
    </article>
  );
}
