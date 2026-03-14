'use client';
import { useEffect, useRef } from 'react';
import styles from './WhyUs.module.css';

const POINTS = [
  { icon: '👩‍⚕️', title: 'Expert Dermatologist', desc: 'Highly qualified, experienced skin specialist dedicated to continuous learning in the latest dermatology advances.' },
  { icon: '🔬', title: 'Advanced Technology', desc: 'Equipped with cutting-edge dermoscopy and laser equipment for precise, effective, and comfortable treatments.' },
  { icon: '💎', title: 'Transparent Pricing', desc: 'Honest, upfront costs with no hidden fees. We explain every treatment option clearly before proceeding.' },
  { icon: '🌺', title: 'Personalised Care', desc: 'Every skin is unique. We craft customised treatment plans tailored specifically to your skin type and concerns.' },
];

export default function WhyUs() {
  const pointRefs = useRef([]);

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
    pointRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-us" className={styles.section}>
      <div className={`blob ${styles.blob3}`} />
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.imageWrap}>
            <div className={styles.imageCard}>
              <div className={styles.imagePlaceholder}>
                <span className={styles.iconLarge}>👩‍⚕️</span>
                <p>Dr. Lasya at Derma Glo</p>
              </div>
            </div>
            <div className={styles.expBadge}>
              <div className={styles.expNum}>7+</div>
              <div className={styles.expLabel}>Years of<br />Expertise</div>
            </div>
          </div>
          <div className={styles.content}>
            <div className="section-tag">Why Choose Us</div>
            <h2 className="section-heading">Why Rajamahendravaram Trusts Derma Glo</h2>
            <p className="section-sub">
              We are committed to raising the standard of skincare in our community with science, compassion, and transparency.
            </p>
            <div className={styles.points}>
              {POINTS.map(({ icon, title, desc }, i) => (
                <div
                  key={title}
                  className={styles.point}
                  ref={(el) => (pointRefs.current[i] = el)}
                  style={{ opacity: 0, transform: 'translateY(20px)', transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s` }}
                >
                  <div className={styles.pointIcon}>{icon}</div>
                  <div className={styles.pointText}>
                    <h4>{title}</h4>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
