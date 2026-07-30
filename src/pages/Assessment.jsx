import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, ChevronLeft, Save } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';

const steps = [
  { id: 1, name: 'Personal Profile' },
  { id: 2, name: 'Financial Profile' },
  { id: 3, name: 'Credit Profile' },
  { id: 4, name: 'Review & Submit' }
];

export function Assessment() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    employmentType: 'Full-time',
    occupation: '',
    dependents: '0',
    residentialStatus: 'Renting',
    income: '',
    expenses: '',
    existingLoans: '0',
    debt: '',
    loanAmount: '',
    loanTenure: '12',
    creditScore: '',
    creditAccounts: '',
    latePayments: '0',
    utilization: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Navigate to result and pass form data as state
    navigate('/result', { state: { formData } });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500 py-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">New Credit Assessment</h1>
        <p className="text-slate-500 dark:text-slate-400">Complete the profile information to generate a demo risk assessment.</p>
      </div>

      {/* Progress Indicator */}
      <div className="relative">
        <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-600 transition-all duration-500 ease-in-out" 
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
        <div className="relative flex justify-between">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 transition-colors duration-300 z-10 ${
                  step.id < currentStep 
                    ? 'bg-primary-600 border-white dark:border-dark-bg text-white' 
                    : step.id === currentStep 
                      ? 'bg-white dark:bg-dark-card border-primary-600 text-primary-600' 
                      : 'bg-white dark:bg-dark-card border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500'
                }`}
              >
                {step.id < currentStep ? <Check size={18} strokeWidth={3} /> : step.id}
              </div>
              <span className={`mt-2 text-xs font-medium hidden sm:block ${
                step.id <= currentStep ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500'
              }`}>
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Customer Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required min="18" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="30" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Employment Type</label>
                <select name="employmentType" value={formData.employmentType} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent dark:bg-dark-card focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Self-employed">Self-employed</option>
                  <option value="Contractor">Contractor</option>
                  <option value="Unemployed">Unemployed</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Occupation</label>
                <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="e.g. Software Engineer" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Number of Dependents</label>
                <input type="number" name="dependents" value={formData.dependents} onChange={handleChange} min="0" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Residential Status</label>
                <select name="residentialStatus" value={formData.residentialStatus} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent dark:bg-dark-card focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="Owned">Owned outright</option>
                  <option value="Mortgage">Mortgage</option>
                  <option value="Renting">Renting</option>
                  <option value="Living with parents">Living with parents</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Monthly Income ($)</label>
                <input type="number" name="income" value={formData.income} onChange={handleChange} required min="0" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="5000" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Monthly Expenses ($)</label>
                <input type="number" name="expenses" value={formData.expenses} onChange={handleChange} required min="0" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="2000" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Existing Loans</label>
                <input type="number" name="existingLoans" value={formData.existingLoans} onChange={handleChange} min="0" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Total Current Debt ($)</label>
                <input type="number" name="debt" value={formData.debt} onChange={handleChange} required min="0" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="10000" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Loan Amount Requested ($)</label>
                <input type="number" name="loanAmount" value={formData.loanAmount} onChange={handleChange} min="0" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="15000" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Loan Tenure (Months)</label>
                <input type="number" name="loanTenure" value={formData.loanTenure} onChange={handleChange} min="1" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Credit Score</label>
                <input type="number" name="creditScore" value={formData.creditScore} onChange={handleChange} required min="300" max="850" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="720" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Number of Credit Accounts</label>
                <input type="number" name="creditAccounts" value={formData.creditAccounts} onChange={handleChange} required min="0" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="5" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Late Payments (Last 12 mo)</label>
                <input type="number" name="latePayments" value={formData.latePayments} onChange={handleChange} required min="0" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Credit Utilization (%)</label>
                <input type="number" name="utilization" value={formData.utilization} onChange={handleChange} required min="0" max="100" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="30" />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">Personal Profile</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4 text-sm">
                  <div><span className="text-slate-500 block">Name</span><span className="font-medium">{formData.name || '-'}</span></div>
                  <div><span className="text-slate-500 block">Age</span><span className="font-medium">{formData.age || '-'}</span></div>
                  <div><span className="text-slate-500 block">Employment</span><span className="font-medium">{formData.employmentType || '-'}</span></div>
                  <div><span className="text-slate-500 block">Dependents</span><span className="font-medium">{formData.dependents || '-'}</span></div>
                  <div><span className="text-slate-500 block">Residence</span><span className="font-medium">{formData.residentialStatus || '-'}</span></div>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">Financial Profile</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4 text-sm">
                  <div><span className="text-slate-500 block">Income</span><span className="font-medium">${formData.income || '0'}</span></div>
                  <div><span className="text-slate-500 block">Expenses</span><span className="font-medium">${formData.expenses || '0'}</span></div>
                  <div><span className="text-slate-500 block">Debt</span><span className="font-medium">${formData.debt || '0'}</span></div>
                  <div><span className="text-slate-500 block">Requested Loan</span><span className="font-medium">${formData.loanAmount || '0'}</span></div>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">Credit Profile</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4 text-sm">
                  <div><span className="text-slate-500 block">Credit Score</span><span className="font-medium">{formData.creditScore || '-'}</span></div>
                  <div><span className="text-slate-500 block">Utilization</span><span className="font-medium">{formData.utilization || '0'}%</span></div>
                  <div><span className="text-slate-500 block">Late Payments</span><span className="font-medium">{formData.latePayments || '0'}</span></div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t border-slate-200 dark:border-slate-800 pt-6 mt-6">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
            <ChevronLeft size={18} className="mr-1" /> Back
          </Button>
          <div className="flex space-x-2">
            <Button variant="ghost" className="text-slate-500 hidden sm:flex">
              <Save size={18} className="mr-1" /> Save Draft
            </Button>
            <Button onClick={handleNext}>
              {currentStep === steps.length ? 'Assess Credit Risk' : 'Next Step'} 
              {currentStep !== steps.length && <ChevronRight size={18} className="ml-1" />}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
