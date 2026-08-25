import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

export default function Header({ cartCount }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(() => Boolean(localStorage.getItem("aurelius-token")));

  useEffect(() => {
    setOpen(false);
    setSignedIn(Boolean(localStorage.getItem("aurelius-token")));
  }, [location.pathname]);

  const signOut = () => {
    localStorage.removeItem("aurelius-token");
    localStorage.removeItem("aurelius-user");
    setSignedIn(false);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="nav-shell">
        <Link className="logo" to="/">AURELIUS<span>®</span></Link>

        <button className="menu-btn" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>☰</button>

        <nav className={open ? "nav open" : "nav"}>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/blogs">Blogs</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <div className="nav-actions">
          <Link aria-label="Search watches" className="search-icon" title="Search watches" to="/shop#search">⌕</Link>
          {signedIn ? <button aria-label="Sign out" className="account-icon" title="Sign out" type="button" onClick={signOut}>♙</button> : <Link aria-label="Log in" className="account-icon" title="Log in" to="/login">♙</Link>}
          <Link aria-label="Cart" className="cart-icon" to="/cart">
            🛒<b>{cartCount}</b>
          </Link>
        </div>
      </div>
    </header>
  );
}
