import React from "react";
import { Link } from "react-router-dom";
import { products, blogPosts } from "../data/products";
import ProductCard from "../components/ProductCard";
import BlogCard from "../components/BlogCard";
import SectionHeading from "../components/SectionHeading";
import Newsletter from "../components/Newsletter";

export default function Home({ addToCart }) {
  const featured = products.slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">TIMELESS • PRECISE • DISTINCT</span>
          <h1>TIME IS YOUR<br/><em>STATEMENT.</em></h1>
          <p>Premium watches crafted for people who believe every second should look exceptional.</p>

          <div className="hero-buttons">
            <Link className="btn dark" to="/shop">Shop Collection</Link>
            <Link className="btn outline" to="/about">Our Story</Link>
          </div>

          <div className="stats">
            <div><strong>12+</strong><span>Collections</span></div>
            <div><strong>30K+</strong><span>Happy Clients</span></div>
            <div><strong>4.9/5</strong><span>Customer Rating</span></div>
          </div>
        </div>

        <div className="hero-watch">
          <div className="hero-glow"></div>
          <img src={products[0].image} alt="Premium Aurelius chronograph"/>
        </div>
      </section>

      <section className="brand-strip">
        <span>SWISS INSPIRED</span><span>PREMIUM STEEL</span>
        <span>PRECISION MOVEMENT</span><span>30-DAY RETURNS</span>
      </section>

      <section className="section container">
        <SectionHeading eyebrow="CURATED FOR YOU" title="Featured Timepieces" link="/shop"/>
        <div className="product-grid">
          {featured.map(p => <ProductCard key={p.id} product={p} addToCart={addToCart}/>)}
        </div>
      </section>

      <section className="split-banner">
        <div className="split-image">
          <img src={products[2].image} alt="Luxury gold watch"/>
        </div>
        <div className="split-copy">
          <span className="eyebrow">THE IMPERIAL COLLECTION</span>
          <h2>Designed to<br/><em>command attention.</em></h2>
          <p>Elegant proportions, rich finishes and details made to be noticed without saying a word.</p>
          <Link className="btn dark" to="/shop">Explore Luxury</Link>
        </div>
      </section>

      <section className="section container">
        <SectionHeading eyebrow="THE JOURNAL" title="From Our Blog" link="/blogs"/>
        <div className="blog-grid">
          {blogPosts.map(post => <BlogCard key={post.id} post={post}/>)}
        </div>
      </section>

      <Newsletter/>
    </>
  );
}
