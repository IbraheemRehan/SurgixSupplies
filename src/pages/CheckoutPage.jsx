import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  ArrowLeft, 
  ChevronRight, 
  Clock,
  Printer,
  ArrowRight
} from 'lucide-react';
import { ProductImage } from '../components/ProductImage';

export function CheckoutPage({ 
  cartItems, 
  onNavigate, 
  onCheckoutComplete,
  onSelectProduct
}) {
  // Step indicator
  const [step, setStep] = useState(1); // 1: Shipping & Info, 2: Payment & Review, 3: Order Placed
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderReference, setOrderReference] = useState('');

  // Form Fields
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    companyName: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    shippingMethod: 'standard', // standard, express
    deliveryNotes: '',
    // Payment (Stripe only)
    cardNumber: '',
    cardExp: '',
    cardCvc: '',
    cardName: '',
    billingSameAsShipping: true
  });

  const [formErrors, setFormErrors] = useState({});

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 500;
  const isFreeStandard = subtotal >= freeShippingThreshold;
  
  let shippingCost = 0;
  if (formData.shippingMethod === 'standard') {
    shippingCost = isFreeStandard ? 0 : 25.00;
  } else if (formData.shippingMethod === 'express') {
    shippingCost = 45.00;
  }

  const taxRate = 0.065;
  const taxCost = subtotal * taxRate;
  const grandTotal = subtotal + shippingCost + taxCost;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep1 = () => {
    const errors = {};
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email address required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.address.trim()) errors.address = 'Street address required';
    if (!formData.city.trim()) errors.city = 'City required';
    if (!formData.state.trim()) errors.state = 'State required';
    if (!formData.zip.trim()) errors.zip = 'Postal code required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // Payment validation
    const errors = {};
    if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, '').length < 15) {
      errors.cardNumber = 'Valid 16-digit card number required';
    }
    if (!formData.cardExp.trim()) errors.cardExp = 'Expiry date required (MM/YY)';
    if (!formData.cardCvc.trim()) errors.cardCvc = 'CVC required';
    if (!formData.cardName.trim()) errors.cardName = 'Name on card required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsProcessing(true);

    // Simulate secure Stripe gateway authorization
    setTimeout(() => {
      const randomOrderRef = `SX-ORD-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderReference(randomOrderRef);
      setIsProcessing(false);
      setStep(3);
      onCheckoutComplete();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1800);
  };

  // ─── ORDER CONFIRMATION (Step 3) ───
  if (step === 3) {
    return (
      <div className="checkout-page-wrapper">
        <div className="checkout-receipt-container">
          
          {/* Success Banner */}
          <div className="checkout-receipt-banner">
            <div className="checkout-receipt-icon">
              <CheckCircle2 size={40} />
            </div>
            <h1 className="checkout-receipt-title">Order Confirmed!</h1>
            <p className="checkout-receipt-subtitle">
              Thank you for your order. Reference <strong>{orderReference}</strong> has been confirmed and is being prepared for shipment.
            </p>
          </div>

          <div className="checkout-receipt-body">
            {/* Dispatch Status */}
            <div className="checkout-dispatch-notice">
              <Clock size={24} color="var(--emerald-600)" />
              <div>
                <strong style={{ color: 'var(--navy-dark)', display: 'block' }}>Order Processing & Quality Check in Progress</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--slate-600)' }}>
                  Order confirmation, tracking link, and receipt will be emailed to <strong>{formData.email}</strong>.
                </span>
              </div>
            </div>

            {/* Order Details Grid */}
            <div className="checkout-receipt-grid">
              <div>
                <span className="checkout-receipt-label">Order Reference</span>
                <div className="checkout-receipt-value">{orderReference}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>Payment: Credit Card (Stripe)</div>
              </div>

              <div>
                <span className="checkout-receipt-label">Customer Name</span>
                <div className="checkout-receipt-value" style={{ fontSize: '0.925rem' }}>
                  {formData.firstName} {formData.lastName}
                </div>
                {formData.companyName && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>{formData.companyName}</div>
                )}
              </div>

              <div>
                <span className="checkout-receipt-label">Shipping Address</span>
                <div style={{ fontSize: '0.85rem', color: 'var(--slate-700)', marginTop: '4px' }}>
                  {formData.address}, {formData.city}, {formData.state} {formData.zip}
                </div>
              </div>

              <div>
                <span className="checkout-receipt-label">Total Paid</span>
                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--navy-dark)', marginTop: '2px' }}>
                  ${grandTotal.toFixed(2)}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--emerald-600)', fontWeight: '600' }}>
                  Securely Processed via Stripe
                </div>
              </div>
            </div>

            {/* Security Badges */}
            <div className="checkout-receipt-badges">
              <div className="checkout-receipt-badge-item">
                <ShieldCheck size={16} color="var(--primary)" />
                <span>Premium Quality Guaranteed</span>
              </div>
              <div className="checkout-receipt-badge-item">
                <CheckCircle2 size={16} color="var(--emerald-600)" />
                <span>Quality Verified & Inspected</span>
              </div>
              <div className="checkout-receipt-badge-item">
                <Lock size={16} color="var(--primary)" />
                <span>256-Bit Encrypted Transaction</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="checkout-receipt-actions">
              <button 
                onClick={() => window.print()}
                className="btn-secondary"
                style={{ padding: '10px 18px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem' }}
              >
                <Printer size={16} />
                <span>Print Receipt</span>
              </button>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => onNavigate('track-order')}
                  className="btn-secondary"
                  style={{ padding: '10px 18px', fontSize: '0.875rem' }}
                >
                  Track Order
                </button>
                <button 
                  onClick={() => onNavigate('shop')}
                  className="btn-primary"
                  style={{ padding: '10px 22px', fontSize: '0.875rem' }}
                >
                  Continue Shopping
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ─── MAIN CHECKOUT FORM (Step 1 & 2) ───
  return (
    <div className="checkout-page-wrapper">
      
      {/* Checkout Header Bar */}
      <div className="checkout-top-bar">
        <div className="container checkout-top-bar-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              onClick={() => onNavigate('cart')}
              className="checkout-back-btn"
            >
              <ArrowLeft size={16} />
              <span>Back to Cart</span>
            </button>
            <div className="checkout-divider-v" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="/assets/surgix-logo.png" alt="Surgix Supplies" style={{ height: '28px', objectFit: 'contain' }} />
              <span className="checkout-brand-label">SECURE CHECKOUT</span>
            </div>
          </div>

          <div className="checkout-ssl-badge">
            <Lock size={13} color="var(--emerald-600)" />
            <span>SSL Encrypted</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '28px' }}>
        
        {/* Step Progress Tracker */}
        <div className="checkout-steps-tracker">
          <div className="checkout-step" onClick={() => setStep(1)}>
            <div className={`checkout-step-dot ${step >= 1 ? 'active' : ''}`}>1</div>
            <span className={`checkout-step-label ${step === 1 ? 'active' : ''}`}>
              Shipping Details
            </span>
          </div>

          <div className={`checkout-step-line ${step >= 2 ? 'active' : ''}`} />

          <div className="checkout-step">
            <div className={`checkout-step-dot ${step >= 2 ? 'active' : ''}`}>2</div>
            <span className={`checkout-step-label ${step === 2 ? 'active' : ''}`}>
              Payment & Review
            </span>
          </div>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="checkout-layout">
          
          {/* Left Column: Form Details */}
          <div className="checkout-form-col">
            {step === 1 && (
              <form onSubmit={handleProceedToPayment} className="checkout-form-stack">
                
                {/* 1. Customer Info */}
                <div className="checkout-section-card">
                  <div className="checkout-section-header">
                    <CreditCard size={20} color="var(--primary)" />
                    <h2 className="checkout-section-title">1. Contact Information</h2>
                  </div>

                  <div className="checkout-form-grid-2">
                    <div className="form-group">
                      <label className="form-label">First Name *</label>
                      <input 
                        type="text" 
                        placeholder="First name" 
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="form-input"
                      />
                      {formErrors.firstName && <span className="form-error">{formErrors.firstName}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Last Name *</label>
                      <input 
                        type="text" 
                        placeholder="Last name" 
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="form-input"
                      />
                      {formErrors.lastName && <span className="form-error">{formErrors.lastName}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input 
                        type="email" 
                        placeholder="yourname@example.com" 
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="form-input"
                      />
                      {formErrors.email && <span className="form-error">{formErrors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input 
                        type="tel" 
                        placeholder="+1 (555) 000-0000" 
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="form-input"
                      />
                      {formErrors.phone && <span className="form-error">{formErrors.phone}</span>}
                    </div>

                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                      <label className="form-label">Company Name (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="Leave blank if not applicable" 
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Shipping Address */}
                <div className="checkout-section-card">
                  <div className="checkout-section-header">
                    <Truck size={20} color="var(--primary)" />
                    <h2 className="checkout-section-title">2. Shipping Address</h2>
                  </div>

                  <div className="checkout-form-grid-3">
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                      <label className="form-label">Street Address *</label>
                      <input 
                        type="text" 
                        placeholder="123 Main St" 
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="form-input"
                      />
                      {formErrors.address && <span className="form-error">{formErrors.address}</span>}
                    </div>

                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                      <label className="form-label">Apt, Suite, Unit (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Apt 4B, Suite 200" 
                        value={formData.address2}
                        onChange={(e) => handleInputChange('address2', e.target.value)}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">City *</label>
                      <input 
                        type="text" 
                        placeholder="City" 
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="form-input"
                      />
                      {formErrors.city && <span className="form-error">{formErrors.city}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">State *</label>
                      <input 
                        type="text" 
                        placeholder="State" 
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="form-input"
                      />
                      {formErrors.state && <span className="form-error">{formErrors.state}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">ZIP Code *</label>
                      <input 
                        type="text" 
                        placeholder="ZIP Code" 
                        value={formData.zip}
                        onChange={(e) => handleInputChange('zip', e.target.value)}
                        className="form-input"
                      />
                      {formErrors.zip && <span className="form-error">{formErrors.zip}</span>}
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div className="checkout-shipping-methods">
                    <label className="form-label" style={{ marginBottom: '10px' }}>Shipping Method</label>
                    
                    <label className={`checkout-shipping-option ${formData.shippingMethod === 'standard' ? 'selected' : ''}`}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input 
                          type="radio" 
                          name="shippingMethod" 
                          checked={formData.shippingMethod === 'standard'} 
                          onChange={() => handleInputChange('shippingMethod', 'standard')} 
                        />
                        <div>
                          <span className="checkout-shipping-name">Standard Shipping (2-3 Business Days)</span>
                          <span className="checkout-shipping-desc">Insured ground shipping with tracking</span>
                        </div>
                      </div>
                      <span className={`checkout-shipping-price ${isFreeStandard ? 'free' : ''}`}>
                        {isFreeStandard ? 'FREE' : '$25.00'}
                      </span>
                    </label>

                    <label className={`checkout-shipping-option ${formData.shippingMethod === 'express' ? 'selected' : ''}`}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input 
                          type="radio" 
                          name="shippingMethod" 
                          checked={formData.shippingMethod === 'express'} 
                          onChange={() => handleInputChange('shippingMethod', 'express')} 
                        />
                        <div>
                          <span className="checkout-shipping-name">Express Shipping (Next Business Day)</span>
                          <span className="checkout-shipping-desc">Priority expedited dispatch</span>
                        </div>
                      </div>
                      <span className="checkout-shipping-price">$45.00</span>
                    </label>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary checkout-continue-btn"
                >
                  <span>Continue to Payment</span>
                  <ChevronRight size={18} />
                </button>

              </form>
            )}

            {step === 2 && (
              <form onSubmit={handlePlaceOrder} className="checkout-form-stack">
                
                {/* Payment Section */}
                <div className="checkout-section-card">
                  <div className="checkout-section-header" style={{ justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <CreditCard size={20} color="var(--primary)" />
                      <h2 className="checkout-section-title">Payment Details</h2>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setStep(1)} 
                      style={{ fontSize: '0.8125rem', color: 'var(--primary)', fontWeight: '600' }}
                    >
                      Edit Shipping
                    </button>
                  </div>

                  {/* Stripe Card Form */}
                  <div className="checkout-stripe-panel">
                    
                    {/* Stripe Brand */}
                    <div className="checkout-stripe-header">
                      <div className="checkout-stripe-label">
                        <Lock size={14} color="var(--primary)" />
                        <span>Stripe Secure Payment</span>
                      </div>
                      <div className="checkout-card-brands">
                        <span className="checkout-card-brand visa">VISA</span>
                        <span className="checkout-card-brand mc">MC</span>
                        <span className="checkout-card-brand amex">AMEX</span>
                        <span className="checkout-card-brand disc">DISCOVER</span>
                      </div>
                    </div>

                    {/*
                      * STRIPE INTEGRATION READY:
                      * When ready to connect live Stripe, install @stripe/react-stripe-js
                      * and replace these mock inputs with <PaymentElement /> or <CardElement />
                    */}
                    <div className="checkout-card-fields">
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Card Number</label>
                        <div style={{ position: 'relative' }}>
                          <input 
                            type="text" 
                            maxLength="19"
                            placeholder="4242 •••• •••• 4242" 
                            value={formData.cardNumber}
                            onChange={(e) => {
                              const v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                              const matches = v.match(/\d{4,16}/g);
                              const match = matches && matches[0] || '';
                              const parts = [];
                              for (let i = 0, len = match.length; i < len; i += 4) {
                                parts.push(match.substring(i, i + 4));
                              }
                              handleInputChange('cardNumber', parts.length ? parts.join(' ') : v);
                            }}
                            className="form-input"
                            style={{ fontFamily: 'monospace', letterSpacing: '0.08em', paddingRight: '40px' }}
                          />
                          <CreditCard size={18} color="var(--slate-400)" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                        </div>
                        {formErrors.cardNumber && <span className="form-error">{formErrors.cardNumber}</span>}
                      </div>

                      <div className="checkout-form-grid-2">
                        <div className="form-group" style={{ margin: 0 }}>
                          <label className="form-label">Expiry (MM/YY)</label>
                          <input 
                            type="text" 
                            maxLength="5"
                            placeholder="MM/YY" 
                            value={formData.cardExp}
                            onChange={(e) => handleInputChange('cardExp', e.target.value)}
                            className="form-input"
                          />
                          {formErrors.cardExp && <span className="form-error">{formErrors.cardExp}</span>}
                        </div>

                        <div className="form-group" style={{ margin: 0 }}>
                          <label className="form-label">CVC</label>
                          <input 
                            type="text" 
                            maxLength="4"
                            placeholder="CVC" 
                            value={formData.cardCvc}
                            onChange={(e) => handleInputChange('cardCvc', e.target.value)}
                            className="form-input"
                          />
                          {formErrors.cardCvc && <span className="form-error">{formErrors.cardCvc}</span>}
                        </div>
                      </div>

                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Name on Card</label>
                        <input 
                          type="text" 
                          placeholder="Cardholder name" 
                          value={formData.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value)}
                          className="form-input"
                        />
                        {formErrors.cardName && <span className="form-error">{formErrors.cardName}</span>}
                      </div>

                      <div className="checkout-pci-badge">
                        <ShieldCheck size={14} color="var(--emerald-600)" />
                        <span>PCI-DSS Level 1 Encrypted via Stripe</span>
                      </div>
                    </div>
                  </div>

                  {/* Billing Checkbox */}
                  <div className="checkout-billing-checkbox">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--slate-700)' }}>
                      <input 
                        type="checkbox" 
                        checked={formData.billingSameAsShipping}
                        onChange={(e) => handleInputChange('billingSameAsShipping', e.target.checked)} 
                      />
                      <span>Billing address same as shipping</span>
                    </label>
                  </div>

                </div>

                {/* Submit Button */}
                <div className="checkout-submit-area">
                  <button 
                    type="submit" 
                    disabled={isProcessing}
                    className="btn-primary checkout-place-order-btn"
                    style={{ opacity: isProcessing ? 0.75 : 1 }}
                  >
                    {isProcessing ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <span className="spinner-loader" style={{ width: '16px', height: '16px', border: '2px solid #ffffff', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.6s linear infinite' }} />
                        Processing Payment...
                      </span>
                    ) : (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <Lock size={18} />
                        <span>Place Order • ${grandTotal.toFixed(2)}</span>
                      </span>
                    )}
                  </button>

                  <button 
                    type="button" 
                    onClick={() => setStep(1)} 
                    className="checkout-back-link"
                  >
                    ← Back to Shipping Details
                  </button>
                </div>

              </form>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="checkout-summary-col">
            
            <div className="checkout-summary-card">
              <div className="checkout-summary-header">
                <h3 className="checkout-summary-title">
                  Order Summary ({cartItems.reduce((a, b) => a + b.quantity, 0)} Items)
                </h3>
                <button 
                  onClick={() => onNavigate('cart')}
                  style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: '600' }}
                >
                  Edit Cart
                </button>
              </div>

              {/* Items List */}
              <div className="checkout-summary-items">
                {cartItems.map(item => (
                  <div key={item.id} className="checkout-summary-item">
                    <div 
                      className="checkout-summary-item-img"
                      onClick={() => onSelectProduct && onSelectProduct(item)}
                      title="View product"
                    >
                      <ProductImage src={item.image} alt={item.name} sku={item.sku} height="100%" showWatermark={false} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div 
                        className="checkout-summary-item-name"
                        onClick={() => onSelectProduct && onSelectProduct(item)}
                        title={item.name}
                      >
                        {item.name}
                      </div>
                      <div className="checkout-summary-item-qty">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="checkout-summary-item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="checkout-summary-breakdown">
                <div className="checkout-summary-row">
                  <span>Subtotal</span>
                  <span style={{ fontWeight: '600', color: 'var(--slate-800)' }}>${subtotal.toFixed(2)}</span>
                </div>

                <div className="checkout-summary-row">
                  <span>Shipping</span>
                  <span style={{ fontWeight: '600', color: shippingCost === 0 ? 'var(--emerald-600)' : 'var(--slate-800)' }}>
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                <div className="checkout-summary-row">
                  <span>Estimated Tax</span>
                  <span style={{ fontWeight: '600' }}>${taxCost.toFixed(2)}</span>
                </div>

                <div className="checkout-summary-total">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="checkout-trust-badges">
                <div className="checkout-trust-badge">
                  <ShieldCheck size={14} color="var(--primary)" />
                  <span>Premium Surgical-Grade Materials</span>
                </div>
                <div className="checkout-trust-badge">
                  <CheckCircle2 size={14} color="var(--emerald-600)" />
                  <span>Quality Inspected & Verified</span>
                </div>
                <div className="checkout-trust-badge">
                  <Lock size={14} color="var(--primary)" />
                  <span>Powered by Stripe Secure Payments</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
