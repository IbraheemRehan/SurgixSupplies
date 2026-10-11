import React, { useState } from 'react';
import { X, Send, CheckCircle2, FileText, Layers } from 'lucide-react';

export function QuoteModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    institution: '',
    contactName: '',
    email: '',
    phone: '',
    department: 'Operating Room / General Surgery',
    volumeTier: '50 - 200 Instruments (Tier 2 Discount: 18%)',
    orderType: 'Standard Tray Restock',
    skusList: '',
    taxExempt: 'Yes'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Formal Institutional RFQ Quotation</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginTop: '2px' }}>
              Tiered hospital volume discounts & Net-30 purchase terms
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '36px 12px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--emerald-50)', color: 'var(--emerald-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <CheckCircle2 size={36} />
              </div>
              <h4 style={{ fontSize: '1.25rem', color: 'var(--navy-dark)', fontWeight: '700', marginBottom: '8px' }}>
                RFQ Dossier Generated & Forwarded
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: '1.6', maxWidth: '420px', margin: '0 auto' }}>
                Quote reference: <strong>RFQ-BOS-2026-{Math.floor(10000 + Math.random() * 90000)}</strong>.<br />
                Our institutional bids team has generated your discounted tier pricing. An official PDF quotation with Mill Test Reports has been dispatched to <strong>{quoteForm.email || 'your email'}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Healthcare Facility / System *</label>
                  <input 
                    type="text" 
                    required 
                    className="form-input" 
                    placeholder="e.g., Mount Sinai Health System"
                    value={quoteForm.institution}
                    onChange={(e) => setQuoteForm({ ...quoteForm, institution: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Purchasing Officer / Surgeon Name *</label>
                  <input 
                    type="text" 
                    required 
                    className="form-input" 
                    placeholder="Dr. Robert Hayes, MD"
                    value={quoteForm.contactName}
                    onChange={(e) => setQuoteForm({ ...quoteForm, contactName: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Procurement Email *</label>
                  <input 
                    type="email" 
                    required 
                    className="form-input" 
                    placeholder="procurement@mtsinai.org"
                    value={quoteForm.email}
                    onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Direct Phone *</label>
                  <input 
                    type="tel" 
                    required
                    className="form-input" 
                    placeholder="+1 (212) 555-0198"
                    value={quoteForm.phone}
                    onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Clinical Department</label>
                  <select 
                    className="form-select"
                    value={quoteForm.department}
                    onChange={(e) => setQuoteForm({ ...quoteForm, department: e.target.value })}
                  >
                    <option>Operating Room / General Surgery</option>
                    <option>Orthopedic Trauma Services</option>
                    <option>Cardiothoracic Surgery</option>
                    <option>Central Sterile Supply (CSPD)</option>
                    <option>Outpatient Surgery Center (ASC)</option>
                    <option>International Hospital Fleet Import</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Expected Volume Tier</label>
                  <select 
                    className="form-select"
                    value={quoteForm.volumeTier}
                    onChange={(e) => setQuoteForm({ ...quoteForm, volumeTier: e.target.value })}
                  >
                    <option>10 - 49 Instruments (Tier 1: 10% Off)</option>
                    <option>50 - 200 Instruments (Tier 2: 18% Off)</option>
                    <option>201 - 500 Instruments (Tier 3: 25% Off)</option>
                    <option>Complete OR Suite Outfitting (Custom B2B Contract)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Items, SKUs, or Tray Specifications Needed</label>
                <textarea 
                  rows={3} 
                  className="form-textarea"
                  placeholder="Paste your requisition list (e.g., 20x SX-SC-101 Mayo TC, 10x SX-NH-301 Needle Holders, 4x SX-SET-LAP84 Laparotomy Sets)..."
                  value={quoteForm.skusList}
                  onChange={(e) => setQuoteForm({ ...quoteForm, skusList: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--slate-200)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
                  Includes 30-Day Hospital Evaluation & Lifetime Joint Warranty
                </span>

                <button type="submit" className="btn-primary" style={{ padding: '10px 24px' }}>
                  <FileText size={15} />
                  <span>Request Institutional Quote</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
