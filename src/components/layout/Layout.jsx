import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Navbar } from './Navbar';
import { LayoutDashboard, Users, PieChart, Info, FilePlus, X } from 'lucide-react';
import { cn } from '../../utils/utils';

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/assessment', icon: <FilePlus size={20} />, label: 'New Assessment' },
    { to: '/customers', icon: <Users size={20} />, label: 'Customers' },
    { to: '/insights', icon: <PieChart size={20} />, label: 'Insights' },
    { to: '/about', icon: <Info size={20} />, label: 'About' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar toggleMobileMenu={() => setMobileMenuOpen(true)} />
      
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-dark-card shadow-xl transform transition-transform ease-in-out duration-300 translate-x-0 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
              <span className="text-lg font-bold text-slate-900 dark:text-white">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => 
                    cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors",
                      isActive 
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' 
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                    )
                  }
                >
                  {link.icon}
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-sm text-slate-500 dark:text-slate-400 mt-auto">
        <p>CreditLens – Educational Prototype. Not for real-world lending decisions.</p>
      </footer>
    </div>
  );
}
