import { create } from 'zustand';
import type { FinanceData, Transaction } from '../types';

interface FinanceStore {
  data: FinanceData;
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
}

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
    { date: '2026-03-28', balance: 42000 },
    { date: '2026-03-29', balance: 41500 },
    { date: '2026-03-30', balance: 41000 },
    { date: '2026-03-31', balance: 40500 },
    { date: '2026-04-01', balance: 90500 },
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
