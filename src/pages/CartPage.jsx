import React, { useState } from 'react';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  FileDown, 
  ShoppingCart, 
  Lock, 
  Truck, 
  Award, 
  Tag, 
  ArrowLeft,
  Info,
  Check
} from 'lucide-react';
import { ProductImage } from '../components/ProductImage';
import { surgicalInstruments } from '../data/instruments';

export function CartPage({ 
  cartItems, 
  onUpdateQty, 
  onRemoveItem, 
  onNavigate, 
  onOpenQuote,
  onSelectProduct 
}) {
  const [taxExempt, setTaxExempt] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // in percent
  const [discountCodeName, setDiscountCodeName] = useState('');
  const [promoError, setPromoError] = useState('');
  const [poReference, setPoReference] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 500;
  const freeShippingReached = subtotal >= freeShippingThreshold;
  const baseShippingCost = freeShippingReached || subtotal === 0 ? 0 : 25.00;
  
  const discountAmount = appliedDiscount > 0 ? (subtotal * appliedDiscount) / 100 : 0;
  const subtotalAfterDiscount = Math.max(0, subtotal - discountAmount);
  const taxCost = taxExempt ? 0 : subtotalAfterDiscount * 0.065;
  const grandTotal = subtotalAfterDiscount + baseShippingCost + taxCost;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'SURGIX10' || code === 'MED10') {
      setAppliedDiscount(10);
      setDiscountCodeName(code);
      setPromoCode('');
    } else if (code === 'HOSPITAL15' || code === 'OR15') {
      setAppliedDiscount(15);
      setDiscountCodeName(code);
      setPromoCode('');
    } else {
      setPromoError('Invalid promo code. Try "SURGIX10" for 10% off.');
    }
  };

  const handleRemoveDiscount = () => {
    setAppliedDiscount(0);
    setDiscountCodeName('');
  };

  // Recommended products for empty or upsell state
  const recommendedItems = surgicalInstruments.slice(0, 3);

  return (
    <div className="cart-page-wrapper" style={{ backgroundColor: '#f8fafc', minHeight: '80vh', paddingBottom: '60px' }}>
      {/* 1. Breadcrumbs & Page Header */}
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid var(--slate-200)', padding: '24px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: 'var(--slate-400)', marginBottom: '8px' }}>
            <button onClick={() => onNavigate('home')} style={{ color: 'var(--slate-600)', hover: { color: 'var(--primary)' } }}>Home</button>
            <span>/</span>
            <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Shopping Cart</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: 'var(--navy-dark)', letterSpacing: '-0.02em', margin: 0 }}>
                Shopping Cart & Order Review
              </h1>
              <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginTop: '4px', margin: 0 }}>
                Surgical-grade German stainless steel instruments & precision sets ready for dispatch
              </p>
            </div>
            <button 
              onClick={() => onNavigate('shop')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: '600', fontSize: '0.875rem' }}
            >
              <ArrowLeft size={16} />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '28px' }}>
        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid var(--slate-200)', padding: '60px 24px', textAlign: 'center', maxWidth: '720px', margin: '40px auto' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
              <ShoppingCart size={38} strokeWidth={1.5} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--navy-dark)', marginBottom: '8px' }}>
              Your Cart is Empty
            </h2>
            <p style={{ color: 'var(--slate-600)', fontSize: '0.95rem', maxWidth: '440px', margin: '0 auto 24px auto', lineHeight: '1.6' }}>
              Explore our surgical instruments catalog or comprehensive procedure sets suitable for individual practitioners, students, clinics, and healthcare facilities.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button 
                className="btn-primary" 
                style={{ padding: '12px 24px', fontSize: '0.95rem' }}
                onClick={() => onNavigate('shop')}
              >
                Browse Instruments Catalog
              </button>
              <button 
                className="btn-secondary" 
                style={{ padding: '12px 24px', fontSize: '0.95rem' }}
                onClick={() => onNavigate('sets')}
              >
                View Surgical Sets & Trays
              </button>
            </div>

            {/* Popular Items Showcase */}
            <div style={{ marginTop: '48px', borderTop: '1px solid var(--slate-200)', paddingTop: '32px', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--navy-dark)', marginBottom: '16px' }}>
                Featured Surgical Instruments & Sets:
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                {recommendedItems.map(item => (
                  <div 
                    key={item.id} 
                    style={{ border: '1px solid var(--slate-200)', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer' }}
                    onClick={() => onSelectProduct && onSelectProduct(item)}
                  >
                    <div style={{ height: '100px', borderRadius: '6px', overflow: 'hidden' }}>
                      <ProductImage src={item.image} alt={item.name} sku={item.sku} height="100%" showWatermark={false} />
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)' }}>{item.sku}</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--slate-800)', lineHeight: '1.3', flex: 1 }}>{item.name}</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--navy-dark)' }}>${item.price.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Active Cart with Items */
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '28px' }}>
            
            {/* Free Shipping Progress Meter Bar */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid var(--slate-200)', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '600' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Truck size={18} color="var(--primary)" />
                  {freeShippingReached ? (
                    <span style={{ color: 'var(--emerald-600)', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={16} /> Qualified for Free Insured Nationwide Shipping!
                    </span>
                  ) : (
                    <span>
                      Add <strong style={{ color: 'var(--navy-dark)' }}>${(freeShippingThreshold - subtotal).toFixed(2)}</strong> more to unlock <strong>Free Nationwide Freight</strong>
                    </span>
                  )}
                </span>
                <span style={{ color: 'var(--slate-600)', fontSize: '0.8125rem' }}>
                  ${subtotal.toFixed(2)} / ${freeShippingThreshold}.00
                </span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    width: `${progressPercent}%`, 
                    height: '100%', 
                    backgroundColor: freeShippingReached ? 'var(--emerald-600)' : 'var(--primary)',
                    transition: 'width 0.4s ease',
                    borderRadius: '999px'
                  }} 
                />
              </div>
            </div>

            {/* Main Cart Grid: Left Items List, Right Order Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(320px, 1fr)', gap: '28px', alignItems: 'start' }}>
              
              {/* Left Column: Cart Table */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid var(--slate-200)', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                  <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--slate-200)', backgroundColor: 'var(--slate-50)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--navy-dark)' }}>
                      Requisition Items ({cartItems.length} {cartItems.length === 1 ? 'line item' : 'line items'})
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                      German Stainless Steel • ASTM F899
                    </span>
                  </div>

                  <div style={{ divideY: '1px solid var(--slate-100)' }}>
                    {cartItems.map((item) => {
                      const itemTotal = item.price * item.quantity;
                      return (
                        <div 
                          key={item.id} 
                          style={{ 
                            padding: '20px', 
                            display: 'grid', 
                            gridTemplateColumns: '88px 1fr auto auto', 
                            gap: '18px', 
                            alignItems: 'center',
                            borderBottom: '1px solid var(--slate-100)'
                          }}
                        >
                          {/* Image with minimal watermark */}
                          <div 
                            style={{ width: '88px', height: '88px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--slate-200)', backgroundColor: '#ffffff', flexShrink: 0, cursor: 'pointer' }}
                            onClick={() => onSelectProduct && onSelectProduct(item)}
                            title="Click to view product details"
                          >
                            <ProductImage 
                              src={item.image} 
                              alt={item.name} 
                              sku={item.sku} 
                              height="100%" 
                              showWatermark={false}
                            />
                          </div>

                          {/* Info */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--primary)', letterSpacing: '0.05em' }}>
                                {item.sku}
                              </span>
                              <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--emerald-50)', color: 'var(--emerald-600)', fontWeight: '600' }}>
                                In Stock • Ships 24h
                              </span>
                            </div>
                            <h3 
                              style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--slate-800)', margin: 0, lineHeight: '1.3', cursor: 'pointer' }}
                              onClick={() => onSelectProduct && onSelectProduct(item)}
                            >
                              {item.name}
                            </h3>
                            <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <span>Unit Price: <strong>${item.price.toFixed(2)}</strong></span>
                              {item.bulkPrice && (
                                <span style={{ color: 'var(--emerald-600)' }}>
                                  Bulk: ${item.bulkPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--slate-300)', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
                            <button 
                              onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                              style={{ padding: '6px 10px', backgroundColor: 'var(--slate-50)', color: 'var(--slate-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              title="Decrease Quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <input 
                              type="number" 
                              min="1" 
                              value={item.quantity}
                              onChange={(e) => onUpdateQty(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                              style={{ width: '44px', textAlign: 'center', border: 'none', outline: 'none', fontWeight: '700', fontSize: '0.875rem', color: 'var(--slate-800)' }}
                            />
                            <button 
                              onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                              style={{ padding: '6px 10px', backgroundColor: 'var(--slate-50)', color: 'var(--slate-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              title="Increase Quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          {/* Line Total & Remove */}
                          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                            <span style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--navy-dark)' }}>
                              ${itemTotal.toFixed(2)}
                            </span>
                            <button 
                              onClick={() => onRemoveItem(item.id)}
                              style={{ color: 'var(--slate-400)', padding: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', transition: 'color 0.15s' }}
                              title="Remove item"
                            >
                              <Trash2 size={15} />
                              <span>Remove</span>
                            </button>
                          </div>

                        </div>
                      );
                    })}
                  </div>

                  {/* Cart Footer Bar with Actions */}
                  <div style={{ padding: '16px 20px', backgroundColor: 'var(--slate-50)', borderTop: '1px solid var(--slate-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <button 
                      onClick={() => onNavigate('shop')}
                      style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <ArrowLeft size={15} />
                      <span>Add more instruments</span>
                    </button>
                    <button 
                      onClick={onOpenQuote}
                      style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--navy-dark)', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', border: '1px solid var(--slate-300)', borderRadius: '6px', backgroundColor: '#ffffff' }}
                    >
                      <FileDown size={15} />
                      <span>Convert Cart to Formal PDF RFQ</span>
                    </button>
                  </div>
                </div>

                {/* Order Notes & PO Instructions */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid var(--slate-200)', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--navy-dark)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Info size={16} color="var(--primary)" />
                    Order Notes, PO Reference & Delivery Instructions
                  </h4>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', marginBottom: '12px' }}>
                    Include internal reference or PO numbers, clinic details, or special delivery instructions:
                  </p>
                  <textarea 
                    rows="2" 
                    placeholder="e.g., PO #SX-2026-9901, or delivery instructions: Leave at suite reception / front desk..."
                    value={poReference}
                    onChange={(e) => setPoReference(e.target.value)}
                    className="form-textarea"
                    style={{ fontSize: '0.85rem' }}
                  />
                </div>

              </div>

              {/* Right Column: Order Summary & Checkout Trigger */}
              <div style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid var(--slate-200)', padding: '24px', boxShadow: '0 4px 12px rgba(13, 45, 94, 0.05)' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--navy-dark)', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1px solid var(--slate-200)' }}>
                    Order Summary
                  </h3>

                  {/* Calculations */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--slate-600)' }}>
                      <span>Subtotal ({cartItems.reduce((a, b) => a + b.quantity, 0)} units)</span>
                      <span style={{ fontWeight: '600', color: 'var(--slate-800)' }}>${subtotal.toFixed(2)}</span>
                    </div>

                    {appliedDiscount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--emerald-600)', fontWeight: '600' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Tag size={14} /> Discount ({discountCodeName} - {appliedDiscount}%)
                        </span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--slate-600)' }}>
                      <span>Insured Shipping (Nationwide)</span>
                      <span>
                        {baseShippingCost === 0 ? (
                          <span style={{ color: 'var(--emerald-600)', fontWeight: '700' }}>FREE</span>
                        ) : (
                          `$${baseShippingCost.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    {/* Tax Exemption Toggle */}
                    <div style={{ padding: '10px 12px', backgroundColor: 'var(--slate-50)', borderRadius: '6px', border: '1px solid var(--slate-200)' }}>
                      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', margin: 0 }}>
                        <input 
                          type="checkbox" 
                          checked={taxExempt} 
                          onChange={(e) => setTaxExempt(e.target.checked)} 
                          style={{ marginTop: '3px' }}
                        />
                        <div style={{ fontSize: '0.78rem', lineHeight: '1.4' }}>
                          <span style={{ fontWeight: '700', color: 'var(--slate-800)', display: 'block' }}>Tax-Exempt / Clinic Status (Optional)</span>
                          <span style={{ color: 'var(--slate-500)' }}>501(c)(3), clinic ID, or qualifying healthcare entity</span>
                        </div>
                      </label>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.8125rem' }}>
                        <span style={{ color: 'var(--slate-600)' }}>Estimated Sales Tax:</span>
                        <span style={{ fontWeight: '600' }}>{taxExempt ? '$0.00 (Exempt)' : `$${taxCost.toFixed(2)}`}</span>
                      </div>
                    </div>

                    {/* Grand Total */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '800', color: 'var(--navy-dark)', paddingTop: '16px', borderTop: '2px dashed var(--slate-200)', marginTop: '6px' }}>
                      <span>Estimated Total</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Promo Code Form */}
                  <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--slate-200)' }}>
                    {appliedDiscount > 0 ? (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--emerald-50)', border: '1px solid rgba(5, 150, 105, 0.2)', padding: '8px 12px', borderRadius: '6px' }}>
                        <span style={{ fontSize: '0.8125rem', color: 'var(--emerald-600)', fontWeight: '700' }}>
                          ✓ Code {discountCodeName} Applied ({appliedDiscount}% Off)
                        </span>
                        <button 
                          onClick={handleRemoveDiscount} 
                          style={{ fontSize: '0.75rem', color: 'var(--slate-500)', textDecoration: 'underline' }}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
                        <input 
                          type="text" 
                          placeholder="Promo or Discount Code (e.g. SURGIX10)" 
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="form-input"
                          style={{ padding: '8px 12px', fontSize: '0.8125rem' }}
                        />
                        <button 
                          type="submit" 
                          className="btn-secondary" 
                          style={{ padding: '8px 14px', fontSize: '0.8125rem', whiteSpace: 'nowrap' }}
                        >
                          Apply
                        </button>
                      </form>
                    )}
                    {promoError && (
                      <p style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '6px', margin: 0 }}>
                        {promoError}
                      </p>
                    )}
                  </div>

                  {/* Checkout CTA */}
                  <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button 
                      className="btn-primary" 
                      style={{ padding: '14px', fontSize: '1rem', width: '100%', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 119, 200, 0.25)' }}
                      onClick={() => onNavigate('checkout')}
                    >
                      <span>Proceed to Secure Checkout</span>
                      <ArrowRight size={18} />
                    </button>

                    <button 
                      className="btn-secondary" 
                      style={{ padding: '11px', fontSize: '0.85rem', width: '100%', borderRadius: '8px' }}
                      onClick={onOpenQuote}
                    >
                      <FileDown size={15} />
                      <span>Request Bulk / Wholesale Quote</span>
                    </button>
                  </div>

                  {/* Security & Guarantees */}
                  <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--slate-200)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--slate-600)' }}>
                      <Lock size={15} color="var(--primary)" />
                      <span>256-Bit SSL Bank-Grade Encrypted Gateway</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--slate-600)' }}>
                      <ShieldCheck size={15} color="var(--primary)" />
                      <span>ASTM F899 Passivated Stainless Steel Warranty</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--slate-600)' }}>
                      <Award size={15} color="var(--primary)" />
                      <span>30-Day Money-Back Evaluation & Return Policy</span>
                    </div>
                  </div>

                </div>

                {/* Accepted Payment Badges */}
                <div style={{ textAlign: 'center', padding: '14px', backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid var(--slate-200)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                    Accepted Payment Methods
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '0.72rem', fontWeight: '700', color: 'var(--navy-dark)' }}>
                    <span style={{ padding: '4px 8px', backgroundColor: 'var(--slate-100)', borderRadius: '4px' }}>Stripe</span>
                    <span style={{ padding: '4px 8px', backgroundColor: 'var(--slate-100)', borderRadius: '4px' }}>Visa</span>
                    <span style={{ padding: '4px 8px', backgroundColor: 'var(--slate-100)', borderRadius: '4px' }}>Mastercard</span>
                    <span style={{ padding: '4px 8px', backgroundColor: 'var(--slate-100)', borderRadius: '4px' }}>Amex</span>
                    <span style={{ padding: '4px 8px', backgroundColor: 'var(--slate-100)', borderRadius: '4px' }}>Apple Pay</span>
                    <span style={{ padding: '4px 8px', backgroundColor: 'var(--slate-100)', borderRadius: '4px' }}>Net-30 / PO</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
