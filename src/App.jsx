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

import AdminProtectedRoute from "./Admin/AdminProtectedRoute";

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

            {/* ADMIN LOGIN */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* PROTECTED ADMIN AREA */}
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="gallery-upload" element={<AdminGalleryUpload />} />
            </Route>

            {/* PUBLIC ROUTES */}
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <NavbarAutoClose />
                  <HomePage />
                  <Footer />
                </>
              }
            />

            <Route
              path="/about"
              element={
                <>
                  <Header />
                  <NavbarAutoClose />
                  <AboutPage />
                  <Footer />
                </>
              }
            />

            <Route
              path="/services"
              element={
                <>
                  <Header />
                  <NavbarAutoClose />
                  <ServicesPage />
                  <Footer />
                </>
              }
            />

            <Route
              path="/services/:serviceKey"
              element={
                <>
                  <Header />
                  <NavbarAutoClose />
                  <ServiceDetail />
                  <Footer />
                </>
              }
            />

            <Route
              path="/gallery"
              element={
                <>
                  <Header />
                  <NavbarAutoClose />
                  <GalleryPage />
                  <Footer />
                </>
              }
            />

            <Route
              path="/contact"
              element={
                <>
                  <Header />
                  <NavbarAutoClose />
                  <ContactPage />
                  <Footer />
                </>
              }
            />

            {/* BLOG */}
            <Route
              path="/blog"
              element={
                <>
                  <Header />
                  <NavbarAutoClose />
                  <BlogList />
                  <Footer />
                </>
              }
            />

            <Route
              path="/blog/:id"
              element={
                <>
                  <Header />
                  <NavbarAutoClose />
                  <BlogDetails />
                  <Footer />
                </>
              }
            />

            {/* 404 */}
            <Route path="*" element={<h2>Page Not Found</h2>} />

          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
