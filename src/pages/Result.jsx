import React, { useEffect, useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, AlertCircle, AlertTriangle, ArrowLeft, Info, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { calculateRiskScore } from '../utils/utils';
import { WhatIfSimulator } from '../components/domain/WhatIfSimulator';
import { RiskBadge } from '../components/ui/RiskBadge';

export function Result() {
  const location = useLocation();
  const [result, setResult] = useState(null);
  const [financials, setFinancials] = useState(null);
  const [showTooltip, setShowTooltip] = useState(null);

  useEffect(() => {
    if (location.state && location.state.formData) {
      const data = location.state.formData;
      // Convert string values to numbers
      const parsedFinancials = {
        income: Number(data.income) || 0,
        debt: Number(data.debt) || 0,
        creditScore: Number(data.creditScore) || 300,
        utilization: Number(data.utilization) || 0,
        latePayments: Number(data.latePayments) || 0,
        expenses: Number(data.expenses) || 0
      };
      setFinancials(parsedFinancials);
      setResult(calculateRiskScore(parsedFinancials));
    }
  }, [location]);

  if (!location.state || !location.state.formData) {
    return <Navigate to="/assessment" replace />;
  }

  if (!result || !financials) return null;

  const { score, riskLevel, factors } = result;
  
  // Calculate stroke dashoffset for circle
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 70) return '#10b981'; // green
    if (score >= 40) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const getFactorIcon = (impact) => {
    if (impact === 'Positive') return <CheckCircle2 className="text-green-500" size={20} />;
    if (impact === 'Neutral') return <AlertTriangle className="text-yellow-500" size={20} />;
    return <AlertCircle className="text-red-500" size={20} />;
  };

  const getImpactBarWidth = (level) => {
    if (level === 'Strong') return '100%';
    if (level === 'Moderate') return '50%';
    return '20%';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center space-x-4 mb-2">
        <Link to="/assessment">
          <Button variant="ghost" size="sm" className="px-2">
            <ArrowLeft size={18} className="mr-1" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Credit Risk Assessment</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Score Widget */}
        <Card className="lg:col-span-1 text-center">
          <CardHeader>
            <CardTitle className="text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider">Demo Risk Score</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-2 pb-8">
            <div className="relative w-64 h-64 flex items-center justify-center mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 260 260">
                <circle 
                  cx="130" cy="130" r="120" 
                  stroke="currentColor" 
                  strokeWidth="16" 
                  fill="transparent" 
                  className="text-slate-100 dark:text-slate-800" 
                />
                <motion.circle 
                  cx="130" cy="130" r="120" 
                  stroke={getScoreColor()} 
                  strokeWidth="16" 
                  fill="transparent" 
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{ strokeDasharray: circumference }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-6xl font-extrabold text-slate-900 dark:text-white"
                >
                  {score}
                </motion.span>
                <span className="text-slate-500 font-medium">/ 100</span>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="px-6 py-2 rounded-full border-2"
              style={{ borderColor: getScoreColor(), color: getScoreColor(), backgroundColor: `${getScoreColor()}15` }}
            >
              <span className="text-lg font-bold tracking-wide">{riskLevel}</span>
            </motion.div>
          </CardContent>
        </Card>

        {/* Explainable AI Factors */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Why this assessment was generated</CardTitle>
            <div className="relative">
              <button 
                onMouseEnter={() => setShowTooltip('factors')}
                onMouseLeave={() => setShowTooltip(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none"
                aria-label="Explain factors"
              >
                <HelpCircle size={18} />
              </button>
              {showTooltip === 'factors' && (
                <div className="absolute right-0 top-6 w-64 p-3 bg-slate-800 text-white text-xs rounded shadow-lg z-10">
                  Factors are analyzed based on standard credit weighting algorithms. Positive factors raise the score, negative ones lower it.
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {factors.map((factor, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-start sm:items-center mb-3 sm:mb-0 w-full sm:w-1/2">
                    <div className="mr-4 mt-1 sm:mt-0 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                      {getFactorIcon(factor.impact)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">{factor.name}</h4>
                      <p className="text-sm text-slate-500">{factor.desc}</p>
                    </div>
                  </div>
                  
                  <div className="w-full sm:w-1/3 flex flex-col pl-12 sm:pl-0">
                    <div className="flex justify-between text-xs mb-1 font-medium text-slate-600 dark:text-slate-400">
                      <span>Impact Level</span>
                      <span>{factor.level}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
                      <div 
                        className={`h-full rounded-full ${
                          factor.impact === 'Positive' ? 'bg-green-500' : 
                          factor.impact === 'Neutral' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} 
                        style={{ width: getImpactBarWidth(factor.level) }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* What-If Simulator */}
      <WhatIfSimulator initialFinancials={financials} />

    </div>
  );
}
