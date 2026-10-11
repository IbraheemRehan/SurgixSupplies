import React, { useState } from 'react';
import { X, Send, PhoneCall, ShieldCheck, Clock } from 'lucide-react';

export function WhatsAppModal({ isOpen, onClose }) {
  const [inquiryType, setInquiryType] = useState('Hospital Procurement');
  const [customMsg, setCustomMsg] = useState('');

  if (!isOpen) return null;

  const handleLaunch = () => {
    const text = encodeURIComponent(`Hello Surgix Supplies, I am inquiring regarding ${inquiryType}. ${customMsg}`);
    const whatsappUrl = `https://wa.me/18005550199?text=${text}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header" style={{ background: '#075e54', color: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff', margin: 0 }}>
                WhatsApp Direct Support
              </h3>
              <p style={{ fontSize: '0.72rem', color: '#a7f3d0', margin: 0 }}>
                Direct Link with Boston Sales & Export Team
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} style={{ color: '#ffffff' }}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '0.8rem', color: '#166534' }}>
            <Clock size={16} />
            <span>Agents Active Now: Average response under 5 minutes</span>
          </div>

          <div className="form-group">
            <label className="form-label">Inquiry Category</label>
            <select 
              className="form-select"
              value={inquiryType}
              onChange={(e) => setInquiryType(e.target.value)}
            >
              <option>Hospital Bulk Requisition / RFQ</option>
              <option>Urgent Surgery Center Restock</option>
              <option>Custom Tray & Laser Barcode Marking</option>
              <option>International Air Export & Freight</option>
              <option>Sterilization & Compliance Specs</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Message Details (Optional)</label>
            <textarea
              rows={3}
              className="form-textarea"
              placeholder="Provide order details, hospital name, or specific SKU numbers..."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn-primary"
            style={{ width: '100%', background: '#25d366', color: '#ffffff', padding: '12px', fontSize: '0.925rem', marginTop: '6px' }}
            onClick={handleLaunch}
          >
            <span>Open WhatsApp Chat (+1 800-555-0199)</span>
          </button>

          <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--slate-500)', marginTop: '12px' }}>
            Direct encrypted messaging with Surgix clinical account executives.
          </p>
        </div>
      </div>
    </div>
  );
}
