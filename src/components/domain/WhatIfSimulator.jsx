import React, { useState, useEffect } from 'react';
import { Sliders, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { calculateRiskScore } from '../../utils/utils';
import { RiskBadge } from '../ui/RiskBadge';

export function WhatIfSimulator({ initialFinancials }) {
  const [financials, setFinancials] = useState(initialFinancials);
  const [currentScore, setCurrentScore] = useState(null);
  const [newScore, setNewScore] = useState(null);

  useEffect(() => {
    const baseResult = calculateRiskScore(initialFinancials);
    setCurrentScore(baseResult);
    const newResult = calculateRiskScore(financials);
    setNewScore(newResult);
  }, [initialFinancials, financials]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinancials(prev => ({ ...prev, [name]: Number(value) }));
  };

  if (!currentScore || !newScore) return null;

  const scoreDiff = newScore.score - currentScore.score;

  return (
    <Card className="border-primary-200 dark:border-primary-900 shadow-md">
      <CardHeader className="bg-primary-50/50 dark:bg-primary-900/10 border-b border-primary-100 dark:border-primary-900/50">
        <CardTitle className="flex items-center text-primary-800 dark:text-primary-300">
          <Sliders size={20} className="mr-2" />
          What-If Risk Simulator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium">Credit Score</label>
                <span className="text-sm font-bold">{financials.creditScore}</span>
              </div>
              <input 
                type="range" 
                name="creditScore" 
                min="300" max="850" 
                value={financials.creditScore} 
                onChange={handleChange}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium">Monthly Income ($)</label>
                <span className="text-sm font-bold">{financials.income}</span>
              </div>
              <input 
                type="range" 
                name="income" 
                min="1000" max="25000" step="500"
                value={financials.income} 
                onChange={handleChange}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium">Current Debt ($)</label>
                <span className="text-sm font-bold">{financials.debt}</span>
              </div>
              <input 
                type="range" 
                name="debt" 
                min="0" max="100000" step="1000"
                value={financials.debt} 
                onChange={handleChange}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium">Credit Utilization (%)</label>
                <span className="text-sm font-bold">{financials.utilization}%</span>
              </div>
              <input 
                type="range" 
                name="utilization" 
                min="0" max="100" 
                value={financials.utilization} 
                onChange={handleChange}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium">Late Payments</label>
                <span className="text-sm font-bold">{financials.latePayments}</span>
              </div>
              <input 
                type="range" 
                name="latePayments" 
                min="0" max="10" 
                value={financials.latePayments} 
                onChange={handleChange}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
            </div>
          </div>
          
          <div className="flex flex-col justify-center items-center bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-6">Score Projection</h4>
            
            <div className="flex items-center justify-between w-full max-w-sm mb-4">
              <div className="text-center">
                <p className="text-xs text-slate-500 mb-1">Current</p>
                <div className="text-3xl font-bold">{currentScore.score}</div>
                <div className="mt-2"><RiskBadge level={currentScore.riskLevel} /></div>
              </div>
              
              <div className="text-slate-300 dark:text-slate-600">
                <ArrowRight size={32} />
              </div>
              
              <div className="text-center">
                <p className="text-xs text-slate-500 mb-1">Simulated</p>
                <div className={`text-3xl font-bold ${scoreDiff > 0 ? 'text-green-600' : scoreDiff < 0 ? 'text-red-600' : ''}`}>
                  {newScore.score}
                </div>
                <div className="mt-2"><RiskBadge level={newScore.riskLevel} /></div>
              </div>
            </div>
            
            {scoreDiff !== 0 && (
              <div className={`mt-4 text-sm font-medium px-3 py-1 rounded-full ${scoreDiff > 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                {scoreDiff > 0 ? '+' : ''}{scoreDiff} points
              </div>
            )}
            
            <p className="text-xs text-slate-500 mt-6 text-center">
              Adjust the sliders to see how financial changes could impact the credit risk score.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
