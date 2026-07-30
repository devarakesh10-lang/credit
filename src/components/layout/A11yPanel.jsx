import React, { useState, useRef, useEffect } from 'react';
import { Settings, Type, Contrast, MonitorPlay, X, RotateCcw } from 'lucide-react';
import { useA11y } from '../../contexts/A11yContext';
import { Button } from '../ui/Button';
import { cn } from '../../utils/utils';

export function A11yPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  
  const { 
    highContrast, toggleHighContrast,
    textSize, cycleTextSize,
    reduceMotion, toggleReduceMotion,
    resetA11y
  } = useA11y();

  // Close panel on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const getTextSizeLabel = () => {
    if (textSize === 'large') return 'Large Text';
    if (textSize === 'xlarge') return 'Extra Large';
    return 'Normal Text';
  };

  return (
    <div className="relative" ref={panelRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors focus:ring-2 focus:ring-primary-500 outline-none"
        aria-label="Accessibility Settings"
        aria-expanded={isOpen}
      >
        <Settings size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-dark-card rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Accessibility</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              aria-label="Close panel"
            >
              <X size={16} />
            </button>
          </div>
          
          <div className="p-4 space-y-4">
            {/* Text Size */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300">
                <Type size={18} />
                <span className="text-sm font-medium">{getTextSizeLabel()}</span>
              </div>
              <Button variant="outline" size="sm" onClick={cycleTextSize} className="h-8 px-2">
                Change
              </Button>
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300">
                <Contrast size={18} />
                <span className="text-sm font-medium">High Contrast</span>
              </div>
              <button 
                onClick={toggleHighContrast}
                className={cn(
                  "relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500",
                  highContrast ? "bg-primary-600" : "bg-slate-200 dark:bg-slate-600"
                )}
                aria-pressed={highContrast}
              >
                <span 
                  className={cn(
                    "inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform",
                    highContrast ? "translate-x-4.5" : "translate-x-1"
                  )}
                />
              </button>
            </div>

            {/* Reduce Motion */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300">
                <MonitorPlay size={18} />
                <span className="text-sm font-medium">Reduce Motion</span>
              </div>
              <button 
                onClick={toggleReduceMotion}
                className={cn(
                  "relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500",
                  reduceMotion ? "bg-primary-600" : "bg-slate-200 dark:bg-slate-600"
                )}
                aria-pressed={reduceMotion}
              >
                <span 
                  className={cn(
                    "inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform",
                    reduceMotion ? "translate-x-4.5" : "translate-x-1"
                  )}
                />
              </button>
            </div>
            
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button variant="ghost" size="sm" onClick={resetA11y} className="w-full text-slate-500 justify-center">
                <RotateCcw size={14} className="mr-2" />
                Reset Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
