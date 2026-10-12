import React from 'react';
import { 
  Building2, 
  Award, 
  ShieldCheck, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Microscope,
  ArrowRight,
  Globe2
} from 'lucide-react';

export function AboutPage({ onOpenQuote, onNavigate }) {
  return (
    <div className="about-page-root" style={{ background: '#ffffff' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, var(--navy-dark) 0%, #153e7a 100%)', color: '#ffffff', padding: '64px 0 72px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.12)', padding: '6px 16px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: '700', marginBottom: '16px' }}>
            <Building2 size={16} />
            <span>ESTABLISHED PRECISION • BOSTON, MA</span>
          </div>

          <h1 style={{ fontSize: '2.6rem', fontWeight: '800', marginBottom: '16px', lineHeight: '1.2' }}>
            Empowering Surgical Excellence Across North America
          </h1>

          <p style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: '1.65' }}>
            Surgix Supplies bridges traditional German metallurgical forging with advanced Boston-based quality engineering. We provide surgeons, private practitioners, students, and healthcare facilities direct factory access to premium surgical instrumentation.
          </p>
        </div>
      </section>

      {/* Origin & Boston Hub */}
      <section style={{ padding: '72px 0', borderBottom: '1px solid var(--slate-200)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Corporate Heritage
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--navy-dark)', marginTop: '6px', marginBottom: '18px' }}>
                Direct Factory Model Without Compromise
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--slate-600)', lineHeight: '1.7', marginBottom: '16px' }}>
                For decades, medical professionals and clinical buyers paid excessive markups to intermediary medical supply conglomerates. Surgix Supplies was founded by biomedical engineers and clinical materials directors to disrupt this supply chain.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--slate-600)', lineHeight: '1.7', marginBottom: '24px' }}>
                By establishing direct factory forging partnerships and routing every instrument through our Boston, Massachusetts testing laboratory, we achieve unyielding dimensional precision while passing 25% to 40% cost savings directly to individual buyers, clinics, and health networks.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ padding: '16px', background: 'var(--slate-50)', borderRadius: '8px', border: '1px solid var(--slate-200)' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary)' }}>450+</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--slate-600)', marginTop: '2px' }}>Surgeons, Clinics & Hospitals Supplied</div>
                </div>
                <div style={{ padding: '16px', background: 'var(--slate-50)', borderRadius: '8px', border: '1px solid var(--slate-200)' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary)' }}>100%</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--slate-600)', marginTop: '2px' }}>Lot Passivation & Boil Tested</div>
                </div>
              </div>
            </div>

            {/* Headquarters Card */}
            <div style={{ background: '#f8fafc', border: '1.5px solid var(--slate-200)', borderRadius: '16px', padding: '36px', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <img 
                  src="/assets/surgix-logo.png" 
                  alt="Surgix Logo" 
                  style={{ width: '64px', height: '64px' }} 
                />
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--navy-dark)' }}>
                    Boston Operations Hub
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
                    1200 Instrument Way, Suite 400, Boston, MA 02110
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.875rem', color: 'var(--slate-700)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Microscope size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Spectrometry Testing Lab:</strong> Verifies ASTM F899 chromium and carbon chemical tolerances before release.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <ShieldCheck size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Chemical Passivation Facility:</strong> Nitric & citric acid baths eliminating free iron and forming protective oxide layers.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Globe2 size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Centralized Logistics:</strong> 24-hour dispatch with cold-seal sterile transport across all 50 states.</span>
                </div>
              </div>

              <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--slate-200)' }}>
                <button 
                  className="btn-primary" 
                  style={{ width: '100%', padding: '12px' }}
                  onClick={() => onNavigate('contact')}
                >
                  <span>Schedule Facility Inspection / Audit</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Clinical Advisory */}
      <section style={{ padding: '72px 0', background: 'var(--slate-50)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Expertise & Governance
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--navy-dark)', marginTop: '4px' }}>
              Clinical Advisory & Engineering Leadership
            </h2>
            <p style={{ color: 'var(--slate-600)', maxWidth: '600px', margin: '8px auto 0 auto', fontSize: '0.925rem' }}>
              Our design and quality protocols are guided by practicing surgeons, sterile processing directors, and metallurgical researchers.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ background: '#ffffff', borderRadius: '12px', padding: '28px', border: '1px solid var(--slate-200)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.2rem', marginBottom: '16px' }}>
                DW
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--navy-dark)' }}>Dr. David Weiss, MD, FACS</h4>
              <div style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: '600', marginBottom: '10px' }}>Chief Surgical Officer • General & Trauma Surgery</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', lineHeight: '1.5' }}>
                Former Chief of Surgery overseeing instrument ergonomics, scissor bevel geometry, and box lock tolerance calibration.
              </p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '12px', padding: '28px', border: '1px solid var(--slate-200)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--gold-light)', color: 'var(--gold-tc)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.2rem', marginBottom: '16px' }}>
                EK
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--navy-dark)' }}>Elena Kostas, MS, CQE</h4>
              <div style={{ fontSize: '0.78rem', color: 'var(--gold-tc)', fontWeight: '600', marginBottom: '10px' }}>Director of Quality Assurance & Regulatory Affairs</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', lineHeight: '1.5' }}>
                Certified Quality Engineer leading ISO 13485:2016 audit compliance, FDA 510(k) master device listings, and cleanroom bioburden controls.
              </p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '12px', padding: '28px', border: '1px solid var(--slate-200)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--emerald-50)', color: 'var(--emerald-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.2rem', marginBottom: '16px' }}>
                MR
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--navy-dark)' }}>Marcus Reynolds, CRCST</h4>
              <div style={{ fontSize: '0.78rem', color: 'var(--emerald-600)', fontWeight: '600', marginBottom: '10px' }}>Head of Sterile Processing Advisory</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', lineHeight: '1.5' }}>
                Specialist in hospital central sterile processing, DIN basket containerization, and ISO 17664 autoclave reprocessing validation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
