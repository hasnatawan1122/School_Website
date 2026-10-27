import Link from 'next/link';
import Image from 'next/image';
import { 
  BookOpen, 
  Clock, 
  Award, 
  CheckCircle, 
  ShieldAlert, 
  Shirt, 
  Compass, 
  Calendar, 
  FileText,
  Users
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPublicData } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function StudentsPage() {
  const { settings, content } = await getPublicData();
  const { students } = content;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header settings={settings} />

      <main style={{ flex: 1 }}>
        {/* BANNER */}
        <section
          style={{
            background: 'linear-gradient(135deg, var(--emerald) 0%, var(--primary) 100%)',
            color: '#ffffff',
            padding: '4rem 0 4.5rem 0'
          }}
        >
          <div className="site-container">
            <div className="badge-pill" style={{ marginBottom: '1rem', background: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.3)' }}>
              Learner Hub
            </div>
            <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '1rem' }}>
              Student Life & Academic Streams
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '1.15rem', maxWidth: '720px', lineHeight: '1.6' }}>
              {students.overview}
            </p>
          </div>
        </section>

        {/* CURRICULUM OVERVIEW */}
        <section id="curriculum" style={{ padding: '5rem 0' }}>
          <div className="site-container">
            <div className="section-header">
              <div className="badge-pill">ECZ Syllabus</div>
              <h2>Academic Streams & Subject Pathways</h2>
              <p>
                From foundational Junior Secondary (Grades 8–9) to specialized Senior Secondary (Grades 10–12), our academic curriculum is structured for higher education and professional readiness.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {students.academicStreams.map((stream, idx) => (
                <div
                  key={idx}
                  className="feature-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderTop: '4px solid var(--primary)'
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>
                      {stream.title}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                      {stream.description}
                    </p>

                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--gold)', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                      Key Subjects:
                    </h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {stream.subjects.map((sub, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                          <CheckCircle size={15} style={{ color: 'var(--emerald)' }} />
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DAILY SCHEDULE & BELL TIMETABLE */}
        <section style={{ background: 'var(--surface-alt)', padding: '5rem 0' }}>
          <div className="site-container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }}>
              <div>
                <div className="badge-pill blue" style={{ marginBottom: '1rem' }}>
                  Routine & Order
                </div>
                <h2 style={{ fontSize: '2.2rem', marginBottom: '1.25rem' }}>
                  Daily Instructional Schedule
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.75rem' }}>
                  Punctuality is a cornerstone of character building at Fisenge Secondary. All learners are required to be on school grounds before the morning bell.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ background: 'var(--surface)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border-light)' }}>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--primary)' }}>07:30 – 07:45</strong>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Morning Registration & Assembly</span>
                    </div>
                    <span className="badge-pill" style={{ fontSize: '0.75rem' }}>Mandatory</span>
                  </div>

                  <div style={{ background: 'var(--surface)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border-light)' }}>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--primary)' }}>07:45 – 10:25</strong>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Periods 1 through 4 (Morning Lectures & Labs)</span>
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--emerald)', fontWeight: 600 }}>Instruction</span>
                  </div>

                  <div style={{ background: 'var(--surface)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border-light)' }}>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--primary)' }}>10:25 – 10:55</strong>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Mid-Morning Nutrition & Refreshment Break</span>
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600 }}>30 Mins</span>
                  </div>

                  <div style={{ background: 'var(--surface)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border-light)' }}>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--primary)' }}>10:55 – 13:35</strong>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Periods 5 through 8</span>
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--emerald)', fontWeight: 600 }}>Instruction</span>
                  </div>

                  <div style={{ background: 'var(--surface)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border-light)' }}>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--primary)' }}>14:30 – 16:30</strong>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Co-Curricular Clubs, Remedial Prep & Sports</span>
                    </div>
                    <span className="badge-pill emerald" style={{ fontSize: '0.75rem' }}>Activities</span>
                  </div>
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'relative',
                    borderRadius: 'var(--radius-xl)',
                    overflow: 'hidden',
                    aspectRatio: '4 / 3',
                    boxShadow: 'var(--shadow-xl)'
                  }}
                >
                  <Image
                    src="/images/science_lab.jpg"
                    alt="Students in science laboratory"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CO-CURRICULAR CLUBS & SOCIETIES */}
        <section style={{ padding: '5rem 0' }}>
          <div className="site-container">
            <div className="section-header">
              <div className="badge-pill emerald">Beyond the Classroom</div>
              <h2>Clubs, Societies & Enrichment</h2>
              <p>
                Every student at Fisenge Secondary is encouraged to participate in at least one club to build leadership, teamwork, and problem-solving capabilities.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
              {students.clubs.map((club, idx) => (
                <div
                  key={idx}
                  className="feature-card"
                  style={{ borderLeft: '4px solid var(--emerald)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>{club.name}</h3>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                    {club.description}
                  </p>
                  <div style={{ fontSize: '0.8rem', color: 'var(--emerald)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Clock size={14} /> Meets: {club.day}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CODE OF CONDUCT & RULES */}
        <section id="rules" style={{ background: 'var(--primary-dark)', color: '#ffffff', padding: '5.5rem 0' }}>
          <div className="site-container">
            <div className="section-header" style={{ color: '#ffffff' }}>
              <div className="badge-pill" style={{ background: 'rgba(197, 147, 23, 0.15)', color: 'var(--gold-light)', borderColor: 'rgba(197, 147, 23, 0.3)' }}>
                Code of Conduct
              </div>
              <h2 style={{ color: '#ffffff' }}>School Rules & Guidance</h2>
              <p style={{ color: '#cbd5e1' }}>
                Fisenge Secondary maintains a disciplined, safe, and respectful environment where every learner can flourish without disruption.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {students.rules.map((rule, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <h3 style={{ color: 'var(--gold-light)', fontSize: '1.25rem', marginBottom: '1.25rem' }}>
                    {rule.title}
                  </h3>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {rule.points.map((pt, pIdx) => (
                      <li key={pIdx} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', color: '#cbd5e1', fontSize: '0.925rem', lineHeight: '1.6' }}>
                        <CheckCircle size={17} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '3px' }} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
