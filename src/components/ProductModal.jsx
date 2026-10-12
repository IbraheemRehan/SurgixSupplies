import React, { useState } from 'react';
import { X, Check, ShoppingCart, Mail, ShieldCheck, Award, Zap } from 'lucide-react';
import { ProductImage } from './ProductImage';

export function ProductModal({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart, 
  onOpenEnquiry,
  onSelectProduct 
}) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart({ ...product, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" style={{ maxWidth: '750px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', letterSpacing: '0.05em' }}>
              {product.sku}
            </span>
            <h3 className="modal-title" style={{ marginTop: '2px' }}>
              {product.name}
            </h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '24px' }}>
            {/* Visual Box */}
            <div>
              <div 
                style={{ 
                  borderRadius: '12px', 
                  height: '240px', 
                  overflow: 'hidden',
                  border: '1px solid var(--slate-200)',
                  position: 'relative'
                }}
              >
                <ProductImage 
                  src={product.image} 
                  alt={product.name} 
                  sku={product.sku} 
                  height="100%" 
                />

                <div 
                  style={{ 
                    position: 'absolute', 
                    top: '12px', 
                    left: '12px', 
                    background: 'var(--emerald-50)', 
                    color: 'var(--emerald-600)', 
                    fontSize: '0.72rem', 
                    fontWeight: '700', 
                    padding: '3px 8px', 
                    borderRadius: '4px',
                    zIndex: 3
                  }}
                >
                  ✓ In Stock ({product.stockCount || 100}+ Units)
                </div>
              </div>

              {/* Technical Badges */}
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--slate-700)' }}>
                  <ShieldCheck size={16} color="var(--primary)" />
                  <span>ASTM F899-20 Compliant Steel</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--slate-700)' }}>
                  <Award size={16} color="var(--primary)" />
                  <span>Passivated per ASTM A967 (Zero Pit)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--slate-700)' }}>
                  <Zap size={16} color="var(--primary)" />
                  <span>134°C Autoclave Cycle Validated</span>
                </div>
              </div>
            </div>

            {/* Specifications & Purchasing */}
            <div>
              <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: '1.6', marginBottom: '16px' }}>
                {product.description}
              </p>

              {/* Specs Table */}
              <div style={{ background: 'var(--slate-50)', borderRadius: '8px', border: '1px solid var(--slate-200)', padding: '12px', marginBottom: '16px', fontSize: '0.8125rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', borderBottom: '1px solid var(--slate-200)', paddingBottom: '6px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--slate-500)' }}>Metallurgy Alloy:</span>
                  <strong style={{ color: 'var(--navy-dark)' }}>{product.steel}</strong>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', borderBottom: '1px solid var(--slate-200)', paddingBottom: '6px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--slate-500)' }}>Hardness Index:</span>
                  <strong style={{ color: 'var(--navy-dark)' }}>{product.rockwell}</strong>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', borderBottom: '1px solid var(--slate-200)', paddingBottom: '6px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--slate-500)' }}>Length / Size:</span>
                  <strong style={{ color: 'var(--navy-dark)' }}>{product.size}</strong>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <span style={{ color: 'var(--slate-500)' }}>Surface Finish:</span>
                  <strong style={{ color: 'var(--navy-dark)' }}>{product.finish}</strong>
                </div>
              </div>

              {/* Pricing */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                  <span style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--navy-dark)' }}>
                    ${product.price.toFixed(2)}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--slate-400)', textDecoration: 'line-through' }}>
                    ${(product.price * 1.35).toFixed(2)}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--emerald-600)', background: 'var(--emerald-50)', padding: '2px 6px', borderRadius: '4px' }}>
                    Direct Factory Pricing
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', marginTop: '2px' }}>
                  Bulk Tier Price: <strong>${product.bulkPrice.toFixed(2)}</strong> for orders over 10 units
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--slate-300)', borderRadius: '6px', overflow: 'hidden' }}>
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ padding: '8px 12px', background: 'var(--slate-100)', fontWeight: '700' }}
                  >
                    -
                  </button>
                  <span style={{ padding: '8px 14px', fontSize: '0.9rem', fontWeight: '700' }}>
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ padding: '8px 12px', background: 'var(--slate-100)', fontWeight: '700' }}
                  >
                    +
                  </button>
                </div>

                <button 
                  className="btn-primary" 
                  style={{ flex: 1, padding: '10px 16px', fontSize: '0.9rem' }}
                  onClick={handleAdd}
                >
                  {added ? <Check size={16} /> : <ShoppingCart size={16} />}
                  <span>{added ? 'Added to Cart' : `Add ${quantity} to Order`}</span>
                </button>
              </div>

              <div style={{ marginTop: '10px' }}>
                <button 
                  className="btn-secondary" 
                  style={{ width: '100%', padding: '9px 12px', fontSize: '0.825rem' }}
                  onClick={() => {
                    onClose();
                    onOpenEnquiry(product);
                  }}
                >
                  <Mail size={14} />
                  <span>Direct Inquiry / Request Bulk Quote</span>
                </button>
              </div>

              {onSelectProduct && (
                <div style={{ marginTop: '12px', textAlign: 'center' }}>
                  <button
                    type="button"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--primary)',
                      fontSize: '0.825rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      textDecoration: 'underline'
                    }}
                    onClick={() => {
                      onClose();
                      onSelectProduct(product);
                    }}
                  >
                    View Comprehensive Product Details Page →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
