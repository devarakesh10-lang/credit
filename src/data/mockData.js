export const mockCustomers = [
  {
    id: 'CUST-8302',
    name: 'Eleanor Vance',
    age: 34,
    employmentType: 'Full-time',
    occupation: 'Software Engineer',
    dependents: 1,
    residentialStatus: 'Renting',
    income: 8500,
    expenses: 4200,
    existingLoans: 1,
    debt: 15000,
    creditScore: 780,
    creditAccounts: 4,
    latePayments: 0,
    utilization: 15,
    history: [
      { date: '2023-01-15', riskScore: 76, riskLevel: 'LOW RISK' },
      { date: '2023-06-20', riskScore: 78, riskLevel: 'LOW RISK' },
      { date: '2023-12-10', riskScore: 82, riskLevel: 'LOW RISK' }
    ]
  },
  {
    id: 'CUST-4199',
    name: 'Marcus Thorne',
    age: 45,
    employmentType: 'Self-employed',
    occupation: 'Consultant',
    dependents: 3,
    residentialStatus: 'Mortgage',
    income: 9200,
    expenses: 6500,
    existingLoans: 3,
    debt: 120000,
    creditScore: 680,
    creditAccounts: 6,
    latePayments: 1,
    utilization: 45,
    history: [
      { date: '2022-11-05', riskScore: 65, riskLevel: 'MEDIUM RISK' },
      { date: '2023-05-12', riskScore: 62, riskLevel: 'MEDIUM RISK' },
      { date: '2023-11-28', riskScore: 58, riskLevel: 'MEDIUM RISK' }
    ]
  },
  {
    id: 'CUST-1045',
    name: 'Sarah Jenkins',
    age: 26,
    employmentType: 'Part-time',
    occupation: 'Retail Supervisor',
    dependents: 0,
    residentialStatus: 'Renting',
    income: 3200,
    expenses: 2800,
    existingLoans: 2,
    debt: 18000,
    creditScore: 590,
    creditAccounts: 3,
    latePayments: 3,
    utilization: 75,
    history: [
      { date: '2023-02-14', riskScore: 45, riskLevel: 'MEDIUM RISK' },
      { date: '2023-08-01', riskScore: 40, riskLevel: 'MEDIUM RISK' },
      { date: '2024-01-10', riskScore: 35, riskLevel: 'HIGH RISK' }
    ]
  },
  {
    id: 'CUST-9921',
    name: 'David Chen',
    age: 52,
    employmentType: 'Full-time',
    occupation: 'Medical Director',
    dependents: 2,
    residentialStatus: 'Owned',
    income: 18000,
    expenses: 7000,
    existingLoans: 1,
    debt: 45000,
    creditScore: 810,
    creditAccounts: 8,
    latePayments: 0,
    utilization: 8,
    history: [
      { date: '2023-04-20', riskScore: 88, riskLevel: 'LOW RISK' },
      { date: '2023-10-15', riskScore: 89, riskLevel: 'LOW RISK' },
      { date: '2024-03-05', riskScore: 92, riskLevel: 'LOW RISK' }
    ]
  },
  {
    id: 'CUST-5510',
    name: 'Maya Patel',
    age: 29,
    employmentType: 'Contractor',
    occupation: 'UX Designer',
    dependents: 0,
    residentialStatus: 'Renting',
    income: 5800,
    expenses: 3200,
    existingLoans: 1,
    debt: 25000,
    creditScore: 710,
    creditAccounts: 3,
    latePayments: 0,
    utilization: 35,
    history: [
      { date: '2023-03-10', riskScore: 68, riskLevel: 'MEDIUM RISK' },
      { date: '2023-09-22', riskScore: 70, riskLevel: 'LOW RISK' },
      { date: '2024-02-18', riskScore: 71, riskLevel: 'LOW RISK' }
    ]
  },
  {
    id: 'CUST-3304',
    name: 'Jackson Reed',
    age: 38,
    employmentType: 'Unemployed',
    occupation: 'Former Sales Rep',
    dependents: 2,
    residentialStatus: 'Mortgage',
    income: 2000,
    expenses: 4000,
    existingLoans: 4,
    debt: 85000,
    creditScore: 540,
    creditAccounts: 5,
    latePayments: 4,
    utilization: 88,
    history: [
      { date: '2023-01-05', riskScore: 55, riskLevel: 'MEDIUM RISK' },
      { date: '2023-07-11', riskScore: 42, riskLevel: 'MEDIUM RISK' },
      { date: '2024-01-20', riskScore: 28, riskLevel: 'HIGH RISK' }
    ]
  },
  {
    id: 'CUST-7729',
    name: 'Olivia Martinez',
    age: 31,
    employmentType: 'Full-time',
    occupation: 'Marketing Manager',
    dependents: 1,
    residentialStatus: 'Mortgage',
    income: 7500,
    expenses: 4800,
    existingLoans: 2,
    debt: 120000,
    creditScore: 740,
    creditAccounts: 5,
    latePayments: 0,
    utilization: 28,
    history: [
      { date: '2023-05-18', riskScore: 72, riskLevel: 'LOW RISK' },
      { date: '2023-11-09', riskScore: 74, riskLevel: 'LOW RISK' },
      { date: '2024-04-12', riskScore: 75, riskLevel: 'LOW RISK' }
    ]
  },
  {
    id: 'CUST-2188',
    name: 'William Foster',
    age: 41,
    employmentType: 'Self-employed',
    occupation: 'Restaurant Owner',
    dependents: 4,
    residentialStatus: 'Mortgage',
    income: 11000,
    expenses: 9500,
    existingLoans: 5,
    debt: 250000,
    creditScore: 660,
    creditAccounts: 7,
    latePayments: 1,
    utilization: 62,
    history: [
      { date: '2023-02-28', riskScore: 60, riskLevel: 'MEDIUM RISK' },
      { date: '2023-08-15', riskScore: 58, riskLevel: 'MEDIUM RISK' },
      { date: '2024-02-05', riskScore: 54, riskLevel: 'MEDIUM RISK' }
    ]
  }
];

export const getAssessmentsOverview = () => {
  let low = 0, medium = 0, high = 0;
  mockCustomers.forEach(c => {
    const latestScore = c.history[c.history.length - 1].riskLevel;
    if (latestScore === 'LOW RISK') low++;
    else if (latestScore === 'MEDIUM RISK') medium++;
    else high++;
  });
  return { total: mockCustomers.length, low, medium, high };
};
