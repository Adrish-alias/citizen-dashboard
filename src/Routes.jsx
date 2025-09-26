import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import DashboardOverview from './pages/dashboard-overview';
import RewardsShop from './pages/rewards-shop';
import NotificationsCenter from './pages/notifications-center';
import TrainingModules from './pages/training-modules';
import ReportWasteIssues from './pages/report-waste-issues';
import PreviewPage from './pages/preview';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DashboardOverview />} />
        <Route path="/dashboard-overview" element={<DashboardOverview />} />
        <Route path="/rewards-shop" element={<RewardsShop />} />
        <Route path="/notifications-center" element={<NotificationsCenter />} />
        <Route path="/training-modules" element={<TrainingModules />} />
        <Route path="/report-waste-issues" element={<ReportWasteIssues />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/feedback" element={<DashboardOverview />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
