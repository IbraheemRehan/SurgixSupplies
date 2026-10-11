import React, { useState } from 'react';
import { X, Lock, Building, CheckCircle2, Shield } from 'lucide-react';

export function SignInModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">
              {activeTab === 'login' ? 'Hospital Portal Login' : 'Procurement Registration'}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginTop: '2px' }}>
              Access institutional contract pricing & purchase order history
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {success ? (
            <div style={{ textAlign: 'center', padding: '36px 12px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--emerald-50)', color: 'var(--emerald-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                <CheckCircle2 size={30} />
              </div>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--navy-dark)', fontWeight: '700', marginBottom: '6px' }}>
                Authentication Verified
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)' }}>
                Welcome to Surgix Enterprise. Loading your hospital contracts...
              </p>
            </div>
          ) : (
            <>
              {/* Tab Selector */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--slate-100)', padding: '4px', borderRadius: '8px', marginBottom: '20px' }}>
                <button
                  type="button"
                  style={{
                    padding: '8px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    borderRadius: '6px',
                    background: activeTab === 'login' ? '#ffffff' : 'transparent',
                    color: activeTab === 'login' ? 'var(--navy-dark)' : 'var(--slate-600)',
                    boxShadow: activeTab === 'login' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                  onClick={() => setActiveTab('login')}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  style={{
                    padding: '8px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    borderRadius: '6px',
                    background: activeTab === 'register' ? '#ffffff' : 'transparent',
                    color: activeTab === 'register' ? 'var(--navy-dark)' : 'var(--slate-600)',
                    boxShadow: activeTab === 'register' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                  onClick={() => setActiveTab('register')}
                >
                  New Hospital Account
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {activeTab === 'register' && (
                  <div className="form-group">
                    <label className="form-label">Healthcare System / Clinic Name *</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type="text" 
                        required 
                        className="form-input" 
                        placeholder="e.g., Boston Children's Surgical Center" 
                      />
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Procurement Email *</label>
                  <input 
                    type="email" 
                    required 
                    className="form-input" 
                    placeholder="purchasing@hospital.org" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className="form-label">Password *</label>
                    {activeTab === 'login' && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--primary)', cursor: 'pointer' }}>
                        Forgot password?
                      </span>
                    )}
                  </div>
                  <input 
                    type="password" 
                    required 
                    className="form-input" 
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {activeTab === 'register' && (
                  <div className="form-group">
                    <label className="form-label">Tax Exemption / EIN (Optional for Net-30)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="XX-XXXXXXX" 
                    />
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn-primary" 
                  style={{ width: '100%', padding: '12px', fontSize: '0.925rem', marginTop: '12px' }}
                >
                  <Lock size={16} />
                  <span>{activeTab === 'login' ? 'Access Hospital Portal' : 'Register Institution Account'}</span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '18px', fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                  <Shield size={14} color="var(--primary)" />
                  <span>256-Bit SSL Encrypted Healthcare Portal</span>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
