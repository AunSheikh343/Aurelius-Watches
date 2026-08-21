import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Link className="logo light" to="/">AURELIUS<span>®</span></Link>
          <p>Modern timepieces for a life well lived.</p>
        </div>

        <div>
          <h4>Shop</h4>
          <Link to="/shop">All Watches</Link>
          <Link to="/shop">Automatic</Link>
          <Link to="/shop">Luxury</Link>
          <Link to="/shop">Chronograph</Link>
        </div>

        <div>
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/blogs">Journal</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div>
          <h4>Support</h4>
          <Link to="/cart">Cart</Link>
          <span>Shipping & Returns</span>
          <span>Warranty</span>
          <span>Privacy Policy</span>
        </div>
      </div>

      <div className="footer-bottom container">
        <span>© 2026 Aurelius Watches. All rights reserved.</span>
        <span>Designed with precision.</span>
      </div>
    </footer>
  );
}
