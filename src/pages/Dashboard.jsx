import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { ShieldAlert, ShieldCheck, AlertTriangle, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { RiskBadge } from '../components/ui/RiskBadge';
import { mockCustomers, getAssessmentsOverview } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { useA11y } from '../contexts/A11yContext';

export function Dashboard() {
  const overview = getAssessmentsOverview();
  const { highContrast } = useA11y();

  const chartData = [
    { name: 'Low Risk', value: overview.low, color: highContrast ? '#fff' : '#10b981' },
    { name: 'Medium Risk', value: overview.medium, color: highContrast ? '#ccc' : '#f59e0b' },
    { name: 'High Risk', value: overview.high, color: highContrast ? '#888' : '#ef4444' },
  ];

  const recentAssessments = mockCustomers.slice(0, 5).map(customer => {
    const latest = customer.history[customer.history.length - 1];
    return {
      id: customer.id,
      name: customer.name,
      income: customer.income,
      creditScore: customer.creditScore,
      dti: ((customer.debt / customer.income) * 100).toFixed(1),
      riskLevel: latest.riskLevel,
      date: latest.date,
    };
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <Link to="/assessment">
          <Button>New Assessment</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Assessments</p>
              <p className="text-3xl font-bold mt-1">{overview.total}</p>
            </div>
            <div className="h-12 w-12 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center">
              <Users size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Low Risk</p>
              <p className="text-3xl font-bold mt-1">{overview.low}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Medium Risk</p>
              <p className="text-3xl font-bold mt-1">{overview.medium}</p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full flex items-center justify-center">
              <AlertTriangle size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">High Risk</p>
              <p className="text-3xl font-bold mt-1">{overview.high}</p>
            </div>
            <div className="h-12 w-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center">
              <ShieldAlert size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center h-72 pb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" tick={{ fill: 'currentColor', opacity: 0.7 }} />
                <YAxis tick={{ fill: 'currentColor', opacity: 0.7 }} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ backgroundColor: 'var(--tw-bg-opacity, #fff)', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#000' }} 
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Assessments</CardTitle>
            <Link to="/customers" className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center">
              View all <ArrowRight size={16} className="ml-1" />
            </Link>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-3 font-medium">Customer ID</th>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Income/mo</th>
                  <th className="px-6 py-3 font-medium">Credit Score</th>
                  <th className="px-6 py-3 font-medium">DTI %</th>
                  <th className="px-6 py-3 font-medium">Risk Level</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {recentAssessments.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{item.id}</td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">${item.income.toLocaleString()}</td>
                    <td className="px-6 py-4">{item.creditScore}</td>
                    <td className="px-6 py-4">{item.dti}%</td>
                    <td className="px-6 py-4">
                      <RiskBadge level={item.riskLevel} />
                    </td>
                    <td className="px-6 py-4 text-slate-500">{item.date}</td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/customers/${item.id}`}>
                        <Button variant="ghost" size="sm">View</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
