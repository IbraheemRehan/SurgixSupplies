import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  Search, 
  User, 
  FileText, 
  ShoppingCart, 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { surgicalCategories } from '../data/instruments';

export function Header({ 
  activePage, 
  setActivePage, 
  cartCount, 
  onOpenCart, 
  onOpenEnquiry, 
  onOpenSignIn, 
  onOpenQuote,
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  onSelectCategory
}) {
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShopCategoryClick = (categoryId) => {
    onSelectCategory(categoryId);
    setActivePage('shop');
    setShopDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery);
      setActivePage('shop');
    }
  };

  return (
    <header className="header-root">
      {/* 1. TOP ANNOUNCEMENT BAR (Matches Image 1) */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <a href="tel:18005550199" className="top-bar-phone">
              <Phone size={13} />
              <span>1 (800) 555-0199</span>
            </a>
            <span className="top-bar-announcement">
              Free shipping on orders over $500
            </span>
          </div>

          <div className="top-bar-right">
            <a href="mailto:info@surgixsupplies.com" className="top-bar-email">
              <Mail size={13} />
              <span>info@surgixsupplies.com</span>
            </a>
            <button 
              className="top-bar-quote-btn"
              onClick={onOpenQuote}
            >
              Request a Quote
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR (Matches Image 1 with Logo from Image 3) */}
      <div className="main-header">
        <div className="container main-header-inner">
          {/* Logo Brand Title */}
          <div 
            className="brand-wrapper" 
            onClick={() => handleNavClick('home')}
          >
            <img 
              src="/assets/surgix-logo.png" 
              alt="Surgix Supplies Logo" 
              className="brand-logo-img" 
            />
            <div className="brand-text-col">
              <span className="brand-title">SURGIX SUPPLIES</span>
              <span className="brand-subtitle">SURGICAL INSTRUMENTS & SETS</span>
            </div>
          </div>

          {/* Search Form */}
          <form className="search-form-wrapper" onSubmit={handleSearch}>
            <div className="search-input-group">
              <span className="search-icon-left">
                <Search size={18} />
              </span>
              <input 
                type="text" 
                placeholder="Find instruments — name or SKU..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-submit-btn">
                <Search size={14} />
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Action Buttons: Sign In, Enquiry, Cart */}
          <div className="header-actions">
            <button 
              className="header-action-btn"
              onClick={onOpenSignIn}
              title="Customer & Clinic Sign In"
            >
              <User size={16} />
              <span>SIGN IN</span>
            </button>

            <button 
              className="header-action-btn"
              onClick={() => onOpenEnquiry(null)}
              title="Submit Direct Product Enquiry or RFQ"
            >
              <Mail size={16} />
              <span>ENQUIRY</span>
            </button>

            <button 
              className="header-action-btn"
              onClick={onOpenCart}
              title="View Cart & Quote List"
            >
              <ShoppingCart size={16} />
              <span>CART</span>
              {cartCount > 0 && (
                <span className="cart-badge-count">{cartCount}</span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ display: 'none' }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. NAVIGATION BAR (Matches Image 1) */}
      <nav className="nav-bar">
        <div className="container nav-bar-inner">
          <ul className="nav-links-list">
            <li className="nav-item">
              <button 
                className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                HOME
              </button>
            </li>

            {/* SHOP WITH DROPDOWN */}
            <li 
              className="nav-item"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <button 
                className={`nav-link ${activePage === 'shop' ? 'active' : ''}`}
                onClick={() => handleNavClick('shop')}
              >
                <span>SHOP</span>
                <ChevronDown size={14} />
              </button>

              {shopDropdownOpen && (
                <div className="dropdown-menu">
                  {surgicalCategories.map((cat) => (
                    <div 
                      key={cat.id} 
                      className="dropdown-item"
                      onClick={() => handleShopCategoryClick(cat.id)}
                    >
                      <span>{cat.name}</span>
                    </div>
                  ))}
                  <div 
                    className="dropdown-item"
                    style={{ borderTop: '1px solid var(--slate-100)', color: 'var(--primary)', fontWeight: '600' }}
                    onClick={() => handleNavClick('shop')}
                  >
                    <span>View All Instruments →</span>
                  </div>
                </div>
              )}
            </li>

            <li className="nav-item">
              <button 
                className={`nav-link ${activePage === 'sets' ? 'active' : ''}`}
                onClick={() => handleNavClick('sets')}
              >
                INSTRUMENT SETS
              </button>
            </li>

            <li className="nav-item">
              <button 
                className={`nav-link ${activePage === 'catalogue' ? 'active' : ''}`}
                onClick={() => handleNavClick('catalogue')}
              >
                CATALOGUE
              </button>
            </li>

            <li className="nav-item">
              <button 
                className={`nav-link ${activePage === 'about' ? 'active' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                ABOUT
              </button>
            </li>

            <li className="nav-item">
              <button 
                className={`nav-link ${activePage === 'quality' ? 'active' : ''}`}
                onClick={() => handleNavClick('quality')}
              >
                QUALITY
              </button>
            </li>

            <li className="nav-item">
              <button 
                className={`nav-link ${activePage === 'contact' ? 'active' : ''}`}
                onClick={() => handleNavClick('contact')}
              >
                CONTACT US
              </button>
            </li>
          </ul>

          {/* Right Link: QUALITY DOCUMENTATION -> (Matches Image 1) */}
          <button 
            className="nav-quality-doc-link"
            onClick={() => handleNavClick('quality-docs')}
          >
            <span>QUALITY DOCUMENTATION</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </nav>
    </header>
  );
}
