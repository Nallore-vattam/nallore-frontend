import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { LanguageProvider1 } from './context/LanguageContext1';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ScrollToTop from './components/ScrollToTop';
import NavbarAutoClose from './components/NavbarAutoClose'; 
import ServicesPage from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import './pages/ServiceCards.css';
import GalleryPage from './pages/Gallery';
import ContactPage from './pages/Contact';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AdminGallery from "./pages/AdminGallery";
import AdminGalleryUpload from "./components/AdminGalleryUpload";


function App() {
  return (
    <LanguageProvider>
    {/*<LanguageProvider1>*/ } 
      <Router>
        <div className="App">
          <Header />
           <ScrollToTop />
          <NavbarAutoClose />
          <main style={{ minHeight: '100vh' }}>
            <Routes>                                                
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:serviceKey" element={<ServiceDetail />} />
              <Route path="/admin/gallery/upload" element={<AdminGalleryUpload />} />
              <Route path="/admin/gallery/manage" element={<AdminGallery />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    {/*</LanguageProvider1>*/}
    </LanguageProvider>
  );
}

export default App;