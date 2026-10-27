'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  GraduationCap, 
  ShieldCheck, 
  ChevronRight,
  Clock
} from 'lucide-react';

interface HeaderProps {
  settings?: {
    schoolName: string;
    phone: string;
    email: string;
    address: string;
    admissionStatus: string;
  };
}

export default function Header({ settings }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Students', href: '/students' },
    { label: 'Parents', href: '/parents' },
    { label: 'Staff Directory', href: '/staff' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' }
  ];

  const phone = settings?.phone || '+260 212 510042';
  const email = settings?.email || 'info@fisengesecondary.edu.zm';
  const admissionStatus = settings?.admissionStatus || 'Admissions Open 2026';

  return (
    <header className="site-header">
      {/* Top utility bar */}
      <div className="top-bar">
        <div className="site-container top-bar-content">
          <div className="top-bar-contact">
            <span>
              <Phone size={13} style={{ color: 'var(--gold)' }} />
              {phone.split('/')[0].trim()}
            </span>
            <span>
              <Mail size={13} style={{ color: 'var(--gold)' }} />
              {email}
            </span>
            <span>
              <Clock size={13} style={{ color: 'var(--gold)' }} />
              Mon - Fri 07:30 - 16:30
            </span>
          </div>
          <div className="top-bar-links">
            <span style={{ color: 'var(--gold-light)', fontWeight: 600 }}>
              🎓 {admissionStatus}
            </span>
            <Link href="/admin" style={{ opacity: 0.8, fontSize: '0.78rem' }}>
              Staff Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="site-container">
        <div className="nav-container">
          <Link href="/" className="brand-logo" aria-label="Fisenge Secondary School Home">
            <div className="brand-crest">
              <GraduationCap size={24} />
            </div>
            <div className="brand-text">
              <h1>Fisenge Secondary</h1>
              <span>Luanshya • Copperbelt Province</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav" aria-label="Primary Navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href="/contact" className="btn btn-primary btn-sm">
              Enquire
            </Link>
          </nav>

          {/* Mobile menu toggle button */}
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'var(--primary-dark)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            animation: 'fadeIn 0.2s ease-in-out'
          }}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'rgba(197, 147, 23, 0.15)' : 'transparent',
                  color: isActive ? 'var(--gold)' : '#ffffff',
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                {item.label}
                <ChevronRight size={18} style={{ opacity: 0.6 }} />
              </Link>
            );
          })}
          <div style={{ marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary"
              style={{ width: '100%', marginBottom: '0.75rem' }}
            >
              Get in Touch
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'block',
                textAlign: 'center',
                color: '#94a3b8',
                fontSize: '0.85rem'
              }}
            >
              Staff & Admin Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
