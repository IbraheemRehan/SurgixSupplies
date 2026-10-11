import React from 'react';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

export function Footer({ 
  setActivePage, 
  onOpenCart, 
  onOpenWhatsApp,
  onOpenQuote 
}) {
  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand Info (Matches Image 1) */}
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
              US-based supplier of hospital-grade surgical instruments and complete instrument sets. 
              Direct factory export pricing with nationwide support.
            </p>
          </div>

          {/* Column 2: Shop (Matches Image 1) */}
          <div>
            <h4 className="footer-col-title">Shop</h4>
            <ul className="footer-links-list">
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
                  Procurement Cart
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

          {/* Column 3: Company (Matches Image 1) */}
          <div>
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-links-list">
              <li>
                <span className="footer-link" onClick={() => handleNavigate('about')}>
                  About Us
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => handleNavigate('quality')}>
                  Quality Assurance
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => handleNavigate('quality-docs')}>
                  Certifications
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => handleNavigate('contact')}>
                  Contact Us
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Care (Matches Image 1) */}
          <div>
            <h4 className="footer-col-title">Customer Care</h4>
            <ul className="footer-links-list">
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

          {/* Column 5: Contact (Matches Image 1) */}
          <div>
            <h4 className="footer-col-title">Contact</h4>
            <div className="footer-contact-item">
              <span>1200 Instrument Way, Suite 400, Boston, MA 02110</span>
            </div>
            <div className="footer-contact-item">
              <a href="tel:18005550199" className="footer-contact-link">
                1 (800) 555-0199
              </a>
            </div>
            <div className="footer-contact-item">
              <a href="mailto:info@surgixsupplies.com" className="footer-contact-link">
                info@surgixsupplies.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright (Matches Image 1) */}
        <div className="footer-bottom-bar">
          <p>© 2026 Surgix Supplies. All rights reserved. Free shipping on orders over $500.</p>
        </div>
      </div>
    </footer>
  );
}
