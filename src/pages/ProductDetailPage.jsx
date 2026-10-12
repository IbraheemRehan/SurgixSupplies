import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  Truck, 
  CheckCircle2, 
  Star, 
  Plus, 
  Minus, 
  ShoppingCart, 
  FileText, 
  ArrowLeft, 
  Check, 
  Layers, 
  Sparkles, 
  Info,
  Clock,
  ArrowRight,
  Eye,
  FileDown
} from 'lucide-react';
import { ProductImage } from '../components/ProductImage';
import { surgicalInstruments } from '../data/instruments';
import { surgicalSets } from '../data/sets';

export function ProductDetailPage({ 
  product, 
  onAddToCart, 
  onNavigate, 
  onOpenQuote, 
  onOpenEnquiry,
  onSelectProduct 
}) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs', 'clinical', 'sterilization', 'certs'
  const [addedNotice, setAddedNotice] = useState(false);

  // If no product is provided, fallback to the first instrument
  const currentProduct = product || surgicalInstruments[0];

  // Determine bulk price calculation
  const getUnitPrice = (qty) => {
    if (qty >= 20 && currentProduct.bulkPrice) {
      return currentProduct.bulkPrice;
    }
    if (qty >= 5 && currentProduct.bulkPrice) {
      return (currentProduct.price + currentProduct.bulkPrice) / 2;
    }
    return currentProduct.price;
  };

  const currentUnitPrice = getUnitPrice(quantity);
  const totalPrice = currentUnitPrice * quantity;

  const handleAdd = () => {
    onAddToCart({ ...currentProduct, quantity });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2400);
  };

  // Find related items from the same category or overall catalog
  const relatedItems = surgicalInstruments
    .filter(item => item.id !== currentProduct.id && (item.category === currentProduct.category || !currentProduct.category))
    .slice(0, 4);

  // Also include 1 set if available
  const relatedSets = surgicalSets.slice(0, 2);

  return (
    <div className="product-detail-page" style={{ backgroundColor: '#f8fafc', minHeight: '85vh', paddingBottom: '70px' }}>
      
      {/* 1. Breadcrumbs Bar */}
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid var(--slate-200)', padding: '16px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: 'var(--slate-500)' }}>
              <button 
                onClick={() => onNavigate('home')} 
                style={{ color: 'var(--slate-600)', fontWeight: '500' }}
              >
                Home
              </button>
              <span>/</span>
              <button 
                onClick={() => onNavigate(currentProduct.pieces ? 'sets' : 'shop')} 
                style={{ color: 'var(--slate-600)', fontWeight: '500' }}
              >
                {currentProduct.pieces ? 'Instrument Sets' : 'Instruments Catalog'}
              </button>
              <span>/</span>
              <span style={{ color: 'var(--primary)', fontWeight: '700' }}>
                {currentProduct.sku}
              </span>
            </div>

            <button 
              onClick={() => onNavigate(currentProduct.pieces ? 'sets' : 'shop')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--slate-600)', fontWeight: '600' }}
            >
              <ArrowLeft size={14} />
              <span>Back to Catalog</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '28px' }}>
        
        {/* 2. Top Product Showcase: Left Photo, Right Specifications & Actions */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid var(--slate-200)', padding: '32px', boxShadow: '0 4px 16px rgba(13, 45, 94, 0.04)', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.25fr)', gap: '40px', alignItems: 'start' }}>
          
          {/* Left Column: Image View */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ 
              height: '420px', 
              width: '100%', 
              borderRadius: '12px', 
              overflow: 'hidden', 
              border: '1px solid var(--slate-200)', 
              backgroundColor: '#f8fafc',
              position: 'relative'
            }}>
              <ProductImage 
                src={currentProduct.image} 
                alt={currentProduct.name} 
                sku={currentProduct.sku} 
                height="100%" 
                showWatermark={true}
              />
            </div>

            {/* Quality Specs Under Image */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', backgroundColor: 'var(--slate-50)', borderRadius: '8px', border: '1px solid var(--slate-200)', fontSize: '0.78rem', color: 'var(--slate-700)' }}>
                <ShieldCheck size={16} color="var(--primary)" />
                <span>ASTM A967 Passivated</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', backgroundColor: 'var(--slate-50)', borderRadius: '8px', border: '1px solid var(--slate-200)', fontSize: '0.78rem', color: 'var(--slate-700)' }}>
                <CheckCircle2 size={16} color="var(--emerald-600)" />
                <span>Autoclave 134°C (500+ Cyc)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', backgroundColor: 'var(--slate-50)', borderRadius: '8px', border: '1px solid var(--slate-200)', fontSize: '0.78rem', color: 'var(--slate-700)' }}>
                <Award size={16} color="var(--primary)" />
                <span>German Martensitic Alloy</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', backgroundColor: 'var(--slate-50)', borderRadius: '8px', border: '1px solid var(--slate-200)', fontSize: '0.78rem', color: 'var(--slate-700)' }}>
                <Sparkles size={16} color="#d97706" />
                <span>Precision Calibrated</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Pricing, Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {/* SKU and In-Stock Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '0.06em', backgroundColor: 'var(--primary-light)', padding: '4px 10px', borderRadius: '4px' }}>
                {currentProduct.sku}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--emerald-600)', backgroundColor: 'var(--emerald-50)', padding: '4px 10px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Check size={13} />
                In Stock • Boston Warehouse (Ships 24h)
              </span>
              {currentProduct.pieces && (
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--navy-dark)', backgroundColor: 'var(--slate-100)', padding: '4px 10px', borderRadius: '4px' }}>
                  {currentProduct.pieces} Pieces Set
                </span>
              )}
            </div>

            {/* Product Title */}
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--navy-dark)', lineHeight: '1.25', margin: 0, letterSpacing: '-0.02em' }}>
              {currentProduct.name}
            </h1>

            {/* Ratings and Reviews */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#d97706' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#d97706" color="#d97706" />
                ))}
                <span style={{ fontWeight: '700', marginLeft: '4px' }}>{currentProduct.rating || '4.9'}</span>
              </div>
              <span style={{ color: 'var(--slate-400)' }}>•</span>
              <span style={{ color: 'var(--slate-600)' }}>{currentProduct.reviews || '34'} Verified Customer & Clinic Reviews</span>
            </div>

            {/* Pricing Section */}
            <div style={{ padding: '16px 20px', backgroundColor: 'var(--slate-50)', borderRadius: '10px', border: '1px solid var(--slate-200)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                <span style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--navy-dark)' }}>
                  ${currentUnitPrice.toFixed(2)}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--slate-500)' }}>
                  / unit (Direct Pricing)
                </span>
                {currentProduct.bulkPrice && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--emerald-600)', fontWeight: '700', marginLeft: 'auto' }}>
                    Bulk Discount Available
                  </span>
                )}
              </div>

              {/* Volume Discount Tiers */}
              <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '0.78rem' }}>
                <div style={{ padding: '6px 8px', borderRadius: '6px', backgroundColor: quantity < 5 ? '#ffffff' : 'transparent', border: quantity < 5 ? '1px solid var(--primary)' : '1px solid var(--slate-200)', textAlign: 'center' }}>
                  <div style={{ fontWeight: '700', color: 'var(--navy-dark)' }}>1 - 4 Units</div>
                  <div style={{ color: 'var(--slate-600)' }}>${currentProduct.price.toFixed(2)} ea</div>
                </div>
                <div style={{ padding: '6px 8px', borderRadius: '6px', backgroundColor: quantity >= 5 && quantity < 20 ? '#ffffff' : 'transparent', border: quantity >= 5 && quantity < 20 ? '1px solid var(--primary)' : '1px solid var(--slate-200)', textAlign: 'center' }}>
                  <div style={{ fontWeight: '700', color: 'var(--navy-dark)' }}>5 - 19 Units</div>
                  <div style={{ color: 'var(--emerald-600)', fontWeight: '600' }}>
                    ${(currentProduct.bulkPrice ? (currentProduct.price + currentProduct.bulkPrice)/2 : currentProduct.price * 0.9).toFixed(2)} ea
                  </div>
                </div>
                <div style={{ padding: '6px 8px', borderRadius: '6px', backgroundColor: quantity >= 20 ? '#ffffff' : 'transparent', border: quantity >= 20 ? '1px solid var(--primary)' : '1px solid var(--slate-200)', textAlign: 'center' }}>
                  <div style={{ fontWeight: '700', color: 'var(--navy-dark)' }}>20+ Bulk Pack</div>
                  <div style={{ color: 'var(--emerald-600)', fontWeight: '700' }}>
                    ${(currentProduct.bulkPrice || currentProduct.price * 0.85).toFixed(2)} ea
                  </div>
                </div>
              </div>
            </div>

            {/* Description Paragraph */}
            <p style={{ fontSize: '0.925rem', color: 'var(--slate-600)', lineHeight: '1.6', margin: 0 }}>
              {currentProduct.description || currentProduct.summary || "Precision operating room surgical instrument manufactured in strict compliance with ASTM F899 standards. Designed for ergonomic surgeon tactile feel and maximum longevity across high-turnover autoclave reprocessing cycles."}
            </p>

            {/* Key Spec Highlights */}
            {currentProduct.features && (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {currentProduct.features.map((feat, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: 'var(--slate-700)' }}>
                    <CheckCircle2 size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Quantity Controls & Add to Cart */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '8px', flexWrap: 'wrap' }}>
              {/* Counter */}
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--slate-300)', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '10px 14px', backgroundColor: 'var(--slate-50)', color: 'var(--slate-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Minus size={16} />
                </button>
                <span style={{ padding: '10px 18px', fontSize: '1rem', fontWeight: '700', minWidth: '40px', textAlign: 'center', color: 'var(--navy-dark)' }}>
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ padding: '10px 14px', backgroundColor: 'var(--slate-50)', color: 'var(--slate-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button 
                className="btn-primary" 
                style={{ padding: '12px 28px', fontSize: '1rem', borderRadius: '8px', flex: 1, minWidth: '220px', boxShadow: '0 4px 14px rgba(0, 119, 200, 0.3)' }}
                onClick={handleAdd}
              >
                <ShoppingCart size={18} />
                <span>Add to Cart (${totalPrice.toFixed(2)})</span>
              </button>
            </div>

            {/* Added Notice Toast */}
            {addedNotice && (
              <div style={{ backgroundColor: 'var(--emerald-50)', border: '1px solid rgba(5, 150, 105, 0.3)', padding: '10px 16px', borderRadius: '8px', color: 'var(--emerald-600)', fontSize: '0.85rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} />
                <span>{quantity}x {currentProduct.name} added to cart!</span>
                <button 
                  onClick={() => onNavigate('cart')}
                  style={{ marginLeft: 'auto', textDecoration: 'underline', color: 'var(--navy-dark)' }}
                >
                  View Cart →
                </button>
              </div>
            )}

            {/* Secondary Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '4px' }}>
              <button 
                className="btn-secondary" 
                style={{ padding: '10px', fontSize: '0.85rem', borderRadius: '8px', justifyContent: 'center' }}
                onClick={onOpenQuote}
              >
                <FileDown size={15} />
                <span>Request Bulk / Wholesale Quote</span>
              </button>

              <button 
                className="btn-secondary" 
                style={{ padding: '10px', fontSize: '0.85rem', borderRadius: '8px', justifyContent: 'center' }}
                onClick={() => onOpenEnquiry(currentProduct)}
              >
                <Info size={15} />
                <span>Product Direct Inquiry</span>
              </button>
            </div>

            {/* Free Shipping Alert */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--slate-500)', borderTop: '1px solid var(--slate-100)', paddingTop: '12px' }}>
              <Truck size={15} color="var(--primary)" />
              <span>Orders over $500 qualify for Free Nationwide Insured Shipping</span>
            </div>

          </div>

        </div>

        {/* 3. Detailed Specifications Tabs Section */}
        <div style={{ marginTop: '36px', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid var(--slate-200)', overflow: 'hidden', boxShadow: '0 4px 16px rgba(13, 45, 94, 0.04)' }}>
          
          {/* Tab Headers */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--slate-200)', backgroundColor: 'var(--slate-50)', overflowX: 'auto' }}>
            <button 
              onClick={() => setActiveTab('specs')}
              style={{ padding: '16px 24px', fontSize: '0.9rem', fontWeight: '700', color: activeTab === 'specs' ? 'var(--primary)' : 'var(--slate-600)', borderBottom: activeTab === 'specs' ? '3px solid var(--primary)' : '3px solid transparent', backgroundColor: activeTab === 'specs' ? '#ffffff' : 'transparent', whiteSpace: 'nowrap' }}
            >
              Metallurgy & Specifications
            </button>
            <button 
              onClick={() => setActiveTab('clinical')}
              style={{ padding: '16px 24px', fontSize: '0.9rem', fontWeight: '700', color: activeTab === 'clinical' ? 'var(--primary)' : 'var(--slate-600)', borderBottom: activeTab === 'clinical' ? '3px solid var(--primary)' : '3px solid transparent', backgroundColor: activeTab === 'clinical' ? '#ffffff' : 'transparent', whiteSpace: 'nowrap' }}
            >
              Clinical Applications
            </button>
            <button 
              onClick={() => setActiveTab('sterilization')}
              style={{ padding: '16px 24px', fontSize: '0.9rem', fontWeight: '700', color: activeTab === 'sterilization' ? 'var(--primary)' : 'var(--slate-600)', borderBottom: activeTab === 'sterilization' ? '3px solid var(--primary)' : '3px solid transparent', backgroundColor: activeTab === 'sterilization' ? '#ffffff' : 'transparent', whiteSpace: 'nowrap' }}
            >
              Reprocessing & Autoclave Protocol
            </button>
            <button 
              onClick={() => setActiveTab('certs')}
              style={{ padding: '16px 24px', fontSize: '0.9rem', fontWeight: '700', color: activeTab === 'certs' ? 'var(--primary)' : 'var(--slate-600)', borderBottom: activeTab === 'certs' ? '3px solid var(--primary)' : '3px solid transparent', backgroundColor: activeTab === 'certs' ? '#ffffff' : 'transparent', whiteSpace: 'nowrap' }}
            >
              Compliance & Certifications
            </button>
          </div>

          {/* Tab Body */}
          <div style={{ padding: '32px' }}>
            {activeTab === 'specs' && (
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--navy-dark)', marginBottom: '16px' }}>
                  Engineering & Metallurgical Parameters
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                  <div style={{ border: '1px solid var(--slate-200)', borderRadius: '8px', padding: '14px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', textTransform: 'uppercase', fontWeight: '700' }}>Stainless Steel Alloy</span>
                    <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--navy-dark)', marginTop: '2px' }}>{currentProduct.steel || 'AISI 420 Martensitic Medical Grade'}</div>
                  </div>
                  <div style={{ border: '1px solid var(--slate-200)', borderRadius: '8px', padding: '14px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', textTransform: 'uppercase', fontWeight: '700' }}>Rockwell Hardness Rating</span>
                    <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--navy-dark)', marginTop: '2px' }}>{currentProduct.rockwell || 'HRC 54 - 58'}</div>
                  </div>
                  <div style={{ border: '1px solid var(--slate-200)', borderRadius: '8px', padding: '14px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', textTransform: 'uppercase', fontWeight: '700' }}>Surface Finish</span>
                    <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--navy-dark)', marginTop: '2px' }}>{currentProduct.finish || 'Electropolished Satin Non-Glare'}</div>
                  </div>
                  <div style={{ border: '1px solid var(--slate-200)', borderRadius: '8px', padding: '14px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', textTransform: 'uppercase', fontWeight: '700' }}>Nominal Length / Gauge</span>
                    <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--navy-dark)', marginTop: '2px' }}>{currentProduct.size || currentProduct.trayDimensions || 'Standard Surgical Scale'}</div>
                  </div>
                  <div style={{ border: '1px solid var(--slate-200)', borderRadius: '8px', padding: '14px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', textTransform: 'uppercase', fontWeight: '700' }}>Passivation Standard</span>
                    <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--navy-dark)', marginTop: '2px' }}>ASTM A967 Citric / Nitric Acid Passivation</div>
                  </div>
                  <div style={{ border: '1px solid var(--slate-200)', borderRadius: '8px', padding: '14px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', textTransform: 'uppercase', fontWeight: '700' }}>Traceability</span>
                    <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--navy-dark)', marginTop: '2px' }}>Laser-Etched Heat Lot Code & 2D Data Matrix</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'clinical' && (
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--navy-dark)', marginBottom: '12px' }}>
                  Surgical & Operating Room Suitability
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: '1.6', marginBottom: '16px' }}>
                  Configured specifically for sterile operative fields in general, thoracic, orthopedic, and cardiovascular surgery suites. Designed to minimize hand fatigue during prolonged interventions with balanced weight distribution and hand-honed blade bevels.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                  <div style={{ padding: '12px', backgroundColor: 'var(--slate-50)', borderRadius: '8px', border: '1px solid var(--slate-200)' }}>
                    <strong style={{ color: 'var(--navy-dark)', display: 'block', fontSize: '0.85rem' }}>General & Laparotomy</strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--slate-600)' }}>Tissue dissection, pedicle clamp, vascular control</span>
                  </div>
                  <div style={{ padding: '12px', backgroundColor: 'var(--slate-50)', borderRadius: '8px', border: '1px solid var(--slate-200)' }}>
                    <strong style={{ color: 'var(--navy-dark)', display: 'block', fontSize: '0.85rem' }}>Trauma & Orthopedic</strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--slate-600)' }}>Fracture exposure, periosteal manipulation</span>
                  </div>
                  <div style={{ padding: '12px', backgroundColor: 'var(--slate-50)', borderRadius: '8px', border: '1px solid var(--slate-200)' }}>
                    <strong style={{ color: 'var(--navy-dark)', display: 'block', fontSize: '0.85rem' }}>Ambulatory Surgery Centers</strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--slate-600)' }}>Rapid turnaround tray integration and clinic packs</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sterilization' && (
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--navy-dark)', marginBottom: '12px' }}>
                  Decontamination & Autoclave Protocol (AAMI ST79)
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: '1.6', marginBottom: '16px' }}>
                  All Surgix instruments undergo cryogenic tempering and complete acid passivation per ASTM A967, ensuring superior resistance to pitting, intergranular corrosion, and autoclave oxidation.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                  <div style={{ padding: '14px', border: '1px solid var(--slate-200)', borderRadius: '8px' }}>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--navy-dark)', display: 'block', marginBottom: '4px' }}>Pre-Vacuum Steam Autoclave</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--slate-600)' }}>Temperature: 134°C (273°F) for 4 minutes exposure, 30 minutes dry cycle.</div>
                  </div>
                  <div style={{ padding: '14px', border: '1px solid var(--slate-200)', borderRadius: '8px' }}>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--navy-dark)', display: 'block', marginBottom: '4px' }}>Gravity Displacement Cycle</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--slate-600)' }}>Temperature: 121°C (250°F) for 30 minutes cycle.</div>
                  </div>
                  <div style={{ padding: '14px', border: '1px solid var(--slate-200)', borderRadius: '8px' }}>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--navy-dark)', display: 'block', marginBottom: '4px' }}>Enzymatic Cleaning pH</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--slate-600)' }}>Maintain neutral pH 7.0 - 8.5 solution. Avoid chlorinated detergents.</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'certs' && (
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--navy-dark)', marginBottom: '12px' }}>
                  Quality Standards, Compliance & Regulatory Traceability
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  <div style={{ padding: '16px', border: '1px solid var(--slate-200)', borderRadius: '8px', backgroundColor: 'var(--slate-50)' }}>
                    <div style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '1rem' }}>ISO 13485:2016</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--slate-600)', marginTop: '4px' }}>Medical Devices Quality Management Systems</div>
                  </div>
                  <div style={{ padding: '16px', border: '1px solid var(--slate-200)', borderRadius: '8px', backgroundColor: 'var(--slate-50)' }}>
                    <div style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '1rem' }}>FDA Registered</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--slate-600)', marginTop: '4px' }}>Class I & II Surgical Device Establishment Listing</div>
                  </div>
                  <div style={{ padding: '16px', border: '1px solid var(--slate-200)', borderRadius: '8px', backgroundColor: 'var(--slate-50)' }}>
                    <div style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '1rem' }}>CE Mark / EU MDR</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--slate-600)', marginTop: '4px' }}>Conforms to Regulation (EU) 2017/745 for Surgical Devices</div>
                  </div>
                  <div style={{ padding: '16px', border: '1px solid var(--slate-200)', borderRadius: '8px', backgroundColor: 'var(--slate-50)' }}>
                    <div style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '1rem' }}>Certified MTR</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--slate-600)', marginTop: '4px' }}>Batch Mill Test Report enclosed with shipment</div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* 4. Related Instruments Showcase */}
        {relatedItems.length > 0 && (
          <div style={{ marginTop: '48px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--navy-dark)', margin: 0 }}>
                  Frequently Procured Together
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)', marginTop: '2px', margin: 0 }}>
                  Complementary operating room instruments with matched metallurgical specs
                </p>
              </div>
              <button 
                onClick={() => onNavigate('shop')}
                style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <span>View All Instruments</span>
                <ArrowRight size={15} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              {relatedItems.map(item => (
                <div 
                  key={item.id}
                  style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid var(--slate-200)', overflow: 'hidden', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onClick={() => {
                    onSelectProduct(item);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div style={{ height: '180px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--slate-100)', backgroundColor: '#ffffff' }}>
                    <ProductImage src={item.image} alt={item.name} sku={item.sku} height="100%" showWatermark={true} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--primary)' }}>{item.sku}</span>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--slate-800)', lineHeight: '1.3', marginTop: '2px' }}>{item.name}</h4>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid var(--slate-100)' }}>
                    <span style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--navy-dark)' }}>${item.price.toFixed(2)}</span>
                    <button 
                      className="btn-primary" 
                      style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(item);
                      }}
                    >
                      <ShoppingCart size={13} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
