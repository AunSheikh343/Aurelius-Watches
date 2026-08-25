import React, { useEffect, useMemo, useRef, useState } from "react";
import { fetchProducts } from "../api";
import ProductCard from "../components/ProductCard";
import PageHero from "../components/PageHero";

export default function Shop({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState("");
  const searchInput = useRef(null);

  useEffect(() => {
    if (window.location.hash === "#search") searchInput.current?.focus();
  }, []);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(error => setProductsError(error.message || "Unable to load products."))
      .finally(() => setProductsLoading(false));
  }, []);

  const categories = ["All", ...new Set(products.map(p => p.category))];

  const shown = useMemo(() => {
    let arr = products.filter(p =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === "low") arr.sort((a,b) => a.price-b.price);
    if (sort === "high") arr.sort((a,b) => b.price-a.price);
    if (sort === "rating") arr.sort((a,b) => b.rating-a.rating);

    return arr;
  }, [products, category, sort, search]);

  return (
    <>
      <PageHero
        eyebrow="THE COLLECTION"
        title="Shop Watches"
        text="Explore our complete collection of modern classics and statement timepieces."
      />

      <section className="section container">
        <div className="shop-toolbar">
          <div className="filters">
            {categories.map(c => (
              <button
                key={c}
                className={category === c ? "active" : ""}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="toolbar-right">
            <input
              id="search"
              ref={searchInput}
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search watches..."
            />
            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {productsLoading && <p className="results">Loading our collection...</p>}
        {productsError && <p className="results">We could not load the collection. {productsError}</p>}
        {!productsLoading && !productsError && <>
          <p className="results">{shown.length} products</p>
          <div className="product-grid">
            {shown.map(p => <ProductCard key={p.id} product={p} addToCart={addToCart}/>)}
          </div>
        </>}
      </section>
    </>
  );
}
