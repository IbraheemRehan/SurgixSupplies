import React, { useState } from 'react';
import { MapPin, Phone, Mail, ChevronDown, ShieldCheck } from 'lucide-react';

export function Footer({ 
  setActivePage, 
  onOpenCart, 
  onOpenWhatsApp
}) {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (sectionName) => {
    setOpenSection((prev) => (prev === sectionName ? null : sectionName));
  };

  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand Info */}
          <div className="footer-brand-col">
            <div 
              className="footer-logo-row" 
              onClick={() => handleNavigate('home')} 
              style={{ cursor: 'pointer' }}
            >
              <img 
                src="/assets/surgix-logo.png" 
                alt="Surgix Supplies Logo" 
                className="footer-logo-img" 
              />
              <div>
                <div className="footer-brand-title">SURGIX SUPPLIES</div>
                <div className="footer-brand-subtitle">SURGICAL INSTRUMENTS & SETS</div>
              </div>
            </div>
            <p className="footer-desc">
              US-based supplier of precision surgical instruments and complete sets for practitioners, clinics, and individual buyers. Direct factory pricing with nationwide express delivery.
            </p>
          </div>

          {/* Column 2: Shop */}
          <div className="footer-col-accordion">
            <button 
              className="footer-col-header" 
              onClick={() => toggleSection('shop')}
              type="button"
            >
              <h4 className="footer-col-title">Shop</h4>
              <ChevronDown 
                size={18} 
                className={`footer-col-chevron ${openSection === 'shop' ? 'open' : ''}`}
              />
            </button>
            <ul className={`footer-links-list ${openSection === 'shop' ? 'open' : ''}`}>
              <li>
                <span className="footer-link" onClick={() => handleNavigate('shop')}>
                  Shop Catalog
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => handleNavigate('sets')}>
                  Instrument Sets
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => handleNavigate('cart')}>
                  Shopping Cart
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => handleNavigate('checkout')}>
                  Secure Checkout
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => handleNavigate('catalogue')}>
                  Catalogue Help
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="footer-col-accordion">
            <button 
              className="footer-col-header" 
              onClick={() => toggleSection('company')}
              type="button"
            >
              <h4 className="footer-col-title">Company</h4>
              <ChevronDown 
                size={18} 
                className={`footer-col-chevron ${openSection === 'company' ? 'open' : ''}`}
              />
            </button>
            <ul className={`footer-links-list ${openSection === 'company' ? 'open' : ''}`}>
              <li>
                <span className="footer-link" onClick={() => handleNavigate('about')}>
                  About Us
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => handleNavigate('sets')}>
                  Instrument Sets
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => handleNavigate('catalogue')}>
                  Product Catalogue
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => handleNavigate('contact')}>
                  Contact Us
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Care */}
          <div className="footer-col-accordion">
            <button 
              className="footer-col-header" 
              onClick={() => toggleSection('care')}
              type="button"
            >
              <h4 className="footer-col-title">Customer Care</h4>
              <ChevronDown 
                size={18} 
                className={`footer-col-chevron ${openSection === 'care' ? 'open' : ''}`}
              />
            </button>
            <ul className={`footer-links-list ${openSection === 'care' ? 'open' : ''}`}>
              <li>
                <span className="footer-link" onClick={() => handleNavigate('track-order')}>
                  Track Order
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => handleNavigate('shipping-returns')}>
                  Shipping & Returns
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => handleNavigate('faq')}>
                  FAQ
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={onOpenWhatsApp}>
                  WhatsApp Support
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => handleNavigate('legal')}>
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => handleNavigate('legal')}>
                  Terms & Conditions
                </span>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div className="footer-col-accordion">
            <button 
              className="footer-col-header" 
              onClick={() => toggleSection('contact')}
              type="button"
            >
              <h4 className="footer-col-title">Contact</h4>
              <ChevronDown 
                size={18} 
                className={`footer-col-chevron ${openSection === 'contact' ? 'open' : ''}`}
              />
            </button>
            <div className={`footer-contact-body ${openSection === 'contact' ? 'open' : ''}`}>
              <div className="footer-contact-item">
                <MapPin size={15} className="footer-contact-icon" />
                <span>1200 Instrument Way, Suite 400, Boston, MA 02110</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={15} className="footer-contact-icon" />
                <a href="tel:18005550199" className="footer-contact-link">
                  1 (800) 555-0199
                </a>
              </div>
              <div className="footer-contact-item">
                <Mail size={15} className="footer-contact-icon" />
                <a href="mailto:info@surgixsupplies.com" className="footer-contact-link">
                  info@surgixsupplies.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Quality Guarantee */}
        <div className="footer-bottom-bar">
          <div className="footer-quality-pill">
            <ShieldCheck size={14} />
            <span>ASTM F899 Stainless Steel • Passivated Surgical Grade</span>
          </div>
          <p>© 2026 Surgix Supplies. All rights reserved. Free shipping on orders over $500.</p>
        </div>
      </div>
    </footer>
  );
}
