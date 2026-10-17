import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  FileCheck, 
  AlertCircle, 
  Search, 
  Zap, 
  Layers, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { steelGradesInfo } from '../data/certificates';

export function QualityPage({ onNavigate }) {
  const [lotNumber, setLotNumber] = useState('');
  const [lotResult, setLotResult] = useState(null);

  const handleVerifyLot = (e) => {
    e.preventDefault();
    if (!lotNumber.trim()) return;

    setLotResult({
      lot: lotNumber.toUpperCase(),
      status: "PASSED / CLEARED FOR OR USE",
      alloy: "AISI 420 Martensitic Stainless (ASTM F899-20)",
      passivation: "ASTM A967 Citric Passivation (Zero Pit)",
      hardness: "HRC 54.8 (Rockwell C Scale)",
      autoclaveCycles: "500 Cycles at 134°C / 2.2 Bar (No Corrosion)",
      inspector: "Quality Lab Lead #BOS-842",
      releaseDate: "October 2026"
    });
  };

  return (
    <div className="quality-page-root" style={{ background: '#f8fafc', padding: '48px 0 80px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--emerald-50)', color: 'var(--emerald-600)', padding: '4px 14px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: '700', marginBottom: '14px', letterSpacing: '0.04em' }}>
            <ShieldCheck size={16} />
            <span>UNCOMPROMISING CLINICAL SAFETY STANDARDS</span>
          </div>

          <h1 style={{ fontSize: '2.4rem', fontWeight: '800', color: 'var(--navy-dark)', lineHeight: '1.2' }}>
            Quality Assurance & Metallurgical Compliance
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'var(--slate-600)', marginTop: '12px', lineHeight: '1.6' }}>
            Every surgical instrument delivered by Surgix Supplies undergoes strict multi-stage inspection in Boston, MA. We guarantee 100% adherence to international ASTM, ISO, and FDA medical device regulations.
          </p>
        </div>

        {/* 4 Pillars of Quality */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '60px' }}>
          <div style={{ background: '#ffffff', padding: '32px 24px', borderRadius: '12px', border: '1px solid var(--slate-200)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <ShieldCheck size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--navy-dark)', marginBottom: '8px' }}>
              ASTM F899 Metallurgy
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: '1.6' }}>
              We forge solely with certified medical-grade stainless steel containing precise chromium-to-carbon proportions for superior edge retention and tensile strength.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '32px 24px', borderRadius: '12px', border: '1px solid var(--slate-200)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'var(--emerald-50)', color: 'var(--emerald-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Award size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--navy-dark)', marginBottom: '8px' }}>
              ASTM A967 Passivation
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: '1.6' }}>
              All instruments receive ultrasonic chemical passivation to dissolve microscopic free iron, generating a continuous chromium oxide barrier that resists rust and saline pitting.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '32px 24px', borderRadius: '12px', border: '1px solid var(--slate-200)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'var(--gold-light)', color: 'var(--gold-tc)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Zap size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--navy-dark)', marginBottom: '8px' }}>
              Rockwell Hardness (HRC)
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: '1.6' }}>
              Rigorous diamond indenter hardness testing ensures scissors hold surgical edges (HRC 54-58) while clamps maintain flexible ratchets (HRC 46-50) without stress cracks.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '32px 24px', borderRadius: '12px', border: '1px solid var(--slate-200)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#f3e8ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <FileCheck size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--navy-dark)', marginBottom: '8px' }}>
              134°C Autoclave Resistance
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: '1.6' }}>
              Continuous lot testing across 500 pressurized steam sterilization cycles validates that box-lock joints and Tungsten Carbide brazing never loosen or oxidize.
            </p>
          </div>
        </div>

        {/* Interactive Lot Number Verification Portal */}
        <div className="quality-lot-card" style={{ background: '#ffffff', borderRadius: '16px', border: '1.5px solid var(--slate-200)', padding: '40px', boxShadow: 'var(--shadow-md)', marginBottom: '60px' }}>
          <div className="quality-lot-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '36px', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Batch Traceability System
              </span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--navy-dark)', marginTop: '4px', marginBottom: '12px' }}>
                Verify Lot Inspection & Material Test Report
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: '1.6', marginBottom: '24px' }}>
                Every Surgix instrument is laser-engraved with an individual lot number. Enter your lot code below (or try demo lot <strong>LOT-2026-881</strong>) to retrieve its certified chemical analysis and passivation audit dossier.
              </p>

              <form onSubmit={handleVerifyLot} className="quality-lot-form" style={{ display: 'flex', gap: '10px', maxWidth: '460px' }}>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Enter Lot # (e.g. LOT-2026-881)" 
                  value={lotNumber}
                  onChange={(e) => setLotNumber(e.target.value)}
                />
                <button type="submit" className="btn-primary" style={{ padding: '10px 20px', whiteSpace: 'nowrap' }}>
                  <Search size={16} />
                  <span>Verify Lot</span>
                </button>
              </form>
            </div>

            {/* Results Output */}
            <div>
              {lotResult ? (
                <div style={{ background: 'var(--emerald-50)', border: '1.5px solid #a7f3d0', borderRadius: '12px', padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--emerald-600)', fontWeight: '800', fontSize: '0.95rem', marginBottom: '14px' }}>
                    <CheckCircle2 size={20} />
                    <span>{lotResult.status}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.825rem', color: '#064e3b' }}>
                    <div><strong>Lot Number:</strong> {lotResult.lot}</div>
                    <div><strong>Steel Alloy:</strong> {lotResult.alloy}</div>
                    <div><strong>Chemical Passivation:</strong> {lotResult.passivation}</div>
                    <div><strong>Rockwell Hardness:</strong> {lotResult.hardness}</div>
                    <div><strong>Autoclave Validation:</strong> {lotResult.autoclaveCycles}</div>
                    <div><strong>Certification Officer:</strong> {lotResult.inspector}</div>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'var(--slate-50)', border: '1px dashed var(--slate-300)', borderRadius: '12px', padding: '32px', textAlign: 'center', color: 'var(--slate-500)' }}>
                  <FileCheck size={36} color="var(--slate-400)" style={{ margin: '0 auto 12px auto' }} />
                  <p style={{ fontSize: '0.875rem' }}>
                    Enter any lot number above to review its instant chemical composition and autoclave clearance data.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Direct Shop Link Card */}
        <div className="quality-cta-banner" style={{ background: 'linear-gradient(135deg, var(--navy-dark) 0%, #153e7a 100%)', color: '#ffffff', borderRadius: '16px', padding: '36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '6px' }}>
              Looking for High-Precision Medical Instruments?
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#cbd5e1', maxWidth: '600px' }}>
              Explore our extensive collection of German-forged surgical instruments, diagnostic equipment, and complete procedure sets with free shipping on orders over $500.
            </p>
          </div>

          <button 
            className="btn-primary"
            style={{ padding: '12px 24px', background: '#ffffff', color: 'var(--navy-dark)', fontWeight: '700' }}
            onClick={() => onNavigate('shop')}
          >
            <span>Shop All Instruments</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
