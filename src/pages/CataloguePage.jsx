import React, { useState } from 'react';
import { 
  BookOpen, 
  ArrowRight, 
  Search, 
  Send, 
  Download, 
  FileText, 
  CheckCircle2, 
  Filter, 
  Eye, 
  ShoppingCart,
  Printer,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { surgicalInstruments } from '../data/instruments';
import { surgicalSets } from '../data/sets';

export function CataloguePage({ 
  onOpenProductModal, 
  onAddToCart, 
  onOpenQuote, 
  onOpenEnquiry 
}) {
  const [activeCatalogTab, setActiveCatalogTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [catalogueViewerOpen, setCatalogueViewerOpen] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);
  const [physicalRequested, setPhysicalRequested] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredInstruments = surgicalInstruments.filter((item) => {
    const matchesCategory = activeCatalogTab === 'all' || item.category === activeCatalogTab;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.steel.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownloadPdf = () => {
    setPdfDownloaded(true);
    setTimeout(() => {
      // Simulate real file download trigger
      const link = document.createElement('a');
      link.href = '#';
      link.setAttribute('download', 'Surgix_Supplies_2026_Master_Catalogue.pdf');
      setPdfDownloaded(false);
      alert('Surgix Supplies 2026 Master Surgical Catalogue (PDF Edition - 128 Pages) download initialized.');
    }, 1500);
  };

  const handleRequestPhysical = (e) => {
    e.preventDefault();
    setPhysicalRequested(true);
    setTimeout(() => setPhysicalRequested(false), 4000);
  };

  return (
    <div className="catalogue-page-root">
      {/* 1. HERO SECTION (EXACT MATCH TO IMAGE 2) */}
      <section className="catalogue-hero">
        <div className="container">
          {/* Blue Open Book Icon (Matches Image 2) */}
          <div className="catalogue-icon-badge">
            <BookOpen size={48} strokeWidth={1.75} />
          </div>

          {/* Title in Serif Font (Matches Image 2) */}
          <h1 className="catalogue-hero-title">
            Surgical Instrument Catalogue
          </h1>

          {/* Subtitle (Matches Image 2) */}
          <p className="catalogue-hero-subtitle">
            Use our searchable online catalogue for current prices, availability, categories, and instrument sets.
          </p>

          {/* CTA Button: Open Catalogue -> (Matches Image 2) */}
          <button 
            className="catalogue-cta-btn"
            onClick={() => {
              setCatalogueViewerOpen(true);
              const element = document.getElementById('searchable-catalogue-section');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span>Open Catalogue</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* 2. TWO FEATURE CARDS UNDER HERO (Matches Image 2) */}
      <section style={{ padding: '48px 0 64px 0', background: '#ffffff', borderBottom: '1px solid var(--slate-200)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', maxWidth: '1000px', margin: '0 auto' }}>
            {/* Card 1: Searchable Online Database */}
            <div 
              style={{ 
                border: '1.5px solid var(--slate-200)', 
                borderRadius: '16px', 
                padding: '32px', 
                background: '#ffffff',
                boxShadow: '0 4px 12px rgba(13, 45, 94, 0.05)',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '16px' }}>
                <Search size={22} />
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--navy-dark)', marginBottom: '8px' }}>
                Searchable Digital Index
              </h3>

              <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
                Query our live stock database by instrument name, cross-reference competitor SKUs, or filter by medical specialty and German steel metallurgy grade.
              </p>

              <button 
                className="btn-primary" 
                style={{ padding: '10px 18px', width: 'fit-content' }}
                onClick={() => {
                  const el = document.getElementById('searchable-catalogue-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Browse Online Index</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Card 2: Export & Procurement Assistance */}
            <div 
              style={{ 
                border: '1.5px solid var(--slate-200)', 
                borderRadius: '16px', 
                padding: '32px', 
                background: '#ffffff',
                boxShadow: '0 4px 12px rgba(13, 45, 94, 0.05)',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '16px' }}>
                <Send size={22} />
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--navy-dark)', marginBottom: '8px' }}>
                Request Printed Catalog / RFQ
              </h3>

              <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
                Receive our comprehensive 128-page hardbound hospital catalog delivered directly to your Materials Management or Surgical Services department.
              </p>

              <button 
                className="btn-secondary" 
                style={{ padding: '10px 18px', width: 'fit-content' }}
                onClick={() => {
                  const el = document.getElementById('printed-catalog-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Request Hardbound Copy</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE DIGITAL CATALOGUE & SKU LOOKUP SECTION */}
      <section id="searchable-catalogue-section" style={{ padding: '64px 0', background: '#f8fafc' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                2026 Edition Master Index
              </span>
              <h2 style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--navy-dark)', marginTop: '2px' }}>
                Live Surgical Instruments & Trays Directory
              </h2>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                className="btn-primary"
                style={{ padding: '10px 18px', fontSize: '0.875rem' }}
                onClick={handleDownloadPdf}
              >
                <Download size={16} />
                <span>{pdfDownloaded ? 'Generating PDF...' : 'Download Full PDF Catalogue (128 Pages)'}</span>
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div style={{ background: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--slate-200)', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'All Catalog' },
                { id: 'scissors', label: 'Scissors & Shears' },
                { id: 'forceps', label: 'Hemostats & Forceps' },
                { id: 'needle-holders', label: 'Needle Holders (TC)' },
                { id: 'retractors', label: 'Retractors' },
                { id: 'orthopedic', label: 'Orthopedic' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontSize: '0.8125rem',
                    fontWeight: '600',
                    background: activeCatalogTab === tab.id ? 'var(--navy-dark)' : 'var(--slate-100)',
                    color: activeCatalogTab === tab.id ? '#ffffff' : 'var(--slate-700)',
                    transition: 'all 0.15s ease'
                  }}
                  onClick={() => setActiveCatalogTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div style={{ minWidth: '280px', position: 'relative' }}>
              <input
                type="text"
                className="form-input"
                style={{ padding: '8px 12px 8px 36px', fontSize: '0.85rem' }}
                placeholder="Search by SKU, tip size, steel grade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={16} color="var(--slate-400)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Interactive Catalog Table View */}
          <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid var(--slate-200)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: 'var(--slate-100)', borderBottom: '1px solid var(--slate-200)', color: 'var(--navy-dark)', fontWeight: '700', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    <th style={{ padding: '14px 18px' }}>SKU Number</th>
                    <th style={{ padding: '14px 18px' }}>Instrument Description</th>
                    <th style={{ padding: '14px 18px' }}>Metallurgy / Alloy</th>
                    <th style={{ padding: '14px 18px' }}>Hardness</th>
                    <th style={{ padding: '14px 18px' }}>Dimensions</th>
                    <th style={{ padding: '14px 18px' }}>Hospital Unit Price</th>
                    <th style={{ padding: '14px 18px' }}>Bulk Tier Price</th>
                    <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInstruments.map((item, idx) => (
                    <tr 
                      key={item.id} 
                      style={{ 
                        borderBottom: '1px solid var(--slate-100)',
                        background: idx % 2 === 0 ? '#ffffff' : '#fafcff',
                        transition: 'background 0.15s ease'
                      }}
                    >
                      <td style={{ padding: '14px 18px', fontWeight: '700', color: 'var(--primary)', fontFamily: 'monospace' }}>
                        {item.sku}
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ fontWeight: '600', color: 'var(--slate-900)' }}>{item.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', marginTop: '2px' }}>{item.finish}</div>
                      </td>
                      <td style={{ padding: '14px 18px', fontSize: '0.8125rem', color: 'var(--slate-700)' }}>
                        {item.steel}
                      </td>
                      <td style={{ padding: '14px 18px', fontSize: '0.8125rem' }}>
                        <span style={{ background: 'var(--slate-100)', padding: '2px 6px', borderRadius: '4px', fontWeight: '600' }}>
                          {item.rockwell}
                        </span>
                      </td>
                      <td style={{ padding: '14px 18px', fontSize: '0.8125rem', color: 'var(--slate-600)' }}>
                        {item.size}
                      </td>
                      <td style={{ padding: '14px 18px', fontWeight: '700', color: 'var(--navy-dark)' }}>
                        ${item.price.toFixed(2)}
                      </td>
                      <td style={{ padding: '14px 18px', fontWeight: '600', color: 'var(--emerald-600)' }}>
                        ${item.bulkPrice.toFixed(2)}
                      </td>
                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                          <button 
                            className="btn-secondary" 
                            style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                            onClick={() => onOpenProductModal(item)}
                            title="Quick Spec Sheet"
                          >
                            <Eye size={13} />
                            <span>Specs</span>
                          </button>
                          <button 
                            className="btn-primary" 
                            style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                            onClick={() => onAddToCart(item)}
                            title="Add to Requisition"
                          >
                            <ShoppingCart size={13} />
                            <span>Add</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ padding: '14px 18px', background: 'var(--slate-50)', borderTop: '1px solid var(--slate-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem', color: 'var(--slate-600)' }}>
              <span>Showing {filteredInstruments.length} catalog items</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button style={{ padding: '4px 10px', background: '#ffffff', border: '1px solid var(--slate-200)', borderRadius: '4px', fontWeight: '600' }}>Previous</button>
                <button style={{ padding: '4px 10px', background: 'var(--primary)', color: '#ffffff', borderRadius: '4px', fontWeight: '600' }}>1</button>
                <button style={{ padding: '4px 10px', background: '#ffffff', border: '1px solid var(--slate-200)', borderRadius: '4px', fontWeight: '600' }}>2</button>
                <button style={{ padding: '4px 10px', background: '#ffffff', border: '1px solid var(--slate-200)', borderRadius: '4px', fontWeight: '600' }}>Next</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. REQUEST HARDBOUND PRINTED CATALOG FORM */}
      <section id="printed-catalog-form" style={{ padding: '64px 0', background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Printer size={36} color="var(--primary)" style={{ margin: '0 auto 12px auto' }} />
            <h2 style={{ fontSize: '1.9rem', fontWeight: '800', color: 'var(--navy-dark)' }}>
              Request Physical Hospital Hardbound Catalogue
            </h2>
            <p style={{ color: 'var(--slate-600)', fontSize: '0.925rem' }}>
              Complimentary 128-page full-color edition including complete instrument trays, dimensional line art, and reprocessing protocols. Delivered via FedEx to verified medical institutions.
            </p>
          </div>

          {physicalRequested ? (
            <div style={{ background: 'var(--emerald-50)', border: '1px solid var(--emerald-600)', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
              <CheckCircle2 size={40} color="var(--emerald-600)" style={{ margin: '0 auto 12px auto' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#065f46', marginBottom: '6px' }}>
                Hardbound Catalogue Dispatched
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#047857' }}>
                Your institutional package has been registered. You will receive carrier tracking via email within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleRequestPhysical} style={{ background: 'var(--slate-50)', border: '1px solid var(--slate-200)', padding: '32px', borderRadius: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Procurement Officer / Contact Name *</label>
                  <input type="text" required className="form-input" placeholder="Dr. Jennifer Ross" />
                </div>
                <div className="form-group">
                  <label className="form-label">Medical Center / Hospital Name *</label>
                  <input type="text" required className="form-input" placeholder="Beth Israel Deaconess Medical Center" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Work Email *</label>
                  <input type="email" required className="form-input" placeholder="jross@bidmc.harvard.edu" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input type="tel" required className="form-input" placeholder="+1 (617) 667-7000" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Hospital Street Shipping Address *</label>
                <input type="text" required className="form-input" placeholder="330 Brookline Ave, Materials Management Receiving" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input type="text" required className="form-input" placeholder="Boston" />
                </div>
                <div className="form-group">
                  <label className="form-label">State *</label>
                  <input type="text" required className="form-input" placeholder="MA" />
                </div>
                <div className="form-group">
                  <label className="form-label">Zip Code *</label>
                  <input type="text" required className="form-input" placeholder="02215" />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '0.95rem', marginTop: '10px' }}>
                <span>Ship Complimentary Hardbound Catalogue (Free)</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
