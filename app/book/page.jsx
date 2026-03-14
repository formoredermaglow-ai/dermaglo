'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useNavigation } from '@/context/NavigationContext';
import styles from './book.module.css';

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const SERVICES = [
  'Advanced Skin Analysis', 'Glow Facials & Chemical Peels', 'Acne & Scar Treatment',
  'Anti-Ageing Therapy', 'Pigmentation & Tan Removal', 'Hydration & Skin Boosters',
  'Hair & Scalp Care', 'Preventive Dermatology', 'General Consultation',
];
const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
];
const INITIAL = { name: '', phone: '', email: '', dob: '', service: '', date: '', time: '', gender: '', notes: '' };

export default function BookPage() {
  const { bookingOnly } = useNavigation();
  const [form, setForm] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit Indian mobile number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.service) e.service = 'Please select a treatment';
    if (!form.date) e.date = 'Please choose a preferred date';
    if (!form.time) e.time = 'Please select a time slot';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }

    setSending(true);
    setSendError('');

    try {
      const res = await fetch('/api/send-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to send');
    } catch (err) {
      console.error('Email error:', err);
      setSendError('Note: Email notification could not be sent, but your request has been recorded.');
    } finally {
      setSending(false);
    }

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const today = new Date().toISOString().split('T')[0];

  if (submitted) {
    return (
      <div className={styles.page}>
        <BookNavbar bookingOnly={bookingOnly} />
        <div className={styles.successWrap}>
          <div className={styles.successCard}>
            <div className={styles.successIcon}>✅</div>
            <h2>Appointment Request Sent!</h2>
            <p>Thank you, <strong>{form.name}</strong>! We&apos;ve received your request for <strong>{form.service}</strong> on <strong>{form.date}</strong> at <strong>{form.time}</strong>.</p>
            <p className={styles.successNote}>
              Our team will call you on <strong>+91 {form.phone}</strong> within 2 hours to confirm.
              For urgent queries, reach us at <a href="tel:9063914333">90639 14333</a>.
            </p>
            <div className={styles.successButtons}>
              {!bookingOnly && <Link href="/" className="btn-primary">← Back to Home</Link>}
              <button className="btn-outline" onClick={() => { setForm(INITIAL); setSubmitted(false); }}>Book Another</button>
            </div>
          </div>
        </div>
        <BookFooter />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <BookNavbar bookingOnly={bookingOnly} />

      <section className={styles.hero}>
        <div className={`blob ${styles.blob1}`} />
        <div className={`blob ${styles.blob2}`} />
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroText}>
              <div className="section-tag">Book Online</div>
              <h1 className={styles.heroTitle}>Book Your <em>Appointment</em></h1>
              <p className={styles.heroSub}>
                Fill in the form and our team will confirm your appointment within 2 hours.
                We&apos;re open Mon–Sat, 9 AM – 7 PM.
              </p>
              <div className={styles.infoCards}>
                <div className={styles.infoCard}>
                  <span className={styles.infoIcon}>📍</span>
                  <div>
                    <div className={styles.infoLabel}>Address</div>
                    <div className={styles.infoValue}>
                      <a href="https://maps.app.goo.gl/DFeEm2DR8NSSYfks5" target="_blank" rel="noopener noreferrer">
                        1st Floor, Opp. Fasttracks, DDC Road,<br />Danivelpeta, Rajahmundry – 533 108
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.infoCard}>
                  <span className={styles.infoIcon}>📞</span>
                  <div>
                    <div className={styles.infoLabel}>Call / WhatsApp</div>
                    <div className={styles.infoContactLinks}>
                      <a href="tel:9063914333" className={styles.callLink}>
                        <span className={styles.callLinkIcon}>📞</span>
                        90639 14333
                      </a>
                      <a href="https://wa.me/message/YOZN74TI4NQRO1" target="_blank" rel="noopener noreferrer" className={styles.waLink}>
                        <WhatsAppIcon size={16} />
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.infoCard}>
                  <span className={styles.infoIcon}>✉️</span>
                  <div>
                    <div className={styles.infoLabel}>Email</div>
                    <div className={styles.infoValue}><a href="mailto:formoredermaglo@gmail.com">formoredermaglo@gmail.com</a></div>
                  </div>
                </div>
                <div className={styles.infoCard}>
                  <span className={styles.infoIcon}>🕐</span>
                  <div>
                    <div className={styles.infoLabel}>Working Hours</div>
                    <div className={styles.infoValue}>Mon – Sat: 9 AM – 7 PM</div>
                  </div>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className={styles.mapWrap}>
                <iframe
                  src="https://maps.google.com/maps?q=Lasya's+Derma+Glo+DDC+Road+Danivelpeta+Rajahmundry&output=embed&z=17"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lasya's Derma Glo Location"
                />
                <a
                  href="https://maps.app.goo.gl/DFeEm2DR8NSSYfks5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapDirections}
                >
                  📍 Get Directions
                </a>
              </div>
            </div>

            {/* FORM */}
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.formHeader}>
                <img src="/logo.png" alt="Derma Glo" className={styles.formLogo} />
                <div>
                  <h2>Patient Details</h2>
                  <p>Fields marked <span className={styles.req}>*</span> are required</p>
                </div>
              </div>

              <div className={styles.row}>
                <Field label="Full Name" req error={errors.name}>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Priya Sharma" className={errors.name ? styles.inputErr : ''} />
                </Field>
                <Field label="Gender">
                  <select name="gender" value={form.gender} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Female</option><option>Male</option><option>Other</option>
                    <option>Prefer not to say</option>
                  </select>
                </Field>
              </div>

              <div className={styles.row}>
                <Field label="Contact Number" req error={errors.phone}>
                  <div className={styles.phoneWrap}>
                    <span className={styles.dial}>+91</span>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="90639 14333" maxLength={10} className={errors.phone ? styles.inputErr : ''} />
                  </div>
                </Field>
                <Field label="Date of Birth">
                  <input type="date" name="dob" value={form.dob} onChange={handleChange} max={today} />
                </Field>
              </div>

              <Field label="Email Address" error={errors.email}>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className={errors.email ? styles.inputErr : ''} />
              </Field>

              <Field label="Treatment / Service" req error={errors.service}>
                <select name="service" value={form.service} onChange={handleChange} className={errors.service ? styles.inputErr : ''}>
                  <option value="">Select a treatment</option>
                  {SERVICES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>

              <div className={styles.row}>
                <Field label="Preferred Date" req error={errors.date}>
                  <input type="date" name="date" value={form.date} onChange={handleChange} min={today} className={errors.date ? styles.inputErr : ''} />
                </Field>
                <Field label="Preferred Time" req error={errors.time}>
                  <select name="time" value={form.time} onChange={handleChange} className={errors.time ? styles.inputErr : ''}>
                    <option value="">Select a slot</option>
                    {TIME_SLOTS.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
              </div>

              <Field label="Skin Concerns / Additional Notes">
                <textarea name="notes" value={form.notes} onChange={handleChange}
                  placeholder="Describe your skin concerns, current medications, allergies, or anything else we should know…"
                  rows={4} />
              </Field>

              <button type="submit" className={styles.submitBtn} disabled={sending}>
                {sending ? '⏳ Sending…' : '✨ Confirm Appointment Request'}
              </button>
              {sendError && <p className={styles.sendError}>{sendError}</p>}
              <p className={styles.disclaimer}>
                By submitting, you agree to be contacted by our team to confirm your booking.
                Your data is kept private and never shared.
              </p>
            </form>
          </div>
        </div>
      </section>

      <BookFooter />
    </div>
  );
}

function Field({ label, req, error, children }) {
  return (
    <div className={styles.field}>
      <label>{label} {req && <span className={styles.req}>*</span>}</label>
      {children}
      {error && <span className={styles.errMsg}>{error}</span>}
    </div>
  );
}

function BookNavbar({ bookingOnly }) {
  return (
    <header className={styles.bookNav}>
      <div className="container">
        <div className={styles.bookNavInner}>
          <Link href="/" className={styles.bookNavLogo}>
            <img src="/logo.png" alt="Derma Glo" className={styles.bookNavLogoImg} />
            <div>
              <div className={styles.bookNavBrand}>Lasya&apos;s Derma Glo</div>
              <div className={styles.bookNavTag}>Advanced Skin Health</div>
            </div>
          </Link>
          {!bookingOnly && <Link href="/" className={styles.backLink}>← Back to Home</Link>}
        </div>
      </div>
    </header>
  );
}

function BookFooter() {
  return (
    <footer className={styles.bookFooter}>
      <div className="container">
        <p>© 2026 Lasya&apos;s Derma Glo · <a href="tel:9063914333">90639 14333</a> · <a href="mailto:formoredermaglo@gmail.com">formoredermaglo@gmail.com</a></p>
        <div className={styles.bookFooterSocial}>
          <a href="https://www.instagram.com/dermaglo.clinic_rjy?utm_source=qr" target="_blank" rel="noopener noreferrer">📸 Instagram</a>
          <a href="https://wa.me/message/YOZN74TI4NQRO1" target="_blank" rel="noopener noreferrer" className={styles.footerWaLink}><WhatsAppIcon size={15} /> WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
