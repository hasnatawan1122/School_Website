'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Tag 
} from 'lucide-react';
import { GalleryItem } from '@/lib/db';

interface GalleryViewerProps {
  items: GalleryItem[];
}

export default function GalleryViewer({ items }: GalleryViewerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const categories = ['All', 'Campus', 'Academic', 'Sports', 'Events'];

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter((item) => item.category === selectedCategory);

  const handleOpenLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const handleCloseLightbox = useCallback(() => {
    setActivePhotoIndex(null);
  }, []);

  const handleNextPhoto = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! + 1) % filteredItems.length);
  }, [activePhotoIndex, filteredItems.length]);

  const handlePrevPhoto = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  }, [activePhotoIndex, filteredItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, handleCloseLightbox, handleNextPhoto, handlePrevPhoto]);

  const activePhoto = activePhotoIndex !== null ? filteredItems[activePhotoIndex] : null;

  return (
    <div>
      {/* Category Filter Tabs */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.65rem',
          justifyContent: 'center',
          marginBottom: '2.5rem'
        }}
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActivePhotoIndex(null);
              }}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '9999px',
                border: isSelected ? '1px solid var(--gold)' : '1px solid var(--border-light)',
                background: isSelected ? 'var(--primary)' : 'var(--surface)',
                color: isSelected ? 'var(--gold-light)' : 'var(--text-main)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? '0 4px 12px rgba(10, 31, 56, 0.15)' : 'none'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="gallery-grid">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            className="gallery-card"
            onClick={() => handleOpenLightbox(idx)}
            role="button"
            tabIndex={0}
            aria-label={`View photo: ${item.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleOpenLightbox(idx);
              }
            }}
          >
            <Image
              src={item.image}
              alt={item.title}
              width={640}
              height={480}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div className="gallery-card-overlay">
              <span
                style={{
                  alignSelf: 'flex-start',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px',
                  background: 'rgba(197, 147, 23, 0.9)',
                  color: '#0b1726',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem'
                }}
              >
                {item.category}
              </span>
              <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                {item.title}
              </h4>
              <p style={{ color: '#cbd5e1', fontSize: '0.825rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {item.caption}
              </p>
              <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold-light)', fontSize: '0.8rem', fontWeight: 600 }}>
                <Maximize2 size={14} /> Tap to expand
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
          <p>No photos found in this category.</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="lightbox-backdrop"
          onClick={handleCloseLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with title and close button */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 1.5rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(10, 31, 56, 0.9)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span
                  style={{
                    padding: '0.2rem 0.6rem',
                    background: 'var(--gold)',
                    color: '#0b1726',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    borderRadius: '4px'
                  }}
                >
                  {activePhoto.category}
                </span>
                <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '1rem' }}>
                  {activePhoto.title}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCloseLightbox}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: '#ffffff',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label="Close image viewer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Image Display */}
            <div style={{ position: 'relative', width: '100%', height: '540px', background: '#000000' }}>
              <Image
                src={activePhoto.image}
                alt={activePhoto.title}
                fill
                style={{ objectFit: 'contain' }}
                priority
              />

              {/* Prev / Next Buttons */}
              <button
                type="button"
                onClick={handlePrevPhoto}
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(10, 31, 56, 0.75)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#ffffff',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s'
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                type="button"
                onClick={handleNextPhoto}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(10, 31, 56, 0.75)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#ffffff',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s'
                }}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Caption and Counter */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                background: 'rgba(10, 31, 56, 0.95)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <p style={{ color: '#cbd5e1', fontSize: '0.925rem', lineHeight: '1.5' }}>
                {activePhoto.caption}
              </p>
              <div style={{ color: 'var(--gold)', fontSize: '0.85rem', fontWeight: 600, flexShrink: 0 }}>
                {activePhotoIndex! + 1} of {filteredItems.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
