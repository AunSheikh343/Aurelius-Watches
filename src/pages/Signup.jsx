import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../api";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submit = async event => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to create your account.");
      }

      navigate("/login", { state: { message: "Account created successfully. Please log in." } });
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
        <h1>Begin your collection.</h1>
        <p className="auth-intro">Create an account to enter the Aurelius store.</p>
        <form className="auth-form" onSubmit={submit}>
          <label>Name<input name="name" value={form.name} onChange={updateField} required /></label>
          <label>Email<input name="email" type="email" value={form.email} onChange={updateField} required /></label>
          <label>Phone number<input name="phone" value={form.phone} onChange={updateField} required /></label>
          <label>Password<input name="password" type="password" minLength="6" value={form.password} onChange={updateField} required /></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="btn auth-submit" type="submit" disabled={loading}>{loading ? "Creating account..." : "Create account"}</button>
        </form>
        <p className="auth-switch">Already registered? <Link to="/login">Log in</Link></p>
      </section>
    </main>
  );
}
