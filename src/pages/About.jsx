import React from "react";
import { products } from "../data/products";
import PageHero from "../components/PageHero";

function Value({ n, t, d }) {
  return <div><span>{n}</span><h3>{t}</h3><p>{d}</p></div>;
}

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="OUR STORY"
        title="Built Around Time"
        text="Aurelius was created for people who see a watch as more than an accessory."
      />

      <section className="section container story">
        <div>
          <span className="eyebrow">EST. 2018</span>
          <h2>Precision with personality.</h2>
          <p>We believe the best watch balances engineering, design and emotion. Every Aurelius piece is designed around that simple idea.</p>
          <p>Our collections combine timeless silhouettes with contemporary details, giving you a watch that feels personal today and remains relevant for years.</p>
        </div>
        <img src={products[5].image} alt="Aurelius watch detail"/>
      </section>

      <section className="values">
        <div className="container value-grid">
          <Value n="01" t="Craftsmanship" d="Thoughtful materials, balanced proportions and carefully finished details."/>
          <Value n="02" t="Confidence" d="Designs made to complement your personality rather than overpower it."/>
          <Value n="03" t="Service" d="Fast support, secure packaging and a straightforward 30-day return policy."/>
        </div>
      </section>
    </>
  );
}
