'use client';
import { useEffect, useRef } from 'react';
import styles from './Reviews.module.css';

const REVIEWS = [
  { initial: 'P', name: 'Priya S.',    text: "My acne scars that I had for years are almost invisible now! Dr. Lasya's treatment plan was so thoughtful and personalised. The results are truly beyond what I expected." },
  { initial: 'A', name: 'Aarti M.',    text: 'The skin analysis was so detailed — I could actually see my skin layers on screen! The glow facial I got was magical. Prices are very fair and the staff is incredibly warm.' },
  { initial: 'S', name: 'Swathi R.',   text: 'I came for pigmentation treatment and left with a completely transformed complexion. The laser sessions were comfortable, effective, and the whole experience felt premium.' },
  { initial: 'K', name: 'Kavitha D.', text: 'Best skin doctor in Rajamahendravaram without question. Transparent about costs, honest about timelines, and the results speak for themselves. Highly recommend to everyone!' },
  { initial: 'R', name: 'Ramya V.',   text: "The anti-ageing treatment has been life-changing. I look years younger and feel so much more confident. Dr. Lasya's expertise and the clinic's technology are truly world-class." },
  { initial: 'N', name: 'Nandini T.', text: 'Such a calming and beautiful clinic. The staff made me feel at ease right away. My skin has never looked better after the hydration booster sessions. Will keep coming back!' },
];

export default function Reviews() {
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
    <section id="reviews" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className="section-tag">Patient Stories</div>
          <h2 className="section-heading">What Our Clients Say</h2>
          <p className="section-sub" style={{ margin: '12px auto 0' }}>
            Real results, real people. See why clients across Rajamahendravaram trust Lasya&apos;s Derma Glo for their skin.
          </p>
        </div>
        <div className={styles.grid}>
          {REVIEWS.map(({ initial, name, text }, i) => (
            <div
              key={name}
              className={styles.card}
              ref={(el) => (cardRefs.current[i] = el)}
              style={{ opacity: 0, transform: 'translateY(24px)', transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s` }}
            >
              <div className={styles.stars}>{[...Array(5)].map((_, j) => <span key={j}>★</span>)}</div>
              <p className={styles.text}>&ldquo;{text}&rdquo;</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{initial}</div>
                <div>
                  <div className={styles.name}>{name}</div>
                  <div className={styles.verified}>✔ Verified Client</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
