'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Shield } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    honeypot: '' // Spam trap
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot
    if (formData.honeypot) {
      // Bot detected, silently pretend success
      setStatus('success');
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in your name, a valid email address, and your message.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/public/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject || 'General Enquiry',
          message: formData.message
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          honeypot: ''
        });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Unable to submit enquiry. Please try again or telephone the school directly.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('A network error occurred. Please check your internet connection or call the school office.');
    }
  };

  return (
    <div
      style={{
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        padding: '2.5rem',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-md)'
      }}
    >
      <div style={{ marginBottom: '1.75rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.4rem', color: 'var(--primary)' }}>
          Send an Official Message
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Our administration office reviews and responds to general inquiries within 24 to 48 business hours.
        </p>
      </div>

      {status === 'success' ? (
        <div
          style={{
            background: 'var(--emerald-subtle)',
            border: '1px solid rgba(19, 93, 68, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '2rem',
            textAlign: 'center'
          }}
        >
          <CheckCircle2 size={48} style={{ color: 'var(--emerald)', margin: '0 auto 1rem auto' }} />
          <h4 style={{ color: 'var(--emerald)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
            Message Successfully Received!
          </h4>
          <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Thank you for reaching out to Fisenge Secondary School. Your enquiry has been routed to our administrative desk.
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="btn btn-navy btn-sm"
          >
            Send Another Enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {status === 'error' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                borderRadius: 'var(--radius-sm)',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#b91c1c',
                fontSize: '0.9rem'
              }}
            >
              <AlertCircle size={20} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Honeypot Spam Trap (visually hidden) */}
          <div style={{ display: 'none' }} aria-hidden="true">
            <label htmlFor="company_website">Leave empty</label>
            <input
              type="text"
              id="company_website"
              name="honeypot"
              tabIndex={-1}
              value={formData.honeypot}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label
                htmlFor="name"
                style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}
              >
                Full Name <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Mr. Charles Mulenga"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}
              >
                Email Address <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. c.mulenga@gmail.com"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label
                htmlFor="phone"
                style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}
              >
                Phone / WhatsApp Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +260 977 123456"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}
              >
                Subject / Enquiry Type
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  background: '#ffffff'
                }}
              >
                <option value="Admissions Enquiry">Admissions & Enrollment</option>
                <option value="Academic Enquiry">Academic Curriculum & ECZ Exams</option>
                <option value="Fees & Accounts">School Levies & Accounts</option>
                <option value="PTA & Parent Relations">PTA & Parent Matters</option>
                <option value="General Information">General School Information</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}
            >
              Your Message <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Please provide details regarding your inquiry, prospective student grade, or question..."
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.95rem',
                outline: 'none',
                resize: 'vertical'
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-dim)',
              fontSize: '0.8125rem'
            }}
          >
            <Shield size={16} style={{ color: 'var(--emerald)', flexShrink: 0 }} />
            <span>
              Privacy notice: All submitted inquiries are handled strictly by authorized school administrative staff in compliance with student protection policies.
            </span>
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="btn btn-navy"
            style={{ alignSelf: 'flex-start' }}
          >
            {status === 'submitting' ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Transmitting Enquiry...
              </>
            ) : (
              <>
                <Send size={18} /> Submit Official Enquiry
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
