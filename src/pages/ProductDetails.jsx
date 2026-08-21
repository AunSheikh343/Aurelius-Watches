import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../data/products";

const money = (n) => `$${n.toFixed(2)}`;

export default function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const [qty, setQty] = useState(1);

  if (!product) return <div className="empty section container"><h1>404</h1><h2>Product not found</h2><Link className="btn dark" to="/shop">Back to Shop</Link></div>;

  return (
    <section className="section container product-detail">
      <div className="detail-image"><img src={product.image} alt={product.name}/></div>

      <div className="detail-copy">
        <span className="eyebrow">{product.category}</span>
        <h1>{product.name}</h1>
        <div className="detail-rating">★★★★★ <span>{product.rating} / 5</span></div>

        <div className="detail-price">
          {money(product.price)} <del>{money(product.oldPrice)}</del>
        </div>

        <p>{product.description}</p>

        <ul className="features">
          <li>✓ Premium stainless-steel case</li>
          <li>✓ Scratch-resistant crystal</li>
          <li>✓ 2-year warranty</li>
          <li>✓ Complimentary premium packaging</li>
        </ul>

        <div className="buy-row">
          <div className="qty">
            <button onClick={() => setQty(Math.max(1, qty-1))}>−</button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty+1)}>+</button>
          </div>

          <button className="btn dark wide" onClick={() => addToCart(product, qty)}>
            Add to Cart
          </button>
        </div>

        <Link className="back-link" to="/shop">← Continue shopping</Link>
      </div>
    </section>
  );
}
