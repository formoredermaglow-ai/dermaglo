'use client';
import { useEffect, useRef } from 'react';
import styles from './Services.module.css';

const SERVICES = [
  { icon: '🔬', title: 'Advanced Skin Analysis', desc: 'In-depth digital skin assessment using state-of-the-art dermoscopy and imaging to accurately diagnose your skin type, concerns, and the ideal treatment path.' },
  { icon: '✨', title: 'Glow Facials & Chemical Peels', desc: 'Customised facial treatments and medicated peels that exfoliate, brighten, and revitalise — leaving your skin with a luminous, healthy glow.' },
  { icon: '🌿', title: 'Acne & Scar Treatment', desc: 'Targeted therapies including laser, microneedling, and medical-grade skincare to clear active acne and visibly reduce scars and pigmentation.' },
  { icon: '⏳', title: 'Anti-Ageing Therapy', desc: 'Non-invasive and minimally invasive anti-ageing solutions — including PRP, fillers, and Botox — to restore youthful, firm, and radiant skin.' },
  { icon: '☀️', title: 'Pigmentation & Tan Removal', desc: 'Advanced laser and light-based treatments to remove stubborn pigmentation, sun tan, dark spots, and uneven skin tone for a clear complexion.' },
  { icon: '💧', title: 'Hydration & Skin Boosters', desc: "Medical-grade hydration therapies and skin booster injections that deeply nourish, plump, and restore your skin's natural moisture barrier from within." },
  { icon: '🌸', title: 'Hair & Scalp Care', desc: 'Comprehensive hair loss diagnosis and treatment — including PRP hair therapy, scalp analysis, and personalised care plans for healthy hair growth.' },
  { icon: '🛡️', title: 'Preventive Dermatology', desc: "Regular skin health check-ups, mole mapping, and early detection screenings to protect your skin's long-term health and catch concerns early." },
];

export default function Services() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className="section-tag">Our Treatments</div>
          <h2 className="section-heading">Comprehensive Skin Health Care</h2>
          <p className="section-sub" style={{ margin: '12px auto 0' }}>
            From advanced diagnostics to transformative treatments, we offer a full spectrum of dermatology services tailored just for you.
          </p>
        </div>
        <div className={styles.grid}>
          {SERVICES.map(({ icon, title, desc }, i) => (
            <div
              key={title}
              className={styles.card}
              ref={(el) => (cardRefs.current[i] = el)}
              style={{ opacity: 0, transform: 'translateY(24px)', transition: `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s` }}
            >
              <div className={styles.icon}>{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
