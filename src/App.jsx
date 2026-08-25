import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Announcement from "./components/Announcement";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ThankYou from "./pages/ThankYou";
import Checkout from "./pages/Checkout";

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("aurelius-cart")) || [];
    } catch {
      return [];
    }
  });
  const [cartNotice, setCartNotice] = useState("");

  useEffect(() => {
    localStorage.setItem("aurelius-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const found = prev.find(item => item.id === product.id);

      if (found) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }

      return [...prev, { ...product, qty }];
    });
    setCartNotice(`${product.name} added to your cart.`);
  };

  useEffect(() => {
    if (!cartNotice) return undefined;
    const timer = window.setTimeout(() => setCartNotice(""), 2600);
    return () => window.clearTimeout(timer);
  }, [cartNotice]);

  const updateQty = (id, qty) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, qty: Math.max(1, qty) }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <div className={cartNotice ? "cart-notice is-visible" : "cart-notice"} role="status" aria-live="polite">{cartNotice}</div>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/checkout" element={<><Announcement /><Header cartCount={cartCount} /><main><Checkout cart={cart} clearCart={clearCart} /></main><Footer /></>} />
        <Route path="/home" element={<><Announcement /><Header cartCount={cartCount} /><main><Home addToCart={addToCart} /></main><Footer /></>} />
        <Route path="/shop" element={<><Announcement /><Header cartCount={cartCount} /><main><Shop addToCart={addToCart} /></main><Footer /></>} />
        <Route path="/products" element={<><Announcement /><Header cartCount={cartCount} /><main><Products addToCart={addToCart} /></main><Footer /></>} />
        <Route path="/product/:id" element={<><Announcement /><Header cartCount={cartCount} /><main><ProductDetails addToCart={addToCart} /></main><Footer /></>} />
        <Route path="/cart" element={<><Announcement /><Header cartCount={cartCount} /><main><Cart cart={cart} updateQty={updateQty} removeFromCart={removeFromCart} clearCart={clearCart} /></main><Footer /></>} />
        <Route path="/about" element={<><Announcement /><Header cartCount={cartCount} /><main><About /></main><Footer /></>} />
        <Route path="/contact" element={<><Announcement /><Header cartCount={cartCount} /><main><Contact /></main><Footer /></>} />
        <Route path="/blogs" element={<><Announcement /><Header cartCount={cartCount} /><main><Blogs /></main><Footer /></>} />
        <Route path="/blog/:id" element={<><Announcement /><Header cartCount={cartCount} /><main><BlogDetails /></main><Footer /></>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
