import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

export function FaqPage({ onOpenQuote }) {
  const faqs = [
    {
      q: "Are Surgix Supplies instruments manufactured from German stainless steel?",
      a: "Yes. 100% of our surgical blanks originate from certified German forging mills meeting ASTM F899 standards (primarily AISI 420 for cutting blades and AISI 410 for flexible hemostats). Final machining, precision hand-honing, ASTM A967 passivation, and quality inspections take place in our Boston, Massachusetts facility."
    },
    {
      q: "What certifications accompany hospital shipments?",
      a: "Every batch includes complete Material Test Reports (MTR) demonstrating chemical composition, Certificate of Passivation (ASTM A967), and documentation of compliance with ISO 13485:2016 and FDA 510(k) clearances. All documents can also be downloaded from our Quality Documentation portal."
    },
    {
      q: "What is your free shipping policy?",
      a: "As featured on our top announcement bar, all orders totaling $500.00 or more qualify for complimentary nationwide express shipping across all 50 US states. For emergency restocks, same-day Saturday/Sunday dispatch is available upon request."
    },
    {
      q: "Do you offer Net-30 payment terms and institutional PO billing?",
      a: "Yes. Accredited hospitals, academic medical centers, and ambulatory surgery centers (ASCs) are eligible for automated Net-30 terms. You can upload or submit purchase orders directly through our website, RFQ form, or email at bids@surgixsupplies.com."
    },
    {
      q: "Can you provide custom laser engraving and department color coding?",
      a: "Yes. We offer high-resolution fiber laser marking on all instruments (department name, barcode 2D DataMatrix, or surgeon initials) as well as bonded color-coding silicone rings for tray differentiation at zero additional charge for volume orders."
    },
    {
      q: "What parameters should Central Sterile Processing (CSPD) use for autoclave reprocessing?",
      a: "All Surgix instruments are validated for steam autoclave sterilization per ISO 17664: Pre-vacuum steam cycle at 134°C (273°F) for 4 minutes with a minimum 20-minute drying phase. Always utilize neutral pH enzymatic detergents (pH 7.0–8.5)."
    }
  ];

  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="faq-page-root" style={{ background: '#f8fafc', padding: '48px 0 80px 0' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
            <HelpCircle size={24} />
          </div>
          <h1 style={{ fontSize: '2.3rem', fontWeight: '800', color: 'var(--navy-dark)' }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--slate-600)', marginTop: '8px' }}>
            Answers to common questions regarding metallurgy, sterilizer cycles, procurement contracts, and logistics.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div 
                key={idx}
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid var(--slate-200)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <button
                  type="button"
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    fontSize: '1.05rem',
                    fontWeight: '700',
                    color: isOpen ? 'var(--primary)' : 'var(--navy-dark)',
                    background: isOpen ? '#fafcff' : '#ffffff'
                  }}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {isOpen && (
                  <div style={{ padding: '0 24px 20px 24px', fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: '1.65', borderTop: '1px solid var(--slate-100)' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '48px', textAlign: 'center', background: '#ffffff', padding: '32px', borderRadius: '14px', border: '1px solid var(--slate-200)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--navy-dark)', marginBottom: '8px' }}>
            Have a question not listed here?
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', marginBottom: '18px' }}>
            Our Boston clinical engineers and regulatory team are on standby to address your queries.
          </p>
          <button className="btn-primary" style={{ padding: '10px 24px' }} onClick={onOpenQuote}>
            Contact Procurement Desk
          </button>
        </div>
      </div>
    </div>
  );
}
