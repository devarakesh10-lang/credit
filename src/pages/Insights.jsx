import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { mockCustomers, getAssessmentsOverview } from '../data/mockData';
import { useA11y } from '../contexts/A11yContext';

export function Insights() {
  const { highContrast } = useA11y();
  const overview = getAssessmentsOverview();

  // Risk Distribution Data
  const COLORS = highContrast ? ['#ffffff', '#cccccc', '#888888'] : ['#10b981', '#f59e0b', '#ef4444'];
  const pieData = [
    { name: 'Low Risk', value: overview.low },
    { name: 'Medium Risk', value: overview.medium },
    { name: 'High Risk', value: overview.high },
  ];

  // Averages calculation
  const totalIncome = mockCustomers.reduce((acc, curr) => acc + curr.income, 0);
  const avgIncome = totalIncome / mockCustomers.length;
  
  const totalDti = mockCustomers.reduce((acc, curr) => acc + ((curr.debt / curr.income) * 100), 0);
  const avgDti = totalDti / mockCustomers.length;

  const totalCreditScore = mockCustomers.reduce((acc, curr) => acc + curr.creditScore, 0);
  const avgCreditScore = totalCreditScore / mockCustomers.length;

  // Radar chart for average financial health
  const radarData = [
    { subject: 'Income Stability', A: 85, fullMark: 100 },
    { subject: 'Debt Burden', A: 100 - avgDti, fullMark: 100 },
    { subject: 'Credit Behavior', A: (avgCreditScore / 850) * 100, fullMark: 100 },
    { subject: 'Repayment History', A: 80, fullMark: 100 }, // Mock aggregate
    { subject: 'Credit Utilization', A: 60, fullMark: 100 }, // Mock aggregate
  ];

  // Occupation Risk Data
  const occupationRisk = [
    { name: 'Tech/IT', avgScore: 78 },
    { name: 'Medical', avgScore: 85 },
    { name: 'Retail', avgScore: 55 },
    { name: 'Self-employed', avgScore: 62 },
    { name: 'Unemployed', avgScore: 35 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Risk Analytics & Insights</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-primary-50 dark:bg-primary-900/10 border-primary-100 dark:border-primary-900/50">
          <CardContent className="p-6 text-center">
            <h3 className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-1">Avg Credit Score</h3>
            <p className="text-4xl font-bold text-primary-900 dark:text-primary-100">{Math.round(avgCreditScore)}</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/50">
          <CardContent className="p-6 text-center">
            <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">Avg Monthly Income</h3>
            <p className="text-4xl font-bold text-blue-900 dark:text-blue-100">${Math.round(avgIncome).toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/50">
          <CardContent className="p-6 text-center">
            <h3 className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-1">Avg Debt-to-Income</h3>
            <p className="text-4xl font-bold text-emerald-900 dark:text-emerald-100">{Math.round(avgDti)}%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution Pie */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'var(--tw-bg-opacity, #fff)', borderRadius: '8px', border: 'none', color: '#000' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Global Financial Health Radar */}
        <Card>
          <CardHeader>
            <CardTitle>Average Financial Health Indicators</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid strokeOpacity={0.2} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', opacity: 0.7, fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                <Radar name="Avg Health" dataKey="A" stroke={highContrast ? '#fff' : '#0ea5e9'} fill={highContrast ? '#fff' : '#0ea5e9'} fillOpacity={0.3} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'var(--tw-bg-opacity, #fff)', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#000' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Occupation vs Score */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Average Demo Risk Score by Employment Category</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={occupationRisk}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                <XAxis dataKey="name" tick={{ fill: 'currentColor', opacity: 0.7 }} />
                <YAxis domain={[0, 100]} tick={{ fill: 'currentColor', opacity: 0.7 }} />
                <RechartsTooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ backgroundColor: 'var(--tw-bg-opacity, #fff)', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#000' }}
                />
                <Bar dataKey="avgScore" fill={highContrast ? '#fff' : '#6366f1'} radius={[4, 4, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
