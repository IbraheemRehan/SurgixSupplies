import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search, X, MessageSquare, ArrowRight } from 'lucide-react';

export function FaqPage({ onNavigate }) {
  const faqs = [
    {
      id: 1,
      category: 'ordering',
      q: "Who can purchase from Surgix Supplies?",
      a: "Anyone can purchase directly! We sell directly to anyone—individual consumers, healthcare workers, private practitioners, surgeons, veterinarians, dental clinics, students, and care providers with ZERO minimum order requirements (MOQ). You can buy single units or complete instrument sets instantly online using credit cards, Apple Pay, Google Pay, or direct bank wire at transparent direct pricing."
    },
    {
      id: 2,
      category: 'metallurgy',
      q: "Are Surgix Supplies instruments manufactured from German stainless steel?",
      a: "Yes. 100% of our surgical blanks originate from certified German forging mills meeting ASTM F899 standards (primarily AISI 420 for cutting blades and AISI 410 for flexible hemostats). Final machining, precision hand-honing, ASTM A967 passivation, and quality inspections take place in our Boston, Massachusetts facility."
    },
    {
      id: 3,
      category: 'warranty',
      q: "What guarantee and return policy do you offer?",
      a: "All instruments come with a 30-day risk-free inspection trial and a lifetime warranty against forging defects, box-lock loosening, or joint misalignment. If you are not completely satisfied with the balance, weight, or craftsmanship of any item, return it within 30 days for a full refund."
    },
    {
      id: 4,
      category: 'shipping',
      q: "What is your free shipping policy?",
      a: "As featured on our top announcement bar, all orders totaling $500.00 or more qualify for complimentary nationwide express shipping across all 50 US states. For emergency restocks, same-day Saturday/Sunday dispatch is available upon request."
    },
    {
      id: 5,
      category: 'ordering',
      q: "What payment methods do you accept?",
      a: "We accept all major credit and debit cards (Visa, MasterCard, American Express, Discover), Apple Pay, Google Pay, and direct bank wire transfers. Everyone can place an order immediately through our secure checkout with instant confirmation."
    },
    {
      id: 6,
      category: 'ordering',
      q: "Can you provide custom laser engraving and department color coding?",
      a: "Yes. We offer high-resolution fiber laser marking on all instruments (department name, barcode 2D DataMatrix, or surgeon initials) as well as bonded color-coding silicone rings for tray differentiation at zero additional charge for volume orders."
    },
    {
      id: 7,
      category: 'sterilization',
      q: "What parameters should Central Sterile Processing (CSPD) use for autoclave reprocessing?",
      a: "All Surgix instruments are validated for steam autoclave sterilization per ISO 17664: Pre-vacuum steam cycle at 134°C (273°F) for 4 minutes with a minimum 20-minute drying phase. Always utilize neutral pH enzymatic detergents (pH 7.0–8.5)."
    }
  ];

  const categories = [
    { id: 'all', label: 'All FAQs' },
    { id: 'ordering', label: 'Purchasing & MOQ' },
    { id: 'metallurgy', label: 'German Metallurgy' },
    { id: 'warranty', label: 'Warranty & Trial' },
    { id: 'shipping', label: 'Express Shipping' },
    { id: 'sterilization', label: 'Autoclave & CSPD' }
  ];

  const [openIdx, setOpenIdx] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = 
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="faq-page-root">
      <div className="container" style={{ maxWidth: '820px' }}>
        <div className="faq-header-section">
          <div className="faq-icon-badge">
            <HelpCircle size={24} />
          </div>
          <h1 className="faq-page-title">
            Frequently Asked Questions
          </h1>
          <p className="faq-page-subtitle">
            Answers to common questions regarding ordering, metallurgy, sterilizer cycles, and bulk pricing.
          </p>
        </div>

        {/* Live Search Box */}
        <div className="faq-search-wrapper">
          <input
            type="text"
            className="faq-search-input"
            placeholder="Search FAQs (e.g. shipping, German steel, MOQ, autoclave)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={16} className="faq-search-icon" />
          {searchQuery && (
            <button 
              type="button" 
              className="faq-search-clear-btn"
              onClick={() => setSearchQuery('')}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category Filter Pills (Horizontal swipeable on phone) */}
        <div className="faq-categories-scroll">
          <div className="faq-categories-track">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`faq-category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setOpenIdx(0);
                }}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Accordion List */}
        <div className="faq-accordion-list">
          {filteredFaqs.length === 0 ? (
            <div className="faq-empty-state">
              <p>No questions matched your search criteria.</p>
              <button 
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Reset FAQ Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;

              return (
                <div key={faq.id} className={`faq-card ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{faq.q}</span>
                    <span className={`faq-chevron-icon ${isOpen ? 'rotated' : ''}`}>
                      <ChevronDown size={18} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="faq-answer-body">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Contact Support Banner */}
        <div className="faq-support-card">
          <div className="faq-support-icon">
            <MessageSquare size={24} />
          </div>
          <h3 className="faq-support-title">
            Have a question not listed here?
          </h3>
          <p className="faq-support-subtitle">
            Our Boston clinical engineers and regulatory team are on standby to address your queries.
          </p>
          <button 
            type="button"
            className="btn-primary faq-support-btn" 
            onClick={() => onNavigate && onNavigate('contact')}
          >
            <span>Contact Customer Support</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
