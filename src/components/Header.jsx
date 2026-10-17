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
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  onSelectCategory
}) {
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);

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
              className="top-bar-cta-btn"
              onClick={() => handleNavClick('shop')}
            >
              Shop All Instruments
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
              <span className="brand-subtitle">MEDICAL EQUIPMENT & SURGICAL TOOLS</span>
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
              className="header-action-btn header-action-signin"
              onClick={onOpenSignIn}
              title="Sign In to Your Account"
            >
              <User size={16} />
              <span className="header-btn-text">SIGN IN</span>
            </button>

            <button 
              className="header-action-btn header-action-support"
              onClick={() => onOpenEnquiry(null)}
              title="Product Questions & Customer Support"
            >
              <Mail size={16} />
              <span className="header-btn-text">SUPPORT</span>
            </button>

            <button 
              className="header-action-btn header-action-cart"
              onClick={onOpenCart}
              title="View Shopping Cart"
            >
              <ShoppingCart size={16} />
              <span className="header-btn-text">CART</span>
              {cartCount > 0 && (
                <span className="cart-badge-count">{cartCount}</span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                ABOUT US
              </button>
            </li>

            <li className="nav-item">
              <button 
                className={`nav-link ${activePage === 'faq' ? 'active' : ''}`}
                onClick={() => handleNavClick('faq')}
              >
                FAQ
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

          {/* Right Link: TRACK ORDER */}
          <button 
            className="nav-quality-doc-link"
            onClick={() => handleNavClick('track-order')}
          >
            <span>TRACK ORDER</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* 4. MOBILE NAVIGATION DRAWER & BACKDROP */}
      {mobileMenuOpen && (
        <div 
          className="mobile-drawer-overlay" 
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="mobile-drawer" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="mobile-drawer-header">
              <div 
                className="mobile-drawer-brand" 
                onClick={() => handleNavClick('home')}
              >
                <img 
                  src="/assets/surgix-logo.png" 
                  alt="Surgix Supplies" 
                  className="mobile-drawer-logo" 
                />
                <div>
                  <div className="mobile-drawer-title">SURGIX SUPPLIES</div>
                  <div className="mobile-drawer-subtitle">PRECISION SURGICAL TOOLS</div>
                </div>
              </div>
              <button 
                className="mobile-drawer-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Quick Action Buttons in Drawer */}
            <div className="mobile-drawer-actions">
              <button 
                className="mobile-drawer-action-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSignIn();
                }}
              >
                <User size={16} />
                <span>Sign In</span>
              </button>
              <button 
                className="mobile-drawer-action-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry(null);
                }}
              >
                <Mail size={16} />
                <span>Support</span>
              </button>
              <button 
                className="mobile-drawer-action-btn mobile-drawer-cart-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
              >
                <ShoppingCart size={16} />
                <span>Cart ({cartCount})</span>
              </button>
            </div>

            {/* Navigation List */}
            <div className="mobile-drawer-nav">
              <button 
                className={`mobile-nav-link ${activePage === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                <span>HOME</span>
              </button>

              {/* Shop Accordion */}
              <div className="mobile-nav-group">
                <div 
                  className={`mobile-nav-link mobile-nav-expandable ${activePage === 'shop' ? 'active' : ''}`}
                  onClick={() => setMobileShopOpen(!mobileShopOpen)}
                >
                  <span onClick={(e) => { e.stopPropagation(); handleNavClick('shop'); }}>
                    SHOP INSTRUMENTS
                  </span>
                  <button 
                    className="mobile-chevron-btn"
                    onClick={(e) => { e.stopPropagation(); setMobileShopOpen(!mobileShopOpen); }}
                    aria-label="Toggle categories"
                  >
                    <ChevronDown 
                      size={18} 
                      style={{ 
                        transform: mobileShopOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s ease'
                      }} 
                    />
                  </button>
                </div>

                {mobileShopOpen && (
                  <div className="mobile-submenu">
                    <button 
                      className="mobile-submenu-item mobile-submenu-all"
                      onClick={() => handleNavClick('shop')}
                    >
                      <span>Explore All Instruments</span>
                      <ArrowRight size={14} />
                    </button>
                    {surgicalCategories.map((cat) => (
                      <button 
                        key={cat.id}
                        className="mobile-submenu-item"
                        onClick={() => handleShopCategoryClick(cat.id)}
                      >
                        <span>{cat.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button 
                className={`mobile-nav-link ${activePage === 'sets' ? 'active' : ''}`}
                onClick={() => handleNavClick('sets')}
              >
                <span>INSTRUMENT SETS & TRAYS</span>
              </button>

              <button 
                className={`mobile-nav-link ${activePage === 'catalogue' ? 'active' : ''}`}
                onClick={() => handleNavClick('catalogue')}
              >
                <span>PRODUCT CATALOGUE</span>
              </button>

              <button 
                className={`mobile-nav-link ${activePage === 'about' ? 'active' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                <span>ABOUT US</span>
              </button>

              <button 
                className={`mobile-nav-link ${activePage === 'faq' ? 'active' : ''}`}
                onClick={() => handleNavClick('faq')}
              >
                <span>FAQ</span>
              </button>

              <button 
                className={`mobile-nav-link ${activePage === 'contact' ? 'active' : ''}`}
                onClick={() => handleNavClick('contact')}
              >
                <span>CONTACT US</span>
              </button>

              <button 
                className={`mobile-nav-link ${activePage === 'track-order' ? 'active' : ''}`}
                onClick={() => handleNavClick('track-order')}
              >
                <span>TRACK ORDER</span>
              </button>
            </div>

            {/* Drawer Footer Contact Details */}
            <div className="mobile-drawer-footer">
              <a href="tel:18005550199" className="mobile-drawer-contact-item">
                <Phone size={15} />
                <span>1 (800) 555-0199</span>
              </a>
              <a href="mailto:info@surgixsupplies.com" className="mobile-drawer-contact-item">
                <Mail size={15} />
                <span>info@surgixsupplies.com</span>
              </a>
              <div className="mobile-drawer-badge">
                <ShieldCheck size={14} />
                <span>ASTM A967 Passivated Stainless Steel</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
