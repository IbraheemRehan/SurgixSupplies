import React from 'react';
import { Shield } from 'lucide-react';

export function LegalPage() {
  return (
    <div className="legal-page-root" style={{ background: '#f8fafc', padding: '48px 0 80px 0' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--navy-dark)' }}>
            Privacy Policy & Terms of Supply
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--slate-500)', marginTop: '6px' }}>
            Last Updated: January 1, 2026 • Surgix Supplies Legal & Regulatory Affairs
          </p>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1.5px solid var(--slate-200)', padding: '40px', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '28px', fontSize: '0.9rem', color: 'var(--slate-700)', lineHeight: '1.7' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--navy-dark)', marginBottom: '10px' }}>
              1. Sales Standards & Regulatory Clearances
            </h3>
            <p>
              Surgix Supplies distributes surgical instruments manufactured under ISO 13485:2016 quality management systems and FDA establishment registration regulations. All devices conform to U.S. FDA 21 CFR Part 820 standards and EU Medical Device Regulation (MDR 2017/745) requirements.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--navy-dark)', marginBottom: '10px' }}>
              2. Customer Privacy & Data Security Commitment
            </h3>
            <p>
              We adhere to strict data privacy principles under U.S. and Massachusetts state data security statutes. Surgix Supplies does not collect protected health information (PHI) or patient records. Customer purchasing data, payment details, and account credentials are encrypted using 256-bit SSL/TLS protocols and never transferred or sold to third parties.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--navy-dark)', marginBottom: '10px' }}>
              3. Warranty & Limitation of Liability
            </h3>
            <p>
              Surgix Supplies warrants that all surgical instruments are free from metallurgical defects, micro-cracks, and joint misalignment for the lifetime of the instrument under appropriate clinical and sterile reprocessing. Instruments must be cleaned and autoclaved in compliance with ISO 17664 instructions for use (IFU).
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--navy-dark)', marginBottom: '10px' }}>
              4. Payment Terms & Title of Goods
            </h3>
            <p>
              Title of goods transfers to the customer upon confirmed delivery by the carrier. Free shipping applies to all qualifying orders totaling $500.00 USD or more within the continental United States. All orders placed online receive instant confirmation and dispatch notifications.
            </p>
          </div>

          <div style={{ borderTop: '1px solid var(--slate-200)', paddingTop: '20px', fontSize: '0.8rem', color: 'var(--slate-500)' }}>
            For legal notices: Surgix Supplies Legal Department, 1200 Instrument Way, Suite 400, Boston, MA 02110 • legal@surgixsupplies.com
          </div>
        </div>
      </div>
    </div>
  );
}
