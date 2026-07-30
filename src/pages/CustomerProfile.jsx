import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, Calendar, Users, Activity } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { RiskBadge } from '../components/ui/RiskBadge';
import { mockCustomers } from '../data/mockData';
import { useA11y } from '../contexts/A11yContext';
import { calculateRiskScore } from '../utils/utils';

export function CustomerProfile() {
  const { id } = useParams();
  const { highContrast } = useA11y();
  
  const customer = mockCustomers.find(c => c.id === id);
  
  if (!customer) {
    return <Navigate to="/customers" replace />;
  }

  // Calculate current factors
  const currentResult = calculateRiskScore(customer);

  const chartData = customer.history.map(h => ({
    date: h.date,
    score: h.riskScore
  }));

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex items-center space-x-4 mb-6">
        <Link to="/customers">
          <Button variant="ghost" size="sm" className="px-2">
            <ArrowLeft size={18} className="mr-1" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{customer.name}</h1>
          <p className="text-slate-500 dark:text-slate-400">ID: {customer.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Personal Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300">
              <Calendar size={18} className="text-slate-400" />
              <span>{customer.age} years old</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300">
              <Briefcase size={18} className="text-slate-400" />
              <span>{customer.occupation} ({customer.employmentType})</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300">
              <MapPin size={18} className="text-slate-400" />
              <span>{customer.residentialStatus}</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300">
              <Users size={18} className="text-slate-400" />
              <span>{customer.dependents} Dependents</span>
            </div>
          </CardContent>
        </Card>

        {/* Financial Summary */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-center">
                <p className="text-sm text-slate-500 mb-1">Monthly Income</p>
                <p className="text-xl font-bold">${customer.income.toLocaleString()}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-center">
                <p className="text-sm text-slate-500 mb-1">Total Debt</p>
                <p className="text-xl font-bold">${customer.debt.toLocaleString()}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-center">
                <p className="text-sm text-slate-500 mb-1">Credit Score</p>
                <p className="text-xl font-bold">{customer.creditScore}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-center">
                <p className="text-sm text-slate-500 mb-1">Utilization</p>
                <p className="text-xl font-bold">{customer.utilization}%</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-900/50 rounded-xl">
              <div>
                <h4 className="font-semibold text-primary-900 dark:text-primary-100">Current Risk Level</h4>
                <p className="text-sm text-primary-700 dark:text-primary-300">Based on latest assessment</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-2xl font-black text-slate-900 dark:text-white mb-1">{currentResult.score}/100</span>
                <RiskBadge level={currentResult.riskLevel} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assessment Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Assessment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {customer.history.slice().reverse().map((h, i) => (
                <div key={i} className="flex relative pb-6 last:pb-0">
                  {i !== customer.history.length - 1 && (
                    <div className="absolute top-8 bottom-0 left-[19px] w-0.5 bg-slate-200 dark:bg-slate-700"></div>
                  )}
                  <div className="mr-4 mt-1 z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white dark:border-dark-card ${i === 0 ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                      <Activity size={18} />
                    </div>
                  </div>
                  <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">Assessment 0{customer.history.length - i}</h4>
                      <span className="text-xs text-slate-500">{h.date}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">{h.riskScore}/100</span>
                      <RiskBadge level={h.riskLevel} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Score Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Score Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                <XAxis dataKey="date" tick={{ fill: 'currentColor', opacity: 0.7 }} tickMargin={10} />
                <YAxis domain={[0, 100]} tick={{ fill: 'currentColor', opacity: 0.7 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--tw-bg-opacity, #fff)', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#000' }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke={highContrast ? '#fff' : '#0ea5e9'} 
                  strokeWidth={3}
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
