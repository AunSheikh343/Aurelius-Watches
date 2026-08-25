import React, { useState } from "react";

const initialReviews = [
  { name: "Aurelius collector", rating: 5, comment: "Beautiful on the wrist and even better in person." },
  { name: "Verified customer", rating: 5, comment: "The finish feels considered, premium and timeless." },
];

export default function Reviews({ product }) {
  const storageKey = `aurelius-reviews-${product.id}`;
  const [reviews, setReviews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || initialReviews;
    } catch {
      return initialReviews;
    }
  });
  const [form, setForm] = useState({ name: "", rating: "5", comment: "" });

  const updateField = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitReview = event => {
    event.preventDefault();
    const nextReviews = [
      { ...form, name: form.name.trim(), rating: Number(form.rating), comment: form.comment.trim() },
      ...reviews,
    ];
    setReviews(nextReviews);
    localStorage.setItem(storageKey, JSON.stringify(nextReviews));
    setForm({ name: "", rating: "5", comment: "" });
  };

  return (
    <section className="reviews section">
      <div className="container">
        <div className="section-head reviews-heading">
          <div>
            <span className="eyebrow">THE COLLECTOR'S NOTEBOOK</span>
            <h2>What people are saying.</h2>
          </div>
          <span className="review-count">{reviews.length} reviews</span>
        </div>

        <div className="reviews-layout">
          <div className="review-list">
            {reviews.map((review, index) => (
              <article className="review" key={`${review.name}-${index}`}>
                <div className="review-top">
                  <strong>{review.name}</strong>
                  <span className="review-stars" aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(review.rating)}</span>
                </div>
                <p>{review.comment}</p>
              </article>
            ))}
          </div>

          <form className="review-form" onSubmit={submitReview}>
            <span className="eyebrow">SHARE YOUR EXPERIENCE</span>
            <h3>Leave a review</h3>
            <label>Name<input name="name" value={form.name} onChange={updateField} placeholder="Your name" required /></label>
            <label>Rating<select name="rating" value={form.rating} onChange={updateField}><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option><option value="2">2 stars</option><option value="1">1 star</option></select></label>
            <label>Comment<textarea name="comment" value={form.comment} onChange={updateField} placeholder="Tell collectors what you think" rows="4" required /></label>
            <button className="btn dark" type="submit">Post review</button>
          </form>
        </div>
      </div>
    </section>
  );
}