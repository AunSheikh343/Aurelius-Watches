import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async event => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password.");
      }

      localStorage.setItem("aurelius-token", data.token);
      localStorage.setItem("aurelius-user", JSON.stringify(data.user));
      navigate("/home");
    } catch (requestError) {
      setError(requestError.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <p className="eyebrow">AURELIUS WATCHES</p>
        <h1>Welcome back.</h1>
        {location.state?.message && <p className="form-success">{location.state.message}</p>}
        <form className="auth-form" onSubmit={submit}>
          <label>Email<input type="email" value={email} onChange={event => setEmail(event.target.value)} required /></label>
          <label>Password<input type="password" value={password} onChange={event => setPassword(event.target.value)} required /></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="btn auth-submit" type="submit" disabled={loading}>{loading ? "Signing in..." : "Log in"}</button>
        </form>
        <p className="auth-switch">New to Aurelius? <Link to="/signup">Create an account</Link></p>
      </section>
    </main>
  );
}
