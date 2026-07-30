import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { RiskBadge } from '../components/ui/RiskBadge';
import { mockCustomers } from '../data/mockData';

export function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('ALL');

  const filteredCustomers = mockCustomers.filter(c => {
    const latestRisk = c.history[c.history.length - 1].riskLevel;
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === 'ALL' || latestRisk === filterRisk;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Search customers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-dark-card focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="relative">
            <select 
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="appearance-none pl-10 pr-8 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-dark-card focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="LOW RISK">Low Risk</option>
              <option value="MEDIUM RISK">Medium Risk</option>
              <option value="HIGH RISK">High Risk</option>
            </select>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <Filter size={18} />
            </div>
          </div>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4 font-medium">Customer ID</th>
                <th className="px-6 py-4 font-medium">Customer Name</th>
                <th className="px-6 py-4 font-medium">Employment</th>
                <th className="px-6 py-4 font-medium">Income/mo</th>
                <th className="px-6 py-4 font-medium">Debt</th>
                <th className="px-6 py-4 font-medium">Credit Score</th>
                <th className="px-6 py-4 font-medium">Risk Level</th>
                <th className="px-6 py-4 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map(item => {
                  const latestRisk = item.history[item.history.length - 1].riskLevel;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{item.id}</td>
                      <td className="px-6 py-4 font-semibold">{item.name}</td>
                      <td className="px-6 py-4 text-slate-500">{item.employmentType}</td>
                      <td className="px-6 py-4">${item.income.toLocaleString()}</td>
                      <td className="px-6 py-4">${item.debt.toLocaleString()}</td>
                      <td className="px-6 py-4">{item.creditScore}</td>
                      <td className="px-6 py-4">
                        <RiskBadge level={latestRisk} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link to={`/customers/${item.id}`}>
                          <Button variant="ghost" size="sm" className="w-full sm:w-auto">
                            Profile <ArrowRight size={16} className="ml-1" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-slate-500">
                    No customers found matching the search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
