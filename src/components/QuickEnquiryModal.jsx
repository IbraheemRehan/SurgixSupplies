import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export function QuickEnquiryModal({ isOpen, onClose, initialItem }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    hospital: '',
    email: '',
    phone: '',
    instruments: initialItem ? `${initialItem.sku} - ${initialItem.name}` : '',
    quantity: initialItem ? '10' : '50',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Direct Product & Order Enquiry</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginTop: '2px' }}>
              Direct factory pricing for consumers, practitioners, clinics & medical facilities
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
                Enquiry Transmitted Successfully
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: '1.6' }}>
                Reference ID: <strong>ENQ-2026-BOS-{Math.floor(1000 + Math.random() * 9000)}</strong><br />
                Our product specialist will review your request and get back to you within 4 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    className="form-input" 
                    placeholder="e.g. Dr. Sarah Jenkins or John Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Practice, Clinic or School (Optional)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Private Practice or Individual"
                    value={formData.hospital}
                    onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    className="form-input" 
                    placeholder="yourname@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Direct Phone / Mobile</label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    placeholder="+1 (617) 555-0144"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Instruments / Trays Requested</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g., Mayo Scissors TC, Laparotomy Trays"
                    value={formData.instruments}
                    onChange={(e) => setFormData({ ...formData, instruments: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Estimated Units</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g., 25"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Special Requirements / Custom Marking / Delivery Timeline</label>
                <textarea 
                  rows={3} 
                  className="form-textarea"
                  placeholder="Need custom department laser barcode engraving on ring handles; require initial delivery within 2 weeks..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--slate-200)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                  <ShieldCheck size={16} color="var(--primary)" />
                  <span>ISO 13485 & FDA Registered Supply Chain</span>
                </div>

                <button type="submit" className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
                  <Send size={15} />
                  <span>Submit Enquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
