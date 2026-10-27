import Link from 'next/link';
import { 
  Users, 
  Calendar, 
  Download, 
  FileText, 
  PhoneCall, 
  ShieldCheck, 
  CheckCircle, 
  Mail, 
  HelpCircle,
  CreditCard
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPublicData } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function ParentsPage() {
  const { settings, content, announcements } = await getPublicData();
  const { parents } = content;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header settings={settings} />

      <main style={{ flex: 1 }}>
        {/* BANNER */}
        <section
          style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, #173b64 100%)',
            color: '#ffffff',
            padding: '4rem 0 4.5rem 0'
          }}
        >
          <div className="site-container">
            <div className="badge-pill" style={{ marginBottom: '1rem', background: 'rgba(197, 147, 23, 0.15)', color: 'var(--gold-light)', borderColor: 'rgba(197, 147, 23, 0.3)' }}>
              Family Partnership
            </div>
            <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '1rem' }}>
              Parents & Guardians Information
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '1.15rem', maxWidth: '720px', lineHeight: '1.6' }}>
              {parents.welcome}
            </p>
          </div>
        </section>

        {/* TERM DATES & ACADEMIC CALENDAR */}
        <section id="calendar" style={{ padding: '5rem 0' }}>
          <div className="site-container">
            <div className="section-header">
              <div className="badge-pill">Academic Schedule</div>
              <h2>2026 Term Dates & School Calendar</h2>
              <p>
                Approved Ministry of Education dates for junior and senior secondary terms. Please plan family travel to avoid instructional disruption.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {parents.termDates.map((term, idx) => (
                <div
                  key={idx}
                  className="feature-card"
                  style={{
                    borderTop: `4px solid ${idx === 0 ? 'var(--gold)' : idx === 1 ? 'var(--emerald)' : 'var(--primary)'}`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>
                    <Calendar size={18} style={{ color: 'var(--gold)' }} />
                    <h3 style={{ fontSize: '1.35rem' }}>{term.term}</h3>
                  </div>

                  <div
                    style={{
                      background: 'var(--surface-alt)',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: 'var(--primary)',
                      marginBottom: '1rem'
                    }}
                  >
                    {term.dates}
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: '1.6' }}>
                    {term.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PARENT GUIDANCE & POLICIES */}
        <section style={{ background: 'var(--surface-alt)', padding: '5rem 0' }}>
          <div className="site-container">
            <div className="section-header">
              <div className="badge-pill emerald">School Guidelines</div>
              <h2>Parent Policies & Guidelines</h2>
              <p>
                Important operational policies ensuring smooth administrative, financial, and student-support workflows.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {parents.guidelines.map((g, idx) => (
                <div key={idx} className="feature-card">
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem', color: 'var(--primary)' }}>
                    {g.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: '1.65' }}>
                    {g.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DOWNLOADABLE DOCUMENTS */}
        <section id="downloads" style={{ padding: '5rem 0' }}>
          <div className="site-container">
            <div className="section-header">
              <div className="badge-pill">Forms & Resources</div>
              <h2>Downloadable Documents & Guides</h2>
              <p>
                Official school documents for admissions, uniform standards, student conduct, and parent handbooks.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {parents.downloadableDocs.map((doc, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--gold-subtle)',
                        color: 'var(--gold)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <FileText size={22} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                        {doc.title}
                      </h4>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                        {doc.size} • {doc.category}
                      </span>
                    </div>
                  </div>

                  <a
                    href={`/contact?document=${encodeURIComponent(doc.title)}`}
                    className="btn btn-outline-navy btn-sm"
                    style={{ flexShrink: 0 }}
                  >
                    <Download size={14} /> Request / View
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ENQUIRY DIRECTORY */}
        <section style={{ background: 'var(--primary-dark)', color: '#ffffff', padding: '5.5rem 0' }}>
          <div className="site-container">
            <div className="section-header" style={{ color: '#ffffff' }}>
              <div className="badge-pill" style={{ background: 'rgba(197, 147, 23, 0.15)', color: 'var(--gold-light)', borderColor: 'rgba(197, 147, 23, 0.3)' }}>
                Direct Communication
              </div>
              <h2 style={{ color: '#ffffff' }}>Administrative Enquiries Directory</h2>
              <p style={{ color: '#cbd5e1' }}>
                Contact the appropriate school office directly for consultations, fee clearances, and student guidance.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
              {parents.enquiryContacts.map((contact, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem'
                  }}
                >
                  <h3 style={{ color: 'var(--gold-light)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                    {contact.role}
                  </h3>
                  <p style={{ color: '#ffffff', fontSize: '0.9rem', marginBottom: '0.75rem', wordBreak: 'break-all' }}>
                    <Mail size={14} style={{ display: 'inline', marginRight: '6px', color: 'var(--gold)' }} />
                    {contact.email}
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                    {contact.note}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
              <Link href="/contact" className="btn btn-primary">
                Send a General Message to the School Office
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
