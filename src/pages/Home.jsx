import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/products";
import { fetchProducts } from "../api";
import ProductCard from "../components/ProductCard";
import BlogCard from "../components/BlogCard";
import SectionHeading from "../components/SectionHeading";
import Newsletter from "../components/Newsletter";

export default function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState("");
  const featured = products.slice(0, 6);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showWatchReveal, setShowWatchReveal] = useState(false);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(error => setProductsError(error.message || "Unable to load products."))
      .finally(() => setProductsLoading(false));
  }, []);

  const moveSlide = direction => {
    setActiveSlide(current => (current + direction + featured.length) % featured.length);
  };

  useEffect(() => {
    if (!featured.length) return undefined;
    const timer = window.setInterval(() => moveSlide(1), 5000);
    return () => window.clearInterval(timer);
  }, [featured.length]);

  useEffect(() => {
    const reveal = document.querySelector(".watch-reveal");
    if (!reveal) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShowWatchReveal(true);
        observer.disconnect();
      }
    }, { threshold: 0.25 });

    observer.observe(reveal);
    return () => observer.disconnect();
  }, []);

  const visibleFeatured = featured.length
    ? [0, 1, 2].map(offset => featured[(activeSlide + offset) % featured.length])
    : [];
  const heroImage = products[0]?.image || "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=85";
  const splitImage = products[2]?.image || "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&w=900&q=85";

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
          <img src={heroImage} alt="Premium Aurelius chronograph"/>
        </div>
      </section>

      <section className="brand-strip">
        <span>SWISS INSPIRED</span><span>PREMIUM STEEL</span>
        <span>PRECISION MOVEMENT</span><span>30-DAY RETURNS</span>
      </section>

      <section className={showWatchReveal ? "watch-reveal is-visible" : "watch-reveal"}>
        <div className="watch-reveal-copy">
          <span className="eyebrow">THE AURELIUS EDIT</span>
          <h2>Three ways to<br/><em>mark the moment.</em></h2>
          <p>Distinct silhouettes, considered materials and a presence that lasts beyond the hour.</p>
        </div>
        <div className="watch-reveal-grid">
          {[products[1], products[4], products[7]].filter(Boolean).map((product, index) => (
            <Link className="watch-reveal-card" to={`/product/${product.id}`} key={product.id} style={{ "--reveal-delay": `${index * 140}ms` }}>
              <span>{product.category}</span>
              <img src={product.image} alt={product.name} />
              <strong>{product.name}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="slider-heading">
          <SectionHeading eyebrow="CURATED FOR YOU" title="Featured Timepieces" link="/shop"/>
          <div className="slider-controls" aria-label="Featured watches controls">
            <button type="button" aria-label="Previous featured watch" onClick={() => moveSlide(-1)}>←</button>
            <button type="button" aria-label="Next featured watch" onClick={() => moveSlide(1)}>→</button>
          </div>
        </div>
        <div className="featured-slider">
          {productsLoading && <p className="results">Loading our collection...</p>}
          {productsError && <p className="results">We could not load the collection. {productsError}</p>}
          {!productsLoading && !productsError && <>
            <div className="product-grid slider-grid" key={activeSlide}>
              {visibleFeatured.map(product => <ProductCard key={product.id} product={product} addToCart={addToCart}/>)}
            </div>
            <div className="slider-dots" aria-label="Choose featured watch">
              {featured.map((product, index) => (
                <button key={product.id} type="button" className={index === activeSlide ? "active" : ""} aria-label={`Show ${product.name}`} aria-pressed={index === activeSlide} onClick={() => setActiveSlide(index)} />
              ))}
            </div>
          </>}
        </div>
      </section>

      <section className="split-banner">
        <div className="split-image">
          <img src={splitImage} alt="Luxury gold watch"/>
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
