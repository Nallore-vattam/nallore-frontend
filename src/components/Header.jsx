import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { currentLanguage, setCurrentLanguage, supportedLanguages, t } = useLanguage();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getFontClass = () => {
    switch (currentLanguage) {
      case 'ta':
        return 'tamil-font';
      case 'hi':
        return 'hindi-font';
      default:
        return 'english-font';
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const isActive = (path) => (location.pathname === path ? 'active' : '');

  return (
    <Navbar expand="lg" fixed="top" className={scrolled ? 'navbar-scrolled' : ''}>
      <Container>
        <Navbar.Brand
          className="d-flex align-items-center"
          onClick={() => handleNavigate('/')}
          style={{ cursor: 'pointer' }}
        >
          <img
            src={`${import.meta.env.BASE_URL}images/contentsofweb/logo.png`}
            alt="Logo"
            className="logo-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `${import.meta.env.BASE_URL}images/contentsofweb/logo-5q8siOY4.jpeg`;
            }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              className={`${getFontClass()} ${isActive('/')}`}
              onClick={() => handleNavigate('/')}
            >
              {t('home')}
            </Nav.Link>
            <Nav.Link
              className={`${getFontClass()} ${isActive('/about')}`}
              onClick={() => handleNavigate('/about')}
            >
              {t('about')}
            </Nav.Link>
            <Nav.Link
              className={`${getFontClass()} ${isActive('/services')}`}
              onClick={() => handleNavigate('/services')}
            >
              {t('services')}
            </Nav.Link>
            <Nav.Link
              className={`${getFontClass()} ${isActive('/gallery')}`}
              onClick={() => handleNavigate('/gallery')}
            >
              {t('gallery')}
            </Nav.Link>
            <Nav.Link
              className={`${getFontClass()} ${isActive('/contact')}`}
              onClick={() => handleNavigate('/contact')}
            >
              {t('contact')}
            </Nav.Link>

            <div className="language-switcher ms-3 d-flex align-items-center">
              {supportedLanguages.map((lang) => (
                <button
                  key={lang.code}
                  className={`lang-btn ${currentLanguage === lang.code ? 'active' : ''}`}
                  onClick={() => setCurrentLanguage(lang.code)}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
