import { create } from 'zustand';
import type { AIInsight } from '../types';
import type { AIMessage } from '../services/aiService';
import { generateAIResponse } from '../services/aiService';
import { useFinanceStore } from './useFinanceStore';

interface AIStore {
  insights: AIInsight[];
  messages: AIMessage[];
  isGenerating: boolean;
  addInsight: (insight: AIInsight) => void;
  setGenerating: (status: boolean) => void;
  addMessage: (message: AIMessage) => void;
  askQuestion: (question: string) => Promise<void>;
  clearMessages: () => void;
}

export const useAIStore = create<AIStore>((set) => ({
  insights: [
    {
      id: '1',
      type: 'alert',
      content:
        'ZorFin AI detected 3 overlapping SaaS subscriptions. Save ₹3,500/month by consolidating.',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      type: 'tip',
      content:
        'Your spending on Dining Out is 15% higher than last month. Consider setting a budget.',
      timestamp: new Date().toISOString(),
    },
  ],
  messages: [],
  isGenerating: false,

  addInsight: (insight) =>
    set((state) => ({ insights: [insight, ...state.insights] })),

  setGenerating: (status) => set({ isGenerating: status }),

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  askQuestion: async (question: string) => {
    const financeData = useFinanceStore.getState().data;

    // Add user message
    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
      timestamp: new Date().toISOString(),
    };

    set((state) => ({
      messages: [...state.messages, userMessage],
      isGenerating: true,
    }));

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Generate AI response
    const responseContent = generateAIResponse(question, financeData);

    const aiMessage: AIMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseContent,
      timestamp: new Date().toISOString(),
    };

    set((state) => ({
      messages: [...state.messages, aiMessage],
      isGenerating: false,
    }));
  },

  clearMessages: () => set({ messages: [] }),
}));
