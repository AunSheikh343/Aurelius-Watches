import React from "react";
import { Link, useLocation } from "react-router-dom";

const money = (n) => `$${n.toFixed(2)}`;

export default function ThankYou() {
  const { state } = useLocation();
  const order = state?.order;

  return (
    <main className="thank-you-page">
      <section className="thank-you-panel">
        <span className="thank-you-mark">✓</span>
        <span className="eyebrow">AURELIUS WATCHES</span>
        <h1>Thank you for your order.</h1>
        <p className="thank-you-lead">
          Your timepiece is being prepared with care. We will send your order confirmation shortly.
        </p>
        {order && (
          <div className="order-details">
            <div><span>Order number</span><strong>{order.number}</strong></div>
            <div><span>Items</span><strong>{order.itemCount}</strong></div>
            <div><span>Total</span><strong>{money(order.total)}</strong></div>
          </div>
        )}
        <Link className="btn dark" to="/shop">Continue shopping</Link>
      </section>
    </main>
  );
}