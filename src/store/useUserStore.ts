import { create } from 'zustand';
import type { UserRole, UserState } from '../types';

export const useUserStore = create<UserState>((set) => ({
  role: 'Admin',
  setRole: (role: UserRole) => set({ role }),
}));
