import Image from 'next/image';
import Link from 'next/link';
import { 
  GraduationCap, 
  FlaskConical, 
  BookOpen, 
  Users, 
  Trophy, 
  ArrowRight, 
  Calendar, 
  CheckCircle, 
  MapPin, 
  Clock, 
  Bell, 
  ChevronRight,
  Shield,
  Sparkles
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPublicData } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const data = await getPublicData();
  const { settings, content, announcements, gallery } = data;
  const recentAnnouncements = announcements.slice(0, 3);
  const previewPhotos = gallery.slice(0, 4);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header settings={settings} />

      <main style={{ flex: 1 }}>
        {/* HERO SECTION */}
        <section
          style={{
            position: 'relative',
            background: 'linear-gradient(135deg, #061426 0%, #0c2340 50%, #112d52 100%)',
            color: '#ffffff',
            padding: '5rem 0 6rem 0',
            overflow: 'hidden'
          }}
        >
          {/* Subtle background glow effect */}
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              right: '-5%',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(197, 147, 23, 0.12) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          <div className="site-container">
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3.5rem', alignItems: 'center' }}>
              <div>
                <div className="badge-pill" style={{ marginBottom: '1.25rem' }}>
                  <Sparkles size={14} /> {content.hero.badge}
                </div>
                <h1
                  style={{
                    color: '#ffffff',
                    fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
                    fontWeight: 800,
                    lineHeight: '1.15',
                    marginBottom: '1.5rem',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {content.hero.title}
                </h1>
                <p
                  style={{
                    color: '#cbd5e1',
                    fontSize: '1.125rem',
                    lineHeight: '1.65',
                    marginBottom: '2.25rem',
                    maxWidth: '560px'
                  }}
                >
                  {content.hero.subtitle}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
                  <Link href={content.hero.ctaPrimaryLink} className="btn btn-primary">
                    {content.hero.ctaPrimaryText} <ArrowRight size={18} />
                  </Link>
                  <Link href={content.hero.ctaSecondaryLink} className="btn btn-outline-white">
                    {content.hero.ctaSecondaryText}
                  </Link>
                </div>

                {/* Key stats row */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '1.25rem',
                    paddingTop: '2rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.12)'
                  }}
                >
                  {content.hero.stats.map((stat, i) => (
                    <div key={i}>
                      <div
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.75rem',
                          fontWeight: 800,
                          color: 'var(--gold)'
                        }}
                      >
                        {stat.value}
                      </div>
                      <div style={{ color: '#94a3b8', fontSize: '0.8125rem', fontWeight: 500, marginTop: '0.2rem' }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero Image Card */}
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'relative',
                    borderRadius: 'var(--radius-xl)',
                    overflow: 'hidden',
                    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
                    border: '4px solid rgba(255, 255, 255, 0.12)',
                    aspectRatio: '16 / 11'
                  }}
                >
                  <Image
                    src={content.hero.heroImage}
                    alt="Fisenge Secondary School campus front"
                    fill
                    priority
                    style={{ objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '1.5rem',
                      background: 'linear-gradient(to top, rgba(6, 18, 36, 0.95), transparent)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-light)', fontWeight: 600, fontSize: '0.85rem' }}>
                      <MapPin size={16} /> Fisenge Area, Luanshya District
                    </div>
                    <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.05rem', marginTop: '0.25rem' }}>
                      Clean, disciplined, and nurturing environment for academic achievement
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-15px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    padding: '0.85rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--primary)',
                    boxShadow: 'var(--shadow-xl)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'var(--emerald-subtle)',
                      color: 'var(--emerald)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Grade 8 – 12</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Junior & Senior ECZ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK ACCESS HUBS (STUDENTS, PARENTS, STAFF) */}
        <section style={{ transform: 'translateY(-30px)', position: 'relative', zIndex: 10 }}>
          <div className="site-container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {/* Students Card */}
              <div
                className="feature-card"
                style={{
                  background: '#ffffff',
                  boxShadow: 'var(--shadow-lg)',
                  borderTop: '4px solid var(--emerald)'
                }}
              >
                <div className="feature-icon emerald">
                  <BookOpen size={24} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>For Students</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '1.25rem' }}>
                  Explore academic subject streams, daily schedules, co-curricular clubs, and school conduct guidelines.
                </p>
                <Link
                  href="/students"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--emerald)',
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}
                >
                  View Student Hub <ChevronRight size={16} />
                </Link>
              </div>

              {/* Parents Card */}
              <div
                className="feature-card"
                style={{
                  background: '#ffffff',
                  boxShadow: 'var(--shadow-lg)',
                  borderTop: '4px solid var(--gold)'
                }}
              >
                <div className="feature-icon">
                  <Users size={24} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>For Parents</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '1.25rem' }}>
                  Term calendars, consultation schedules, bank payment directives, and essential school guidelines.
                </p>
                <Link
                  href="/parents"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--gold)',
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}
                >
                  View Parent Resources <ChevronRight size={16} />
                </Link>
              </div>

              {/* Staff Card */}
              <div
                className="feature-card"
                style={{
                  background: '#ffffff',
                  boxShadow: 'var(--shadow-lg)',
                  borderTop: '4px solid var(--primary)'
                }}
              >
                <div className="feature-icon navy">
                  <GraduationCap size={24} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Staff & Faculty</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '1.25rem' }}>
                  Meet our certified subject educators, department leadership, and access administrative notices.
                </p>
                <Link
                  href="/staff"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--primary)',
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}
                >
                  Staff Directory <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* HEADTEACHER'S WELCOME */}
        <section style={{ padding: '4.5rem 0 5rem 0' }}>
          <div className="site-container">
            <div
              style={{
                background: 'var(--surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-light)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                display: 'grid',
                gridTemplateColumns: '0.85fr 1.15fr',
                gap: 0
              }}
            >
              <div style={{ position: 'relative', minHeight: '380px' }}>
                <Image
                  src={content.about.principalImage}
                  alt={content.about.principalName}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '3.5rem' }}>
                <div className="badge-pill" style={{ marginBottom: '1rem' }}>
                  Leadership Message
                </div>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.25rem' }}>
                  Welcome from the Headteacher
                </h2>
                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '1.05rem',
                    lineHeight: '1.75',
                    marginBottom: '1.75rem',
                    fontStyle: 'italic'
                  }}
                >
                  &ldquo;{content.about.principalMessage}&rdquo;
                </p>
                <div>
                  <h4 style={{ color: 'var(--primary)', fontSize: '1.15rem', fontWeight: 700 }}>
                    {content.about.principalName}
                  </h4>
                  <p style={{ color: 'var(--emerald)', fontSize: '0.875rem', fontWeight: 600 }}>
                    {content.about.principalTitle}
                  </p>
                </div>
                <div style={{ marginTop: '1.75rem' }}>
                  <Link href="/about" className="btn btn-outline-navy btn-sm">
                    Read Our Full Mission & Vision <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE FISENGE SECONDARY */}
        <section style={{ background: 'var(--surface-alt)', padding: '5rem 0' }}>
          <div className="site-container">
            <div className="section-header">
              <div className="badge-pill emerald">Holistic Development</div>
              <h2>Why Fisenge Secondary School?</h2>
              <p>
                We combine rigorous curriculum delivery with structured discipline, scientific inquiry, and rich character development.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              <div className="feature-card">
                <div className="feature-icon emerald">
                  <FlaskConical size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>State-of-the-Art Science Labs</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  Hands-on chemistry, physics, and biology laboratories equipped for full ECZ practical exam preparation.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <GraduationCap size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>Academic Excellence (ECZ)</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  Consistently high pass rates at Grade 9 Junior Secondary and Grade 12 Senior Secondary national examinations.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon navy">
                  <Shield size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>Disciplined Environment</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  Clear code of conduct, active prefectorial body, and strong moral values fostering self-discipline.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon emerald">
                  <Trophy size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>Sports & Co-Curriculars</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  Competitive soccer, volleyball, athletics, JETS innovation, and debate societies that unlock hidden potentials.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LATEST ANNOUNCEMENTS & NOTICES */}
        <section style={{ padding: '5rem 0' }}>
          <div className="site-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
              <div>
                <div className="badge-pill">Stay Informed</div>
                <h2 style={{ fontSize: '2.25rem', marginTop: '0.5rem' }}>School Notices & Events</h2>
              </div>
              <Link href="/parents#announcements" className="btn btn-outline-navy btn-sm">
                All Announcements <ArrowRight size={16} />
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
              {recentAnnouncements.map((ann) => (
                <div
                  key={ann.id}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '4px',
                          background: ann.priority === 'urgent' ? '#fee2e2' : 'var(--gold-subtle)',
                          color: ann.priority === 'urgent' ? '#dc2626' : 'var(--gold)'
                        }}
                      >
                        {ann.category}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Calendar size={13} /> {ann.date}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.15rem', marginBottom: '0.65rem' }}>
                      {ann.title}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: '1.6' }}>
                      {ann.summary}
                    </p>
                  </div>

                  <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
                    <Link
                      href="/parents#calendar"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        color: 'var(--primary)',
                        fontSize: '0.875rem',
                        fontWeight: 600
                      }}
                    >
                      Read full details <ChevronRight size={15} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CAMPUS GALLERY PREVIEW */}
        <section style={{ background: 'var(--primary-dark)', color: '#ffffff', padding: '5.5rem 0' }}>
          <div className="site-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
              <div>
                <div className="badge-pill" style={{ background: 'rgba(197, 147, 23, 0.15)', color: 'var(--gold-light)', borderColor: 'rgba(197, 147, 23, 0.3)' }}>
                  Campus Life
                </div>
                <h2 style={{ color: '#ffffff', fontSize: '2.25rem', marginTop: '0.5rem' }}>
                  Explore Our Campus & Activities
                </h2>
              </div>
              <Link href="/gallery" className="btn btn-primary btn-sm">
                View Full Gallery ({gallery.length} Photos) <ArrowRight size={16} />
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {previewPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="gallery-card"
                  style={{ aspectRatio: '4 / 3' }}
                >
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="gallery-card-overlay">
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-light)', textTransform: 'uppercase' }}>
                      {photo.category}
                    </span>
                    <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 600 }}>
                      {photo.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ADMISSION & CONTACT BANNER */}
        <section style={{ padding: '5rem 0', background: 'linear-gradient(135deg, var(--gold-subtle) 0%, #ffffff 100%)' }}>
          <div className="site-container">
            <div
              style={{
                background: 'var(--primary)',
                color: '#ffffff',
                borderRadius: 'var(--radius-xl)',
                padding: '3.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '2rem',
                boxShadow: 'var(--shadow-xl)'
              }}
            >
              <div style={{ maxWidth: '620px' }}>
                <div className="badge-pill" style={{ marginBottom: '1rem', background: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.3)' }}>
                  Enrollment
                </div>
                <h2 style={{ color: '#ffffff', fontSize: '2rem', marginBottom: '0.75rem' }}>
                  Join the Fisenge Secondary School Family
                </h2>
                <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.6' }}>
                  We welcome inquiries from prospective families for Grade 8 admissions and transfer admissions for Grade 10. Visit our campus or submit an enquiry online.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn btn-primary">
                  Inquire for Admissions <ArrowRight size={18} />
                </Link>
                <Link href="/parents#downloads" className="btn btn-outline-white">
                  Download Handbook
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
