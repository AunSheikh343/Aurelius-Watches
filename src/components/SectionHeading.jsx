import React from "react";
import { Link } from "react-router-dom";

export default function SectionHeading({ eyebrow, title, link }) {
  return (
    <div className="section-head">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {link && <Link className="text-link" to={link}>View all →</Link>}
    </div>
  );
}
