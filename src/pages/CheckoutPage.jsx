import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Building2, 
  Truck, 
  CheckCircle2, 
  ArrowLeft, 
  FileText, 
  ChevronRight, 
  Info, 
  AlertCircle,
  Clock,
  Printer,
  Download,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { ProductImage } from '../components/ProductImage';

export function CheckoutPage({ 
  cartItems, 
  onNavigate, 
  onCheckoutComplete 
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
    hospitalName: '',
    department: 'OR / Central Sterile Supply',
    taxExemptId: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    shippingMethod: 'standard', // standard, express, urgent
    deliveryDock: '',
    // Payment
    paymentMethod: 'card', // card, applepay, po, wire
    cardNumber: '',
    cardExp: '',
    cardCvc: '',
    cardName: '',
    poNumber: '',
    poAuthorizer: '',
    poTerms: 'net30',
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
  } else if (formData.shippingMethod === 'urgent') {
    shippingCost = 75.00;
  }

  // Tax exempt by default if hospital entity ID provided or checkbox checked
  const isTaxExempt = Boolean(formData.hospitalName.trim());
  const taxCost = isTaxExempt ? 0 : subtotal * 0.065;
  const grandTotal = subtotal + shippingCost + taxCost;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep1 = () => {
    const errors = {};
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid corporate or hospital email required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required for dispatch notification';
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.hospitalName.trim()) errors.hospitalName = 'Hospital, surgical clinic or practice name required';
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
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, '').length < 15) {
        errors.cardNumber = 'Valid 16-digit card number required';
      }
      if (!formData.cardExp.trim()) errors.cardExp = 'Expiry date required (MM/YY)';
      if (!formData.cardCvc.trim()) errors.cardCvc = 'CVC required';
      if (!formData.cardName.trim()) errors.cardName = 'Name on card required';
    } else if (formData.paymentMethod === 'po') {
      if (!formData.poNumber.trim()) errors.poNumber = 'Official PO number required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsProcessing(true);

    // Simulate secure 256-bit gateway authorization
    setTimeout(() => {
      const randomOrderRef = `SX-PO-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderReference(randomOrderRef);
      setIsProcessing(false);
      setStep(3); // Receipt screen
      onCheckoutComplete();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1800);
  };

  // 1. Order Confirmation Receipt View
  if (step === 3) {
    return (
      <div style={{ backgroundColor: '#f8fafc', minHeight: '80vh', padding: '40px 16px 80px 16px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid var(--slate-200)', boxShadow: '0 8px 30px rgba(13, 45, 94, 0.08)', overflow: 'hidden' }}>
          
          {/* Success Banner */}
          <div style={{ backgroundColor: '#0d2d5e', color: '#ffffff', padding: '36px 32px', textAlign: 'center', backgroundImage: 'radial-gradient(circle at top right, #133a75, #081d3d)' }}>
            <div style={{ width: '68px', height: '68px', borderRadius: '50%', backgroundColor: 'rgba(5, 150, 105, 0.2)', border: '2px solid #10b981', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <CheckCircle2 size={40} />
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
              Hospital Order Confirmed & Authorized
            </h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem', margin: '0 auto', maxWidth: '520px' }}>
              Thank you for ordering with Surgix Supplies. Order reference <strong>{orderReference}</strong> has been transmitted to Boston Logistics Facility.
            </p>
          </div>

          <div style={{ padding: '32px' }}>
            {/* Quick Dispatch Status Notice */}
            <div style={{ backgroundColor: 'var(--emerald-50)', border: '1px solid rgba(5, 150, 105, 0.25)', borderRadius: '10px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
              <Clock size={24} color="var(--emerald-600)" />
              <div style={{ fontSize: '0.85rem', color: 'var(--slate-700)' }}>
                <strong style={{ color: 'var(--navy-dark)', display: 'block' }}>Chain-of-Custody Packaging in Progress</strong>
                Inspection Certificate & Mill Test Report (MTR) will be emailed to <strong>{formData.email}</strong>.
              </div>
            </div>

            {/* Order Details Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', borderBottom: '1px solid var(--slate-200)', paddingBottom: '24px', marginBottom: '24px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--slate-400)', fontWeight: '700', letterSpacing: '0.05em' }}>Order Reference</span>
                <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--navy-dark)', marginTop: '4px' }}>{orderReference}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>PO: {formData.poNumber || 'Credit Gateway'}</div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--slate-400)', fontWeight: '700', letterSpacing: '0.05em' }}>Delivering Institution</span>
                <div style={{ fontSize: '0.925rem', fontWeight: '700', color: 'var(--slate-800)', marginTop: '4px' }}>{formData.hospitalName}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>{formData.department}</div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--slate-400)', fontWeight: '700', letterSpacing: '0.05em' }}>Shipping Destination</span>
                <div style={{ fontSize: '0.85rem', color: 'var(--slate-700)', marginTop: '4px' }}>
                  {formData.address}, {formData.city}, {formData.state} {formData.zip}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--slate-400)', fontWeight: '700', letterSpacing: '0.05em' }}>Authorized Amount</span>
                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--navy-dark)', marginTop: '2px' }}>
                  ${grandTotal.toFixed(2)}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--emerald-600)', fontWeight: '600' }}>
                  {formData.paymentMethod === 'card' ? 'Authorized via Stripe' : 'PO Terms Authorized'}
                </div>
              </div>
            </div>

            {/* Quality & Traceability Guarantees */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', backgroundColor: 'var(--slate-50)', padding: '16px', borderRadius: '8px', marginBottom: '28px', border: '1px solid var(--slate-200)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--slate-600)' }}>
                <ShieldCheck size={16} color="var(--primary)" />
                <span>ASTM A967 Autoclave Passivated</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--slate-600)' }}>
                <CheckCircle2 size={16} color="var(--emerald-600)" />
                <span>ISO 13485:2016 Compliant</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--slate-600)' }}>
                <Lock size={16} color="var(--primary)" />
                <span>256-Bit Encrypted Gateway</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <button 
                onClick={() => window.print()}
                className="btn-secondary"
                style={{ padding: '10px 18px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem' }}
              >
                <Printer size={16} />
                <span>Print Official Hospital Receipt</span>
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => onNavigate('track-order')}
                  className="btn-secondary"
                  style={{ padding: '10px 18px', fontSize: '0.875rem' }}
                >
                  Track Hospital Order
                </button>
                <button 
                  onClick={() => onNavigate('shop')}
                  className="btn-primary"
                  style={{ padding: '10px 22px', fontSize: '0.875rem' }}
                >
                  Return to Instruments Catalog
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // 2. Main Checkout Form
  return (
    <div className="checkout-page-wrapper" style={{ backgroundColor: '#f8fafc', minHeight: '85vh', paddingBottom: '70px' }}>
      
      {/* Checkout Focused Header */}
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid var(--slate-200)', padding: '16px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              onClick={() => onNavigate('cart')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--slate-600)', fontSize: '0.875rem', fontWeight: '600' }}
            >
              <ArrowLeft size={16} />
              <span>Back to Cart</span>
            </button>
            <div style={{ height: '24px', width: '1px', backgroundColor: 'var(--slate-200)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="/assets/surgix-logo.png" alt="Surgix Supplies" style={{ height: '28px', objectFit: 'contain' }} />
              <span style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--navy-dark)', letterSpacing: '0.04em' }}>
                SURGIX PROCUREMENT CHECKOUT
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--slate-600)', backgroundColor: 'var(--slate-50)', padding: '6px 12px', borderRadius: '20px', border: '1px solid var(--slate-200)' }}>
            <Lock size={13} color="var(--emerald-600)" />
            <span>256-Bit SSL Encrypted Procurement Gateway</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '28px' }}>
        
        {/* Step Progress Tracker */}
        <div style={{ maxWidth: '640px', margin: '0 auto 32px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setStep(1)}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: step >= 1 ? 'var(--primary)' : 'var(--slate-300)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8125rem', fontWeight: '700' }}>
              1
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: step === 1 ? '700' : '500', color: step === 1 ? 'var(--navy-dark)' : 'var(--slate-500)' }}>
              Hospital & Delivery
            </span>
          </div>

          <div style={{ width: '60px', height: '2px', backgroundColor: step >= 2 ? 'var(--primary)' : 'var(--slate-200)', margin: '0 12px' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: step >= 2 ? 'var(--primary)' : 'var(--slate-300)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8125rem', fontWeight: '700' }}>
              2
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: step === 2 ? '700' : '500', color: step === 2 ? 'var(--navy-dark)' : 'var(--slate-500)' }}>
              Payment & Authorization
            </span>
          </div>
        </div>

        {/* 2-Column Checkout Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(320px, 1.1fr)', gap: '32px', alignItems: 'start' }}>
          
          {/* Left Column: Form Details */}
          <div>
            {step === 1 && (
              <form onSubmit={handleProceedToPayment} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* 1. Hospital / Organization Contact */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid var(--slate-200)', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1px solid var(--slate-100)' }}>
                    <Building2 size={20} color="var(--primary)" />
                    <h2 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--navy-dark)', margin: 0 }}>
                      1. Institution & Procurement Contact
                    </h2>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                      <label className="form-label">Hospital, Surgical Center or Practice Name *</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Mount Sinai Surgical Center / Memorial Hospital" 
                        value={formData.hospitalName}
                        onChange={(e) => handleInputChange('hospitalName', e.target.value)}
                        className="form-input"
                      />
                      {formErrors.hospitalName && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{formErrors.hospitalName}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">First Name *</label>
                      <input 
                        type="text" 
                        placeholder="Procurement contact" 
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="form-input"
                      />
                      {formErrors.firstName && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{formErrors.firstName}</span>}
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
                      {formErrors.lastName && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{formErrors.lastName}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Official Work Email (For MTRs & Tracking) *</label>
                      <input 
                        type="email" 
                        placeholder="purchasing@hospital.org" 
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="form-input"
                      />
                      {formErrors.email && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{formErrors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Dispatch Phone Number *</label>
                      <input 
                        type="tel" 
                        placeholder="+1 (555) 000-0000" 
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="form-input"
                      />
                      {formErrors.phone && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{formErrors.phone}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Department / Unit</label>
                      <select 
                        value={formData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="form-select"
                      >
                        <option value="OR / Central Sterile Supply">OR / Central Sterile Supply</option>
                        <option value="General Surgery Procurement">General Surgery Procurement</option>
                        <option value="Cardiothoracic / Vascular OR">Cardiothoracic / Vascular OR</option>
                        <option value="Orthopedic Trauma Service">Orthopedic Trauma Service</option>
                        <option value="Ambulatory Surgical Center (ASC)">Ambulatory Surgical Center (ASC)</option>
                        <option value="Labor & Delivery / OBGYN">Labor & Delivery / OBGYN</option>
                        <option value="Materials Management">Materials Management / Purchasing</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Hospital Tax-Exempt / NPI # (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="e.g., 501(c)(3) ID or NPI" 
                        value={formData.taxExemptId}
                        onChange={(e) => handleInputChange('taxExemptId', e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Receiving Address & Dock Info */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid var(--slate-200)', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1px solid var(--slate-100)' }}>
                    <Truck size={20} color="var(--primary)" />
                    <h2 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--navy-dark)', margin: 0 }}>
                      2. Hospital Delivery Address & Receiving Dock
                    </h2>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
                    <div className="form-group" style={{ gridColumn: 'span 3' }}>
                      <label className="form-label">Facility Street Address *</label>
                      <input 
                        type="text" 
                        placeholder="e.g., 100 Hospital Plaza, Medical Arts Blvd" 
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="form-input"
                      />
                      {formErrors.address && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{formErrors.address}</span>}
                    </div>

                    <div className="form-group" style={{ gridColumn: 'span 3' }}>
                      <label className="form-label">Building / Dock Number / Suite</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Receiving Dock B, Suite 400" 
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
                      {formErrors.city && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{formErrors.city}</span>}
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
                      {formErrors.state && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{formErrors.state}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Postal / ZIP Code *</label>
                      <input 
                        type="text" 
                        placeholder="ZIP Code" 
                        value={formData.zip}
                        onChange={(e) => handleInputChange('zip', e.target.value)}
                        className="form-input"
                      />
                      {formErrors.zip && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{formErrors.zip}</span>}
                    </div>
                  </div>

                  {/* Shipping Speed Selection */}
                  <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--slate-100)' }}>
                    <label className="form-label" style={{ marginBottom: '10px' }}>Select Insured Hospital Freight Method</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      
                      <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', border: formData.shippingMethod === 'standard' ? '2px solid var(--primary)' : '1px solid var(--slate-300)', borderRadius: '8px', cursor: 'pointer', backgroundColor: formData.shippingMethod === 'standard' ? 'var(--primary-light)' : '#ffffff' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <input 
                            type="radio" 
                            name="shippingMethod" 
                            checked={formData.shippingMethod === 'standard'} 
                            onChange={() => handleInputChange('shippingMethod', 'standard')} 
                          />
                          <div>
                            <span style={{ fontWeight: '700', fontSize: '0.875rem', color: 'var(--navy-dark)', display: 'block' }}>
                              Standard Insured Medical Ground (2-3 Business Days)
                            </span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                              Autoclave sealed, chain-of-custody box tracking
                            </span>
                          </div>
                        </div>
                        <span style={{ fontWeight: '700', fontSize: '0.875rem', color: isFreeStandard ? 'var(--emerald-600)' : 'var(--navy-dark)' }}>
                          {isFreeStandard ? 'FREE' : '$25.00'}
                        </span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', border: formData.shippingMethod === 'express' ? '2px solid var(--primary)' : '1px solid var(--slate-300)', borderRadius: '8px', cursor: 'pointer', backgroundColor: formData.shippingMethod === 'express' ? 'var(--primary-light)' : '#ffffff' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <input 
                            type="radio" 
                            name="shippingMethod" 
                            checked={formData.shippingMethod === 'express'} 
                            onChange={() => handleInputChange('shippingMethod', 'express')} 
                          />
                          <div>
                            <span style={{ fontWeight: '700', fontSize: '0.875rem', color: 'var(--navy-dark)', display: 'block' }}>
                              Hospital Priority Overnight (Next Morning 10:30 AM)
                            </span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                              Direct courier from Boston Sterile Distribution
                            </span>
                          </div>
                        </div>
                        <span style={{ fontWeight: '700', fontSize: '0.875rem', color: 'var(--navy-dark)' }}>
                          $45.00
                        </span>
                      </label>

                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary" 
                  style={{ padding: '14px', fontSize: '1rem', width: '100%', borderRadius: '8px' }}
                >
                  <span>Continue to Secure Payment Gateway</span>
                  <ChevronRight size={18} />
                </button>

              </form>
            )}

            {step === 2 && (
              <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* 3. Payment Gateway (Built ready for Stripe & other famous payment methods) */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid var(--slate-200)', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1px solid var(--slate-100)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <CreditCard size={20} color="var(--primary)" />
                      <h2 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--navy-dark)', margin: 0 }}>
                        3. Payment & Institutional Authorization
                      </h2>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setStep(1)} 
                      style={{ fontSize: '0.8125rem', color: 'var(--primary)', fontWeight: '600' }}
                    >
                      Edit Delivery Details
                    </button>
                  </div>

                  {/* Payment Method Selector Tabs */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', marginBottom: '20px' }}>
                    <button 
                      type="button"
                      onClick={() => handleInputChange('paymentMethod', 'card')}
                      style={{ 
                        padding: '12px 10px', 
                        borderRadius: '8px', 
                        border: formData.paymentMethod === 'card' ? '2px solid var(--primary)' : '1px solid var(--slate-300)',
                        backgroundColor: formData.paymentMethod === 'card' ? 'var(--primary-light)' : '#ffffff',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <CreditCard size={20} color={formData.paymentMethod === 'card' ? 'var(--primary)' : 'var(--slate-600)'} />
                      <span style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--navy-dark)' }}>Credit / Debit Card (Stripe)</span>
                    </button>

                    <button 
                      type="button"
                      onClick={() => handleInputChange('paymentMethod', 'applepay')}
                      style={{ 
                        padding: '12px 10px', 
                        borderRadius: '8px', 
                        border: formData.paymentMethod === 'applepay' ? '2px solid var(--primary)' : '1px solid var(--slate-300)',
                        backgroundColor: formData.paymentMethod === 'applepay' ? 'var(--primary-light)' : '#ffffff',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span style={{ fontSize: '1.1rem', fontWeight: '900' }}>Pay / GPay</span>
                      <span style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--navy-dark)' }}>Digital Wallet</span>
                    </button>

                    <button 
                      type="button"
                      onClick={() => handleInputChange('paymentMethod', 'po')}
                      style={{ 
                        padding: '12px 10px', 
                        borderRadius: '8px', 
                        border: formData.paymentMethod === 'po' ? '2px solid var(--primary)' : '1px solid var(--slate-300)',
                        backgroundColor: formData.paymentMethod === 'po' ? 'var(--primary-light)' : '#ffffff',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <FileText size={20} color={formData.paymentMethod === 'po' ? 'var(--primary)' : 'var(--slate-600)'} />
                      <span style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--navy-dark)' }}>Hospital PO (Net-30)</span>
                    </button>

                    <button 
                      type="button"
                      onClick={() => handleInputChange('paymentMethod', 'wire')}
                      style={{ 
                        padding: '12px 10px', 
                        borderRadius: '8px', 
                        border: formData.paymentMethod === 'wire' ? '2px solid var(--primary)' : '1px solid var(--slate-300)',
                        backgroundColor: formData.paymentMethod === 'wire' ? 'var(--primary-light)' : '#ffffff',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Building2 size={20} color={formData.paymentMethod === 'wire' ? 'var(--primary)' : 'var(--slate-600)'} />
                      <span style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--navy-dark)' }}>Bank Wire / ACH</span>
                    </button>
                  </div>

                  {/* 1. Credit Card Panel (Stripe Elements Integration Ready) */}
                  {formData.paymentMethod === 'card' && (
                    <div style={{ backgroundColor: 'var(--slate-50)', padding: '20px', borderRadius: '10px', border: '1px solid var(--slate-200)' }}>
                      
                      {/* Stripe Brand & Cards Row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--slate-700)', fontWeight: '600' }}>
                          <Lock size={14} color="var(--primary)" />
                          <span>Stripe Secure Card Element</span>
                        </div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <span style={{ fontSize: '0.65rem', fontWeight: '800', backgroundColor: '#ffffff', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--slate-200)', color: '#1a1f71' }}>VISA</span>
                          <span style={{ fontSize: '0.65rem', fontWeight: '800', backgroundColor: '#ffffff', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--slate-200)', color: '#eb001b' }}>MC</span>
                          <span style={{ fontSize: '0.65rem', fontWeight: '800', backgroundColor: '#ffffff', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--slate-200)', color: '#006fcf' }}>AMEX</span>
                          <span style={{ fontSize: '0.65rem', fontWeight: '800', backgroundColor: '#ffffff', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--slate-200)', color: '#f96302' }}>DISCOVER</span>
                        </div>
                      </div>

                      {/*
                        * =========================================================================
                        * STRIPE INTEGRATION READY HOOK:
                        * When ready to connect live Stripe, install @stripe/react-stripe-js
                        * and replace these mock inputs with <PaymentElement /> or <CardElement />
                        * =========================================================================
                      */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label className="form-label">Card Number</label>
                          <div style={{ position: 'relative' }}>
                            <input 
                              type="text" 
                              maxLength="19"
                              placeholder="4242 •••• •••• 4242" 
                              value={formData.cardNumber}
                              onChange={(e) => {
                                // Auto spacing for card digits
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
                          {formErrors.cardNumber && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{formErrors.cardNumber}</span>}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div className="form-group" style={{ margin: 0 }}>
                            <label className="form-label">Expiration (MM/YY)</label>
                            <input 
                              type="text" 
                              maxLength="5"
                              placeholder="MM/YY" 
                              value={formData.cardExp}
                              onChange={(e) => handleInputChange('cardExp', e.target.value)}
                              className="form-input"
                            />
                            {formErrors.cardExp && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{formErrors.cardExp}</span>}
                          </div>

                          <div className="form-group" style={{ margin: 0 }}>
                            <label className="form-label">CVC / Security Code</label>
                            <input 
                              type="text" 
                              maxLength="4"
                              placeholder="CVC" 
                              value={formData.cardCvc}
                              onChange={(e) => handleInputChange('cardCvc', e.target.value)}
                              className="form-input"
                            />
                            {formErrors.cardCvc && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{formErrors.cardCvc}</span>}
                          </div>
                        </div>

                        <div className="form-group" style={{ margin: 0 }}>
                          <label className="form-label">Name on Card</label>
                          <input 
                            type="text" 
                            placeholder="Dr. John Smith / Materials Dept" 
                            value={formData.cardName}
                            onChange={(e) => handleInputChange('cardName', e.target.value)}
                            className="form-input"
                          />
                          {formErrors.cardName && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{formErrors.cardName}</span>}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                          <ShieldCheck size={14} color="var(--emerald-600)" />
                          <span>PCI-DSS Level 1 Encrypted via Stripe Infrastructure</span>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* 2. Apple Pay & Google Pay Panel */}
                  {formData.paymentMethod === 'applepay' && (
                    <div style={{ backgroundColor: 'var(--slate-50)', padding: '24px', borderRadius: '10px', border: '1px solid var(--slate-200)', textAlign: 'center' }}>
                      <p style={{ fontSize: '0.9rem', color: 'var(--slate-700)', marginBottom: '16px' }}>
                        Authorize one-touch hospital procurement using Apple Pay or Google Pay via Stripe:
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '320px', margin: '0 auto' }}>
                        <button 
                          type="button" 
                          onClick={() => setFormData(p => ({ ...p, cardName: 'Apple Pay Wallet' }))}
                          style={{ backgroundColor: '#000000', color: '#ffffff', borderRadius: '8px', padding: '12px', fontSize: '1rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                        >
                          Pay Express Checkout
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setFormData(p => ({ ...p, cardName: 'Google Pay Wallet' }))}
                          style={{ backgroundColor: '#ffffff', border: '1px solid var(--slate-300)', color: '#3c4043', borderRadius: '8px', padding: '12px', fontSize: '1rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                        >
                          GPay One-Click
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 3. Hospital Purchase Order (Net-30 / Net-60) Panel */}
                  {formData.paymentMethod === 'po' && (
                    <div style={{ backgroundColor: 'var(--slate-50)', padding: '20px', borderRadius: '10px', border: '1px solid var(--slate-200)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--navy-dark)', fontWeight: '700', fontSize: '0.9rem' }}>
                        <FileText size={16} color="var(--primary)" />
                        <span>Institutional Purchase Order Terms (Net-30 / Net-60)</span>
                      </div>
                      
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Official Hospital PO Number *</label>
                        <input 
                          type="text" 
                          placeholder="e.g., PO-2026-NY-4920" 
                          value={formData.poNumber}
                          onChange={(e) => handleInputChange('poNumber', e.target.value)}
                          className="form-input"
                        />
                        {formErrors.poNumber && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{formErrors.poNumber}</span>}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label className="form-label">Purchasing Officer Name</label>
                          <input 
                            type="text" 
                            placeholder="Full name" 
                            value={formData.poAuthorizer}
                            onChange={(e) => handleInputChange('poAuthorizer', e.target.value)}
                            className="form-input"
                          />
                        </div>

                        <div className="form-group" style={{ margin: 0 }}>
                          <label className="form-label">Payment Terms</label>
                          <select 
                            value={formData.poTerms}
                            onChange={(e) => handleInputChange('poTerms', e.target.value)}
                            className="form-select"
                          >
                            <option value="net30">Net 30 Days (Standard Hospital)</option>
                            <option value="net60">Net 60 Days (State Healthcare / IDN)</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', lineHeight: '1.4' }}>
                        * Invoices with MTR mill test certifications are transmitted to accounts payable upon dispatch.
                      </div>
                    </div>
                  )}

                  {/* 4. Bank Wire / Institutional ACH Panel */}
                  {formData.paymentMethod === 'wire' && (
                    <div style={{ backgroundColor: 'var(--slate-50)', padding: '20px', borderRadius: '10px', border: '1px solid var(--slate-200)' }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--navy-dark)', marginBottom: '8px' }}>
                        Direct Institutional Wire / Fedwire / ACH Instructions
                      </div>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--slate-600)', marginBottom: '12px' }}>
                        Upon placing your order, an official commercial pro-forma invoice containing our Citibank Institutional Treasury routing will be sent to your email. Instruments will be allocated immediately.
                      </p>
                      <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '6px', border: '1px solid var(--slate-200)', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                        <div>Bank: Citibank N.A. New York / Medical Commercial Division</div>
                        <div>Account Name: Surgix Supplies Surgical Instruments LLC</div>
                        <div>Reference: {formData.hospitalName ? formData.hospitalName.slice(0, 10).toUpperCase() : 'SURGIX-ORD'}</div>
                      </div>
                    </div>
                  )}

                  {/* Billing Address Checkbox */}
                  <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px solid var(--slate-200)' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--slate-700)' }}>
                      <input 
                        type="checkbox" 
                        checked={formData.billingSameAsShipping}
                        onChange={(e) => handleInputChange('billingSameAsShipping', e.target.checked)} 
                      />
                      <span>Billing address is identical to hospital receiving address</span>
                    </label>
                  </div>

                </div>

                {/* Submit & Authorize Button */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button 
                    type="submit" 
                    disabled={isProcessing}
                    className="btn-primary" 
                    style={{ 
                      padding: '16px', 
                      fontSize: '1.05rem', 
                      width: '100%', 
                      borderRadius: '8px', 
                      boxShadow: '0 4px 16px rgba(0, 119, 200, 0.3)',
                      opacity: isProcessing ? 0.75 : 1
                    }}
                  >
                    {isProcessing ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <span className="spinner-loader" style={{ width: '16px', height: '16px', border: '2px solid #ffffff', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.6s linear infinite' }} />
                        Authorizing via 256-Bit Gateway...
                      </span>
                    ) : (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <Lock size={18} />
                        <span>Authorize Hospital Order • ${grandTotal.toFixed(2)}</span>
                      </span>
                    )}
                  </button>

                  <button 
                    type="button" 
                    onClick={() => setStep(1)} 
                    style={{ fontSize: '0.85rem', color: 'var(--slate-600)', textAlign: 'center' }}
                  >
                    ← Back to Hospital Delivery Details
                  </button>
                </div>

              </form>
            )}
          </div>

          {/* Right Column: Sticky Procurement Order Summary */}
          <div style={{ position: 'sticky', top: '80px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid var(--slate-200)', padding: '24px', boxShadow: '0 4px 12px rgba(13, 45, 94, 0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--slate-200)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--navy-dark)', margin: 0 }}>
                  Order Requisition ({cartItems.reduce((a, b) => a + b.quantity, 0)} Items)
                </h3>
                <button 
                  onClick={() => onNavigate('cart')}
                  style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: '600' }}
                >
                  Edit Cart
                </button>
              </div>

              {/* Items List Mini */}
              <div style={{ maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '4px', marginBottom: '18px' }}>
                {cartItems.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid var(--slate-100)' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--slate-200)', flexShrink: 0 }}>
                      <ProductImage src={item.image} alt={item.name} sku={item.sku} height="100%" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--slate-800)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--slate-500)' }}>
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--navy-dark)' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--slate-600)' }}>
                  <span>Subtotal</span>
                  <span style={{ fontWeight: '600', color: 'var(--slate-800)' }}>${subtotal.toFixed(2)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--slate-600)' }}>
                  <span>Hospital Freight</span>
                  <span style={{ fontWeight: '600', color: shippingCost === 0 ? 'var(--emerald-600)' : 'var(--slate-800)' }}>
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--slate-600)' }}>
                  <span>Sales Tax ({isTaxExempt ? 'Hospital Exempt' : 'Standard'})</span>
                  <span style={{ fontWeight: '600' }}>
                    {isTaxExempt ? '$0.00' : `$${taxCost.toFixed(2)}`}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '800', color: 'var(--navy-dark)', paddingTop: '14px', borderTop: '2px dashed var(--slate-200)', marginTop: '4px' }}>
                  <span>Total Due</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--slate-200)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--slate-600)' }}>
                  <ShieldCheck size={14} color="var(--primary)" />
                  <span>ASTM F899 Grade Surgical Stainless Guarantee</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--slate-600)' }}>
                  <CheckCircle2 size={14} color="var(--emerald-600)" />
                  <span>Full Autoclave Traceability & MTR Enclosed</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--slate-600)' }}>
                  <Lock size={14} color="var(--primary)" />
                  <span>Powered by Stripe 256-Bit SSL Architecture</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
