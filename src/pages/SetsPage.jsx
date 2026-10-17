import React, { useState } from 'react';
import { 
  Layers, 
  Check, 
  ShoppingCart, 
  FileText, 
  ShieldCheck, 
  Box, 
  Clock, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Eye,
  Info
} from 'lucide-react';
import { surgicalSets } from '../data/sets';
import { ProductImage } from '../components/ProductImage';

export function SetsPage({ onAddToCart, onOpenEnquiry, onSelectProduct }) {
  const [expandedSetId, setExpandedSetId] = useState(surgicalSets[0].id);

  const toggleExpand = (id) => {
    setExpandedSetId(expandedSetId === id ? null : id);
  };

  const handleAddSetToCart = (set) => {
    onAddToCart({
      id: set.id,
      sku: set.sku,
      name: set.name,
      price: set.price,
      bulkPrice: set.price * 0.9,
      image: set.image,
      quantity: 1
    });
  };

  const handleOpenSetDetails = (set) => {
    if (onSelectProduct) {
      onSelectProduct(set);
    }
  };

  return (
    <div className="sets-page-root" style={{ background: '#f8fafc', padding: '40px 0 80px 0' }}>
      <div className="container">
        {/* Page Header */}
        <div className="sets-page-header" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--primary-light)', color: 'var(--primary)', padding: '6px 16px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.04em', marginBottom: '14px' }}>
            <Layers size={15} />
            <span>SURGICAL PROCEDURAL PACKS & TRAYS</span>
          </div>

          <h1 className="sets-page-title" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '800', color: 'var(--navy-dark)', letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Pre-Configured Surgical Instrument Sets & Trays
          </h1>

          <p style={{ fontSize: '1rem', color: 'var(--slate-600)', lineHeight: '1.6' }}>
            Standardized procedure trays configured per AORN and clinical excellence guidelines. Ideal for private practices, surgeons, specialty clinics, and healthcare facilities. All instruments passivated per ASTM A967 with Tungsten Carbide reinforcement where indicated.
          </p>
        </div>

        {/* Sets List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {surgicalSets.map((set) => {
            const isExpanded = expandedSetId === set.id;

            return (
              <div 
                key={set.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1.5px solid var(--slate-200)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'border-color 0.2s ease'
                }}
              >
                {/* Main Card Overview Bar */}
                <div className="sets-card-grid">
                  {/* Set Product Image with Minimal Watermark */}
                  <div 
                    className="sets-card-image"
                    onClick={() => handleOpenSetDetails(set)}
                  >
                    <ProductImage 
                      src={set.image} 
                      alt={set.name} 
                      sku={set.sku} 
                      height="100%" 
                      showWatermark={true}
                    />
                  </div>

                  {/* Details Column */}
                  <div className="sets-card-details">
                    <div className="sets-card-meta-row">
                      <span className="sets-piece-badge">
                        {set.pieces} INSTRUMENTS INCLUDED
                      </span>
                      <span className="sets-sku-text">
                        {set.sku}
                      </span>
                    </div>

                    <h2 
                      className="sets-card-title"
                      onClick={() => handleOpenSetDetails(set)}
                    >
                      {set.name}
                    </h2>

                    <p className="sets-card-summary">
                      {set.summary}
                    </p>

                    <div className="sets-card-specs-row">
                      <div className="sets-spec-item">
                        <Box size={16} color="var(--primary)" />
                        <span><strong>Tray:</strong> {set.trayType.split('with')[0]}</span>
                      </div>
                      <div className="sets-spec-item">
                        <Clock size={16} color="var(--emerald-600)" />
                        <span><strong>Lead Time:</strong> {set.leadTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Column */}
                  <div className="sets-card-highlights">
                    <div className="sets-highlights-title">
                      Quality & Assembly Standards
                    </div>
                    <ul className="sets-highlights-list">
                      {set.highlights.map((hl, i) => (
                        <li key={i} className="sets-highlight-item">
                          <Check size={14} color="var(--emerald-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Pricing & Purchase */}
                  <div className="sets-card-pricing">
                    <div className="sets-price-box">
                      <div className="sets-main-price">
                        ${set.price.toFixed(2)}
                      </div>
                      <div className="sets-list-price">
                        List Price: ${set.listPrice.toFixed(2)}
                      </div>
                      <div className="sets-savings-tag">
                        Direct Factory Savings: ${(set.listPrice - set.price).toFixed(0)}
                      </div>
                    </div>

                    <div className="sets-action-buttons">
                      <button 
                        className="btn-primary sets-order-btn" 
                        onClick={() => handleAddSetToCart(set)}
                      >
                        <ShoppingCart size={16} />
                        <span>Order Complete Set</span>
                      </button>

                      <button 
                        className="btn-secondary sets-specs-btn" 
                        onClick={() => handleOpenSetDetails(set)}
                      >
                        <Eye size={14} />
                        <span>View Full Set Specs</span>
                      </button>
                    </div>

                    <button 
                      onClick={() => toggleExpand(set.id)}
                      className="sets-manifest-toggle-btn"
                    >
                      <span>{isExpanded ? 'Hide' : 'Inspect'} Itemized Manifest ({set.pieces} Items)</span>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {/* Collapsible Itemized Instrument Manifest */}
                {isExpanded && (
                  <div className="sets-manifest">
                    <div className="sets-manifest-header">
                      <div className="sets-manifest-title">
                        Sterilization Container Content & Itemized Manifest (DIN Specification)
                      </div>
                      <span className="sets-manifest-subtitle">
                        All instruments laser-etched with matching barcode & traceability lot ID
                      </span>
                    </div>

                    <div className="sets-manifest-grid">
                      {set.itemizedList.map((entry, index) => (
                        <div key={index} className="sets-manifest-item">
                          <span className="manifest-qty">
                            {entry.qty}x
                          </span>
                          <span className="manifest-name">
                            {entry.item}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="sets-manifest-footer">
                      <span><strong>Tray Dimensions:</strong> {set.trayDimensions}</span>
                      <button 
                        onClick={() => onOpenEnquiry(set)}
                        className="sets-inquire-link"
                      >
                        Have Questions About This Set? Inquire Directly →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
