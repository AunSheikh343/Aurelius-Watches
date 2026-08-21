import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Header({ cartCount }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="header">
      <div className="nav-shell">
        <Link className="logo" to="/">AURELIUS<span>®</span></Link>

        <button className="menu-btn" onClick={() => setOpen(!open)}>☰</button>

        <nav className={open ? "nav open" : "nav"}>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/blogs">Blogs</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <div className="nav-actions">
          <button aria-label="Search" onClick={() => alert("Search is ready to connect to your backend.")}>⌕</button>
          <Link aria-label="Cart" className="cart-icon" to="/cart">
            🛒<b>{cartCount}</b>
          </Link>
        </div>
      </div>
    </header>
  );
}
