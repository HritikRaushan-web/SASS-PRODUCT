import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SoftwareCatalogPage from './pages/SoftwareCatalogPage';
import SoftwareDetailPage from './pages/SoftwareDetailPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import LegalPage from './pages/LegalPage';

import PaymentModal from './components/PaymentModal';
import VideoModal from './components/VideoModal';
import MoreDetailsModal from './components/MoreDetailsModal';
import InteractivePreviewModal from './components/InteractivePreviewModal';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [selectedProductForBuy, setSelectedProductForBuy] = useState(null);
  const [selectedProductForDetails, setSelectedProductForDetails] = useState(null);
  const [activeVideo, setActiveVideo] = useState({ isOpen: false, url: '', title: '' });
  const [activeInteractivePreview, setActiveInteractivePreview] = useState({ isOpen: false, product: null });
  const location = useLocation();

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleOpenBuy = (product) => {
    setSelectedProductForBuy(product);
  };

  const handleCloseBuy = () => {
    setSelectedProductForBuy(null);
  };

  const handleOpenDetails = (product) => {
    setSelectedProductForDetails(product);
  };

  const handleCloseDetails = () => {
    setSelectedProductForDetails(null);
  };

  const handlePlayVideo = (url, title) => {
    setActiveVideo({ isOpen: true, url, title });
  };

  const handleCloseVideo = () => {
    setActiveVideo({ isOpen: false, url: '', title: '' });
  };

  const handleOpenInteractivePreview = (product) => {
    setActiveInteractivePreview({ isOpen: true, product });
  };

  const handleCloseInteractivePreview = () => {
    setActiveInteractivePreview({ isOpen: false, product: null });
  };

  const floatingWaUrl =
    'https://wa.me/919341630325?text=' +
    encodeURIComponent('Hello Prestige Intelligence! I am browsing your 5 automation softwares and would like direct assistance.');

  return (
    <div className="flex flex-col min-h-screen bg-[#090d16] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onBuyProduct={handleOpenBuy}
                onPlayVideo={handlePlayVideo}
                onOpenDetails={handleOpenDetails}
                onPreviewInteractive={handleOpenInteractivePreview}
              />
            }
          />
          <Route
            path="/scripts"
            element={
              <SoftwareCatalogPage
                onBuyProduct={handleOpenBuy}
                onPlayVideo={handlePlayVideo}
                onOpenDetails={handleOpenDetails}
                onPreviewInteractive={handleOpenInteractivePreview}
              />
            }
          />
          <Route
            path="/single-page/:id"
            element={
              <SoftwareDetailPage
                onBuyProduct={handleOpenBuy}
                onPlayVideo={handlePlayVideo}
                onPreviewInteractive={handleOpenInteractivePreview}
              />
            }
          />
          <Route
            path="/software/:id"
            element={
              <SoftwareDetailPage
                onBuyProduct={handleOpenBuy}
                onPlayVideo={handlePlayVideo}
                onPreviewInteractive={handleOpenInteractivePreview}
              />
            }
          />
          <Route path="/admin" element={<AdminDashboardPage />} />

          {/* Legal routes */}
          <Route path="/privacy-policy" element={<LegalPage />} />
          <Route path="/refund-and-returns-policy" element={<LegalPage />} />
          <Route path="/shipping-and-cancellation" element={<LegalPage />} />
          <Route path="/terms-and-conditions" element={<LegalPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      {/* Floating WhatsApp Action Button */}
      <a
        href={floatingWaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-400 text-slate-950 p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl shadow-emerald-500/40 flex items-center gap-2 font-bold text-xs sm:text-sm transition-all transform hover:scale-105 group"
        title="Chat with Technical Lead on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline">WhatsApp Support</span>
      </a>

      {/* Payment Checkout Modal */}
      {selectedProductForBuy && (
        <PaymentModal
          product={selectedProductForBuy}
          isOpen={!!selectedProductForBuy}
          onClose={handleCloseBuy}
        />
      )}

      {/* More Details In-Depth Modal */}
      {selectedProductForDetails && (
        <MoreDetailsModal
          product={selectedProductForDetails}
          isOpen={!!selectedProductForDetails}
          onClose={handleCloseDetails}
          onBuyProduct={handleOpenBuy}
        />
      )}

      {/* Presentation Video Modal */}
      {activeVideo.isOpen && (
        <VideoModal
          videoUrl={activeVideo.url}
          title={activeVideo.title}
          isOpen={activeVideo.isOpen}
          onClose={handleCloseVideo}
        />
      )}

      {/* Interactive Simulator Modal */}
      {activeInteractivePreview.isOpen && (
        <InteractivePreviewModal
          product={activeInteractivePreview.product}
          isOpen={activeInteractivePreview.isOpen}
          onClose={handleCloseInteractivePreview}
        />
      )}
    </div>
  );
}
