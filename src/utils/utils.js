import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Generate demo risk score based on mock data
export function calculateRiskScore(financials) {
  let score = 100;
  const factors = [];

  // Credit Score Factor
  if (financials.creditScore >= 750) {
    factors.push({ name: 'Credit Score', impact: 'Positive', level: 'Strong', desc: 'Excellent credit history' });
  } else if (financials.creditScore >= 650) {
    score -= 10;
    factors.push({ name: 'Credit Score', impact: 'Neutral', level: 'Moderate', desc: 'Fair credit history' });
  } else {
    score -= 30;
    factors.push({ name: 'Credit Score', impact: 'Negative', level: 'High Risk', desc: 'Poor credit history' });
  }

  // Debt-to-Income (DTI) Ratio = (Debt / Income) * 100
  const dti = financials.income > 0 ? (financials.debt / financials.income) * 100 : 100;
  if (dti <= 30) {
    factors.push({ name: 'Debt-to-Income', impact: 'Positive', level: 'Strong', desc: 'Low debt relative to income' });
  } else if (dti <= 50) {
    score -= 15;
    factors.push({ name: 'Debt-to-Income', impact: 'Neutral', level: 'Moderate', desc: 'Moderate debt burden' });
  } else {
    score -= 25;
    factors.push({ name: 'Debt-to-Income', impact: 'Negative', level: 'High Risk', desc: 'High debt burden' });
  }

  // Credit Utilization
  if (financials.utilization <= 30) {
    factors.push({ name: 'Credit Utilization', impact: 'Positive', level: 'Strong', desc: 'Responsible credit usage' });
  } else if (financials.utilization <= 60) {
    score -= 10;
    factors.push({ name: 'Credit Utilization', impact: 'Neutral', level: 'Moderate', desc: 'Moderate credit usage' });
  } else {
    score -= 20;
    factors.push({ name: 'Credit Utilization', impact: 'Negative', level: 'High Risk', desc: 'High credit usage' });
  }

  // Late Payments
  if (financials.latePayments === 0) {
    factors.push({ name: 'Payment History', impact: 'Positive', level: 'Strong', desc: 'No recent late payments' });
  } else if (financials.latePayments <= 2) {
    score -= 15;
    factors.push({ name: 'Payment History', impact: 'Neutral', level: 'Moderate', desc: 'Some recent late payments' });
  } else {
    score -= 30;
    factors.push({ name: 'Payment History', impact: 'Negative', level: 'High Risk', desc: 'Frequent late payments' });
  }

  // Cap score between 0 and 100
  score = Math.max(0, Math.min(100, Math.round(score)));

  let riskLevel = 'HIGH RISK';
  if (score >= 70) riskLevel = 'LOW RISK';
  else if (score >= 40) riskLevel = 'MEDIUM RISK';

  return { score, riskLevel, factors };
}
