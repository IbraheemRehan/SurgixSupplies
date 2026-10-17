import React, { useState } from 'react';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  ShoppingCart, 
  Lock, 
  Truck, 
  Award, 
  Tag, 
  ArrowLeft,
  Info,
} from 'lucide-react';
import { ProductImage } from '../components/ProductImage';
import { surgicalInstruments } from '../data/instruments';

export function CartPage({ 
  cartItems, 
  onUpdateQty, 
  onRemoveItem, 
  onNavigate, 
  onSelectProduct 
}) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountCodeName, setDiscountCodeName] = useState('');
  const [promoError, setPromoError] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 500;
  const freeShippingReached = subtotal >= freeShippingThreshold;
  const baseShippingCost = freeShippingReached || subtotal === 0 ? 0 : 25.00;
  
  const discountAmount = appliedDiscount > 0 ? (subtotal * appliedDiscount) / 100 : 0;
  const subtotalAfterDiscount = Math.max(0, subtotal - discountAmount);
  const taxRate = 0.065;
  const taxCost = subtotalAfterDiscount * taxRate;
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
    } else if (code === 'SAVE15' || code === 'BULK15') {
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
    <div className="cart-page-wrapper">
      {/* Breadcrumbs & Page Header */}
      <div className="cart-header-bar">
        <div className="container">
          <div className="cart-breadcrumbs">
            <button onClick={() => onNavigate('home')}>Home</button>
            <span>/</span>
            <span className="cart-breadcrumb-active">Shopping Cart</span>
          </div>
          <div className="cart-page-header">
            <div>
              <h1 className="cart-page-title">Shopping Cart</h1>
              <p className="cart-page-subtitle">
                Review your items and proceed to checkout
              </p>
            </div>
            <button 
              onClick={() => onNavigate('shop')}
              className="cart-continue-shopping"
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
          <div className="cart-empty-state">
            <div className="cart-empty-icon">
              <ShoppingCart size={38} strokeWidth={1.5} />
            </div>
            <h2 className="cart-empty-title">Your Cart is Empty</h2>
            <p className="cart-empty-desc">
              Explore our catalog of premium medical instruments and surgical sets.
            </p>
            <div className="cart-empty-actions">
              <button 
                className="btn-primary" 
                style={{ padding: '12px 24px', fontSize: '0.95rem' }}
                onClick={() => onNavigate('shop')}
              >
                Browse Instruments
              </button>
              <button 
                className="btn-secondary" 
                style={{ padding: '12px 24px', fontSize: '0.95rem' }}
                onClick={() => onNavigate('sets')}
              >
                View Surgical Sets
              </button>
            </div>

            {/* Popular Items */}
            <div className="cart-empty-recommended">
              <h3 className="cart-recommended-title">Popular Products:</h3>
              <div className="cart-recommended-grid">
                {recommendedItems.map(item => (
                  <div 
                    key={item.id} 
                    className="cart-recommended-card"
                    onClick={() => onSelectProduct && onSelectProduct(item)}
                  >
                    <div className="cart-recommended-img">
                      <ProductImage src={item.image} alt={item.name} sku={item.sku} height="100%" showWatermark={false} />
                    </div>
                    <div className="cart-recommended-sku">{item.sku}</div>
                    <div className="cart-recommended-name">{item.name}</div>
                    <div className="cart-recommended-price">${item.price.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Active Cart with Items */
          <div className="cart-active-wrapper">
            
            {/* Free Shipping Progress */}
            <div className="cart-shipping-progress">
              <div className="cart-shipping-progress-header">
                <span className="cart-shipping-progress-text">
                  <Truck size={18} color="var(--primary)" />
                  {freeShippingReached ? (
                    <span className="cart-shipping-free">
                      <CheckCircle2 size={16} /> Free Shipping Unlocked!
                    </span>
                  ) : (
                    <span>
                      Add <strong style={{ color: 'var(--navy-dark)' }}>${(freeShippingThreshold - subtotal).toFixed(2)}</strong> more for <strong>Free Shipping</strong>
                    </span>
                  )}
                </span>
                <span className="cart-shipping-progress-amount">
                  ${subtotal.toFixed(2)} / ${freeShippingThreshold}.00
                </span>
              </div>
              <div className="cart-shipping-bar">
                <div 
                  className={`cart-shipping-bar-fill ${freeShippingReached ? 'complete' : ''}`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Main Cart Grid */}
            <div className="cart-grid-layout">
              
              {/* Left Column: Items */}
              <div className="cart-items-col">
                
                <div className="cart-items-card">
                  <div className="cart-items-header">
                    <span className="cart-items-count">
                      Items ({cartItems.length} {cartItems.length === 1 ? 'product' : 'products'})
                    </span>
                    <span className="cart-items-quality-tag">
                      German Stainless Steel
                    </span>
                  </div>

                  <div className="cart-items-list">
                    {cartItems.map((item) => {
                      const itemTotal = item.price * item.quantity;
                      return (
                        <div key={item.id} className="cart-item-row">
                          {/* Image */}
                          <div 
                            className="cart-item-image"
                            onClick={() => onSelectProduct && onSelectProduct(item)}
                            title="View product details"
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
                          <div className="cart-item-info">
                            <div className="cart-item-badges">
                              <span className="cart-item-sku">{item.sku}</span>
                              <span className="cart-item-stock">In Stock</span>
                            </div>
                            <h3 
                              className="cart-item-name"
                              onClick={() => onSelectProduct && onSelectProduct(item)}
                            >
                              {item.name}
                            </h3>
                            <div className="cart-item-pricing">
                              <span>Unit: <strong>${item.price.toFixed(2)}</strong></span>
                              {item.bulkPrice && (
                                <span style={{ color: 'var(--emerald-600)' }}>
                                  Bulk: ${item.bulkPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quantity + Total (stacked on mobile) */}
                          <div className="cart-item-actions-col">
                            {/* Quantity Controls */}
                            <div className="cart-item-qty-controls">
                              <button 
                                onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                                className="cart-qty-btn"
                                title="Decrease"
                              >
                                <Minus size={14} />
                              </button>
                              <input 
                                type="number" 
                                min="1" 
                                value={item.quantity}
                                onChange={(e) => onUpdateQty(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                                className="cart-qty-input"
                              />
                              <button 
                                onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                                className="cart-qty-btn"
                                title="Increase"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            {/* Line Total & Remove */}
                            <div className="cart-item-line-total">
                              <span className="cart-item-total-price">
                                ${itemTotal.toFixed(2)}
                              </span>
                              <button 
                                onClick={() => onRemoveItem(item.id)}
                                className="cart-item-remove"
                                title="Remove item"
                              >
                                <Trash2 size={15} />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>

                  {/* Cart Footer */}
                  <div className="cart-items-footer">
                    <button 
                      onClick={() => onNavigate('shop')}
                      className="cart-add-more-btn"
                    >
                      <ArrowLeft size={15} />
                      <span>Add more items</span>
                    </button>
                  </div>
                </div>

                {/* Order Notes */}
                <div className="cart-notes-card">
                  <h4 className="cart-notes-title">
                    <Info size={16} color="var(--primary)" />
                    Order Notes (Optional)
                  </h4>
                  <p className="cart-notes-desc">
                    Include special delivery instructions or notes:
                  </p>
                  <textarea 
                    rows="2" 
                    placeholder="e.g., Leave with reception, call upon arrival..."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="form-textarea"
                    style={{ fontSize: '0.85rem' }}
                  />
                </div>

              </div>

              {/* Right Column: Order Summary */}
              <div className="cart-summary-col">
                
                <div className="cart-summary-card">
                  <h3 className="cart-summary-title">Order Summary</h3>

                  {/* Price Breakdown */}
                  <div className="cart-summary-breakdown">
                    <div className="cart-summary-row">
                      <span>Subtotal ({cartItems.reduce((a, b) => a + b.quantity, 0)} units)</span>
                      <span style={{ fontWeight: '600', color: 'var(--slate-800)' }}>${subtotal.toFixed(2)}</span>
                    </div>

                    {appliedDiscount > 0 && (
                      <div className="cart-summary-row discount">
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Tag size={14} /> {discountCodeName} (-{appliedDiscount}%)
                        </span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="cart-summary-row">
                      <span>Estimated Shipping</span>
                      <span>
                        {baseShippingCost === 0 ? (
                          <span style={{ color: 'var(--emerald-600)', fontWeight: '700' }}>FREE</span>
                        ) : (
                          `$${baseShippingCost.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    <div className="cart-summary-row">
                      <span>Estimated Tax</span>
                      <span style={{ fontWeight: '600' }}>${taxCost.toFixed(2)}</span>
                    </div>

                    {/* Grand Total */}
                    <div className="cart-summary-total">
                      <span>Estimated Total</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="cart-promo-section">
                    {appliedDiscount > 0 ? (
                      <div className="cart-promo-applied">
                        <span>✓ {discountCodeName} Applied ({appliedDiscount}% Off)</span>
                        <button onClick={handleRemoveDiscount}>Remove</button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyPromo} className="cart-promo-form">
                        <input 
                          type="text" 
                          placeholder="Promo code (e.g. SURGIX10)" 
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
                      <p className="cart-promo-error">{promoError}</p>
                    )}
                  </div>

                  {/* Checkout CTA */}
                  <div className="cart-checkout-cta">
                    <button 
                      className="btn-primary cart-checkout-btn"
                      onClick={() => onNavigate('checkout')}
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>

                  {/* Trust Badges */}
                  <div className="cart-trust-badges">
                    <div className="cart-trust-badge">
                      <Lock size={15} color="var(--primary)" />
                      <span>Stripe Secure Payments</span>
                    </div>
                    <div className="cart-trust-badge">
                      <ShieldCheck size={15} color="var(--primary)" />
                      <span>Premium Quality Guarantee</span>
                    </div>
                    <div className="cart-trust-badge">
                      <Award size={15} color="var(--primary)" />
                      <span>30-Day Money-Back Policy</span>
                    </div>
                  </div>

                </div>

                {/* Payment Badges */}
                <div className="cart-payment-badges-card">
                  <div className="cart-payment-badges-label">Accepted Payment Methods</div>
                  <div className="cart-payment-badges-list">
                    <span className="cart-payment-badge">Stripe</span>
                    <span className="cart-payment-badge">Visa</span>
                    <span className="cart-payment-badge">Mastercard</span>
                    <span className="cart-payment-badge">Amex</span>
                    <span className="cart-payment-badge">Discover</span>
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
