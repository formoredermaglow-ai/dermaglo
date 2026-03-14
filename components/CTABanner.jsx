import Link from 'next/link';
import styles from './CTABanner.module.css';

export default function CTABanner() {
  return (
    <section id="cta" className={styles.section}>
      <div className={styles.blob4} />
      <div className={styles.blob5} />
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.tag}>✨ Start Your Skin Journey</div>
          <h2 className={styles.heading}>Ready to Reveal Your Best Skin?</h2>
          <p className={styles.sub}>
            Book a personalised skin consultation today and take the first step towards
            healthy, glowing, confident skin.
          </p>
          <div className={styles.buttons}>
            <Link href="/book" className={styles.btnWhite}>✨ Book Appointment</Link>
            <a href="tel:9063914333" className={styles.btnGhost}>📞 Call 90639 14333</a>
          </div>
        </div>
      </div>
    </section>
  );
}
