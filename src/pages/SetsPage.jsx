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
  ChevronUp
} from 'lucide-react';
import { surgicalSets } from '../data/sets';
import { ProductImage } from '../components/ProductImage';


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
      quantity: 1,
      steel: "Complete German Steel Set (AISI 420 & 410)",
      size: `${set.pieces} Surgical Instruments + DIN Tray`
    });
  };

  return (
    <div className="sets-page-root" style={{ background: '#f8fafc', padding: '48px 0 80px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--primary-light)', color: 'var(--primary)', padding: '4px 14px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: '700', marginBottom: '14px', letterSpacing: '0.04em' }}>
            <Layers size={15} />
            <span>STANDARDIZED OPERATING ROOM PACKS</span>
          </div>

          <h1 style={{ fontSize: '2.4rem', fontWeight: '800', color: 'var(--navy-dark)', lineHeight: '1.2' }}>
            Hospital Surgical Instrument Sets & Trays
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'var(--slate-600)', marginTop: '12px', lineHeight: '1.6' }}>
            Turnkey sterilization-ready assemblies formulated in collaboration with US surgical teams. 
            All sets include heavy-duty DIN wire baskets, silicone brackets, and 100% certified ASTM F899 German-blank instruments.
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
                <div style={{ padding: '28px', display: 'grid', gridTemplateColumns: '200px 1.2fr 0.9fr 0.7fr', gap: '24px', alignItems: 'center' }}>
                  {/* Set Product Image with Watermark */}
                  <div style={{ height: '170px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--slate-200)', background: '#f8fafc' }}>
                    <ProductImage 
                      src={set.image} 
                      alt={set.name} 
                      sku={set.sku} 
                      height="100%" 
                    />
                  </div>

                  {/* Details Column */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', background: 'var(--primary-light)', padding: '3px 10px', borderRadius: '4px' }}>
                        {set.pieces} INSTRUMENTS INCLUDED
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--slate-400)', fontFamily: 'monospace', fontWeight: '700' }}>
                        {set.sku}
                      </span>
                    </div>

                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--navy-dark)', marginBottom: '8px' }}>
                      {set.name}
                    </h2>

                    <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: '1.5', marginBottom: '16px' }}>
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

                  {/* Middle Column: Highlights Checklist */}
                  <div style={{ background: 'var(--slate-50)', padding: '20px', borderRadius: '12px', border: '1px solid var(--slate-200)' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--navy-dark)', textTransform: 'uppercase', marginBottom: '10px' }}>
                      Procurement Standards
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
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
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
                        onClick={onOpenQuote}
                      >
                        <FileText size={14} />
                        <span>Request Custom B2B RFQ</span>
                      </button>
                    </div>

                    <button 
                      onClick={() => toggleExpand(set.id)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary)', marginTop: '16px', cursor: 'pointer' }}
                    >
                      <span>{isExpanded ? 'Hide Bill of Materials' : `View All ${set.pieces} Pieces (BOM)`}</span>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {/* Expanded Itemized Bill of Materials (BOM) */}
                {isExpanded && (
                  <div style={{ padding: '24px 32px', background: '#fafcff', borderTop: '1px solid var(--slate-200)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--navy-dark)' }}>
                        Itemized Bill of Materials (BOM) & Tray Specifications
                      </h4>
                      <span style={{ fontSize: '0.78rem', color: 'var(--slate-500)' }}>
                        DIN Basket Dimensions: <strong>{set.trayDimensions}</strong>
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
                      {set.itemizedList.map((item, idx) => (
                        <div 
                          key={idx}
                          style={{
                            background: '#ffffff',
                            padding: '10px 14px',
                            borderRadius: '6px',
                            border: '1px solid var(--slate-200)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontSize: '0.825rem'
                          }}
                        >
                          <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', fontWeight: '800', width: '28px', height: '28px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.78rem' }}>
                            {item.qty}x
                          </span>
                          <span style={{ color: 'var(--slate-800)', fontWeight: '500' }}>
                            {item.item}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: '20px', padding: '14px', background: '#ffffff', borderRadius: '8px', border: '1px solid var(--slate-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--slate-600)' }}>
                        <ShieldCheck size={18} color="var(--primary)" />
                        <span>Need custom instrument substitutions or laser department marking? We configure trays to exact OR committee preferences.</span>
                      </div>
                      <button 
                        className="btn-secondary" 
                        style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                        onClick={() => onOpenEnquiry(set)}
                      >
                        Request Tray Customization
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
