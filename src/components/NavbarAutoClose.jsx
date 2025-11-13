// src/components/NavbarAutoClose.jsx
import { useEffect } from 'react';

const NavbarAutoClose = () => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbarToggler = document.querySelector('.navbar-toggler');
      const navbarCollapse = document.querySelector('.navbar-collapse');
      
      if (navbarCollapse && navbarCollapse.classList.contains('show') &&
          navbarToggler && // Added safety check
          !navbarToggler.contains(event.target) &&
          !navbarCollapse.contains(event.target)) {
        navbarToggler.click();
      }
    };

    const handleNavLinkClick = () => {
      const navbarToggler = document.querySelector('.navbar-toggler');
      if (window.innerWidth < 992 && navbarToggler) { // Added safety check
        navbarToggler.click();
      }
    };

    document.addEventListener('click', handleClickOutside);
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavLinkClick);
    });

    return () => {
      document.removeEventListener('click', handleClickOutside);
      navLinks.forEach(link => {
        link.removeEventListener('click', handleNavLinkClick);
      });
    };
  }, []);

  return null;
};

// ✅ Make sure this line is present for default export
export default NavbarAutoClose;