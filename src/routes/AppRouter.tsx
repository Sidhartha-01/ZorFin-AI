import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

const OverviewPage = lazy(() => import('../pages/OverviewPage'));
const TransactionsPage = lazy(() => import('../pages/TransactionsPage'));

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading ZorFin AI...</div>}>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<OverviewPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
