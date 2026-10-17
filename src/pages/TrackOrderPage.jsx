import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  ArrowRight 
} from 'lucide-react';

export function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [trackingData, setTrackingData] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    setTrackingData({
      orderId: orderNumber.toUpperCase(),
      status: "In Sterile Transit — On Schedule",
      carrier: "FedEx Express Priority",
      trackingNumber: "7884 9912 3041",
      destination: "Verified Delivery Destination",
      estimatedDelivery: "Tomorrow by 10:30 AM EST",
      sterileSealCheck: "VERIFIED INTACT (Tamper-Evident RFID Seal #BOS-8491)",
      steps: [
        { title: "Order Confirmed & Payment Authorized", date: "Oct 10, 2026 - 09:14 AM", done: true },
        { title: "Quality Inspection & ASTM Chemical Passivation Audit", date: "Oct 10, 2026 - 11:30 AM", done: true },
        { title: "Cleanroom Sterile Packaging & Barcode Laser Scan", date: "Oct 10, 2026 - 02:45 PM", done: true },
        { title: "Dispatched from Boston Central Logistics Facility", date: "Oct 10, 2026 - 06:15 PM", done: true },
        { title: "Out for Final Delivery to Destination", date: "Estimated Oct 11, 2026 - 08:00 AM", done: false }
      ]
    });
  };

  return (
    <div className="track-order-page-root" style={{ background: '#f8fafc', padding: '48px 0 80px 0' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
            <Package size={24} />
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--navy-dark)' }}>
            Track Order & Delivery Status
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--slate-600)', marginTop: '8px' }}>
            Live status monitoring for all consumer orders, clinic deliveries, and express shipments.
          </p>
        </div>

        {/* Input Card */}
        <div className="track-input-card" style={{ background: '#ffffff', borderRadius: '14px', border: '1.5px solid var(--slate-200)', padding: '32px', boxShadow: 'var(--shadow-sm)', marginBottom: '32px' }}>
          <form onSubmit={handleTrack}>
            <div className="track-form-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr auto', gap: '14px', alignItems: 'flex-end' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Order Number or PO Reference *</label>
                <input 
                  type="text" 
                  required
                  className="form-input" 
                  placeholder="e.g. SX-88492 or PO-98124" 
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Delivery Zip Code *</label>
                <input 
                  type="text" 
                  required
                  className="form-input" 
                  placeholder="e.g. 02114" 
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '11px 22px', fontSize: '0.9rem' }}>
                <Search size={16} />
                <span>Track Order</span>
              </button>
            </div>
          </form>
          <div style={{ fontSize: '0.78rem', color: 'var(--slate-400)', marginTop: '10px' }}>
            Tip: Try demo order code <strong>SX-88492</strong> to view real-time tracking timeline.
          </div>
        </div>

        {/* Tracking Results Card */}
        {trackingData && (
          <div className="track-result-card" style={{ background: '#ffffff', borderRadius: '16px', border: '1.5px solid var(--slate-200)', padding: '36px', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid var(--slate-200)', paddingBottom: '20px', marginBottom: '24px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', background: 'var(--primary-light)', padding: '2px 8px', borderRadius: '4px' }}>
                  {trackingData.orderId}
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--navy-dark)', marginTop: '6px' }}>
                  {trackingData.status}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--slate-500)', marginTop: '2px' }}>
                  Carrier: <strong>{trackingData.carrier}</strong> ({trackingData.trackingNumber})
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>Estimated Delivery:</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--emerald-600)' }}>
                  {trackingData.estimatedDelivery}
                </div>
              </div>
            </div>

            {/* Sterile Tamper Seal Status */}
            <div style={{ background: 'var(--emerald-50)', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px', fontSize: '0.825rem', color: '#064e3b' }}>
              <ShieldCheck size={20} color="var(--emerald-600)" flexShrink={0} />
              <span><strong>Medical Transit Guarantee:</strong> {trackingData.sterileSealCheck}</span>
            </div>

            {/* Steps Timeline */}
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--navy-dark)', marginBottom: '18px' }}>
              Shipment Movement Log
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {trackingData.steps.map((st, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: st.done ? 'var(--emerald-600)' : 'var(--slate-200)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    {st.done ? <CheckCircle2 size={16} /> : <Clock size={14} color="var(--slate-400)" />}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: st.done ? '700' : '500', color: st.done ? 'var(--navy-dark)' : 'var(--slate-500)' }}>
                      {st.title}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--slate-400)', marginTop: '2px' }}>
                      {st.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
