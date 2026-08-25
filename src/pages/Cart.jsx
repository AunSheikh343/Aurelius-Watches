import React from "react";
import { Link, useNavigate } from "react-router-dom";

const money = (n) => `$${n.toFixed(2)}`;

export default function Cart({ cart, updateQty, removeFromCart, clearCart }) {
  const navigate = useNavigate();
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 12;
  if (cart.length === 0) {
    return (
      <>
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow">YOUR BAG</span>
            <h1>Shopping Cart</h1>
            <p>Your selected timepieces will appear here.</p>
          </div>
        </section>

        <div className="empty section container">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Discover a watch that deserves a place on your wrist.</p>
          <Link className="btn dark" to="/shop">Start Shopping</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">YOUR BAG</span>
          <h1>Shopping Cart</h1>
          <p>Review your selected timepieces before checkout.</p>
        </div>
      </section>

      <section className="section container">
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name}/>

                <div className="cart-item-info">
                  <span className="category">{item.category}</span>
                  <h3>{item.name}</h3>
                  <strong>{money(item.price)}</strong>

                  <div className="qty">
                    <button type="button" aria-label={`Decrease quantity of ${item.name}`} onClick={() => updateQty(item.id, item.qty-1)} disabled={item.qty === 1}>−</button>
                    <span>{item.qty}</span>
                    <button type="button" aria-label={`Increase quantity of ${item.name}`} onClick={() => updateQty(item.id, item.qty+1)}>+</button>
                  </div>
                </div>

                <button className="remove" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
          </div>

          <aside className="summary">
            <h2>Order Summary</h2>
            <div><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
            <div><span>Shipping</span><strong>{shipping === 0 ? "FREE" : money(shipping)}</strong></div>
            <hr/>
            <div className="total"><span>Total</span><strong>{money(subtotal + shipping)}</strong></div>
            <button className="btn dark wide" onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </button>
            <small>Secure checkout • 30-day returns</small>
          </aside>
        </div>
      </section>
    </>
  );
}
