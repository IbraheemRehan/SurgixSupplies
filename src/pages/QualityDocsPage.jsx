import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  FileCheck, 
  Search,
  Building
} from 'lucide-react';
import { qualityCertificates } from '../data/certificates';

export function QualityDocsPage() {
  const [downloadingId, setDownloadingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCerts = qualityCertificates.filter((cert) => 
    cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.docNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (cert) => {
    setDownloadingId(cert.id);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`Downloaded official documentation file: ${cert.fileName} (${cert.fileSize})`);
    }, 1200);
  };

  return (
    <div className="quality-docs-root" style={{ background: '#f8fafc', padding: '48px 0 80px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 40px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--primary-light)', color: 'var(--primary)', padding: '4px 14px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: '700', marginBottom: '14px', letterSpacing: '0.04em' }}>
            <FileText size={16} />
            <span>REGULATORY DOSSIER & COMPLIANCE ARCHIVE</span>
          </div>

          <h1 style={{ fontSize: '2.4rem', fontWeight: '800', color: 'var(--navy-dark)', lineHeight: '1.2' }}>
            Official Quality Documentation & Certifications
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'var(--slate-600)', marginTop: '12px', lineHeight: '1.6' }}>
            Verified compliance certificates for hospital legal counsel, sterile processing departments (CSPD), and international customs authorities. All documents are current for 2026.
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ maxWidth: '600px', margin: '0 auto 36px auto', position: 'relative' }}>
          <input
            type="text"
            className="form-input"
            style={{ padding: '12px 16px 12px 42px', fontSize: '0.925rem', boxShadow: 'var(--shadow-sm)' }}
            placeholder="Search certificates by standard, document number, or agency..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={18} color="var(--slate-400)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        {/* Certificate Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
          {filteredCerts.map((cert) => {
            const isDownloading = downloadingId === cert.id;

            return (
              <div
                key={cert.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  border: '1.5px solid var(--slate-200)',
                  padding: '28px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--emerald-600)', background: 'var(--emerald-50)', padding: '3px 8px', borderRadius: '4px' }}>
                    {cert.badge}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: '600' }}>
                    {cert.fileSize} • PDF
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--navy-dark)', lineHeight: '1.3', marginBottom: '6px' }}>
                  {cert.title}
                </h3>

                <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontFamily: 'monospace', marginBottom: '14px' }}>
                  Doc Ref: <strong>{cert.docNumber}</strong>
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: '1.55', marginBottom: '20px', flex: 1 }}>
                  {cert.summary}
                </p>

                <div style={{ background: 'var(--slate-50)', borderRadius: '8px', padding: '12px', marginBottom: '20px', fontSize: '0.8rem', border: '1px solid var(--slate-200)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--slate-500)' }}>Issuing Body:</span>
                    <strong style={{ color: 'var(--navy-dark)' }}>{cert.issuer}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--slate-500)' }}>Validity Period:</span>
                    <strong style={{ color: 'var(--navy-dark)' }}>{cert.effectiveDate}</strong>
                  </div>
                </div>

                <button
                  className="btn-primary"
                  style={{ width: '100%', padding: '11px', fontSize: '0.875rem' }}
                  onClick={() => handleDownload(cert)}
                  disabled={isDownloading}
                >
                  <Download size={16} />
                  <span>{isDownloading ? 'Preparing Document...' : `Download ${cert.fileName.slice(0, 24)}...`}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Verification Guarantee */}
        <div style={{ marginTop: '56px', background: '#ffffff', borderRadius: '14px', border: '1px solid var(--slate-200)', padding: '32px', textAlign: 'center' }}>
          <ShieldCheck size={36} color="var(--primary)" style={{ margin: '0 auto 12px auto' }} />
          <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--navy-dark)', marginBottom: '8px' }}>
            Hospital Audit Assistance & Quality Rep Visits
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', maxWidth: '640px', margin: '0 auto 18px auto', lineHeight: '1.6' }}>
            Preparing for Joint Commission (JCAHO) or DNV healthcare facility reviews? Our Boston regulatory team supplies certified full-lot master dossiers and sterile validation certificates within 2 hours.
          </p>
          <a href="mailto:info@surgixsupplies.com" className="btn-secondary" style={{ display: 'inline-flex', padding: '10px 20px', fontSize: '0.875rem' }}>
            <span>Contact Regulatory Desk: info@surgixsupplies.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
