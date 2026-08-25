import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { API_URL } from "../api";
import "./TrackOrder.css";

const statuses = ["Order Placed", "Order Confirmed", "Processing", "Shipped", "Out for Delivery", "Delivered"];
const money = value => `$${Number(value || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const date = value => value ? new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "To be confirmed";

export default function TrackOrder() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get("orderId") || "");
  const [order, setOrder] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const track = async requestedId => {
    const cleanId = requestedId.trim().toUpperCase();
    if (!cleanId) {
      setOrder(null);
      setMessage("Enter your Order ID to continue.");
      return;
    }

    const token = localStorage.getItem("aurelius-token");
    if (!token) {
      setOrder(null);
      setMessage("Please log in to view your order tracking details.");
      return;
    }

    setLoading(true);
    setMessage("");
    setOrder(null);
    setSearchParams({ orderId: cleanId });

    try {
      const response = await fetch(`${API_URL}/api/orders/track/${encodeURIComponent(cleanId)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(response.status === 404 ? "Order not found. Please check your Order ID and try again." : data.message);
      setOrder(data.order);
    } catch (error) {
      setMessage(error.message || "We could not reach order tracking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialId = searchParams.get("orderId");
    if (initialId) track(initialId);
  }, []);

  const submit = event => {
    event.preventDefault();
    track(orderId);
  };

  const currentIndex = order ? statuses.indexOf(order.status) : -1;
  const isCancelled = order?.status === "Cancelled";

  return (
    <main className="track-page">
      <section className="track-hero">
        <span className="eyebrow">AURELIUS AFTERCARE</span>
        <h1>Track Your Order</h1>
        <p>Enter your order ID to see the latest status of your purchase.</p>
        <form className="track-form" onSubmit={submit}>
          <label htmlFor="order-id">Order ID</label>
          <div className="track-input-row">
            <input id="order-id" value={orderId} onChange={event => setOrderId(event.target.value)} placeholder="Enter Order ID" autoComplete="off" />
            <button className="btn dark" type="submit" disabled={loading}>{loading ? "Finding order..." : "Track Order"}</button>
          </div>
        </form>
        {message && <p className="track-message" role="alert">{message}</p>}
      </section>

      {order && <section className="track-result container">
        <div className="track-result-header"><div><span className="eyebrow">ORDER {order.orderId}</span><h2>Your order is {order.status.toLowerCase()}.</h2></div><Link className="back-link" to="/shop">← Back to Shop</Link></div>
        <div className="tracking-card">
          <div className={isCancelled ? "cancelled-status" : "progress-track"}>
            {isCancelled ? <div className="cancelled-message"><strong>Order Cancelled</strong><span>Please contact our care team if you need assistance.</span></div> : statuses.map((status, index) => <div className={index < currentIndex ? "progress-step complete" : index === currentIndex ? "progress-step current" : "progress-step"} key={status}><span className="progress-dot">{index < currentIndex ? "✓" : index + 1}</span><strong>{status}</strong></div>)}
          </div>
        </div>
        <div className="track-details-grid">
          <div className="tracking-details">
            <div className="detail-heading"><span className="eyebrow">ORDER DETAILS</span><h3>Purchase overview</h3></div>
            <div className="detail-list"><div><span>Order ID</span><strong>{order.orderId}</strong></div><div><span>Customer</span><strong>{order.customerName}</strong></div><div><span>Order date</span><strong>{date(order.orderDate)}</strong></div><div><span>Total amount</span><strong>{money(order.totalAmount)}</strong></div><div><span>Payment</span><strong>{order.paymentStatus}</strong></div><div><span>Estimated delivery</span><strong>{date(order.estimatedDelivery)}</strong></div></div>
            {order.trackingNumber && <div className="tracking-number"><span>Tracking number</span><strong>{order.trackingNumber}</strong></div>}
          </div>
          <div className="address-card"><span className="eyebrow">DELIVERY TO</span><h3>Shipping address</h3><address>{order.shippingAddress.address}<br />{order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />{order.shippingAddress.country}</address></div>
        </div>
      </section>}
    </main>
  );
}
