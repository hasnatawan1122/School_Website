import Image from 'next/image';
import Link from 'next/link';
import { 
  GraduationCap, 
  Mail, 
  Award, 
  Briefcase, 
  BookOpen, 
  Users,
  ShieldCheck
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPublicData } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function StaffPage() {
  const { settings, staff } = await getPublicData();

  const leadership = staff.filter((s) => s.department === 'School Leadership' || s.department === 'Academic Affairs');
  const faculty = staff.filter((s) => s.department !== 'School Leadership' && s.department !== 'Academic Affairs');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header settings={settings} />

      <main style={{ flex: 1 }}>
        {/* BANNER */}
        <section
          style={{
            background: 'linear-gradient(135deg, var(--primary-dark) 0%, #152d4b 100%)',
            color: '#ffffff',
            padding: '4rem 0 4.5rem 0'
          }}
        >
          <div className="site-container">
            <div className="badge-pill" style={{ marginBottom: '1rem', background: 'rgba(197, 147, 23, 0.15)', color: 'var(--gold-light)', borderColor: 'rgba(197, 147, 23, 0.3)' }}>
              Faculty & Leadership
            </div>
            <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '1rem' }}>
              Staff & Academic Directory
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '1.15rem', maxWidth: '720px', lineHeight: '1.6' }}>
              Meet our qualified, passionate educators and administrative leaders dedicated to unlocking the academic potential and moral strength of every student.
            </p>
          </div>
        </section>

        {/* SCHOOL LEADERSHIP */}
        <section style={{ padding: '5rem 0' }}>
          <div className="site-container">
            <div className="section-header">
              <div className="badge-pill emerald">Executive Administration</div>
              <h2>School Leadership</h2>
              <p>
                Guiding institutional vision, ECZ national examination standards, and holistic school governance.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem', maxWidth: '900px', margin: '0 auto' }}>
              {leadership.map((member) => (
                <div key={member.id} className="staff-card">
                  <div className="staff-image-wrap">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="staff-info">
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: 'var(--emerald)',
                        letterSpacing: '0.05em',
                        display: 'block',
                        marginBottom: '0.35rem'
                      }}
                    >
                      {member.department}
                    </span>
                    <h3 style={{ fontSize: '1.35rem', marginBottom: '0.25rem', color: 'var(--primary)' }}>
                      {member.name}
                    </h3>
                    <div style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                      {member.role}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                      <Award size={15} style={{ color: 'var(--emerald)', flexShrink: 0 }} />
                      <span>{member.qualification}</span>
                    </div>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                      {member.bio}
                    </p>

                    <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600 }}>
                      <Mail size={14} style={{ color: 'var(--gold)' }} />
                      <span>{member.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HEADS OF DEPARTMENTS & FACULTY */}
        <section style={{ background: 'var(--surface-alt)', padding: '5rem 0' }}>
          <div className="site-container">
            <div className="section-header">
              <div className="badge-pill">Subject Specialists</div>
              <h2>Heads of Departments & Key Educators</h2>
              <p>
                Specialized educators driving excellence across STEM, Humanities, Commerce, and Physical Education.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {faculty.map((member) => (
                <div key={member.id} className="staff-card">
                  <div className="staff-image-wrap">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="staff-info">
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: 'var(--emerald)',
                        letterSpacing: '0.05em',
                        display: 'block',
                        marginBottom: '0.35rem'
                      }}
                    >
                      {member.department}
                    </span>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem', color: 'var(--primary)' }}>
                      {member.name}
                    </h3>
                    <div style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.65rem' }}>
                      {member.role}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dim)', fontSize: '0.825rem', marginBottom: '0.85rem' }}>
                      <Award size={14} style={{ color: 'var(--emerald)', flexShrink: 0 }} />
                      <span>{member.qualification}</span>
                    </div>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.55', marginBottom: '1rem' }}>
                      {member.bio}
                    </p>

                    <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.825rem' }}>
                      <Mail size={13} style={{ color: 'var(--gold)' }} />
                      <span>{member.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STAFF PRIVACY & SAFEGUARDING NOTE */}
        <section style={{ padding: '3.5rem 0', background: 'var(--surface)' }}>
          <div className="site-container">
            <div
              style={{
                background: 'var(--emerald-subtle)',
                border: '1px solid rgba(19, 93, 68, 0.25)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                flexWrap: 'wrap'
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'var(--emerald)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <ShieldCheck size={26} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ color: 'var(--emerald)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                  Child Protection & Staff Communication Policy
                </h4>
                <p style={{ color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  In accordance with Ministry of Education child protection guidelines, official communications with teaching staff must be conducted via school-allocated email addresses or channeled through the Administration Office.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
