import Link from 'next/link';
import styles from './Footer.module.css';

const QUICK_LINKS = [
  ['Home', '#home'], ['Our Services', '#services'], ['About Us', '#why-us'],
  ['Client Reviews', '#reviews'], ['Privacy Policy', '#'], ['Terms of Service', '#'],
];
const SERVICE_LINKS = [
  'Skin Analysis', 'Glow Facials & Peels', 'Acne & Scar Treatment',
  'Anti-Ageing Therapy', 'Pigmentation Removal', 'Hair & Scalp Care',
];

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <img src="/logo.png" alt="Derma Glo" className={styles.logoImg} />
              <div className={styles.logoText}>
                <span className={styles.brandName}>Lasya&apos;s Derma Glo</span>
                <span className={styles.tagline}>Advanced Skin Health</span>
              </div>
            </div>
            <p className={styles.desc}>
              Advanced, science-backed skin health care — delivered with compassion, precision,
              and a genuine passion for your glow.
            </p>
            <ul className={styles.contactList}>
              <li><span className={styles.contactIcon}>📍</span><span>1st Floor, Opp. Fasttracks, DDC Road, Danivelpeta, Rajahmundry – 533 108</span></li>
              <li><span className={styles.contactIcon}>📞</span><a href="tel:9063914333">90639 14333</a></li>
              <li><span className={styles.contactIcon}>✉️</span><a href="mailto:formoredermaglo@gmail.com">formoredermaglo@gmail.com</a></li>
            </ul>
            <div className={styles.social}>
              <a href="https://www.instagram.com/dermaglo.clinic_rjy?utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📸</a>
              <a href="#" aria-label="Facebook">👍</a>
              <a href="https://wa.me/message/YOZN74TI4NQRO1" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">💬</a>
              <a href="#" aria-label="YouTube">▶️</a>
            </div>
          </div>

          {/* Hours */}
          <div className={styles.col}>
            <h4>Working Hours</h4>
            <div className={styles.hours}>
              <div className={styles.hourRow}><span className={styles.day}>Mon – Sat</span><span className={styles.time}>9:00 AM – 7:00 PM</span></div>
              <div className={styles.hourRow}><span className={styles.day}>Sunday</span><span className={`${styles.time} ${styles.closed}`}>Closed</span></div>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.col}>
            <h4>Quick Links</h4>
            <ul className={styles.linkList}>
              {QUICK_LINKS.map(([label, href]) => (
                <li key={label}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className={styles.col}>
            <h4>Our Services</h4>
            <ul className={styles.linkList}>
              {SERVICE_LINKS.map((s) => (
                <li key={s}><a href="#services">{s}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2026 Lasya&apos;s Derma Glo. All rights reserved.</span>
          <span><a href="#">Privacy Policy</a> · <a href="#">Terms of Service</a></span>
        </div>
      </div>
    </footer>
  );
}
