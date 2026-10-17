import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2, FileDown, ShoppingBag } from 'lucide-react';
import { ProductImage } from './ProductImage';

export function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQty, 
  onRemoveItem, 
  onCheckout, 
  onNavigateToCart,
  onNavigateToCheckout,
  onSelectProduct
}) {
  const [taxExempt, setTaxExempt] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 500;
  const freeShippingReached = subtotal >= freeShippingThreshold;
  const shippingCost = freeShippingReached || subtotal === 0 ? 0 : 25.00;
  const taxCost = taxExempt ? 0 : subtotal * 0.065;
  const total = subtotal + shippingCost + taxCost;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleCompleteOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      onCheckout();
      setOrderPlaced(false);
    }, 2800);
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Shopping Cart</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--slate-400)', marginTop: '2px' }}>
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in order list
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div style={{ padding: '14px 20px', background: 'var(--slate-50)', borderBottom: '1px solid var(--slate-200)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '6px', fontWeight: '600' }}>
            <span>
              {freeShippingReached ? (
                <span style={{ color: 'var(--emerald-600)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={14} /> Qualified for Free Nationwide Shipping!
                </span>
              ) : (
                <span>Add ${(freeShippingThreshold - subtotal).toFixed(2)} more for Free Shipping</span>
              )}
            </span>
            <span style={{ color: 'var(--slate-600)' }}>${subtotal.toFixed(0)} / ${freeShippingThreshold}</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
            <div 
              style={{ 
                width: `${progressPercent}%`, 
                height: '100%', 
                background: freeShippingReached ? 'var(--emerald-600)' : 'var(--primary)',
                transition: 'width 0.3s ease'
              }} 
            />
          </div>
        </div>

        {/* Body / Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {orderPlaced ? (
            <div style={{ textAlign: 'center', padding: '48px 16px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--emerald-50)', color: 'var(--emerald-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <CheckCircle2 size={32} />
              </div>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--navy-dark)', fontWeight: '700', marginBottom: '8px' }}>
                Order Confirmed!
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: '1.5', maxWidth: '320px', margin: '0 auto' }}>
                Order reference #SX-ORD-2026 has been received. A tracking number and order receipt will be emailed shortly.
              </p>
            </div>
          ) : cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 16px', color: 'var(--slate-400)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--slate-100)', color: 'var(--slate-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <ShoppingBag size={28} />
              </div>
              <p style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--slate-600)', marginBottom: '8px' }}>
                Your cart is empty
              </p>
              <p style={{ fontSize: '0.85rem' }}>
                Explore our catalog or instrument sets to add surgical-grade instruments.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  style={{ 
                    display: 'flex', 
                    gap: '12px', 
                    padding: '12px', 
                    border: '1px solid var(--slate-200)', 
                    borderRadius: '8px', 
                    background: '#ffffff' 
                  }}
                >
                  {/* Clean Thumbnail WITHOUT Watermark Text */}
                  <div 
                    style={{ 
                      width: '64px', 
                      height: '64px', 
                      borderRadius: '6px', 
                      overflow: 'hidden',
                      flexShrink: 0,
                      border: '1px solid var(--slate-200)',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      onClose();
                      if (onSelectProduct) onSelectProduct(item);
                    }}
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

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div 
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          onClose();
                          if (onSelectProduct) onSelectProduct(item);
                        }}
                      >
                        <span style={{ fontSize: '0.7rem', color: 'var(--slate-400)', fontWeight: '700' }}>
                          {item.sku}
                        </span>
                        <h5 style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--slate-800)', lineHeight: '1.3' }}>
                          {item.name}
                        </h5>
                      </div>
                      <button 
                        onClick={() => onRemoveItem(item.id)} 
                        style={{ color: 'var(--slate-400)', padding: '2px', transition: 'color 0.15s' }}
                        title="Remove Item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--slate-300)', borderRadius: '4px', overflow: 'hidden' }}>
                        <button 
                          onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                          style={{ padding: '4px 8px', background: 'var(--slate-50)', color: 'var(--slate-700)' }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ padding: '4px 10px', fontSize: '0.8125rem', fontWeight: '600' }}>
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                          style={{ padding: '4px 8px', background: 'var(--slate-50)', color: 'var(--slate-700)' }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--navy-dark)' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <div style={{ fontSize: '0.7rem', color: 'var(--slate-500)' }}>
                          ${item.price.toFixed(2)} ea
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Summary */}
        {cartItems.length > 0 && !orderPlaced && (
          <div style={{ padding: '18px 20px', borderTop: '1px solid var(--slate-200)', background: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--slate-600)', marginBottom: '6px' }}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--slate-600)', marginBottom: '6px' }}>
              <span>Shipping (Nationwide Sterile)</span>
              <span>
                {shippingCost === 0 ? (
                  <span style={{ color: 'var(--emerald-600)', fontWeight: '600' }}>FREE</span>
                ) : (
                  `$${shippingCost.toFixed(2)}`
                )}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8125rem', color: 'var(--slate-600)', marginBottom: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={taxExempt} 
                  onChange={(e) => setTaxExempt(e.target.checked)} 
                />
                <span>Tax-Exempt / Clinic Entity (Optional)</span>
              </label>
              <span>{taxExempt ? '$0.00' : `$${taxCost.toFixed(2)}`}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: '800', color: 'var(--navy-dark)', paddingTop: '10px', borderTop: '1px dashed var(--slate-200)', marginBottom: '16px' }}>
              <span>Total Estimated</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button 
                className="btn-primary" 
                style={{ padding: '12px', fontSize: '0.925rem', width: '100%', borderRadius: '6px' }}
                onClick={() => {
                  onClose();
                  if (onNavigateToCheckout) {
                    onNavigateToCheckout();
                  } else {
                    handleCompleteOrder();
                  }
                }}
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight size={16} />
              </button>

              <button 
                className="btn-secondary"
                style={{ padding: '10px', fontSize: '0.85rem', width: '100%', borderRadius: '6px' }}
                onClick={() => {
                  onClose();
                  if (onNavigateToCart) {
                    onNavigateToCart();
                  }
                }}
              >
                <span>View Full Cart Page</span>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '12px', fontSize: '0.72rem', color: 'var(--slate-500)' }}>
              <ShieldCheck size={14} color="var(--primary)" />
              <span>Direct factory warranty with 30-day money-back inspection guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
