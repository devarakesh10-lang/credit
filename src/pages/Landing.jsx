import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Activity, LineChart, ChevronRight, Info } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

export function Landing() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-slate-100 flex flex-col relative overflow-hidden transition-colors duration-200">
      
      {/* Abstract Background Visualization */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-400/10 dark:bg-primary-900/20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/10 dark:bg-blue-900/20 blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <nav className="relative z-10 w-full px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="bg-primary-600 text-white p-1.5 rounded-lg shadow-sm">
            <ShieldCheck size={28} />
          </div>
          <span className="text-2xl font-bold tracking-tight">Credit<span className="text-primary-600 dark:text-primary-400">Lens</span></span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
            About Project
          </Link>
          <Link to="/dashboard">
            <Button size="sm">Go to Dashboard</Button>
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8 pt-12 pb-24 max-w-7xl mx-auto w-full">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900/40 dark:text-primary-300 text-sm font-medium mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary-600 dark:bg-primary-400 mr-2"></span>
            Educational Prototype v1.0
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Understand Credit Risk. <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600 dark:from-primary-400 dark:to-blue-400">
              Make Smarter Decisions.
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            An intelligent customer credit risk assessment prototype that transforms financial information into clear, explainable risk insights.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/assessment">
              <Button size="lg" className="w-full sm:w-auto group">
                Start Assessment
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Explore Demo Dashboard
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-6 mt-20 w-full max-w-5xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Card className="h-full hover:shadow-md transition-shadow dark:hover:border-slate-700">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                  <Activity size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Risk Score Analysis</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Evaluates multiple financial data points to calculate a comprehensive demo risk score based on transparent algorithms.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="h-full hover:shadow-md transition-shadow dark:hover:border-slate-700">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Explainable Assessment</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Moving beyond black-box AI by providing clear, visual explanations of the exact factors that contributed to the final assessment.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="h-full hover:shadow-md transition-shadow dark:hover:border-slate-700">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                  <LineChart size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Customer Financial Insights</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Interactive what-if simulations and financial health snapshots that help visualize how changes impact overall risk profiles.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 py-3 px-6 rounded-full inline-flex items-center max-w-fit mx-auto"
        >
          <Info size={16} className="mr-2 flex-shrink-0" />
          <span>Educational prototype — not intended for real-world lending decisions.</span>
        </motion.div>
      </main>
    </div>
  );
}
