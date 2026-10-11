import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { CartDrawer } from './components/CartDrawer';
import { QuickEnquiryModal } from './components/QuickEnquiryModal';
import { SignInModal } from './components/SignInModal';
import { QuoteModal } from './components/QuoteModal';
import { ProductModal } from './components/ProductModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { WhatsAppModal } from './components/WhatsAppModal';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { SetsPage } from './pages/SetsPage';
import { CataloguePage } from './pages/CataloguePage';
import { AboutPage } from './pages/AboutPage';
import { QualityPage } from './pages/QualityPage';
import { QualityDocsPage } from './pages/QualityDocsPage';
import { ContactPage } from './pages/ContactPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { ShippingReturnsPage } from './pages/ShippingReturnsPage';
import { FaqPage } from './pages/FaqPage';
import { LegalPage } from './pages/LegalPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';

import { surgicalInstruments } from './data/instruments';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart State (pre-populated with 2 initial hospital standard items to demonstrate free shipping meter)
  const [cartItems, setCartItems] = useState([
    {
      id: "sx-101",
      sku: "SX-SC-101",
      name: "Mayo Dissecting Scissors (Curved, Tungsten Carbide)",
      image: "/assets/products/mayo-scissors-tc.jpg",
      price: 84.50,
      bulkPrice: 69.00,
      quantity: 4
    },
    {
      id: "sx-203",
      sku: "SX-FC-203",
      name: "DeBakey Atraumatic Vascular Tissue Forceps",
      image: "/assets/products/debakey-forceps.jpg",
      price: 68.00,
      bulkPrice: 54.00,
      quantity: 3
    }
  ]);

  // Modal Open States
  const [cartOpen, setCartOpen] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryItem, setEnquiryItem] = useState(null);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);

  // Cart Actions
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
    setCartOpen(true);
  };

  const handleUpdateQty = (itemId, newQty) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleCheckoutComplete = () => {
    setCartItems([]);
  };

  // Search Action
  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    setActivePage('shop');
    setSelectedCategory('all');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const openProductQuickView = (prod) => {
    setActiveProduct(prod);
    setProductModalOpen(true);
  };

  const openEnquiryForItem = (prod) => {
    setEnquiryItem(prod);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="app-container">
      {/* 1. Header (Matching Image 1) */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenEnquiry={() => openEnquiryForItem(null)}
        onOpenSignIn={() => setSignInModalOpen(true)}
        onOpenQuote={() => setQuoteModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          setActivePage('shop');
        }}
      />

      {/* 2. Main Page Content Router */}
      <main className="main-content-area">
        {activePage === 'home' && (
          <HomePage
            onNavigate={setActivePage}
            onOpenProductModal={openProductQuickView}
            onAddToCart={handleAddToCart}
            onOpenQuote={() => setQuoteModalOpen(true)}
            onOpenEnquiry={openEnquiryForItem}
          />
        )}

        {activePage === 'shop' && (
          <ShopPage
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onOpenProductModal={openProductQuickView}
            onAddToCart={handleAddToCart}
            onOpenEnquiry={openEnquiryForItem}
          />
        )}

        {activePage === 'sets' && (
          <SetsPage
            onAddToCart={handleAddToCart}
            onOpenQuote={() => setQuoteModalOpen(true)}
            onOpenEnquiry={openEnquiryForItem}
          />
        )}

        {activePage === 'catalogue' && (
          <CataloguePage
            onOpenProductModal={openProductQuickView}
            onAddToCart={handleAddToCart}
            onOpenQuote={() => setQuoteModalOpen(true)}
            onOpenEnquiry={openEnquiryForItem}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            onOpenQuote={() => setQuoteModalOpen(true)}
            onNavigate={setActivePage}
          />
        )}

        {activePage === 'quality' && (
          <QualityPage
            onNavigate={setActivePage}
            onOpenQuote={() => setQuoteModalOpen(true)}
          />
        )}

        {activePage === 'quality-docs' && (
          <QualityDocsPage />
        )}

        {activePage === 'contact' && (
          <ContactPage
            onOpenQuote={() => setQuoteModalOpen(true)}
            onOpenWhatsApp={() => setWhatsAppModalOpen(true)}
          />
        )}

        {activePage === 'track-order' && (
          <TrackOrderPage />
        )}

        {activePage === 'shipping-returns' && (
          <ShippingReturnsPage
            onOpenEnquiry={openEnquiryForItem}
          />
        )}

        {activePage === 'faq' && (
          <FaqPage
            onOpenQuote={() => setQuoteModalOpen(true)}
          />
        )}

        {activePage === 'legal' && (
          <LegalPage />
        )}

        {activePage === 'cart' && (
          <CartPage
            cartItems={cartItems}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveFromCart}
            onNavigate={(page) => {
              setActivePage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenQuote={() => setQuoteModalOpen(true)}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutPage
            cartItems={cartItems}
            onNavigate={(page) => {
              setActivePage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCheckoutComplete={handleCheckoutComplete}
          />
        )}
      </main>

      {/* 3. Footer (Matching Image 1) */}
      <Footer
        setActivePage={setActivePage}
        onOpenCart={() => setCartOpen(true)}
        onOpenWhatsApp={() => setWhatsAppModalOpen(true)}
        onOpenQuote={() => setQuoteModalOpen(true)}
      />

      {/* 4. Floating Action Buttons (Matching Image 1 & 2) */}
      <FloatingActions
        onOpenWhatsApp={() => setWhatsAppModalOpen(true)}
      />

      {/* 5. Modals & Drawers */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckoutComplete}
        onOpenQuote={() => {
          setCartOpen(false);
          setQuoteModalOpen(true);
        }}
        onNavigateToCart={() => {
          setCartOpen(false);
          setActivePage('cart');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToCheckout={() => {
          setCartOpen(false);
          setActivePage('checkout');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <QuickEnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        initialItem={enquiryItem}
      />

      <SignInModal
        isOpen={signInModalOpen}
        onClose={() => setSignInModalOpen(false)}
      />

      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />

      <ProductModal
        product={activeProduct}
        isOpen={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        onAddToCart={handleAddToCart}
        onOpenEnquiry={openEnquiryForItem}
      />

      <AiAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        onNavigateToShop={() => {
          setAiAssistantOpen(false);
          setActivePage('shop');
        }}
        onNavigateToSets={() => {
          setAiAssistantOpen(false);
          setActivePage('sets');
        }}
      />

      <WhatsAppModal
        isOpen={whatsAppModalOpen}
        onClose={() => setWhatsAppModalOpen(false)}
      />
    </div>
  );
}
