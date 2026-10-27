import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Building, 
  CheckCircle, 
  HelpCircle,
  Shield,
  Navigation
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { getPublicData } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const { settings } = await getPublicData();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header settings={settings} />

      <main style={{ flex: 1 }}>
        {/* BANNER */}
        <section
          style={{
            background: 'linear-gradient(135deg, var(--primary-dark) 0%, #0d2847 100%)',
            color: '#ffffff',
            padding: '4rem 0 4.5rem 0'
          }}
        >
          <div className="site-container">
            <div className="badge-pill" style={{ marginBottom: '1rem', background: 'rgba(197, 147, 23, 0.15)', color: 'var(--gold-light)', borderColor: 'rgba(197, 147, 23, 0.3)' }}>
              Enquiries & Location
            </div>
            <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '1rem' }}>
              Contact School Administration
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '1.15rem', maxWidth: '720px', lineHeight: '1.6' }}>
              We welcome prospective families, current parents, alumni, and community partners to connect with our administrative team.
            </p>
          </div>
        </section>

        {/* CONTACT SECTION WITH FORM & DETAILS */}
        <section style={{ padding: '5rem 0' }}>
          <div className="site-container">
            <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '3.5rem', alignItems: 'flex-start' }}>
              {/* Form */}
              <div>
                <ContactForm />
              </div>

              {/* School Office Information */}
              <div>
                <div
                  style={{
                    background: 'var(--surface)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2.5rem',
                    border: '1px solid var(--border-light)',
                    boxShadow: 'var(--shadow-sm)',
                    marginBottom: '2rem'
                  }}
                >
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                    Administration Office
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: 'var(--radius-sm)',
                          background: 'var(--gold-subtle)',
                          color: 'var(--gold)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <MapPin size={20} />
                      </div>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                          Physical Address
                        </strong>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                          {settings.address}
                        </p>
                        <span style={{ fontSize: '0.8rem', color: 'var(--emerald)', fontWeight: 600 }}>
                          {settings.district} District • {settings.province}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: 'var(--radius-sm)',
                          background: 'var(--emerald-subtle)',
                          color: 'var(--emerald)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <Phone size={20} />
                      </div>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                          Telephone Numbers
                        </strong>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                          {settings.phone}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: 'var(--radius-sm)',
                          background: 'rgba(10, 31, 56, 0.08)',
                          color: 'var(--primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <Mail size={20} />
                      </div>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                          Email Address
                        </strong>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                          {settings.email}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: 'var(--radius-sm)',
                          background: 'var(--gold-subtle)',
                          color: 'var(--gold)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <Clock size={20} />
                      </div>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                          Office Hours
                        </strong>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                          {settings.officeHours}
                        </p>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                          Closed on Weekends and Zambian Public Holidays
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visitor Guidance Box */}
                <div
                  style={{
                    background: 'var(--surface-alt)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.75rem',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Building size={18} style={{ color: 'var(--gold)' }} /> Campus Visiting Protocols
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                    All visitors must report to the security gate upon arrival and present valid identification to receive a visitor badge. In-person consultations with teachers require advance booking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MAP & LOCATION INFORMATION */}
        <section id="map" style={{ background: 'var(--surface-alt)', padding: '5rem 0' }}>
          <div className="site-container">
            <div className="section-header">
              <div className="badge-pill emerald">Transit & Directions</div>
              <h2>How to Find Our Campus</h2>
              <p>
                Conveniently accessible along the Copperbelt transport corridor between Kitwe and Ndola via the Fisenge turnoff.
              </p>
            </div>

            <div
              style={{
                background: 'var(--surface)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-md)',
                display: 'grid',
                gridTemplateColumns: '1.2fr 0.8fr'
              }}
            >
              {/* Map Representation Container with Interactive Google Maps */}
              <div
                style={{
                  minHeight: '420px',
                  position: 'relative',
                  overflow: 'hidden',
                  background: '#f1f5f9'
                }}
              >
                <iframe
                  title="Fisenge Secondary School Location on Google Maps"
                  src="https://maps.google.com/maps?q=VCC8%2B9JF%2C%20Cheswa%20Ave%2C%20Luanshya%2C%20Zambia&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '420px', width: '100%', display: 'block' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    right: '16px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-md)',
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        color: 'var(--gold)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <MapPin size={18} />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--primary)', fontSize: '0.9rem', display: 'block' }}>
                        Fisenge Secondary School
                      </strong>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        VCC8+9JF, Cheswa Ave, Luanshya, Zambia
                      </span>
                    </div>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=VCC8%2B9JF%2C+Cheswa+Ave%2C+Luanshya%2C+Zambia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-navy btn-sm"
                    style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                  >
                    <Navigation size={13} /> Open in Google Maps
                  </a>
                </div>
              </div>

              {/* Transit Directions */}
              <div style={{ padding: '3rem' }}>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '1.25rem', color: 'var(--primary)' }}>
                  Travel Directions
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--primary)', fontSize: '0.95rem' }}>
                      Street & Campus Location:
                    </strong>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                      Cheswa Avenue, Fisenge, Luanshya District, Zambia (Plus Code: <strong>VCC8+9JF</strong>).
                    </p>
                  </div>

                  <div>
                    <strong style={{ display: 'block', color: 'var(--primary)', fontSize: '0.95rem' }}>
                      From Kitwe:
                    </strong>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                      Take the Ndola-Kitwe Dual Carriageway southward. Turn off at the Fisenge Junction towards Cheswa Ave / Luanshya road (approx. 25 minutes from Kitwe CBD).
                    </p>
                  </div>

                  <div>
                    <strong style={{ display: 'block', color: 'var(--primary)', fontSize: '0.95rem' }}>
                      From Ndola:
                    </strong>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                      Head northwest on the dual carriageway. Take the Fisenge roundabout interchange onto Luanshya road connecting into Cheswa Avenue.
                    </p>
                  </div>

                  <div>
                    <strong style={{ display: 'block', color: 'var(--primary)', fontSize: '0.95rem' }}>
                      Public Transport:
                    </strong>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                      Local minibuses from Luanshya Main Bus Station stop directly near Cheswa Avenue, providing convenient pedestrian access to the school gates.
                    </p>
                  </div>
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
