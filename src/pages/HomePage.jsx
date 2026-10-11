import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Award, 
  Truck, 
  Layers, 
  ArrowRight, 
  Check, 
  Star, 
  Sparkles, 
  Zap, 
  ChevronRight,
  ChevronLeft,
  Eye,
  ShoppingCart,
  FileText,
  Building2,
  CheckCircle2,
  Lock,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { surgicalInstruments } from '../data/instruments';
import { surgicalSets } from '../data/sets';
import { steelGradesInfo } from '../data/certificates';
import { ProductImage } from '../components/ProductImage';

export function HomePage({ 
  onNavigate, 
  onOpenProductModal, 
  onAddToCart, 
  onOpenQuote, 
  onOpenEnquiry,
  onSelectProduct 
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Hero Carousel Slides Data
  const slides = [
    {
      id: 1,
      image: '/assets/hero-modern-or.jpg',
      badge: 'US-BASED HOSPITAL SUPPLY • DIRECT FACTORY EXPORT PRICING',
      title: 'Hospital-Grade Surgical Instruments & Precision Sets',
      subtitle: 'Engineered from German-forged stainless steel with 100% ASTM A967 passivation. Serving over 450+ medical centers, surgical suites, and procurement networks nationwide.',
      primaryBtnText: 'Explore Instruments Catalog',
      primaryAction: () => onNavigate('shop'),
      secondaryBtnText: 'Request Institutional RFQ',
      secondaryAction: onOpenQuote
    },
    {
      id: 2,
      image: '/assets/products/cardio-thoracic-set.jpg',
      badge: 'COMPREHENSIVE OR SUITES • DIN STERILIZATION BASKETS',
      title: 'Complete Operating Room Trays & Sterilization Sets',
      subtitle: 'Standardized major laparotomy, cardiovascular, orthopedic trauma, and clinic surgery sets configured strictly to US hospital procurement protocols.',
      primaryBtnText: 'View Surgical Sets & Trays',
      primaryAction: () => onNavigate('sets'),
      secondaryBtnText: 'Quality Documentation',
      secondaryAction: () => onNavigate('quality-docs')
    },
    {
      id: 3,
      image: '/assets/products/ortho-trauma-set.jpg',
      badge: 'METALLURGY EXCELLENCE • 500+ AUTOCLAVE CYCLES',
      title: 'German Martensitic Alloys with Tungsten Carbide Inserts',
      subtitle: 'Rockwell hardness calibrated to HRC 54–58 with diamond-pyramid grip jaws. Certified Mill Test Reports (MTR) and traceability lot codes enclosed with every delivery.',
      primaryBtnText: 'View Metallurgy Standards',
      primaryAction: () => onNavigate('quality'),
      secondaryBtnText: 'Request Instant B2B Quote',
      secondaryAction: onOpenQuote
    }
  ];

  // Auto-advance slides every 5.5 seconds unless user hovers
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const featuredProducts = surgicalInstruments.slice(0, 4);
  const featuredSets = surgicalSets.slice(0, 3);

  const handleProductClick = (item) => {
    if (onSelectProduct) {
      onSelectProduct(item);
    } else if (onOpenProductModal) {
      onOpenProductModal(item);
    }
  };

  return (
    <div className="home-page-root">
      
      {/* 1. HERO SLIDER BANNER (No logo, full thematic background images behind typography) */}
      <section 
        className="hero-slider-section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          position: 'relative',
          height: '620px',
          overflow: 'hidden',
          backgroundColor: '#091c38'
        }}
      >
        {/* Carousel Slides */}
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'scale(1)' : 'scale(1.04)',
                transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out',
                pointerEvents: isActive ? 'auto' : 'none',
                zIndex: isActive ? 2 : 1
              }}
            >
              {/* High-Resolution Thematic Medical Background Image */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  transform: isActive ? 'scale(1)' : 'scale(1.05)',
                  transition: 'transform 6s ease-out'
                }}
              />

              {/* Rich Multi-Layer Dark Gradient Overlay ensuring crystal-clear text readability */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, rgba(7, 24, 52, 0.94) 0%, rgba(9, 28, 56, 0.82) 55%, rgba(9, 28, 56, 0.65) 100%)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at 20% 50%, rgba(0, 119, 200, 0.22) 0%, transparent 60%)'
                }}
              />

              {/* Slide Content */}
              <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', zIndex: 3 }}>
                <div style={{ maxWidth: '720px', color: '#ffffff' }}>
                  
                  {/* Subtle Badge */}
                  <div style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    background: 'rgba(255, 255, 255, 0.12)', 
                    border: '1px solid rgba(255, 255, 255, 0.25)', 
                    backdropFilter: 'blur(8px)',
                    borderRadius: '9999px', 
                    padding: '6px 16px', 
                    fontSize: '0.78rem', 
                    fontWeight: '700', 
                    letterSpacing: '0.05em', 
                    marginBottom: '20px' 
                  }}>
                    <Sparkles size={14} color="#38bdf8" />
                    <span>{slide.badge}</span>
                  </div>

                  {/* Main Title */}
                  <h1 style={{ 
                    fontSize: 'clamp(2.2rem, 4.2vw, 3.5rem)', 
                    fontWeight: '900', 
                    lineHeight: '1.14', 
                    marginBottom: '18px', 
                    letterSpacing: '-0.025em',
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                  }}>
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p style={{ 
                    fontSize: '1.08rem', 
                    color: '#e2e8f0', 
                    lineHeight: '1.65', 
                    marginBottom: '34px', 
                    maxWidth: '640px',
                    textShadow: '0 1px 4px rgba(0,0,0,0.4)'
                  }}>
                    {slide.subtitle}
                  </p>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <button 
                      className="btn-primary" 
                      style={{ 
                        padding: '14px 28px', 
                        fontSize: '0.95rem', 
                        background: 'var(--primary)', 
                        boxShadow: '0 4px 18px rgba(0, 119, 200, 0.45)',
                        borderRadius: '8px'
                      }}
                      onClick={slide.primaryAction}
                    >
                      <span>{slide.primaryBtnText}</span>
                      <ArrowRight size={17} />
                    </button>

                    <button 
                      className="btn-secondary" 
                      style={{ 
                        padding: '14px 24px', 
                        fontSize: '0.95rem', 
                        background: 'rgba(255, 255, 255, 0.12)', 
                        color: '#ffffff', 
                        borderColor: 'rgba(255, 255, 255, 0.35)',
                        backdropFilter: 'blur(6px)',
                        borderRadius: '8px'
                      }}
                      onClick={slide.secondaryAction}
                    >
                      <FileText size={17} />
                      <span>{slide.secondaryBtnText}</span>
                    </button>
                  </div>

                </div>
              </div>
            </div>
          );
        })}

        {/* Carousel Controls: Previous / Next Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          style={{
            position: 'absolute',
            left: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          style={{
            position: 'absolute',
            right: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <ChevronRight size={22} />
        </button>

        {/* Slide Pagination Indicator Dots */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            gap: '10px'
          }}
        >
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: idx === currentSlide ? '32px' : '10px',
                height: '10px',
                borderRadius: '999px',
                backgroundColor: idx === currentSlide ? 'var(--primary)' : 'rgba(255, 255, 255, 0.4)',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
            />
          ))}
        </div>
      </section>

      {/* 2. VALUE PROPOSITION STRIP */}
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid var(--slate-200)', padding: '22px 0', boxShadow: '0 2px 6px rgba(13, 45, 94, 0.03)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShieldCheck size={22} />
              </div>
              <div>
                <div style={{ fontWeight: '800', fontSize: '0.9rem', color: 'var(--navy-dark)' }}>ASTM F899 Stainless</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)' }}>100% Passivated & Tested</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'var(--emerald-50)', color: 'var(--emerald-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Truck size={22} />
              </div>
              <div>
                <div style={{ fontWeight: '800', fontSize: '0.9rem', color: 'var(--navy-dark)' }}>Free Shipping Over $500</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)' }}>Nationwide Sterile Freight</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Clock size={22} />
              </div>
              <div>
                <div style={{ fontWeight: '800', fontSize: '0.9rem', color: 'var(--navy-dark)' }}>Ships Within 24 Hours</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)' }}>Boston Logistics Warehouse</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'var(--slate-100)', color: 'var(--navy-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Building2 size={22} />
              </div>
              <div>
                <div style={{ fontWeight: '800', fontSize: '0.9rem', color: 'var(--navy-dark)' }}>Hospital Net-30 PO</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)' }}>Instant Institutional Terms</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FEATURED SURGICAL INSTRUMENTS (Direct link to Product Details Page!) */}
      <section style={{ padding: '64px 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
                Precision Catalog
              </div>
              <h2 style={{ fontSize: '1.875rem', fontWeight: '900', color: 'var(--navy-dark)', letterSpacing: '-0.02em', margin: 0 }}>
                Bestselling Operating Room Instruments
              </h2>
            </div>
            <button 
              className="btn-secondary" 
              onClick={() => onNavigate('shop')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', padding: '10px 18px', backgroundColor: '#ffffff' }}
            >
              <span>Explore All Instruments</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Product Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {featuredProducts.map((prod) => (
              <div 
                key={prod.id} 
                style={{ 
                  backgroundColor: '#ffffff', 
                  borderRadius: '12px', 
                  border: '1px solid var(--slate-200)', 
                  overflow: 'hidden', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  cursor: 'pointer'
                }}
                onClick={() => handleProductClick(prod)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(13, 45, 94, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Product Photo */}
                <div style={{ height: '220px', width: '100%', borderBottom: '1px solid var(--slate-100)', backgroundColor: '#ffffff', position: 'relative' }}>
                  <ProductImage 
                    src={prod.image} 
                    alt={prod.name} 
                    sku={prod.sku} 
                    height="100%" 
                    showWatermark={true}
                  />
                  <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 2 }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: '800', backgroundColor: 'var(--primary)', color: '#ffffff', padding: '3px 8px', borderRadius: '4px' }}>
                      {prod.sku}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#d97706', marginBottom: '6px' }}>
                    <Star size={13} fill="#d97706" color="#d97706" />
                    <span style={{ fontWeight: '700' }}>{prod.rating}</span>
                    <span style={{ color: 'var(--slate-400)' }}>({prod.reviews})</span>
                  </div>

                  <h3 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--slate-800)', lineHeight: '1.35', marginBottom: '8px' }}>
                    {prod.name}
                  </h3>

                  <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)', lineHeight: '1.5', marginBottom: '16px', flex: 1 }}>
                    {prod.steel} • {prod.rockwell}
                  </p>

                  {/* Price & Action Row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--slate-100)', paddingTop: '14px', marginTop: 'auto' }}>
                    <div>
                      <span style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--navy-dark)' }}>
                        ${prod.price.toFixed(2)}
                      </span>
                      {prod.bulkPrice && (
                        <div style={{ fontSize: '0.7rem', color: 'var(--emerald-600)', fontWeight: '600' }}>
                          Bulk: ${prod.bulkPrice.toFixed(2)}
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button 
                        className="btn-secondary"
                        style={{ padding: '8px 10px', fontSize: '0.78rem' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductClick(prod);
                        }}
                        title="View Full Product Details"
                      >
                        <Eye size={14} />
                      </button>

                      <button 
                        className="btn-primary"
                        style={{ padding: '8px 14px', fontSize: '0.8rem' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(prod);
                        }}
                      >
                        <ShoppingCart size={14} />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. COMPLETE SURGICAL SETS & TRAYS SHOWCASE */}
      <section style={{ padding: '64px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
                Sterilization Ready
              </div>
              <h2 style={{ fontSize: '1.875rem', fontWeight: '900', color: 'var(--navy-dark)', letterSpacing: '-0.02em', margin: 0 }}>
                Major Hospital Procedure Sets & Sterilization Trays
              </h2>
            </div>
            <button 
              className="btn-secondary" 
              onClick={() => onNavigate('sets')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', padding: '10px 18px' }}
            >
              <span>Explore All Sets</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {featuredSets.map((set) => (
              <div 
                key={set.id}
                style={{ 
                  borderRadius: '14px', 
                  border: '1px solid var(--slate-200)', 
                  overflow: 'hidden', 
                  backgroundColor: '#ffffff',
                  boxShadow: '0 4px 16px rgba(13, 45, 94, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer'
                }}
                onClick={() => handleProductClick(set)}
              >
                <div style={{ height: '220px', width: '100%', position: 'relative', backgroundColor: '#f8fafc' }}>
                  <ProductImage src={set.image} alt={set.name} sku={set.sku} height="100%" showWatermark={true} />
                  <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: '800', backgroundColor: 'var(--navy-dark)', color: '#ffffff', padding: '4px 10px', borderRadius: '4px' }}>
                      {set.pieces} PIECES
                    </span>
                  </div>
                </div>

                <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '4px' }}>
                    {set.specialty}
                  </span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--navy-dark)', lineHeight: '1.3', marginBottom: '10px' }}>
                    {set.name}
                  </h3>
                  <p style={{ fontSize: '0.825rem', color: 'var(--slate-600)', lineHeight: '1.55', marginBottom: '18px', flex: 1 }}>
                    {set.summary}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--slate-100)' }}>
                    <div>
                      <span style={{ fontSize: '1.35rem', fontWeight: '900', color: 'var(--navy-dark)' }}>
                        ${set.price.toFixed(2)}
                      </span>
                      {set.listPrice && (
                        <span style={{ fontSize: '0.85rem', color: 'var(--slate-400)', textDecoration: 'line-through', marginLeft: '8px' }}>
                          ${set.listPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button 
                      className="btn-primary"
                      style={{ padding: '10px 18px', fontSize: '0.85rem' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(set);
                      }}
                    >
                      <ShoppingCart size={15} />
                      <span>Order Tray</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. METALLURGY QUALITY BREAKDOWN */}
      <section style={{ padding: '64px 0', backgroundColor: 'var(--navy-dark)', color: '#ffffff' }}>
        <div className="container">
          <div style={{ maxWidth: '640px', marginBottom: '40px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#38bdf8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
              Metallurgy & Traceability
            </div>
            <h2 style={{ fontSize: '1.9rem', fontWeight: '900', letterSpacing: '-0.02em', margin: 0 }}>
              Forged to Withstand 500+ Autoclave Turns
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginTop: '10px', lineHeight: '1.6' }}>
              Every instrument blank is hot-drop forged from verified German steel compositions, cryogenic tempered, and chemical passivated per ASTM A967.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {steelGradesInfo.map((steel, idx) => (
              <div key={idx} style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '12px', padding: '24px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#38bdf8', letterSpacing: '0.05em' }}>
                  {steel.grade}
                </span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginTop: '6px', marginBottom: '10px' }}>
                  {steel.name}
                </h4>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '12px' }}>
                  Hardness: <strong style={{ color: '#ffffff' }}>{steel.hardness}</strong> • {steel.type}
                </div>
                <p style={{ fontSize: '0.825rem', color: '#cbd5e1', lineHeight: '1.55', margin: 0 }}>
                  {steel.usage}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '36px', textAlign: 'center' }}>
            <button 
              className="btn-secondary"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.25)', padding: '12px 24px', fontSize: '0.9rem' }}
              onClick={() => onNavigate('quality-docs')}
            >
              <span>Download Material Test Reports (MTR) & Certifications</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION PROCUREMENT STRIP */}
      <section style={{ padding: '60px 0', backgroundColor: '#f1f5f9' }}>
        <div className="container">
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid var(--slate-200)', padding: '40px', boxShadow: '0 8px 24px rgba(13, 45, 94, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ maxWidth: '600px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--navy-dark)', marginBottom: '8px' }}>
                Need a Custom Surgery Pack or Bulk Hospital RFP Quote?
              </h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--slate-600)', lineHeight: '1.6', margin: 0 }}>
                Our Boston procurement team reviews institutional tenders, GPO agreements, and ASC expansions with guaranteed factory pricing within 4 business hours.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button 
                className="btn-primary" 
                style={{ padding: '14px 28px', fontSize: '0.95rem' }}
                onClick={onOpenQuote}
              >
                <span>Request B2B RFQ Quote</span>
                <ArrowRight size={16} />
              </button>
              <button 
                className="btn-secondary" 
                style={{ padding: '14px 24px', fontSize: '0.95rem' }}
                onClick={() => onNavigate('contact')}
              >
                <span>Contact Purchasing Desk</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
