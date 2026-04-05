export type TransactionStatus = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  status: TransactionStatus;
}

export interface FinanceData {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  transactions: Transaction[];
  balanceHistory: { date: string; balance: number }[];
  categorySpending: { category: string; amount: number }[];
}

export type UserRole = 'Admin' | 'Viewer';

export interface UserState {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

export interface AIInsight {
  id: string;
  type: 'alert' | 'tip' | 'summary';
  content: string;
  timestamp: string;
}
