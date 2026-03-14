import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.text}>
            <div className="section-tag">Our Story</div>
            <h2 className="section-heading">Bringing Advanced Skincare to Rajamahendravaram</h2>
            <p className={styles.body}>
              At Lasya&apos;s Derma Glo, we saw a clear gap between what modern dermatology could offer and
              what was available locally. We built this clinic with one mission: to bring the precision
              of science-backed skin health to our community — without compromise.
              <br /><br />
              By combining the latest dermatological technology with genuine care and empathy, we ensure
              that every assessment is accurate, every treatment is effective, and every client leaves
              feeling confident and cared for.
            </p>
            <div className={styles.highlight}>
              <span className={styles.highlightIcon}>🌟</span>
              <p>
                Our approach is simple:{' '}
                <strong>listen deeply, diagnose precisely, and treat with compassion</strong>.
                Because your skin deserves nothing less than the best.
              </p>
            </div>
          </div>
          <div className={styles.imageGrid}>
            <div className={`${styles.imgCard} ${styles.tall}`}>
              <div className={`${styles.imgPlaceholder} ${styles.p1}`}>🌸</div>
            </div>
            <div className={styles.imgCard}>
              <div className={`${styles.imgPlaceholder} ${styles.p2}`}>✨</div>
            </div>
            <div className={styles.imgCard}>
              <div className={`${styles.imgPlaceholder} ${styles.p3}`}>💆‍♀️</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
