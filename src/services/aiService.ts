import type { FinanceData } from '../types';

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const getTopCategory = (data: FinanceData) => {
  return data.categorySpending.reduce((max, curr) =>
    curr.amount > max.amount ? curr : max,
  );
};

export const analyzeFinancialData = (data: FinanceData): string => {
  const { totalIncome, totalExpenses, totalBalance } = data;
  const topCategory = getTopCategory(data);

  return `You earned ₹${totalIncome.toLocaleString('en-IN')} and spent ₹${totalExpenses.toLocaleString('en-IN')}. Current balance is ₹${totalBalance.toLocaleString('en-IN')}. Highest spending is on ${topCategory.category} (₹${topCategory.amount.toLocaleString('en-IN')}).`;
};

export const generateAIResponse = (
  question: string,
  data: FinanceData,
): string => {
  const q = question.toLowerCase();

  const { totalIncome, totalExpenses, totalBalance, transactions } = data;
  const topCategory = getTopCategory(data);

  const expenseTxns = transactions.filter((t) => t.status === 'expense');
  const avgExpense = totalExpenses / (expenseTxns.length || 1);

  if (q.includes('balance')) {
    return `Your balance is ₹${totalBalance.toLocaleString('en-IN')}.`;
  }

  if (q.includes('spend') || q.includes('expense')) {
    return `Total expenses: ₹${totalExpenses.toLocaleString('en-IN')}. Top category: ${topCategory.category}. Avg expense: ₹${Math.round(avgExpense).toLocaleString('en-IN')}.`;
  }

  if (q.includes('income') || q.includes('earn')) {
    return `Total income: ₹${totalIncome.toLocaleString('en-IN')}.`;
  }

  if (q.includes('category')) {
    const list = data.categorySpending
      .map((c) => `${c.category}: ₹${c.amount.toLocaleString('en-IN')}`)
      .join(', ');

    return `Spending by category: ${list}.`;
  }

  if (q.includes('save') || q.includes('reduce')) {
    const top3 = [...data.categorySpending]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

    return `Reduce spending in: ${top3.map((c) => c.category).join(', ')}.`;
  }

  if (q.includes('trend')) {
    const first = data.balanceHistory[0];
    const last = data.balanceHistory[data.balanceHistory.length - 1];

    const diff = last.balance - first.balance;

    return `Balance changed from ₹${first.balance} to ₹${last.balance} (${diff > 0 ? '+' : ''}${diff}).`;
  }

  if (q.includes('recent')) {
    const recent = transactions.slice(0, 3);

    return `Recent: ${recent
      .map((t) => `${t.description} ₹${t.amount}`)
      .join(', ')}`;
  }

  //default response
  return `Balance: ₹${totalBalance.toLocaleString('en-IN')}, Income: ₹${totalIncome.toLocaleString('en-IN')}, Expenses: ₹${totalExpenses.toLocaleString('en-IN')}.`;
};
