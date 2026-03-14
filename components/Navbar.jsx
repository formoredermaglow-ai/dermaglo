'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useNavigation } from '@/context/NavigationContext';

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { bookingOnly } = useNavigation();

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 0);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setMenuOpen(false);

  const NavLink = ({ href, children }) => {
    if (bookingOnly) {
      return (
        <span className={`${styles.disabledLink} ${styles.tooltip}`} data-tooltip="Navigation disabled in Booking Mode">
          {children}
        </span>
      );
    }
    return <a href={href} onClick={close}>{children}</a>;
  };

  return (
    <nav className={`${styles.navbar} ${isSticky ? styles.sticky : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={close}>
          <img src="/logo.png" alt="Derma Glo" className={styles.logoImg} />
          <div>
            <span className={styles.brandName}>Lasya's Derma Glo</span>
            <span className={styles.brandSub}>Advanced Skin Health</span>
          </div>
        </Link>

        <div className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </div>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
          <li><NavLink href="#home">Home</NavLink></li>
          <li><NavLink href="#services">Services</NavLink></li>
          <li><NavLink href="#why-us">About Us</NavLink></li>
          <li><NavLink href="#reviews">Reviews</NavLink></li>
          <li><NavLink href="#contact">Contact</NavLink></li>
        </ul>

        <Link href="/book" className={styles.ctaBtn} onClick={close}>
          Book Appointment
        </Link>
      </div>
    </nav>
  );
}
