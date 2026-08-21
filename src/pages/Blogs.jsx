import React from "react";
import { blogPosts } from "../data/products";
import BlogCard from "../components/BlogCard";
import PageHero from "../components/PageHero";

export default function Blogs() {
  return (
    <>
      <PageHero
        eyebrow="THE JOURNAL"
        title="Stories & Guides"
        text="Watch care, style inspiration and practical guides from the Aurelius team."
      />
      <section className="section container">
        <div className="blog-grid large">
          {blogPosts.map(p => <BlogCard key={p.id} post={p}/>)}
        </div>
      </section>
    </>
  );
}
