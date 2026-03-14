'use client';
import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      style={{
        position: 'fixed', bottom: '28px', right: '28px',
        width: '44px', height: '44px',
        background: 'var(--teal)', color: '#fff',
        border: 'none', borderRadius: '12px',
        cursor: 'pointer', fontSize: '1.1rem',
        boxShadow: '0 4px 18px rgba(46,140,136,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.25s', zIndex: 99,
        fontFamily: 'inherit',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--teal-dark)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--teal)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      ↑
    </button>
  );
}
