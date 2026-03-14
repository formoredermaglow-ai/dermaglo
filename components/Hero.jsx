'use client';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={`blob ${styles.blob1}`} />
      <div className={`blob ${styles.blob2}`} />
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.content}>
            <div className={styles.badge}>
              <div className={styles.stars}>{[...Array(5)].map((_, i) => <span key={i}>★</span>)}</div>
              <span>5.0 Star Rated Skin Clinic in Rajamahendravaram</span>
            </div>
            <h1 className={styles.title}>
              Reveal Your Skin's<br /><em>Natural Glo.</em>
            </h1>
            <p className={styles.desc}>
              Experience personalised, science-backed skin treatments in a calming environment.
              Advanced dermatology combined with deep care — for skin that truly glows from within.
            </p>
            <div className={styles.buttons}>
              <Link href="/book" className="btn-primary">✨ Book Appointment</Link>
              <a href="#services" className="btn-outline">Explore Treatments</a>
            </div>
            <div className={styles.stats}>
              {[
                { num: '2000+', label: 'Happy Clients' },
                { num: '98%',   label: 'Satisfaction Rate' },
                { num: '7+',    label: 'Years of Expertise' },
              ].map(({ num, label }) => (
                <div className={styles.stat} key={label}>
                  <div className={styles.statNum}>{num}</div>
                  <div className={styles.statLabel}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.imageWrap}>
            <div className={styles.imageCard}>
              <div className={styles.imagePlaceholder}>
                <span className={styles.iconLarge}>🌸</span>
                <p>Lasya's Derma Glo Clinic</p>
              </div>
            </div>
            <div className={styles.floatBadge}>
              <span className={styles.floatIcon}>💆‍♀️</span>
              <div>
                <div className={styles.floatTitle}>100% Safe Treatments</div>
                <div className={styles.floatSub}>Dermatologist-approved</div>
              </div>
            </div>
            <div className={styles.floatBadge2}>
              <div className={styles.floatBadge2Num}>✦</div>
              <div className={styles.floatBadge2Text}>Science-Backed<br />Skincare</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
