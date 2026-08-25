import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, readApiResponse } from "../api";

const money = value => `$${value.toFixed(2)}`;

const promoCodes = {
  AURELIUS10: { label: "10% off", discount: subtotal => subtotal * 0.1 },
  FREESHIP: { label: "Free shipping", discount: (subtotal, shipping) => shipping },
};

export default function Checkout({ cart, clearCart }) {
  const navigate = useNavigate();
  const [promo, setPromo] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoMessage, setPromoMessage] = useState("");
  const [error, setError] = useState("");

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);
  const standardShipping = subtotal >= 100 ? 0 : 12;
  const discount = appliedPromo
    ? appliedPromo.discount(subtotal, standardShipping)
    : 0;
  const shipping = appliedPromo?.code === "FREESHIP" ? 0 : standardShipping;
  const total = Math.max(0, subtotal - discount + shipping);

  const applyPromo = event => {
    event.preventDefault();
    const code = promo.trim().toUpperCase();
    const selected = promoCodes[code];

    if (!selected) {
      setAppliedPromo(null);
      setPromoMessage("That promo code is not valid.");
      return;
    }

    setAppliedPromo({ ...selected, code });
    setPromoMessage(`${selected.label} applied.`);
  };

  const submitOrder = async event => {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const cardNumber = String(form.get("cardNumber")).replace(/\s/g, "");

    const expiry = String(form.get("expiry")).trim();
    const cvv = String(form.get("cvv")).trim();

    if (!/^4\d{15}$/.test(cardNumber)) {
      setError("Enter a valid 16-digit Visa card number starting with 4.");
      return;
    }

    if (!/^(0[1-9]|1[0-2])\s*\/\s*\d{2}$/.test(expiry) || !/^\d{3,4}$/.test(cvv)) {
      setError("Check the expiry date and security code.");
      return;
    }

    const token = localStorage.getItem("aurelius-token");
    const user = JSON.parse(localStorage.getItem("aurelius-user") || "null");
    if (!token || !user) {
      setError("Please log in before placing an order so you can track it later.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          user: user.id,
          customerName: `${form.get("firstName")} ${form.get("lastName")}`,
          products: cart.map(item => ({ productId: item.id, name: item.name, quantity: item.qty, price: item.price })),
          totalAmount: total,
          shippingAddress: { address: form.get("address"), city: form.get("city"), postalCode: form.get("postalCode"), country: "Pakistan" },
        }),
      });
      const data = await readApiResponse(response, "Unable to place your order.");

      clearCart();
      navigate(`/track-order?orderId=${encodeURIComponent(data.order.orderId)}`);
      return;
    } catch (requestError) {
      setError(requestError.message || "Unable to place your order.");
      return;
    }

  };

  if (cart.length === 0) {
    return (
      <section className="empty section container checkout-empty">
        <div className="empty-icon">🛒</div>
        <h1>Your checkout is waiting</h1>
        <p>Add a timepiece to your cart before continuing.</p>
        <button className="btn dark" type="button" onClick={() => navigate("/shop")}>Browse the collection</button>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">AURELIUS CHECKOUT</span>
          <h1>Complete your order</h1>
          <p>Your next timepiece, prepared for its journey to you.</p>
        </div>
      </section>

      <section className="section container checkout-layout">
        <form className="checkout-form" onSubmit={submitOrder}>
          <div className="checkout-section">
            <div className="checkout-section-heading"><span>01</span><h2>Delivery address</h2></div>
            <div className="form-grid">
              <label>First name<input name="firstName" required autoComplete="given-name" /></label>
              <label>Last name<input name="lastName" required autoComplete="family-name" /></label>
              <label className="full-field">Address<input name="address" required autoComplete="street-address" /></label>
              <label>City<input name="city" required autoComplete="address-level2" /></label>
              <label>Postal code<input name="postalCode" required autoComplete="postal-code" /></label>
              <label className="full-field">Phone number<input name="phone" type="tel" required autoComplete="tel" /></label>
            </div>
          </div>

          <div className="checkout-section">
            <div className="checkout-section-heading"><span>02</span><h2>Payment details</h2></div>
            <div className="payment-method"><strong>VISA</strong><span>Secure card payment</span></div>
            <div className="form-grid">
              <label className="full-field">Name on card<input name="cardName" required autoComplete="cc-name" /></label>
              <label className="full-field">Card number<input name="cardNumber" inputMode="numeric" maxLength="19" placeholder="0000 0000 0000 0000" required autoComplete="cc-number" /></label>
              <label>Expiry date<input name="expiry" placeholder="MM / YY" required autoComplete="cc-exp" /></label>
              <label>CVV<input name="cvv" type="password" inputMode="numeric" maxLength="4" required autoComplete="cc-csc" /></label>
            </div>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="btn dark wide checkout-submit" type="submit">Place order · {money(total)}</button>
            <p className="checkout-note">Demo checkout only. No payment is processed or stored.</p>
          </div>
        </form>

        <aside className="summary checkout-summary">
          <div className="summary-label">YOUR ORDER</div>
          <h2>Order summary</h2>
          <div className="checkout-items">
            {cart.map(item => <div className="checkout-item" key={item.id}><span>{item.name} <small>× {item.qty}</small></span><strong>{money(item.price * item.qty)}</strong></div>)}
          </div>
          <form className="promo-form" onSubmit={applyPromo}>
            <label htmlFor="promo">Promo code</label>
            <div><input id="promo" value={promo} onChange={event => setPromo(event.target.value)} placeholder="Enter code" /><button type="submit">Apply</button></div>
            {promoMessage && <p className={appliedPromo ? "promo-success" : "form-error"}>{promoMessage}</p>}
          </form>
          <div className="summary-line"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
          {discount > 0 && <div className="summary-line discount-line"><span>Discount</span><strong>-{money(discount)}</strong></div>}
          <div className="summary-line"><span>Shipping</span><strong>{shipping === 0 ? "FREE" : money(shipping)}</strong></div>
          <hr />
          <div className="total summary-line"><span>Total</span><strong>{money(total)}</strong></div>
          <small>30-day returns · Complimentary delivery over $100</small>
        </aside>
      </section>
    </>
  );
}