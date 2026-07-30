import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { A11yProvider } from './contexts/A11yContext';
import { Layout } from './components/layout/Layout';

// Pages placeholders
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Assessment } from './pages/Assessment';
import { Result } from './pages/Result';
import { Customers } from './pages/Customers';
import { CustomerProfile } from './pages/CustomerProfile';
import { Insights } from './pages/Insights';
import { About } from './pages/About';

function App() {
  return (
    <ThemeProvider>
      <A11yProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/result" element={<Result />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/customers/:id" element={<CustomerProfile />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/about" element={<About />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </A11yProvider>
    </ThemeProvider>
  );
}

export default App;
