// components/ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use timeout to wait for Framer Motion's exit animation
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 400); // match the exit animation duration

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
