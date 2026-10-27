import Image from 'next/image';
import Link from 'next/link';
import { 
  Award, 
  Target, 
  Eye, 
  Compass, 
  BookOpen, 
  CheckCircle, 
  MapPin, 
  ArrowRight,
  Shield,
  GraduationCap
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPublicData } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const { settings, content } = await getPublicData();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header settings={settings} />

      <main style={{ flex: 1 }}>
        {/* PAGE BANNER */}
        <section
          style={{
            background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)',
            color: '#ffffff',
            padding: '4rem 0 4.5rem 0'
          }}
        >
          <div className="site-container">
            <div className="badge-pill" style={{ marginBottom: '1rem', background: 'rgba(197, 147, 23, 0.15)', color: 'var(--gold-light)', borderColor: 'rgba(197, 147, 23, 0.3)' }}>
              Institutional Profile
            </div>
            <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '1rem' }}>
              About Fisenge Secondary School
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '1.15rem', maxWidth: '720px', lineHeight: '1.6' }}>
              Cultivating disciplined scholarship, ethical integrity, and technological readiness across the Copperbelt since 1984.
            </p>
          </div>
        </section>

        {/* OVERVIEW & HISTORY */}
        <section style={{ padding: '5rem 0' }}>
          <div className="site-container">
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3.5rem', alignItems: 'center' }}>
              <div>
                <div className="badge-pill emerald" style={{ marginBottom: '1rem' }}>
                  Our Legacy & Foundation
                </div>
                <h2 style={{ fontSize: '2.2rem', marginBottom: '1.25rem' }}>
                  A Tradition of Academic Dedication & Community Pride
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.75', marginBottom: '1.25rem' }}>
                  {content.about.overview}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                  Established with the purpose of providing secondary educational opportunities to learners in Luanshya and surrounding districts, Fisenge Secondary School has grown into an acclaimed center for sciences, humanities, and vocational training under the Ministry of Education.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginTop: '2rem' }}>
                  <div style={{ background: 'var(--surface-alt)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>1984</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Year of Establishment</div>
                  </div>
                  <div style={{ background: 'var(--surface-alt)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--emerald)' }}>100%</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Certified Educators</div>
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
                    boxShadow: 'var(--shadow-xl)',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  <Image
                    src="/images/classroom.jpg"
                    alt="Active classroom learning at Fisenge Secondary"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section style={{ background: 'var(--surface-alt)', padding: '5rem 0' }}>
          <div className="site-container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {/* Mission */}
              <div
                style={{
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '3rem',
                  borderTop: '5px solid var(--emerald)',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--emerald-subtle)',
                    color: 'var(--emerald)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem'
                  }}
                >
                  <Target size={28} />
                </div>
                <h3 style={{ fontSize: '1.65rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                  Our Mission
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.75' }}>
                  {content.about.mission}
                </p>
              </div>

              {/* Vision */}
              <div
                style={{
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '3rem',
                  borderTop: '5px solid var(--gold)',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--gold-subtle)',
                    color: 'var(--gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem'
                  }}
                >
                  <Eye size={28} />
                </div>
                <h3 style={{ fontSize: '1.65rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                  Our Vision
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.75' }}>
                  {content.about.vision}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CORE VALUES */}
        <section style={{ padding: '5rem 0' }}>
          <div className="site-container">
            <div className="section-header">
              <div className="badge-pill">Guiding Principles</div>
              <h2>Our Core Educational Values</h2>
              <p>
                Every facet of student life, classroom instruction, and co-curricular involvement is anchored in four foundational pillars.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
              {content.about.values.map((val, idx) => (
                <div
                  key={idx}
                  className="feature-card"
                  style={{ borderLeft: '4px solid var(--gold)' }}
                >
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>
                    {val.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.65' }}>
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CAMPUS FACILITIES */}
        <section style={{ background: 'var(--primary-dark)', color: '#ffffff', padding: '5.5rem 0' }}>
          <div className="site-container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }}>
              <div>
                <div className="badge-pill" style={{ background: 'rgba(197, 147, 23, 0.15)', color: 'var(--gold-light)', borderColor: 'rgba(197, 147, 23, 0.3)', marginBottom: '1rem' }}>
                  Learning Environment
                </div>
                <h2 style={{ color: '#ffffff', fontSize: '2.25rem', marginBottom: '1.25rem' }}>
                  Campus Facilities & Infrastructure
                </h2>
                <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.75', marginBottom: '1.75rem' }}>
                  {content.about.campusDescription}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#f1f5f9' }}>
                    <CheckCircle size={18} style={{ color: 'var(--gold)' }} />
                    <span>Dedicated Physics, Chemistry & Biology Laboratories</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#f1f5f9' }}>
                    <CheckCircle size={18} style={{ color: 'var(--gold)' }} />
                    <span>Quiet Reference & Lending Library with ECZ Curriculum texts</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#f1f5f9' }}>
                    <CheckCircle size={18} style={{ color: 'var(--gold)' }} />
                    <span>Standard Soccer pitch, netball courts and track grounds</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#f1f5f9' }}>
                    <CheckCircle size={18} style={{ color: 'var(--gold)' }} />
                    <span>Agricultural science demonstration plots and young farmers zone</span>
                  </div>
                </div>

                <div style={{ marginTop: '2.5rem' }}>
                  <Link href="/gallery" className="btn btn-primary">
                    Tour Facilities in Gallery <ArrowRight size={18} />
                  </Link>
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'relative',
                    borderRadius: 'var(--radius-xl)',
                    overflow: 'hidden',
                    aspectRatio: '4 / 3',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: 'var(--shadow-xl)'
                  }}
                >
                  <Image
                    src="/images/library.jpg"
                    alt="Fisenge Secondary School library and study hall"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
