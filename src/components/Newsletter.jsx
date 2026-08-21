import React, { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const submit = (e) => {
    e.preventDefault();
    alert(`Subscribed: ${email}`);
    setEmail("");
  };

  return (
    <section className="newsletter">
      <div>
        <span className="eyebrow">AURELIUS JOURNAL</span>
        <h2>Get the latest from our world.</h2>
        <p>New collections, private offers and watch stories — delivered occasionally.</p>
      </div>

      <form onSubmit={submit}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
        />
        <button className="btn dark">Subscribe</button>
      </form>
    </section>
  );
}
