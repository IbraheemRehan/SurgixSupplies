import React, { useState } from 'react';
import { X, Send, Bot, Sparkles, User, ShieldCheck, ArrowRight } from 'lucide-react';

export function AiAssistantModal({ isOpen, onClose, onNavigateToShop, onNavigateToSets }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I am Surgix MedAI, your surgical instrument specialist. Whether you need a single instrument for your practice or bulk trays for a surgical facility, how can I assist you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    "What's the difference between AISI 410 and 420?",
    "Show me the 84-Piece Laparotomy Set",
    "How to maintain Tungsten Carbide (TC) gold handles?",
    "Do you sell single instruments or bulk packs?"
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const newMsgs = [...messages, { sender: 'user', text: query }];
    setMessages(newMsgs);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      let reply = "";
      const lower = query.toLowerCase();

      if (lower.includes('410') || lower.includes('420') || lower.includes('steel') || lower.includes('alloy')) {
        reply = "At Surgix Supplies, we forge our instruments according to ASTM F899 standards. AISI 420 (martensitic) features higher carbon content (HRC 52-56) providing razor-sharp edge retention ideal for dissecting scissors and chisels. In contrast, AISI 410 offers greater tensile ductility and resilience against stress fracture (HRC 46-50), making it the gold standard for hemostatic clamps and self-retaining retractors.";
      } else if (lower.includes('laparotomy') || lower.includes('set') || lower.includes('tray')) {
        reply = "Our 84-Piece Major General Laparotomy Set (SKU: SX-SET-LAP84) includes German-forged Mayo & Metzenbaum TC scissors, DeBakey atraumatic forceps, Balfour abdominal retractor, and 30 Fr Poole suction tube. It comes nested in a heavy-duty DIN electropolished sterilization basket with silicone dividers.";
      } else if (lower.includes('carbide') || lower.includes('tc') || lower.includes('gold')) {
        reply = "Tungsten Carbide (TC) inserts feature an exceptional Rockwell hardness of HRC 70-75. Identified by gold-plated finger rings, they provide 5x longer cutting longevity. During autoclave sterilization, ensure neutral pH enzymatic cleaning detergents (pH 7.0-8.5) and dry thoroughly before storage to prevent silver solder brazing degradation.";
      } else if (lower.includes('discount') || lower.includes('tier') || lower.includes('price') || lower.includes('quote') || lower.includes('single') || lower.includes('moq') || lower.includes('consumer') || lower.includes('bulk')) {
        reply = "We welcome all buyers! There is NO minimum order quantity (MOQ) — individual surgeons, students, and practitioners can purchase single instruments directly at direct factory pricing. For clinics and bulk orders: Tier 1 (10-49 units) saves 10%; Tier 2 (50-200 units) saves 18%; Tier 3 (200+ units) saves 25%. All orders over $500 qualify for free nationwide insured delivery.";
      } else {
        reply = `Thank you for your inquiry regarding "${query}". All Surgix Supplies instruments are 100% German-blank forged, passivated per ASTM A967, and certified under ISO 13485:2016 and FDA 510(k) clearances with full traceability for individual practitioners and healthcare facilities alike. Would you like to review our catalog or place an order?`;
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
      setTyping(false);
    }, 900);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" style={{ maxWidth: '560px', height: '620px', display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header" style={{ background: 'var(--navy-dark)', color: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#0084d6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={20} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff', margin: 0 }}>
                Surgix MedAI Assistant
              </h3>
              <p style={{ fontSize: '0.72rem', color: '#93c5fd', margin: 0 }}>
                Clinical Metallurgy & Product Advisor
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} style={{ color: '#ffffff' }}>
            <X size={20} />
          </button>
        </div>

        {/* Chat History */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((m, idx) => (
            <div 
              key={idx}
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
                justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              {m.sender === 'bot' && (
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--navy-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <Bot size={15} color="#ffffff" />
                </div>
              )}

              <div
                style={{
                  maxWidth: '82%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  lineHeight: '1.5',
                  background: m.sender === 'user' ? 'var(--primary)' : '#ffffff',
                  color: m.sender === 'user' ? '#ffffff' : 'var(--slate-800)',
                  boxShadow: m.sender === 'bot' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  border: m.sender === 'bot' ? '1px solid var(--slate-200)' : 'none'
                }}
              >
                {m.text}
              </div>
            </div>
          ))}

          {typing && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--slate-400)', fontSize: '0.8rem' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--navy-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={15} color="#ffffff" />
              </div>
              <span>Surgix MedAI is analyzing surgical specifications...</span>
            </div>
          )}
        </div>

        {/* Quick Suggested Queries */}
        <div style={{ padding: '8px 14px', background: '#ffffff', borderTop: '1px solid var(--slate-200)', display: 'flex', gap: '6px', overflowX: 'auto' }}>
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              type="button"
              style={{
                fontSize: '0.72rem',
                padding: '4px 8px',
                background: 'var(--slate-100)',
                color: 'var(--slate-700)',
                borderRadius: '4px',
                whiteSpace: 'nowrap',
                border: '1px solid var(--slate-200)'
              }}
              onClick={() => handleSend(p)}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          style={{ padding: '12px 14px', background: '#ffffff', borderTop: '1px solid var(--slate-200)', display: 'flex', gap: '8px' }}
        >
          <input
            type="text"
            className="form-input"
            style={{ padding: '8px 12px', fontSize: '0.85rem' }}
            placeholder="Ask about surgical instruments, alloy grades, or sets..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn-primary" style={{ padding: '8px 14px' }}>
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}
