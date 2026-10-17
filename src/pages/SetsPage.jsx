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
                <div className="sets-card-grid" style={{ padding: '28px', display: 'grid', gridTemplateColumns: '200px 1.2fr 0.9fr 0.7fr', gap: '24px', alignItems: 'center' }}>
                  {/* Set Product Image with Minimal Watermark */}
                  <div 
                    className="sets-card-image"
                    style={{ height: '170px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--slate-200)', background: '#f8fafc', cursor: 'pointer' }}
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', background: 'var(--primary-light)', padding: '3px 10px', borderRadius: '4px' }}>
                        {set.pieces} INSTRUMENTS INCLUDED
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--slate-400)', fontFamily: 'monospace', fontWeight: '700' }}>
                        {set.sku}
                      </span>
                    </div>

                    <h2 
                      className="sets-card-title"
                      style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--navy-dark)', marginBottom: '8px', cursor: 'pointer' }}
                      onClick={() => handleOpenSetDetails(set)}
                    >
                      {set.name}
                    </h2>

                    <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: '1.5', marginBottom: '16px' }}>
                      {set.summary}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.8rem', color: 'var(--slate-600)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Box size={16} color="var(--primary)" />
                        <span><strong>Tray:</strong> {set.trayType.split('with')[0]}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={16} color="var(--emerald-600)" />
                        <span><strong>Lead Time:</strong> {set.leadTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Column */}
                  <div className="sets-card-highlights" style={{ background: 'var(--slate-50)', padding: '16px 20px', borderRadius: '10px', border: '1px solid var(--slate-200)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--navy-dark)', letterSpacing: '0.04em', marginBottom: '10px' }}>
                      Quality & Assembly Standards
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {set.highlights.map((hl, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.8rem', color: 'var(--slate-700)', lineHeight: '1.4' }}>
                          <Check size={14} color="var(--emerald-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Pricing & Purchase */}
                  <div className="sets-card-pricing" style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--navy-dark)', lineHeight: '1' }}>
                        ${set.price.toFixed(2)}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--slate-400)', textDecoration: 'line-through', marginTop: '4px' }}>
                        List Price: ${set.listPrice.toFixed(2)}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--emerald-600)', fontWeight: '700', marginTop: '2px' }}>
                        Direct Factory Savings: ${(set.listPrice - set.price).toFixed(0)}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                      <button 
                        className="btn-primary" 
                        style={{ padding: '12px 18px', width: '100%', fontSize: '0.9rem' }}
                        onClick={() => handleAddSetToCart(set)}
                      >
                        <ShoppingCart size={16} />
                        <span>Order Complete Set</span>
                      </button>

                      <button 
                        className="btn-secondary" 
                        style={{ padding: '9px 14px', width: '100%', fontSize: '0.825rem' }}
                        onClick={() => handleOpenSetDetails(set)}
                      >
                        <Eye size={14} />
                        <span>View Full Set Specs</span>
                      </button>
                    </div>

                    <button 
                      onClick={() => toggleExpand(set.id)}
                      style={{ marginTop: '14px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary)' }}
                    >
                      <span>{isExpanded ? 'Hide' : 'Inspect'} Itemized Manifest ({set.pieces} Items)</span>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {/* Collapsible Itemized Instrument Manifest */}
                {isExpanded && (
                  <div className="sets-manifest" style={{ borderTop: '1px solid var(--slate-200)', background: 'var(--slate-50)', padding: '24px 28px' }}>
                    <div className="sets-manifest-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--navy-dark)' }}>
                        Sterilization Container Content & Itemized Manifest (DIN Specification)
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                        All instruments laser-etched with matching barcode & traceability lot ID
                      </span>
                    </div>

                    <div className="sets-manifest-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
                      {set.itemizedList.map((entry, index) => (
                        <div 
                          key={index}
                          style={{
                            background: '#ffffff',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            border: '1px solid var(--slate-200)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontSize: '0.8125rem'
                          }}
                        >
                          <span style={{ fontWeight: '800', color: 'var(--primary)', background: 'var(--primary-light)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                            {entry.qty}x
                          </span>
                          <span style={{ color: 'var(--slate-800)', fontWeight: '500' }}>
                            {entry.item}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="sets-manifest-footer" style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid var(--slate-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--slate-600)' }}>
                      <span><strong>Tray Dimensions:</strong> {set.trayDimensions}</span>
                      <button 
                        onClick={() => onOpenEnquiry(set)}
                        style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'underline' }}
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
