import { getPublicData } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GalleryViewer from '@/components/GalleryViewer';
import { ShieldCheck, Image as ImageIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const { settings, gallery } = await getPublicData();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header settings={settings} />

      <main style={{ flex: 1 }}>
        {/* BANNER */}
        <section
          style={{
            background: 'linear-gradient(135deg, var(--primary-dark) 0%, #15273f 100%)',
            color: '#ffffff',
            padding: '4rem 0 4.5rem 0'
          }}
        >
          <div className="site-container">
            <div className="badge-pill" style={{ marginBottom: '1rem', background: 'rgba(197, 147, 23, 0.15)', color: 'var(--gold-light)', borderColor: 'rgba(197, 147, 23, 0.3)' }}>
              Visual Archives
            </div>
            <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '1rem' }}>
              Campus Life & Activities Gallery
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '1.15rem', maxWidth: '720px', lineHeight: '1.6' }}>
              A window into daily life at Fisenge Secondary School — showcasing modern science laboratories, academic study halls, sports tournaments, and student achievements.
            </p>
          </div>
        </section>

        {/* MAIN GALLERY SECTION */}
        <section style={{ padding: '4.5rem 0 6rem 0' }}>
          <div className="site-container">
            <GalleryViewer items={gallery} />

            {/* PRIVACY & IMAGE CONSENT POLICY */}
            <div
              style={{
                marginTop: '5rem',
                background: 'var(--surface)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--emerald-subtle)',
                  color: 'var(--emerald)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <ShieldCheck size={26} />
              </div>
              <div>
                <h4 style={{ color: 'var(--primary)', fontSize: '1.05rem', marginBottom: '0.25rem' }}>
                  Student Image Consent & Privacy Notice
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                  All photographs displayed on this official website are published in compliance with school media consent guidelines and Ministry of Education safeguarding standards. Unauthorized reproduction, downloading, or commercial use is strictly prohibited.
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
