import Link from 'next/link';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  BookOpen, 
  Lock 
} from 'lucide-react';

interface FooterProps {
  settings?: {
    schoolName: string;
    motto: string;
    phone: string;
    email: string;
    address: string;
    officeHours: string;
    establishedYear: number;
  };
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const schoolName = settings?.schoolName || 'Fisenge Secondary School';
  const motto = settings?.motto || 'Excellence in Character, Scholarship & Service';
  const phone = settings?.phone || '+260 212 510042 / +260 977 820119';
  const email = settings?.email || 'info@fisengesecondary.edu.zm';
  const address = settings?.address || 'VCC8+9JF, Cheswa Ave, Luanshya, Copperbelt Province, Zambia';
  const officeHours = settings?.officeHours || 'Monday – Friday: 07:30 – 16:30 CAT';

  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-grid">
          {/* Column 1: School Identity */}
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div className="brand-crest">
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 style={{ color: '#ffffff', fontSize: '1.35rem', marginBottom: '0.1rem' }}>
                  {schoolName}
                </h3>
                <span style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Ministry of Education • ECZ Center
                </span>
              </div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.925rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              &ldquo;{motto}&rdquo;
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: '1.6' }}>
              Fostering academic excellence, disciplined leadership, and moral foundation for boys and girls across the Copperbelt since 1984.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/about">About Our Heritage</Link></li>
              <li><Link href="/students">Academic Streams</Link></li>
              <li><Link href="/parents">Parents & PTA Information</Link></li>
              <li><Link href="/staff">Faculty & Staff</Link></li>
              <li><Link href="/gallery">Campus Gallery</Link></li>
              <li><Link href="/contact">Admissions & Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Information & Resources */}
          <div className="footer-col">
            <h4>Information</h4>
            <ul className="footer-links">
              <li><Link href="/students#curriculum">ECZ Syllabus Guidelines</Link></li>
              <li><Link href="/students#rules">Student Code of Conduct</Link></li>
              <li><Link href="/parents#calendar">Term Calendar & Dates</Link></li>
              <li><Link href="/parents#downloads">Document Downloads</Link></li>
              <li><Link href="/contact#map">Campus Directions</Link></li>
              <li><Link href="/admin">Staff Admin Portal</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="footer-col">
            <h4>School Office</h4>
            <ul className="footer-links" style={{ gap: '0.85rem' }}>
              <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '3px' }} />
                <span>{address}</span>
              </li>
              <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <Phone size={18} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                <span>{phone}</span>
              </li>
              <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <Mail size={18} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                <span>{email}</span>
              </li>
              <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <Clock size={18} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                <span>{officeHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-meta">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#64748b' }}>
              <ShieldCheck size={14} /> Child Protection & Privacy Standard
            </span>
            <span style={{ color: '#334155' }}>•</span>
            <Link
              href="/admin"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: 'var(--gold-light)',
                fontWeight: 600,
                fontSize: '0.8rem'
              }}
            >
              <Lock size={12} /> Authorized Admin Login
            </Link>
          </div>

          <div className="footer-copyright-row">
            © {currentYear} {schoolName}. All Rights Reserved. &nbsp;·&nbsp; Registered with Ministry of Education, Republic of Zambia.
          </div>

          <div className="footer-developer-credit">
            Developed by{' '}
            <a
              href="https://www.linkedin.com/in/hasnat-awan-web-developer"
              target="_blank"
              rel="noopener noreferrer"
              className="developer-name-link"
            >
              Hasnat
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
