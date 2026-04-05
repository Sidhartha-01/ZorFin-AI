import { create } from 'zustand';
import type { FinanceData, Transaction } from '../types';

interface FinanceStore {
  data: FinanceData;
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2026-04-01',
    amount: 50000,
    category: 'Salary',
    description: 'Monthly Salary',
    status: 'income',
  },
  {
    id: '2',
    date: '2026-04-02',
    amount: 1200,
    category: 'Food',
    description: 'Lunch at Bistro',
    status: 'expense',
  },
  {
    id: '3',
    date: '2026-04-02',
    amount: 3500,
    category: 'SaaS',
    description: 'Adobe Creative Cloud',
    status: 'expense',
  },
  {
    id: '4',
    date: '2026-04-03',
    amount: 2500,
    category: 'SaaS',
    description: 'Figma Pro',
    status: 'expense',
  },
  {
    id: '5',
    date: '2026-04-03',
    amount: 1500,
    category: 'Transport',
    description: 'Uber Ride',
    status: 'expense',
  },
  {
    id: '6',
    date: '2026-04-04',
    amount: 800,
    category: 'Food',
    description: 'Coffee',
    status: 'expense',
  },
];

const calculateFinanceData = (transactions: Transaction[]): FinanceData => {
  const totalIncome = transactions
    .filter((t) => t.status === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.status === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const categoryMap: Record<string, number> = {};
  transactions
    .filter((t) => t.status === 'expense')
    .forEach((t) => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });

  const categorySpending = Object.entries(categoryMap).map(
    ([category, amount]) => ({ category, amount }),
  );

  // Mock balance history
  const balanceHistory = [
    { date: '2024-12-01', balance: 28000 },
    { date: '2025-01-01', balance: 30000 },
    { date: '2025-02-01', balance: 32000 },
    { date: '2025-03-01', balance: 31000 },
    { date: '2025-04-01', balance: 35000 },
    { date: '2025-05-01', balance: 37000 },
    { date: '2025-06-01', balance: 36000 },
    { date: '2025-07-01', balance: 40000 },
    { date: '2025-08-01', balance: 42000 },
    { date: '2025-09-01', balance: 41000 },
    { date: '2025-10-01', balance: 45000 },
    { date: '2025-11-01', balance: 47000 },
    { date: '2025-12-01', balance: 46000 },
    { date: '2026-01-01', balance: 50000 },
    { date: '2026-02-01', balance: 52000 },
    { date: '2026-03-01', balance: 54000 },
    { date: '2026-04-01', balance: 90000 },
    { date: '2026-04-02', balance: 85800 },
    { date: '2026-04-03', balance: 81800 },
    { date: '2026-04-04', balance: 81000 },
  ];

  return {
    totalBalance: totalIncome - totalExpenses,
    totalIncome,
    totalExpenses,
    transactions,
    balanceHistory,
    categorySpending,
  };
};

export const useFinanceStore = create<FinanceStore>((set) => ({
  data: calculateFinanceData(mockTransactions),

  setTransactions: (transactions) => {
    set({ data: calculateFinanceData(transactions) });
  },

  addTransaction: (transaction) => {
    set((state) => ({
      data: calculateFinanceData([...state.data.transactions, transaction]),
    }));
  },

  updateTransaction: (id, updated) => {
    set((state) => ({
      data: calculateFinanceData(
        state.data.transactions.map((t) =>
          t.id === id ? { ...t, ...updated } : t,
        ),
      ),
    }));
  },

  deleteTransaction: (id) => {
    set((state) => ({
      data: calculateFinanceData(
        state.data.transactions.filter((t) => t.id !== id),
      ),
    }));
  },
}));
