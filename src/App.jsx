import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import NavbarAutoClose from './components/NavbarAutoClose';

import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ServicesPage from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import GalleryPage from './pages/Gallery';
import ContactPage from './pages/Contact';

import BlogList from "./pages/BlogList";
import BlogDetails from "./pages/BlogDetails";

import AdminLogin from "./Admin/AdminLogin";
import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminEvents from "./Admin/AdminEvents";
import AdminBlog from "./Admin/AdminBlog";
import AdminTeam from "./Admin/AdminTeam";
import AdminGallery from "./Admin/AdminGallery";
import AdminGalleryUpload from "./Admin/AdminGalleryUpload";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />

        <div className="App">
          <Routes>

            <Route path="/admin/login" element={<AdminLogin />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="team" element={<AdminTeam />} />
<Route path="gallery/manage" element={<AdminGallery />} />
              <Route path="gallery-upload" element={<AdminGalleryUpload />} />
            </Route>

            <Route
              path="*"
              element={
                <>
                  <Header />
                  <NavbarAutoClose />

                  <main style={{ minHeight: "100vh" }}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/services" element={<ServicesPage />} />
                      <Route path="/services/:serviceKey" element={<ServiceDetail />} />
                      <Route path="/gallery" element={<GalleryPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      

                      {/* Blog */}
                      <Route path="/blog" element={<BlogList />} />
                      <Route path="/blog/:id" element={<BlogDetails />} />
                    </Routes>
                  </main>

                  <Footer />
                </>
              }
            />

          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
