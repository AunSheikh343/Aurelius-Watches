import React, { useState } from "react";
import PageHero from "../components/PageHero";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow="GET IN TOUCH"
        title="Contact Us"
        text="Have a question about a watch, your order or our collections? We are here to help."
      />

      <section className="section container contact-layout">
        <div className="contact-info">
          <span className="eyebrow">WE'D LOVE TO HEAR FROM YOU</span>
          <h2>Let's talk.</h2>
          <p>Our support team is available Monday–Saturday, 10:00 AM–7:00 PM.</p>

          <div className="contact-line"><b>Email</b><span>hello@aureliuswatches.com</span></div>
          <div className="contact-line"><b>Phone</b><span>+92 300 1234567</span></div>
          <div className="contact-line"><b>Showroom</b><span>Clifton, Karachi, Pakistan</span></div>
        </div>

        <form className="contact-form" onSubmit={submit}>
          <div className="form-row">
            <label>Name<input required placeholder="Your name"/></label>
            <label>Email<input type="email" required placeholder="you@example.com"/></label>
          </div>
          <label>Subject<input required placeholder="How can we help?"/></label>
          <label>Message<textarea required rows="7" placeholder="Write your message..."></textarea></label>
          <button className="btn dark" type="submit">{sent ? "Message Sent ✓" : "Send Message"}</button>
        </form>
      </section>
    </>
  );
}
