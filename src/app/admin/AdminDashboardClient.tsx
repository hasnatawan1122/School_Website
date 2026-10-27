'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Image as ImageIcon, 
  Bell, 
  Mail, 
  LogOut, 
  ExternalLink, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Eye, 
  Search,
  Filter,
  Save,
  GraduationCap
} from 'lucide-react';
import { DatabaseSchema, StaffMember, GalleryItem, Announcement, ContactMessage } from '@/lib/db';

interface AdminDashboardClientProps {
  initialData: DatabaseSchema;
  username: string;
}

export default function AdminDashboardClient({ initialData, username }: AdminDashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'staff' | 'gallery' | 'announcements' | 'messages'>('overview');

  const [dbData, setDbData] = useState<DatabaseSchema>(initialData);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Modals state
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [staffForm, setStaffForm] = useState<Partial<StaffMember>>({
    name: '',
    role: '',
    department: 'Sciences',
    qualification: '',
    email: '',
    image: '/images/headteacher.jpg',
    bio: ''
  });

  const [isAddingGallery, setIsAddingGallery] = useState(false);
  const [galleryForm, setGalleryForm] = useState<Partial<GalleryItem>>({
    title: '',
    category: 'Campus',
    image: '/images/campus_hero.jpg',
    caption: ''
  });

  const [isAddingAnnouncement, setIsAddingAnnouncement] = useState(false);
  const [announcementForm, setAnnouncementForm] = useState<Partial<Announcement>>({
    title: '',
    category: 'General',
    summary: '',
    content: '',
    priority: 'normal'
  });

  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  // Save Settings & Content
  const handleSaveContent = async () => {
    setSaveStatus('Saving changes...');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settings: dbData.settings,
          content: dbData.content
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSaveStatus('Content successfully saved and published!');
        setTimeout(() => setSaveStatus(null), 4000);
      } else {
        setSaveStatus('Failed to save changes.');
      }
    } catch {
      setSaveStatus('Error connecting to server.');
    }
  };

  // Staff Handlers
  const handleSaveStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingStaff) {
        // Update
        const res = await fetch('/api/admin/staff', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingStaff.id, ...staffForm })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setDbData((prev) => ({
            ...prev,
            staff: prev.staff.map((s) => (s.id === editingStaff.id ? data.staff : s))
          }));
          setEditingStaff(null);
        }
      } else {
        // Create
        const res = await fetch('/api/admin/staff', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(staffForm)
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setDbData((prev) => ({
            ...prev,
            staff: [...prev.staff, data.staff]
          }));
          setIsAddingStaff(false);
          setStaffForm({
            name: '',
            role: '',
            department: 'Sciences',
            qualification: '',
            email: '',
            image: '/images/headteacher.jpg',
            bio: ''
          });
        }
      }
    } catch (err) {
      alert('Error updating staff member');
    }
  };

  const handleDeleteStaff = async (id: string) => {
    if (!confirm('Are you sure you want to remove this staff profile?')) return;
    try {
      const res = await fetch(`/api/admin/staff?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setDbData((prev) => ({
          ...prev,
          staff: prev.staff.filter((s) => s.id !== id)
        }));
      }
    } catch {
      alert('Failed to delete staff member');
    }
  };

  // Gallery Handlers
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(galleryForm)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setDbData((prev) => ({
          ...prev,
          gallery: [...prev.gallery, data.item]
        }));
        setIsAddingGallery(false);
        setGalleryForm({
          title: '',
          category: 'Campus',
          image: '/images/campus_hero.jpg',
          caption: ''
        });
      }
    } catch {
      alert('Failed to save gallery photo');
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Are you sure you want to remove this photo from the gallery?')) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setDbData((prev) => ({
          ...prev,
          gallery: prev.gallery.filter((g) => g.id !== id)
        }));
      }
    } catch {
      alert('Failed to delete image');
    }
  };

  // Announcement Handlers
  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(announcementForm)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setDbData((prev) => ({
          ...prev,
          announcements: [data.announcement, ...prev.announcements]
        }));
        setIsAddingAnnouncement(false);
        setAnnouncementForm({
          title: '',
          category: 'General',
          summary: '',
          content: '',
          priority: 'normal'
        });
      }
    } catch {
      alert('Failed to save announcement');
    }
  };

  const handleTogglePublishAnnouncement = async (id: string, currentPublished: boolean) => {
    try {
      const res = await fetch('/api/admin/announcements', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, published: !currentPublished })
      });
      if (res.ok) {
        setDbData((prev) => ({
          ...prev,
          announcements: prev.announcements.map((a) => (a.id === id ? { ...a, published: !currentPublished } : a))
        }));
      }
    } catch {
      alert('Failed to update status');
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;
    try {
      const res = await fetch(`/api/admin/announcements?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setDbData((prev) => ({
          ...prev,
          announcements: prev.announcements.filter((a) => a.id !== id)
        }));
      }
    } catch {
      alert('Failed to delete announcement');
    }
  };

  // Message Handlers
  const handleToggleReadMessage = async (id: string, currentRead: boolean) => {
    try {
      const res = await fetch('/api/admin/messages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read: !currentRead })
      });
      if (res.ok) {
        setDbData((prev) => ({
          ...prev,
          messages: prev.messages.map((m) => (m.id === id ? { ...m, read: !currentRead } : m))
        }));
      }
    } catch {
      alert('Failed to update message status');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this message?')) return;
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setDbData((prev) => ({
          ...prev,
          messages: prev.messages.filter((m) => m.id !== id)
        }));
        if (selectedMessage?.id === id) setSelectedMessage(null);
      }
    } catch {
      alert('Failed to delete message');
    }
  };

  const unreadMessagesCount = dbData.messages.filter((m) => !m.read).length;

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
          <div className="brand-crest" style={{ width: '38px', height: '38px' }}>
            <GraduationCap size={20} />
          </div>
          <div>
            <h2 style={{ color: '#ffffff', fontSize: '1.05rem', lineHeight: '1.2' }}>Fisenge Admin</h2>
            <span style={{ color: 'var(--gold)', fontSize: '0.725rem', fontWeight: 600, textTransform: 'uppercase' }}>
              Staff Portal
            </span>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'overview' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'overview' ? '#ffffff' : '#94a3b8',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
              textAlign: 'left'
            }}
          >
            <LayoutDashboard size={18} /> Overview
          </button>

          <button
            onClick={() => setActiveTab('content')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'content' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'content' ? '#ffffff' : '#94a3b8',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
              textAlign: 'left'
            }}
          >
            <FileText size={18} /> Page Content
          </button>

          <button
            onClick={() => setActiveTab('staff')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'staff' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'staff' ? '#ffffff' : '#94a3b8',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
              textAlign: 'left'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Users size={18} /> Staff Directory
            </span>
            <span style={{ fontSize: '0.75rem', background: '#233758', padding: '0.1rem 0.5rem', borderRadius: '999px', color: '#cbd5e1' }}>
              {dbData.staff.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'gallery' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'gallery' ? '#ffffff' : '#94a3b8',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
              textAlign: 'left'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ImageIcon size={18} /> Photo Gallery
            </span>
            <span style={{ fontSize: '0.75rem', background: '#233758', padding: '0.1rem 0.5rem', borderRadius: '999px', color: '#cbd5e1' }}>
              {dbData.gallery.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('announcements')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'announcements' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'announcements' ? '#ffffff' : '#94a3b8',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
              textAlign: 'left'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Bell size={18} /> Announcements
            </span>
            <span style={{ fontSize: '0.75rem', background: '#233758', padding: '0.1rem 0.5rem', borderRadius: '999px', color: '#cbd5e1' }}>
              {dbData.announcements.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'messages' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'messages' ? '#ffffff' : '#94a3b8',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
              textAlign: 'left'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Mail size={18} /> Inquiries
            </span>
            {unreadMessagesCount > 0 && (
              <span style={{ fontSize: '0.75rem', background: '#dc2626', padding: '0.1rem 0.5rem', borderRadius: '999px', color: '#ffffff', fontWeight: 700 }}>
                {unreadMessagesCount}
              </span>
            )}
          </button>
        </nav>

        {/* Bottom Sidebar Action */}
        <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--admin-border)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link
            href="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: '#94a3b8',
              fontSize: '0.85rem'
            }}
          >
            <ExternalLink size={15} /> View Public Website
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'transparent',
              border: 'none',
              color: '#f87171',
              cursor: 'pointer',
              fontSize: '0.85rem',
              textAlign: 'left'
            }}
          >
            <LogOut size={15} /> Sign Out ({username})
          </button>
        </div>
      </aside>

      {/* MAIN ADMIN AREA */}
      <div className="admin-main">
        {/* Top Header */}
        <header className="admin-header">
          <div>
            <h1 style={{ color: '#ffffff', fontSize: '1.25rem', textTransform: 'capitalize' }}>
              {activeTab === 'overview' && 'Administrative Overview'}
              {activeTab === 'content' && 'Page Content & School Settings'}
              {activeTab === 'staff' && 'Staff Directory Management'}
              {activeTab === 'gallery' && 'School Image Gallery Management'}
              {activeTab === 'announcements' && 'Notices & Announcements'}
              {activeTab === 'messages' && 'Contact Form Submissions'}
            </h1>
            <span style={{ color: '#64748b', fontSize: '0.8rem' }}>
              Logged in as Administrator • Fisenge Secondary School
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {activeTab === 'content' && (
              <button onClick={handleSaveContent} className="btn btn-primary btn-sm">
                <Save size={16} /> Save All Changes
              </button>
            )}
            {activeTab === 'staff' && (
              <button
                onClick={() => {
                  setEditingStaff(null);
                  setStaffForm({
                    name: '',
                    role: '',
                    department: 'Sciences',
                    qualification: '',
                    email: '',
                    image: '/images/headteacher.jpg',
                    bio: ''
                  });
                  setIsAddingStaff(true);
                }}
                className="btn btn-primary btn-sm"
              >
                <Plus size={16} /> Add Staff Profile
              </button>
            )}
            {activeTab === 'gallery' && (
              <button onClick={() => setIsAddingGallery(true)} className="btn btn-primary btn-sm">
                <Plus size={16} /> Add Photo
              </button>
            )}
            {activeTab === 'announcements' && (
              <button onClick={() => setIsAddingAnnouncement(true)} className="btn btn-primary btn-sm">
                <Plus size={16} /> New Announcement
              </button>
            )}
          </div>
        </header>

        {/* Body Content */}
        <div className="admin-content">
          {saveStatus && (
            <div
              style={{
                marginBottom: '1.5rem',
                padding: '0.85rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                background: saveStatus.includes('success') ? 'rgba(19, 93, 68, 0.25)' : 'rgba(197, 147, 23, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem'
              }}
            >
              <CheckCircle2 size={18} style={{ color: 'var(--gold)' }} />
              <span>{saveStatus}</span>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              {/* Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                <div className="admin-card">
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Teaching & Staff</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>{dbData.staff.length}</div>
                  <div style={{ color: 'var(--emerald)', fontSize: '0.8rem', marginTop: '0.4rem' }}>Active profiles</div>
                </div>

                <div className="admin-card">
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Gallery Images</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>{dbData.gallery.length}</div>
                  <div style={{ color: 'var(--gold)', fontSize: '0.8rem', marginTop: '0.4rem' }}>In 4 categories</div>
                </div>

                <div className="admin-card">
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Notices & Events</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>{dbData.announcements.length}</div>
                  <div style={{ color: '#38bdf8', fontSize: '0.8rem', marginTop: '0.4rem' }}>Published on site</div>
                </div>

                <div className="admin-card">
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Parent Enquiries</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: unreadMessagesCount > 0 ? '#f87171' : '#ffffff' }}>
                    {unreadMessagesCount}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.4rem' }}>
                    Unread out of {dbData.messages.length} total
                  </div>
                </div>
              </div>

              {/* Recent Inquiries Table */}
              <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h3 style={{ color: '#ffffff', fontSize: '1.15rem' }}>Recent Official Inquiries</h3>
                  <button onClick={() => setActiveTab('messages')} style={{ color: 'var(--gold)', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                    View All Inquiries →
                  </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th>Sender</th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dbData.messages.slice(0, 5).map((msg) => (
                        <tr key={msg.id}>
                          <td>
                            <span
                              style={{
                                display: 'inline-block',
                                padding: '0.2rem 0.5rem',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                background: msg.read ? 'rgba(255, 255, 255, 0.08)' : 'rgba(220, 38, 38, 0.2)',
                                color: msg.read ? '#94a3b8' : '#f87171'
                              }}
                            >
                              {msg.read ? 'Read' : 'New'}
                            </span>
                          </td>
                          <td style={{ color: '#ffffff', fontWeight: 600 }}>
                            {msg.name}
                            <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 400 }}>{msg.email}</div>
                          </td>
                          <td style={{ color: '#cbd5e1' }}>{msg.subject}</td>
                          <td style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                setSelectedMessage(msg);
                                if (!msg.read) handleToggleReadMessage(msg.id, false);
                              }}
                              className="btn btn-navy btn-sm"
                              style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PAGE CONTENT & SETTINGS */}
          {activeTab === 'content' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* School Details */}
              <div className="admin-card">
                <h3 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '1.25rem' }}>
                  Official School Information & Contacts
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                      School Name
                    </label>
                    <input
                      type="text"
                      className="admin-input"
                      value={dbData.settings.schoolName}
                      onChange={(e) =>
                        setDbData({ ...dbData, settings: { ...dbData.settings, schoolName: e.target.value } })
                      }
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                      School Motto
                    </label>
                    <input
                      type="text"
                      className="admin-input"
                      value={dbData.settings.motto}
                      onChange={(e) =>
                        setDbData({ ...dbData, settings: { ...dbData.settings, motto: e.target.value } })
                      }
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                      Telephone Numbers
                    </label>
                    <input
                      type="text"
                      className="admin-input"
                      value={dbData.settings.phone}
                      onChange={(e) =>
                        setDbData({ ...dbData, settings: { ...dbData.settings, phone: e.target.value } })
                      }
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                      Official School Email
                    </label>
                    <input
                      type="email"
                      className="admin-input"
                      value={dbData.settings.email}
                      onChange={(e) =>
                        setDbData({ ...dbData, settings: { ...dbData.settings, email: e.target.value } })
                      }
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                      Admissions Status Banner
                    </label>
                    <input
                      type="text"
                      className="admin-input"
                      value={dbData.settings.admissionStatus}
                      onChange={(e) =>
                        setDbData({ ...dbData, settings: { ...dbData.settings, admissionStatus: e.target.value } })
                      }
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                      Office Hours
                    </label>
                    <input
                      type="text"
                      className="admin-input"
                      value={dbData.settings.officeHours}
                      onChange={(e) =>
                        setDbData({ ...dbData, settings: { ...dbData.settings, officeHours: e.target.value } })
                      }
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                      Campus Physical Address
                    </label>
                    <input
                      type="text"
                      className="admin-input"
                      value={dbData.settings.address}
                      onChange={(e) =>
                        setDbData({ ...dbData, settings: { ...dbData.settings, address: e.target.value } })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Homepage Hero */}
              <div className="admin-card">
                <h3 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '1.25rem' }}>
                  Homepage Hero Banner
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                      Hero Badge Text
                    </label>
                    <input
                      type="text"
                      className="admin-input"
                      value={dbData.content.hero.badge}
                      onChange={(e) =>
                        setDbData({
                          ...dbData,
                          content: {
                            ...dbData.content,
                            hero: { ...dbData.content.hero, badge: e.target.value }
                          }
                        })
                      }
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                      Main Headline
                    </label>
                    <input
                      type="text"
                      className="admin-input"
                      value={dbData.content.hero.title}
                      onChange={(e) =>
                        setDbData({
                          ...dbData,
                          content: {
                            ...dbData.content,
                            hero: { ...dbData.content.hero, title: e.target.value }
                          }
                        })
                      }
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                      Subtitle & Introduction
                    </label>
                    <textarea
                      rows={3}
                      className="admin-textarea"
                      value={dbData.content.hero.subtitle}
                      onChange={(e) =>
                        setDbData({
                          ...dbData,
                          content: {
                            ...dbData.content,
                            hero: { ...dbData.content.hero, subtitle: e.target.value }
                          }
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* About & Mission */}
              <div className="admin-card">
                <h3 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '1.25rem' }}>
                  Mission, Vision & Leadership
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                      Mission Statement
                    </label>
                    <textarea
                      rows={3}
                      className="admin-textarea"
                      value={dbData.content.about.mission}
                      onChange={(e) =>
                        setDbData({
                          ...dbData,
                          content: {
                            ...dbData.content,
                            about: { ...dbData.content.about, mission: e.target.value }
                          }
                        })
                      }
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                      Vision Statement
                    </label>
                    <textarea
                      rows={3}
                      className="admin-textarea"
                      value={dbData.content.about.vision}
                      onChange={(e) =>
                        setDbData({
                          ...dbData,
                          content: {
                            ...dbData.content,
                            about: { ...dbData.content.about, vision: e.target.value }
                          }
                        })
                      }
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                      Headteacher Welcome Message
                    </label>
                    <textarea
                      rows={4}
                      className="admin-textarea"
                      value={dbData.content.about.principalMessage}
                      onChange={(e) =>
                        setDbData({
                          ...dbData,
                          content: {
                            ...dbData.content,
                            about: { ...dbData.content.about, principalMessage: e.target.value }
                          }
                        })
                      }
                    />
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <button onClick={handleSaveContent} className="btn btn-primary">
                    <Save size={18} /> Save & Publish All Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STAFF DIRECTORY MANAGEMENT */}
          {activeTab === 'staff' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {dbData.staff.map((member) => (
                  <div key={member.id} className="admin-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                          <Image src={member.image} alt={member.name} fill style={{ objectFit: 'cover' }} />
                        </div>
                        <div>
                          <h4 style={{ color: '#ffffff', fontSize: '1.1rem' }}>{member.name}</h4>
                          <span style={{ color: 'var(--gold)', fontSize: '0.85rem', fontWeight: 600 }}>{member.role}</span>
                          <div style={{ color: 'var(--emerald)', fontSize: '0.75rem' }}>{member.department}</div>
                        </div>
                      </div>
                      <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                        {member.bio}
                      </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--admin-border)' }}>
                      <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{member.email}</span>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => {
                            setEditingStaff(member);
                            setStaffForm(member);
                            setIsAddingStaff(true);
                          }}
                          style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', padding: '0.3rem' }}
                          title="Edit staff member"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteStaff(member.id)}
                          style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer', padding: '0.3rem' }}
                          title="Delete staff member"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: GALLERY MANAGEMENT */}
          {activeTab === 'gallery' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {dbData.gallery.map((photo) => (
                  <div key={photo.id} className="admin-card" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ position: 'relative', width: '100%', height: '180px' }}>
                      <Image src={photo.image} alt={photo.title} fill style={{ objectFit: 'cover' }} />
                      <span
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          background: 'rgba(10, 31, 56, 0.85)',
                          color: 'var(--gold-light)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}
                      >
                        {photo.category}
                      </span>
                    </div>
                    <div style={{ padding: '1.25rem' }}>
                      <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '0.3rem' }}>{photo.title}</h4>
                      <p style={{ color: '#94a3b8', fontSize: '0.825rem', marginBottom: '1rem' }}>{photo.caption}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Date: {photo.date}</span>
                        <button
                          onClick={() => handleDeleteGallery(photo.id)}
                          style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer', padding: '0.3rem' }}
                          title="Delete photo"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ANNOUNCEMENTS MANAGEMENT */}
          {activeTab === 'announcements' && (
            <div className="admin-card">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title & Summary</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dbData.announcements.map((ann) => (
                    <tr key={ann.id}>
                      <td style={{ maxWidth: '350px' }}>
                        <div style={{ color: '#ffffff', fontWeight: 600 }}>{ann.title}</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.825rem' }}>{ann.summary}</div>
                      </td>
                      <td>
                        <span style={{ color: 'var(--gold-light)', fontSize: '0.85rem' }}>{ann.category}</span>
                      </td>
                      <td style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>{ann.date}</td>
                      <td>
                        <span
                          style={{
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            background: ann.priority === 'urgent' ? 'rgba(220, 38, 38, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                            color: ann.priority === 'urgent' ? '#f87171' : '#cbd5e1'
                          }}
                        >
                          {ann.priority}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleTogglePublishAnnouncement(ann.id, ann.published)}
                          style={{
                            padding: '0.25rem 0.6rem',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            background: ann.published ? 'rgba(19, 93, 68, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                            color: ann.published ? 'var(--emerald)' : '#94a3b8'
                          }}
                        >
                          {ann.published ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteAnnouncement(ann.id)}
                          style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer', padding: '0.4rem' }}
                          title="Delete notice"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 6: CONTACT INQUIRIES */}
          {activeTab === 'messages' && (
            <div className="admin-card">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Sender Name</th>
                    <th>Email / Phone</th>
                    <th>Subject</th>
                    <th>Submitted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dbData.messages.map((msg) => (
                    <tr key={msg.id} style={{ background: msg.read ? 'transparent' : 'rgba(197, 147, 23, 0.05)' }}>
                      <td>
                        <span
                          style={{
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            background: msg.read ? 'rgba(255, 255, 255, 0.05)' : 'rgba(220, 38, 38, 0.2)',
                            color: msg.read ? '#94a3b8' : '#f87171'
                          }}
                        >
                          {msg.read ? 'Read' : 'New'}
                        </span>
                      </td>
                      <td style={{ color: '#ffffff', fontWeight: 600 }}>{msg.name}</td>
                      <td>
                        <div style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>{msg.email}</div>
                        <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{msg.phone || 'No phone provided'}</div>
                      </td>
                      <td style={{ color: '#cbd5e1' }}>{msg.subject}</td>
                      <td style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                        {new Date(msg.createdAt).toLocaleString()}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => {
                              setSelectedMessage(msg);
                              if (!msg.read) handleToggleReadMessage(msg.id, false);
                            }}
                            className="btn btn-navy btn-sm"
                            style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                          >
                            Read
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer', padding: '0.35rem' }}
                            title="Delete inquiry"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {dbData.messages.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                        No messages received yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: ADD / EDIT STAFF */}
      {isAddingStaff && (
        <div className="lightbox-backdrop" onClick={() => setIsAddingStaff(false)}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '600px', padding: '2rem', background: 'var(--admin-surface)' }}
          >
            <h3 style={{ color: '#ffffff', fontSize: '1.3rem', marginBottom: '1.25rem' }}>
              {editingStaff ? 'Edit Staff Profile' : 'Add New Staff Member'}
            </h3>

            <form onSubmit={handleSaveStaff} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={staffForm.name}
                    onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                    placeholder="e.g. Mr. Kelvin Tembo"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                    Role / Position *
                  </label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={staffForm.role}
                    onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })}
                    placeholder="e.g. Head of Sciences"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                    Department
                  </label>
                  <select
                    className="admin-select"
                    value={staffForm.department}
                    onChange={(e) => setStaffForm({ ...staffForm, department: e.target.value })}
                  >
                    <option value="School Leadership">School Leadership</option>
                    <option value="Academic Affairs">Academic Affairs</option>
                    <option value="Sciences">Sciences</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Business & Commerce">Business & Commerce</option>
                    <option value="Humanities & Languages">Humanities & Languages</option>
                    <option value="Co-Curricular & Sports">Co-Curricular & Sports</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                    Qualifications
                  </label>
                  <input
                    type="text"
                    className="admin-input"
                    value={staffForm.qualification}
                    onChange={(e) => setStaffForm({ ...staffForm, qualification: e.target.value })}
                    placeholder="e.g. B.Ed Science (UNZA)"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                    School Email
                  </label>
                  <input
                    type="email"
                    className="admin-input"
                    value={staffForm.email}
                    onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                    placeholder="e.g. k.tembo@fisengesecondary.edu.zm"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                    Photograph
                  </label>
                  <select
                    className="admin-select"
                    value={staffForm.image}
                    onChange={(e) => setStaffForm({ ...staffForm, image: e.target.value })}
                  >
                    <option value="/images/headteacher.jpg">Principal Portrait (Male)</option>
                    <option value="/images/deputy_principal.jpg">Deputy Principal Portrait (Female)</option>
                    <option value="/images/classroom.jpg">Teacher In Classroom</option>
                    <option value="/images/science_lab.jpg">Science Lab Mentor</option>
                    <option value="/images/sports.jpg">Sports Director</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                  Professional Biography
                </label>
                <textarea
                  rows={3}
                  className="admin-textarea"
                  value={staffForm.bio}
                  onChange={(e) => setStaffForm({ ...staffForm, bio: e.target.value })}
                  placeholder="Summary of experience and teaching focus..."
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setIsAddingStaff(false)}
                  className="btn btn-outline-white btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  {editingStaff ? 'Update Staff Profile' : 'Save Staff Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD GALLERY PHOTO */}
      {isAddingGallery && (
        <div className="lightbox-backdrop" onClick={() => setIsAddingGallery(false)}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '520px', padding: '2rem', background: 'var(--admin-surface)' }}
          >
            <h3 style={{ color: '#ffffff', fontSize: '1.3rem', marginBottom: '1.25rem' }}>
              Add School Photo to Gallery
            </h3>

            <form onSubmit={handleSaveGallery} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  className="admin-input"
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  placeholder="e.g. Physics Laboratory Practical"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                    Category
                  </label>
                  <select
                    className="admin-select"
                    value={galleryForm.category}
                    onChange={(e) =>
                      setGalleryForm({ ...galleryForm, category: e.target.value as GalleryItem['category'] })
                    }
                  >
                    <option value="Campus">Campus</option>
                    <option value="Academic">Academic</option>
                    <option value="Sports">Sports</option>
                    <option value="Events">Events</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                    Image Asset
                  </label>
                  <select
                    className="admin-select"
                    value={galleryForm.image}
                    onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                  >
                    <option value="/images/campus_hero.jpg">Campus Grounds & Gate</option>
                    <option value="/images/science_lab.jpg">Science Laboratory</option>
                    <option value="/images/library.jpg">School Library</option>
                    <option value="/images/sports.jpg">Sports Field & Match</option>
                    <option value="/images/classroom.jpg">Classroom Lesson</option>
                    <option value="/images/deputy_principal.jpg">Administration Building</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                  Image Caption / Alt Text
                </label>
                <textarea
                  rows={3}
                  className="admin-textarea"
                  value={galleryForm.caption}
                  onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                  placeholder="Descriptive caption describing the scene..."
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setIsAddingGallery(false)}
                  className="btn btn-outline-white btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD ANNOUNCEMENT */}
      {isAddingAnnouncement && (
        <div className="lightbox-backdrop" onClick={() => setIsAddingAnnouncement(false)}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '580px', padding: '2rem', background: 'var(--admin-surface)' }}
          >
            <h3 style={{ color: '#ffffff', fontSize: '1.3rem', marginBottom: '1.25rem' }}>
              Publish School Notice or Announcement
            </h3>

            <form onSubmit={handleSaveAnnouncement} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                  Headline / Title *
                </label>
                <input
                  type="text"
                  required
                  className="admin-input"
                  value={announcementForm.title}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                  placeholder="e.g. End of Term Examination Schedule"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                    Target Audience / Category
                  </label>
                  <select
                    className="admin-select"
                    value={announcementForm.category}
                    onChange={(e) =>
                      setAnnouncementForm({
                        ...announcementForm,
                        category: e.target.value as Announcement['category']
                      })
                    }
                  >
                    <option value="Academic">Academic</option>
                    <option value="Parents">Parents & PTA</option>
                    <option value="Sports">Sports</option>
                    <option value="General">General School</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                    Priority Level
                  </label>
                  <select
                    className="admin-select"
                    value={announcementForm.priority}
                    onChange={(e) =>
                      setAnnouncementForm({
                        ...announcementForm,
                        priority: e.target.value as Announcement['priority']
                      })
                    }
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent / High Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                  Brief Summary (Visible on Homepage) *
                </label>
                <input
                  type="text"
                  required
                  className="admin-input"
                  value={announcementForm.summary}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, summary: e.target.value })}
                  placeholder="One sentence summary of the notice..."
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                  Full Announcement Content
                </label>
                <textarea
                  rows={4}
                  className="admin-textarea"
                  value={announcementForm.content}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                  placeholder="Comprehensive notice details, dates, and instructions..."
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setIsAddingAnnouncement(false)}
                  className="btn btn-outline-white btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW CONTACT INQUIRY */}
      {selectedMessage && (
        <div className="lightbox-backdrop" onClick={() => setSelectedMessage(null)}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '600px', padding: '2.5rem', background: 'var(--admin-surface)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    letterSpacing: '0.05em'
                  }}
                >
                  Official School Enquiry
                </span>
                <h3 style={{ color: '#ffffff', fontSize: '1.35rem', marginTop: '0.25rem' }}>
                  {selectedMessage.subject}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: '#ffffff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.25)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.8rem', display: 'block' }}>Sender Name</span>
                <strong style={{ color: '#ffffff' }}>{selectedMessage.name}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.8rem', display: 'block' }}>Email Address</span>
                <strong style={{ color: 'var(--gold)' }}>{selectedMessage.email}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.8rem', display: 'block' }}>Phone / WhatsApp</span>
                <span style={{ color: '#cbd5e1' }}>{selectedMessage.phone || 'None provided'}</span>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.8rem', display: 'block' }}>Timestamp</span>
                <span style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>{new Date(selectedMessage.createdAt).toLocaleString()}</span>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <span style={{ color: '#64748b', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>Message:</span>
              <p style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: '1.65', whiteSpace: 'pre-wrap' }}>
                {selectedMessage.message}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => handleDeleteMessage(selectedMessage.id)}
                className="btn btn-outline-white btn-sm"
                style={{ color: '#f87171', borderColor: 'rgba(248, 113, 113, 0.4)' }}
              >
                <Trash2 size={15} /> Delete Message
              </button>

              <a
                href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent('RE: ' + selectedMessage.subject)}`}
                className="btn btn-primary btn-sm"
              >
                <Mail size={15} /> Reply via Official Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
