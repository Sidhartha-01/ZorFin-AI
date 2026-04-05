# ZorFin AI - Financial Management Dashboard

A modern, AI-powered financial management application built with React, TypeScript, and Vite. ZorFin AI provides comprehensive financial tracking, analysis, and intelligent insights powered by advanced AI capabilities.

![ZorFin AI Dashboard]

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Role-Based Access Control](#role-based-access-control)
- [API Integration](#api-integration)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)

---

## 🎯 Overview

**ZorFin AI** is a sophisticated financial management dashboard that combines real-time transaction tracking with AI-powered financial insights. Built with a focus on user experience and accessibility, it provides both Admins and Viewers with role-based access to financial data.

### Key Highlights:
- 💰 Real-time financial tracking
- 🤖 AI-powered financial insights
- 📊 Beautiful data visualizations
- 📱 Fully responsive design
- 🔐 Role-based access control
- 🎨 Dark mode UI with Zorvyn branding

---

## ✨ Key Features

### 1. **Dashboard Overview**
- Real-time balance tracking
- Income vs. Expense analysis
- 30-day, 90-day, 6-month, 1-year, and lifetime balance trends
- Category-wise spending breakdown with pie charts

### 2. **Transaction Management**
- Complete transaction ledger with search and filter
- Add, edit, and delete transactions (Admin only)
- Sort by date or amount
- Filter by category
- Batch operations support

### 3. **AI Assistant**
- Natural language financial Q&A
- Intelligent spending analysis
- Savings recommendations
- Transaction summaries
- Income tracking insights
- Category-based spending patterns

### 4. **Statistical Cards**
- Total Balance
- Total Income
- Total Expenses
- Real-time calculations

### 5. **Role-Based Access**
- **Admin**: Full access to all features
- **Viewer**: Read-only access, no AI chatbot

---

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Ant Design** - UI component library
- **@ant-design/plots** - Data visualization
- **TailwindCSS** - Utility-first CSS
- **SASS/SCSS** - Advanced styling

### State Management
- **Zustand** - Simple state management
- **React Router v6** - Client-side routing

### Development Tools
- **ESLint** - Code linting
- **dayjs** - Date manipulation
- **Vite Plugins** - React, TypeScript support

### Dependencies
```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "zustand": "^4.x",
    "antd": "^5.x",
    "@ant-design/icons": "^5.x",
    "@ant-design/plots": "^1.x",
    "dayjs": "^1.x",
    "clsx": "^2.x",
  }
}
```

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/Sidhartha-01/ZorFin-AI.git
cd zorfin_ai
```

### Step 2: Install Dependencies
```bash
npm install

```

### Step 3: Environment Setup
Create a `.env.local` file in the root directory:
```env
VITE_API_URL=http://localhost:3003
VITE_APP_NAME=ZorFin AI
VITE_APP_VERSION=0.0.0
```

### Step 4: Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3003`

### Step 5: Build for Production
```bash
npm run build
```

### Step 6: Preview Production Build
```bash
npm run preview
```

---

## ⚙️ Configuration

### Vite Configuration
The app is configured in `vite.config.ts`:
- Port: 3003
- API proxy setup for future backend integration
- React Fast Refresh enabled
- TypeScript support

### SCSS Variables
Customize colors and spacing in `src/styles/variables.scss`:
```scss
$primary-color: #3b82f6; // Blue
$secondary-color: #0ea5e9; // Cyan
$background-dark: #0b0f17; // Deep Navy
$surface-dark: #161b22; // Surface
$text-primary: #f8fafc; // Light Text
$text-secondary: #94a3b8; // Secondary Text
```

### Ant Design Theme
Dark theme configuration in `src/App.tsx`:
```tsx
theme={{
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#3b82f6',
    borderRadius: 12,
    fontFamily: 'Sora, system-ui, sans-serif',
    colorBgContainer: '#161b22',
    colorBgLayout: '#0b0f17',
    colorBorder: '#30363d',
  }
}}
```

---

## 📁 Project Structure

```
src/
├── api-client/           # API integration
│   └── services/         # API service functions
├── assets/               # Static assets
├── components/           # Reusable React components
│   ├── AIChatBox.tsx     # AI Assistant component
│   ├── AIChatBox.scss    # AI chatbot styles
│   ├── HeaderBar.tsx     # Top navigation bar
│   ├── HeaderBar.scss    # Header styles
│   ├── Sidebar.tsx       # Side navigation
│   ├── Sidebar.scss      # Sidebar styles
│   ├── StatCard.tsx      # Statistics card
│   ├── StatCard.scss     # Stat card styles
│   ├── TransactionModal.tsx
│   ├── ZorfinCard.tsx    # Custom card component
│   └── ZorfinCard.scss   # Card styles
├── hooks/                # Custom React hooks
├── layouts/              # Layout components
│   ├── DashboardLayout.tsx
│   └── DashboardLayout.scss
├── pages/                # Page components
│   ├── AIPage.tsx        # Dedicated AI page
│   ├── AIPage.scss       # AI page styles
│   ├── OverviewPage.tsx  # Dashboard overview
│   ├── OverviewPage.scss # Overview styles
│   ├── TransactionsPage.tsx
│   └── TransactionsPage.scss
├── routes/               # Routing configuration
│   └── AppRouter.tsx     # Route definitions
├── services/             # Business logic
│   └── aiService.ts      # AI response generation
├── store/                # Zustand stores
│   ├── useAIStore.ts     # AI state management
│   ├── useFinanceStore.ts# Finance state
│   └── useUserStore.ts   # User role management
├── styles/               # Global styles
│   ├── main.scss         # Main stylesheet
│   ├── variables.scss    # Design tokens
│   └── _utilities.scss   # Utility classes
├── types/                # TypeScript types
│   └── index.ts          # Shared type definitions
├── utils/                # Utility functions
│   └── index.ts          # Helper functions
├── App.tsx               # Root component
├── index.scss            # Global imports
└── main.tsx              # Entry point
```

---

## 📖 Usage Guide

### Accessing the Dashboard

#### 1. **Overview Page** (Home)
Navigate to `/` or click "Overview" in sidebar
- View real-time financial statistics
- See balance trends with date range filters (1M, 3M, 6M, 1Y, MAX)
- Check AI insights and alerts
- Browse recent transactions
- Click "View All" to see full transaction list

#### 2. **Transactions Page**
Navigate to `/transactions` or click "Transactions" in sidebar
- View all transactions in a searchable table
- **Search**: By description or category
- **Filter**: By category using column filters
- **Sort**: By date or amount
- **Admin Only**: Add, edit, or delete transactions
- Pagination support (4 items per page)

#### 3. **AI Assistant Page**
Navigate to `/ai` or click "AI Assistant" in sidebar
- **Admins**: Full access to ask questions and get insights
- **Viewers**: See permission message
- Ask about:
  - Current balance
  - Spending patterns
  - Income analysis
  - Savings recommendations
  - Transaction summaries
  - Financial trends

### Example AI Questions
```
"What's my current balance?"
"Where do I spend the most?"
"How much did I earn this month?"
"What categories am I spending on?"
"How can I save more money?"
"Show me my financial trends"
"What are my recent transactions?"
```

---

## 🔐 Role-Based Access Control

### Admin Role
**Access Level**: Full Control
- ✅ View all financial data
- ✅ Add transactions
- ✅ Edit transactions
- ✅ Delete transactions
- ✅ Use AI Assistant
- ✅ Ask financial questions
- ✅ Clear chat history
- ✅ Access all reports

### Viewer Role
**Access Level**: Read-Only
- ✅ View financial data
- ✅ View transactions
- ✅ Search and filter transactions
- ❌ Add transactions
- ❌ Edit transactions
- ❌ Delete transactions
- ❌ Use AI Assistant
- ❌ Ask financial questions

### Switching Roles
The `useUserStore` manages the current role. Default role is 'Admin'.

To switch roles during development, update `src/store/useUserStore.ts`:
```typescript
export const useUserStore = create<UserState>((set) => ({
  role: 'Admin', // Change to 'Viewer' for testing
  setRole: (role: UserRole) => set({ role }),
}));
```

---

## 🤖 API Integration

### Current Implementation
The app uses local state management with mock data. The AI responses are generated client-side using the `aiService.ts` utility.

### AI Service (`src/services/aiService.ts`)

**Core Functions**:
1. **`analyzeFinancialData(data)`** - Generates financial overview
2. **`generateAIResponse(question, financeData)`** - Intelligent Q&A engine

**Features**:
- Keyword-based question analysis
- Real-time financial calculations
- Contextual responses based on user data
- Spending pattern analysis
- Savings recommendations

### State Management (`src/store/useAIStore.ts`)

**Methods**:
- `askQuestion(question)` - Process user question and generate response
- `addMessage(message)` - Add message to conversation
- `clearMessages()` - Clear chat history
- `setGenerating(status)` - Update loading state

### Data Structures

**AIMessage Interface**:
```typescript
interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
```

**FinanceData Interface**:
```typescript
interface FinanceData {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  transactions: Transaction[];
  balanceHistory: { date: string; balance: number }[];
  categorySpending: { category: string; amount: number }[];
}
```

### Future Gemini Integration
To integrate Google's Gemini API:

1. **Install Gemini SDK**:
```bash
npm install @google/generative-ai
```

2. **Update aiService.ts**:
```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

export const generateAIResponse = async (question: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(question);
  return result.response.text();
};
```

3. **Add Environment Variable**:
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. **Port 3003 Already in Use**
```bash
# Kill process on port 3003
# Windows
netstat -ano | findstr :3003
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3003 | xargs kill -9
```

#### 2. **SASS Compilation Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 3. **TypeScript Errors**
```bash
# Rebuild TypeScript
npm run build
```

#### 4. **Style Not Applying**
- Check SCSS variable names in `src/styles/variables.scss`
- Ensure @use directive is correct: `@use '../styles/variables' as *;`
- Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)

#### 5. **AI Chatbot Not Working**
- Check user role is 'Admin' in `useUserStore.ts`
- Verify store initialization in `useAIStore.ts`
- Check browser console for JavaScript errors

---

## 📊 Mock Data

The app includes mock transaction data for demonstration:

**Transaction Categories**:
- Salary (Income)
- Food & Dining
- SaaS Subscriptions
- Transport
- Utilities
- Entertainment
- Health
- Other

**Sample Data Range**: March 28 - April 4, 2026

Modify mock data in `src/store/useFinanceStore.ts` to test with different scenarios.

---

## 🔄 State Management

### Zustand Stores

#### 1. **useFinanceStore**
Manages financial data and transactions
```typescript
const { data, addTransaction, updateTransaction, deleteTransaction } = useFinanceStore();
```

#### 2. **useAIStore**
Manages AI conversations and insights
```typescript
const { messages, askQuestion, clearMessages, isGenerating } = useAIStore();
```

#### 3. **useUserStore**
Manages user role and permissions
```typescript
const { role, setRole } = useUserStore();
```

---

## 📱 Responsive Design

The app is fully responsive across all device sizes:

**Breakpoints**:
- **Mobile**: < 640px
- **Tablet**: 640px - 1023px
- **Desktop**: 1024px+

**Adaptive Features**:
- Grid layouts dynamically adjust columns
- Font sizes scale based on viewport
- Spacing and padding optimized for each device
- Touch-friendly button sizes on mobile
- Scrollable tables on small screens

---

## 🚀 Performance Optimizations

- **Code Splitting**: Dynamic imports for pages
- **Lazy Loading**: Components load on demand
- **Tree Shaking**: Unused code removed in builds
- **SCSS Compilation**: Cached for faster rebuilds
- **React Fast Refresh**: Instant module updates
- **Vite**: Ultra-fast build tool

---

## 📝 Development Workflow

### 1. Create New Component
```bash
# Create component file with SCSS
touch src/components/MyComponent.tsx
touch src/components/MyComponent.scss
```

### 2. Add State Management
Update appropriate Zustand store in `src/store/`

### 3. Create New Page
```bash
# Create page with styles
touch src/pages/MyPage.tsx
touch src/pages/MyPage.scss
```

### 4. Add Route
Update `src/routes/AppRouter.tsx`

### 5. Test & Build
```bash
npm run dev      # Test locally
npm run build    # Build for production
npm run preview  # Preview build
```

---

## 🤝 Contributing

### Code Style
- Follow existing TypeScript patterns
- Use semantic HTML
- Keep components focused and reusable
- Document complex logic with comments

### SCSS Standards
- Use SCSS variables for colors and spacing
- Follow BEM naming convention
- Include media queries for responsiveness
- Keep styles modular and organized

### Commit Messages
```
feat: Add new AI capability
fix: Resolve transaction sorting bug
style: Update color palette
docs: Update README
refactor: Reorganize state management
```

---

## 🔮 Future Enhancements

### Short Term
- [ ] Real backend API integration
- [ ] User authentication (Firebase/Auth0)
- [ ] Export transaction data (CSV/PDF)
- [ ] Budget setting and tracking
- [ ] Monthly financial reports

### Medium Term
- [ ] Bank account integration
- [ ] Recurring transactions
- [ ] Receipt image upload
- [ ] Mobile app (React Native)
- [ ] Push notifications

### Long Term
- [ ] Gemini API integration
- [ ] Predictive spending analysis
- [ ] Investment portfolio tracking
- [ ] Multi-currency support
- [ ] Real-time market data
- [ ] Advanced analytics dashboard
- [ ] Machine learning models

---

## 📄 License

This project is part of the Zorvyn Assignment. All rights reserved.

---

## 👨‍💻 Author

**Sidhartha**
- GitHub: [@Sidhartha-01](https://github.com/Sidhartha-01)
- Project: ZorFin AI Financial Dashboard

---

## 🆘 Support

For issues, feature requests, or questions:
1. Check existing issues on GitHub
2. Create a detailed issue with reproduction steps
3. Include screenshots/error messages
4. Specify your environment (Node version, OS, browser)

Last Updated: April 5, 2026
