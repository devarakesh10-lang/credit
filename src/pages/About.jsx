import React from 'react';
import { BookOpen, ShieldCheck, PieChart, Activity, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

export function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-2xl mb-4">
          <BookOpen size={40} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">About CreditLens</h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          An educational prototype designed to demonstrate modern frontend architectures, accessibility standards, and explainable AI concepts in financial technology.
        </p>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-500 p-6 rounded-r-lg flex items-start">
        <AlertTriangle className="text-yellow-600 dark:text-yellow-500 mt-0.5 mr-4 flex-shrink-0" size={24} />
        <div>
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-400 text-lg mb-1">Important Disclaimer</h3>
          <p className="text-yellow-700 dark:text-yellow-500/80">
            CreditLens is an academic prototype and demonstration tool. The risk assessment algorithms, scores, and data are entirely fictional and for educational purposes only. <strong>This system does not make real-world lending decisions and should not be used as a basis for actual financial planning or risk assessment.</strong>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShieldCheck className="mr-2 text-emerald-500" /> What is Credit Risk?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Credit risk refers to the likelihood that a borrower will default on their financial obligations. Financial institutions use credit risk assessments to determine whether to grant a loan and at what interest rate. Key factors typically include credit history, income stability, existing debt burden, and the amount requested.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="mr-2 text-blue-500" /> Explainable AI (XAI)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
            In modern fintech, simply providing a "score" isn't enough. Explainable AI ensures that users understand <em>why</em> a specific decision was made. CreditLens demonstrates this by breaking down the demo risk score into positive, neutral, and negative factors, providing transparency that builds trust.
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 text-primary-500" /> How the Demo Assessment Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-600 dark:text-slate-400">
          <p>
            The risk assessment in this prototype uses a simplified, transparent scoring model. It starts with a base score of 100 and applies deductions based on predefined thresholds:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Credit Score:</strong> Lower traditional credit scores result in larger deductions.</li>
            <li><strong>Debt-to-Income (DTI) Ratio:</strong> A ratio above 30% indicates a heavier debt burden and lowers the score.</li>
            <li><strong>Credit Utilization:</strong> Using more than 30% of available credit negatively impacts the assessment.</li>
            <li><strong>Payment History:</strong> Recent late payments carry significant weight and reduce the overall demo score.</li>
          </ul>
          <p className="pt-2 border-t border-slate-200 dark:border-slate-800 mt-4">
            The <strong>What-If Simulator</strong> allows users to manipulate these variables in real-time, demonstrating how different financial behaviors impact the resulting risk profile.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Accessibility Standards</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-600 dark:text-slate-400">
          <p className="mb-4">
            CreditLens was built with high accessibility standards (WCAG 2.1 AA) in mind. The platform includes a dedicated Accessibility Panel that allows users to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Toggle <strong>High Contrast Mode</strong> for better readability.</li>
            <li>Increase <strong>Text Size</strong> globally across the application.</li>
            <li><strong>Reduce Motion</strong> to disable animations for users with vestibular disorders.</li>
            <li>Support for keyboard navigation and screen readers via semantic HTML and ARIA attributes.</li>
            <li>Risk indicators use a combination of color, icons, and text, never relying on color alone to convey critical information.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
