import React from "react";
import { Link } from "react-router-dom";

const money = (n) => `$${n.toFixed(2)}`;

export default function ProductCard({ product, addToCart }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image">
        <img src={product.image} alt={product.name} />
        <span>{product.badge}</span>
      </Link>

      <div className="product-info">
        <div>
          <span className="category">{product.category}</span>
          <h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
        </div>
        <div className="rating">★ {product.rating}</div>
      </div>

      <div className="product-bottom">
        <div>
          <strong>{money(product.price)}</strong>
          <del>{money(product.oldPrice)}</del>
        </div>
        <button onClick={() => addToCart(product)}>Add to cart</button>
      </div>
    </article>
  );
}
