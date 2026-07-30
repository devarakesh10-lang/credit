import React, { createContext, useContext, useState, useEffect } from 'react';

const A11yContext = createContext();

export function A11yProvider({ children }) {
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('a11y-high-contrast') === 'true';
  });
  
  const [textSize, setTextSize] = useState(() => {
    return localStorage.getItem('a11y-text-size') || 'normal';
  });
  
  const [reduceMotion, setReduceMotion] = useState(() => {
    // Check OS preference first, then local storage
    const osPrefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stored = localStorage.getItem('a11y-reduce-motion');
    return stored !== null ? stored === 'true' : osPrefersReduced;
  });

  useEffect(() => {
    localStorage.setItem('a11y-high-contrast', highContrast);
    const root = window.document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('a11y-text-size', textSize);
    const root = window.document.documentElement;
    root.classList.remove('text-size-normal', 'text-size-large', 'text-size-xlarge');
    root.classList.add(`text-size-${textSize}`);
  }, [textSize]);

  useEffect(() => {
    localStorage.setItem('a11y-reduce-motion', reduceMotion);
    const root = window.document.documentElement;
    if (reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
  }, [reduceMotion]);

  const toggleHighContrast = () => setHighContrast(prev => !prev);
  
  const cycleTextSize = () => {
    setTextSize(prev => {
      if (prev === 'normal') return 'large';
      if (prev === 'large') return 'xlarge';
      return 'normal';
    });
  };

  const toggleReduceMotion = () => setReduceMotion(prev => !prev);

  const resetA11y = () => {
    setHighContrast(false);
    setTextSize('normal');
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  };

  return (
    <A11yContext.Provider value={{
      highContrast, toggleHighContrast,
      textSize, cycleTextSize,
      reduceMotion, toggleReduceMotion,
      resetA11y
    }}>
      {children}
    </A11yContext.Provider>
  );
}

export function useA11y() {
  const context = useContext(A11yContext);
  if (context === undefined) {
    throw new Error('useA11y must be used within an A11yProvider');
  }
  return context;
}
