import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

export function ContactPage({ onOpenQuote, onOpenWhatsApp }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    email: '',
    phone: '',
    department: 'General Product Inquiry / Direct Order',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        institution: '',
        email: '',
        phone: '',
        department: 'General Product Inquiry / Direct Order',
        subject: '',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="contact-page-root" style={{ background: '#f8fafc', padding: '48px 0 80px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px auto' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Direct Factory Communication
          </span>
          <h1 style={{ fontSize: '2.4rem', fontWeight: '800', color: 'var(--navy-dark)', marginTop: '4px' }}>
            Contact Surgix Supplies
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--slate-600)', marginTop: '10px', lineHeight: '1.6' }}>
            Speak directly with our Boston sales directors, clinical engineering team, or global export logistics coordinators.
          </p>
        </div>

        {/* Grid: Contact Information & Interactive Form */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '36px', alignItems: 'flex-start' }}>
          {/* Left Column: Direct Offices & Contacts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Headquarters Card */}
            <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid var(--slate-200)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building2 size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--navy-dark)' }}>
                    Boston Operations Center
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                    Headquarters & Quality Laboratory
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.875rem', color: 'var(--slate-700)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <MapPin size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>1200 Instrument Way, Suite 400<br />Boston, MA 02110, United States</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Phone size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <a href="tel:18005550199" style={{ color: 'var(--primary)', fontWeight: '600' }}>
                    1 (800) 555-0199 (Toll-Free USA & Canada)
                  </a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Mail size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <a href="mailto:info@surgixsupplies.com" style={{ color: 'var(--primary)', fontWeight: '600' }}>
                    info@surgixsupplies.com
                  </a>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Clock size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Hours: Mon - Fri: 7:00 AM – 7:00 PM EST<br />Emergency OR Restock Dispatch: 24/7/365</span>
                </div>
              </div>
            </div>

            {/* Department Quick Channels */}
            <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid var(--slate-200)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--navy-dark)', marginBottom: '14px' }}>
                Specialized Desks
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.825rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--slate-100)' }}>
                  <span style={{ color: 'var(--slate-600)' }}>Customer Orders & Quotes:</span>
                  <a href="mailto:orders@surgixsupplies.com" style={{ color: 'var(--primary)', fontWeight: '600' }}>orders@surgixsupplies.com</a>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--slate-100)' }}>
                  <span style={{ color: 'var(--slate-600)' }}>International Export / Containers:</span>
                  <a href="mailto:export@surgixsupplies.com" style={{ color: 'var(--primary)', fontWeight: '600' }}>export@surgixsupplies.com</a>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--slate-600)' }}>Regulatory & Material Reports:</span>
                  <a href="mailto:quality@surgixsupplies.com" style={{ color: 'var(--primary)', fontWeight: '600' }}>quality@surgixsupplies.com</a>
                </div>
              </div>
            </div>

            {/* WhatsApp Quick Action Banner */}
            <div style={{ background: 'var(--dark-teal)', color: '#ffffff', borderRadius: '14px', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <div>
                <h5 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '4px' }}>
                  Urgent Same-Day Requirement?
                </h5>
                <p style={{ fontSize: '0.78rem', color: '#93c5fd' }}>
                  Connect instantly with our clinical logistics desk via WhatsApp.
                </p>
              </div>
              <button 
                onClick={onOpenWhatsApp}
                style={{ background: '#25d366', color: '#ffffff', fontWeight: '700', fontSize: '0.8rem', padding: '8px 16px', borderRadius: '9999px', whiteSpace: 'nowrap' }}
              >
                Chat Now
              </button>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1.5px solid var(--slate-200)', padding: '36px', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--navy-dark)', marginBottom: '6px' }}>
              Send an Inquiry
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', marginBottom: '24px' }}>
              Our support and sales specialists reply within 2 to 4 business hours.
            </p>

            {submitted ? (
              <div style={{ background: 'var(--emerald-50)', border: '1.5px solid var(--emerald-600)', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
                <CheckCircle2 size={40} color="var(--emerald-600)" style={{ margin: '0 auto 12px auto' }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#065f46', marginBottom: '6px' }}>
                  Message Transmitted Successfully
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#047857' }}>
                  Thank you, <strong>{formData.name || 'valued customer'}</strong>. A Boston team member has been assigned to your request and will reach out promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      className="form-input" 
                      placeholder="Dr. Katherine Miller"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Practice, Clinic or School (Optional)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Miller Surgical Clinic"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input 
                      type="email" 
                      required 
                      className="form-input" 
                      placeholder="kmiller@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input 
                      type="tel" 
                      required 
                      className="form-input" 
                      placeholder="+1 (617) 732-5500"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Inquiry Department</label>
                  <select 
                    className="form-select"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  >
                    <option>General Product Inquiry / Direct Order</option>
                    <option>Clinic & Hospital Bulk Quotation</option>
                    <option>Surgical Instrument Sets Configuration</option>
                    <option>International Export Logistics</option>
                    <option>Quality Assurance / Material Reports</option>
                    <option>Account Support & Billing</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g., Question about needle holder sizes or bulk quote"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message / Details *</label>
                  <textarea 
                    rows={4} 
                    required 
                    className="form-textarea"
                    placeholder="Provide details of your required instruments, questions, or specifications..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '0.95rem', marginTop: '8px' }}>
                  <Send size={16} />
                  <span>Transmit Message to Boston Team</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
