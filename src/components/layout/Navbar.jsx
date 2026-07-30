import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShieldCheck, LayoutDashboard, Users, PieChart, Info, FilePlus, Moon, Sun, Menu } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { A11yPanel } from './A11yPanel';

export function Navbar({ toggleMobileMenu }) {
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/assessment', icon: <FilePlus size={18} />, label: 'New Assessment' },
    { to: '/customers', icon: <Users size={18} />, label: 'Customers' },
    { to: '/insights', icon: <PieChart size={18} />, label: 'Insights' },
    { to: '/about', icon: <Info size={18} />, label: 'About' },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button 
              className="md:hidden mr-4 p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
            >
              <Menu size={24} />
            </button>
            
            <Link to="/" className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg pr-4">
              <div className="bg-primary-600 text-white p-1.5 rounded-lg">
                <ShieldCheck size={24} />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Credit<span className="text-primary-600 dark:text-primary-400">Lens</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex ml-8 space-x-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => 
                    `flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                    }`
                  }
                >
                  {link.icon}
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <A11yPanel />
          </div>
        </div>
      </div>
    </nav>
  );
}
