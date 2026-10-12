import React from 'react';
import { Truck, RotateCcw, ShieldCheck, CheckCircle2, Box } from 'lucide-react';

export function ShippingReturnsPage({ onOpenEnquiry }) {
  return (
    <div className="shipping-page-root" style={{ background: '#f8fafc', padding: '48px 0 80px 0' }}>
      <div className="container" style={{ maxWidth: '880px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '2.3rem', fontWeight: '800', color: 'var(--navy-dark)' }}>
            Shipping & 30-Day Satisfaction Terms
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--slate-600)', marginTop: '8px' }}>
            Nationwide insured delivery protocols and 100% satisfaction guarantees for practitioners and healthcare facilities.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Shipping Policy */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1.5px solid var(--slate-200)', padding: '36px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Truck size={22} />
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--navy-dark)' }}>
                Nationwide Direct & Clinical Shipping
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', color: 'var(--slate-700)', lineHeight: '1.6' }}>
              <p>
                <strong>Free Shipping Standard:</strong> All consumer orders and institutional requisitions totaling <strong>$500.00 or greater</strong> qualify for complimentary priority delivery across all 50 US states. Orders under $500 enjoy flat, insured courier delivery.
              </p>
              <p>
                <strong>Sterile Tamper-Evident Packaging:</strong> Every surgical instrument is individually sealed in lint-free, puncture-resistant medical film with active desiccant and an RFID-verified tamper seal.
              </p>
              <p>
                <strong>Same-Day Dispatch Cutoff:</strong> In-stock instruments ordered before 4:00 PM EST ship same day from our Boston distribution center via FedEx or UPS Express.
              </p>
            </div>
          </div>

          {/* Return & Evaluation Policy */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1.5px solid var(--slate-200)', padding: '36px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--emerald-50)', color: 'var(--emerald-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <RotateCcw size={22} />
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--navy-dark)' }}>
                30-Day Clinical Trial & Lifetime Joint Warranty
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', color: 'var(--slate-700)', lineHeight: '1.6' }}>
              <p>
                <strong>30-Day Evaluation Period:</strong> Customers and surgical teams have 30 days to test the balance, cutting action, and autoclave resistance of any Surgix instrument in your facility. If not completely satisfied, return for a 100% refund or credit with zero restocking fees.
              </p>
              <p>
                <strong>Lifetime Joint & Box-Lock Warranty:</strong> All box-lock joints and Tungsten Carbide vacuum-welded inserts carry a lifetime guarantee against cracking, detachment, or joint seizure under standard sterile processing.
              </p>
              <p>
                <strong>Hassle-Free Return Authorization (RMA):</strong> Need to generate a return? Email <strong>returns@surgixsupplies.com</strong> with your order number or PO number to receive an immediate prepaid return courier label.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
