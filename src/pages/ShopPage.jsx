import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Eye, 
  ShoppingCart, 
  Check, 
  ShieldCheck, 
  Award,
  ChevronRight,
  X
} from 'lucide-react';
import { surgicalInstruments, surgicalCategories } from '../data/instruments';
import { ProductImage } from '../components/ProductImage';

export function ShopPage({ 
  selectedCategory, 
  onSelectCategory, 
  onOpenProductModal, 
  onAddToCart, 
  onOpenEnquiry,
  onSelectProduct 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [steelFilter, setSteelFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeFilterCount = 
    (selectedCategory !== 'all' ? 1 : 0) + 
    (steelFilter !== 'all' ? 1 : 0) + 
    (searchTerm.trim() ? 1 : 0);

  const filtered = surgicalInstruments.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSteel = steelFilter === 'all' || 
                         (steelFilter === 'tc' && item.steel.includes('Tungsten Carbide')) ||
                         (steelFilter === '420' && item.steel.includes('420')) ||
                         (steelFilter === '410' && item.steel.includes('410'));
    return matchesCategory && matchesSearch && matchesSteel;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  const handleOpenProduct = (item) => {
    if (onSelectProduct) {
      onSelectProduct(item);
    } else if (onOpenProductModal) {
      onOpenProductModal(item);
    }
  };

  return (
    <div className="shop-page-root" style={{ background: '#f8fafc', padding: '40px 0 72px 0' }}>
      <div className="container">
        {/* Breadcrumb & Header */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--slate-500)', marginBottom: '8px' }}>
            <span>Home</span>
            <ChevronRight size={14} />
            <span>Shop</span>
            <ChevronRight size={14} />
            <strong style={{ color: 'var(--navy-dark)' }}>
              {surgicalCategories.find((c) => c.id === selectedCategory)?.name || 'All Instruments'}
            </strong>
          </div>

          <div className="shop-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 className="shop-page-title" style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--navy-dark)', letterSpacing: '-0.02em', margin: 0 }}>
                {surgicalCategories.find((c) => c.id === selectedCategory)?.name || 'All Surgical Instruments'}
              </h1>
              <p style={{ color: 'var(--slate-600)', fontSize: '0.95rem', marginTop: '6px', margin: 0 }}>
                Showing {sorted.length} {sorted.length === 1 ? 'instrument' : 'instruments'} passivated per ASTM A967
              </p>
            </div>

          </div>
        </div>

        {/* 2-Column Catalog Layout */}
        <div className="shop-layout" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px', alignItems: 'start' }}>
          {/* Filters Sidebar */}
          <aside className="shop-sidebar" style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid var(--slate-200)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '700', color: 'var(--navy-dark)', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1px solid var(--slate-100)' }}>
              <SlidersHorizontal size={16} />
              <span>Filter Instruments</span>
            </div>

            {/* Keyword Search */}
            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--slate-700)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                Search In Catalog
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Mayo, Forceps, TC..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px 8px 32px', border: '1px solid var(--slate-300)', borderRadius: '6px', fontSize: '0.85rem' }}
                />
                <Search size={14} color="var(--slate-400)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            {/* Category Navigation */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--slate-700)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                Specialty Category
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {surgicalCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    style={{
                      textAlign: 'left',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: selectedCategory === cat.id ? '700' : '500',
                      background: selectedCategory === cat.id ? 'var(--primary-light)' : 'transparent',
                      color: selectedCategory === cat.id ? 'var(--primary)' : 'var(--slate-700)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Steel Material Filter */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--slate-700)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                Steel Formulation
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="radio" name="steel" checked={steelFilter === 'all'} onChange={() => setSteelFilter('all')} />
                  <span>All Formulations</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="radio" name="steel" checked={steelFilter === 'tc'} onChange={() => setSteelFilter('tc')} />
                  <span>Tungsten Carbide (TC Jaws)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="radio" name="steel" checked={steelFilter === '420'} onChange={() => setSteelFilter('420')} />
                  <span>AISI 420 Martensitic</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="radio" name="steel" checked={steelFilter === '410'} onChange={() => setSteelFilter('410')} />
                  <span>AISI 410 Clamp Steel</span>
                </label>
              </div>
            </div>

            {/* Direct RFQ Action */}
            <div style={{ borderTop: '1px solid var(--slate-100)', paddingTop: '18px' }}>
              <button 
                className="btn-secondary" 
                style={{ width: '100%', padding: '10px', fontSize: '0.8rem', justifyContent: 'center' }}
                onClick={() => onOpenEnquiry(null)}
              >
                Inquire Bulk Tender
              </button>
            </div>
          </aside>

          {/* Main Results Grid */}
          <main>
            {/* Top Bar Sort and Count */}
            <div className="shop-sort-bar">
              <div className="shop-sort-bar-left">
                <button 
                  className="mobile-filter-trigger-btn"
                  onClick={() => setMobileFiltersOpen(true)}
                  type="button"
                >
                  <SlidersHorizontal size={14} />
                  <span>Filter</span>
                  {activeFilterCount > 0 && (
                    <span className="mobile-filter-count-badge">{activeFilterCount}</span>
                  )}
                </button>
                <span className="shop-count-text">
                  Showing <strong>{sorted.length}</strong> instruments
                </span>
              </div>

              <div className="shop-sort-bar-controls">
                {/* Category Dropdown */}
                <div className="shop-filter-field">
                  <label htmlFor="shop-category-select" className="shop-filter-label">
                    Category:
                  </label>
                  <select
                    id="shop-category-select"
                    value={selectedCategory}
                    onChange={(e) => onSelectCategory(e.target.value)}
                    className="shop-filter-select"
                  >
                    {surgicalCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By Dropdown */}
                <div className="shop-filter-field">
                  <label htmlFor="shop-sort-select" className="shop-filter-label">
                    Sort by:
                  </label>
                  <select
                    id="shop-sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="shop-filter-select"
                  >
                    <option value="popular">Most In-Demand</option>
                    <option value="rating">Top Surgeon Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Empty State */}
            {sorted.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: '#ffffff', borderRadius: '12px', border: '1px solid var(--slate-200)' }}>
                <p style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--navy-dark)', marginBottom: '8px' }}>
                  No surgical instruments matched your filters
                </p>
                <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem', marginBottom: '20px' }}>
                  Try relaxing your keyword search or selected steel alloy.
                </p>
                <button 
                  className="btn-secondary"
                  onClick={() => { setSearchTerm(''); setSteelFilter('all'); onSelectCategory('all'); }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="shop-products-grid">
                {sorted.map((item) => (
                  <div key={item.id} className="instrument-card">
                    {item.steel.includes('Tungsten Carbide') ? (
                      <span className="instrument-card-badge tc-badge">Tungsten Carbide</span>
                    ) : (
                      <span className="instrument-card-badge">Surgical Grade</span>
                    )}

                    <div 
                      className="instrument-card-image-box"
                      style={{ background: '#f8fafc', position: 'relative', cursor: 'pointer' }}
                      onClick={() => handleOpenProduct(item)}
                    >
                      <ProductImage 
                        src={item.image} 
                        alt={item.name} 
                        sku={item.sku} 
                        height="100%" 
                        showWatermark={true}
                      />
                    </div>

                    <div className="instrument-card-content">
                      <span className="instrument-sku">{item.sku}</span>
                      <h4 
                        className="instrument-title" 
                        title={item.name}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleOpenProduct(item)}
                      >
                        {item.name}
                      </h4>

                      <div className="instrument-meta-row">
                        <span>{item.size}</span>
                        <span>•</span>
                        <span>{item.rockwell}</span>
                      </div>

                      <div className="instrument-price-box">
                        <div>
                          <div className="instrument-price">${item.price.toFixed(2)}</div>
                          <div className="instrument-bulk-tag">Bulk: ${item.bulkPrice.toFixed(2)}</div>
                        </div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--emerald-600)', fontWeight: '600' }}>
                          ✓ In Stock
                        </span>
                      </div>

                      <div className="card-actions-row">
                        <button 
                          className="btn-secondary"
                          onClick={() => handleOpenProduct(item)}
                        >
                          <Eye size={14} />
                          <span>Details</span>
                        </button>

                        <button 
                          className="btn-primary"
                          onClick={() => onAddToCart(item)}
                        >
                          <ShoppingCart size={14} />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer Overlay & Modal */}
      {mobileFiltersOpen && (
        <div className="mobile-filter-overlay" onClick={() => setMobileFiltersOpen(false)}>
          <div className="mobile-filter-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-filter-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <SlidersHorizontal size={18} color="var(--primary)" />
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: 'var(--navy-dark)' }}>
                  Filter Instruments
                </h3>
              </div>
              <button 
                className="mobile-filter-close"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mobile-filter-body">
              {/* Keyword Search */}
              <div className="filter-group">
                <label className="filter-label">Search In Catalog</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Mayo, Forceps, TC..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="filter-search-input"
                  />
                  <Search size={14} color="var(--slate-400)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')}
                      style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)', fontSize: '0.75rem', fontWeight: '700' }}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Steel Formulation */}
              <div className="filter-group">
                <label className="filter-label">Steel Formulation</label>
                <div className="filter-radio-list">
                  <label className={`filter-radio-item ${steelFilter === 'all' ? 'active' : ''}`}>
                    <input type="radio" name="mobile-steel" checked={steelFilter === 'all'} onChange={() => setSteelFilter('all')} />
                    <span>All Formulations</span>
                  </label>
                  <label className={`filter-radio-item ${steelFilter === 'tc' ? 'active' : ''}`}>
                    <input type="radio" name="mobile-steel" checked={steelFilter === 'tc'} onChange={() => setSteelFilter('tc')} />
                    <span>Tungsten Carbide (TC Jaws)</span>
                  </label>
                  <label className={`filter-radio-item ${steelFilter === '420' ? 'active' : ''}`}>
                    <input type="radio" name="mobile-steel" checked={steelFilter === '420'} onChange={() => setSteelFilter('420')} />
                    <span>AISI 420 Martensitic</span>
                  </label>
                  <label className={`filter-radio-item ${steelFilter === '410' ? 'active' : ''}`}>
                    <input type="radio" name="mobile-steel" checked={steelFilter === '410'} onChange={() => setSteelFilter('410')} />
                    <span>AISI 410 Clamp Steel</span>
                  </label>
                </div>
              </div>

              {/* Specialty Category Selector */}
              <div className="filter-group">
                <label className="filter-label">Specialty Category</label>
                <div className="filter-category-grid">
                  {surgicalCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => onSelectCategory(cat.id)}
                      className={`filter-category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                    >
                      <span>{cat.name}</span>
                      {selectedCategory === cat.id && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mobile-filter-footer">
              <button 
                className="btn-secondary"
                style={{ flex: 1, padding: '11px', justifyContent: 'center' }}
                onClick={() => {
                  setSearchTerm('');
                  setSteelFilter('all');
                  onSelectCategory('all');
                }}
              >
                Reset
              </button>
              <button 
                className="btn-primary"
                style={{ flex: 1.5, padding: '11px', justifyContent: 'center' }}
                onClick={() => setMobileFiltersOpen(false)}
              >
                Show {sorted.length} Products
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
