import React, { useState } from 'react';
import { ShieldCheck, Image as ImageIcon } from 'lucide-react';

export function ProductImage({ 
  src, 
  alt, 
  sku, 
  style = {}, 
  className = '', 
  height = '100%',
  showWatermark = true
}) {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className={`product-image-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: height,
        overflow: 'hidden',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
      onContextMenu={(e) => e.preventDefault()} // Disables right-click saving
      onDragStart={(e) => e.preventDefault()}   // Disables dragging
    >
      {/* 1. Underlying Product Image */}
      {src && !imageError ? (
        <img
          src={src}
          alt={alt || 'Surgix Surgical Product'}
          loading="lazy"
          onError={() => setImageError(true)}
          onLoad={() => setIsLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transition: 'transform 0.35s ease',
            pointerEvents: 'none', // Prevents direct image interaction
            opacity: isLoaded ? 1 : 0.4
          }}
          className="watermarked-product-img"
        />
      ) : (
        <div style={{ textAlign: 'center', color: 'var(--slate-400)', padding: '16px' }}>
          <ImageIcon size={32} strokeWidth={1.5} style={{ margin: '0 auto 6px auto', opacity: 0.6 }} />
          <div style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--navy-dark)' }}>
            {sku || 'SURGIX'}
          </div>
          <div style={{ fontSize: '0.62rem' }}>German Stainless Steel</div>
        </div>
      )}

      {/* 2. MINIMAL BRAND MARK (Only shown on full cards when showWatermark is true; hidden on thumbnails/cart slider) */}
      {showWatermark && (
        <div 
          className="surgix-minimal-watermark"
          style={{
            position: 'absolute',
            bottom: '6px',
            right: '6px',
            pointerEvents: 'none',
            zIndex: 3,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px',
            padding: '2px 5px',
            borderRadius: '3px',
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(3px)',
            border: '1px solid rgba(13, 45, 94, 0.08)',
            userSelect: 'none',
            opacity: 0.7
          }}
          aria-hidden="true"
        >
          <ShieldCheck size={10} color="#0077c8" strokeWidth={2.2} />
          <span 
            style={{ 
              fontSize: '0.58rem', 
              fontWeight: '700', 
              letterSpacing: '0.04em', 
              color: '#0d2d5e'
            }}
          >
            SURGIX
          </span>
        </div>
      )}
    </div>
  );
}
