import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MetricCard from './components/MetricCard';
import ActivityFeed from './components/ActivityFeed';
import ContributionChart from './components/ContributionChart';
import NotificationBanner from './components/NotificationBanner';
import HouseholdCard from './components/HouseholdCard';
import RecentCollections from './components/RecentCollections';
import { usePoints } from '../../context/PointsContext';

const DashboardOverview = () => {
  const navigate = useNavigate();
  const { availablePoints, pointsEarnedThisMonth } = usePoints();

  const metrics = [
    {
      title: 'Total Waste Contributed',
      value: '127.5',
      unit: 'kg',
      icon: 'Recycle',
      color: 'bg-success',
      trend: { direction: 'up', value: 12 },
      onClick: () => navigate('/report-waste-issues')
    },
    {
      title: 'Points Earned This Month',
      value: pointsEarnedThisMonth?.toLocaleString(),
      unit: 'pts',
      icon: 'Star',
      color: 'bg-accent',
      trend: { direction: 'up', value: 8 },
      onClick: () => navigate('/rewards-shop')
    },
    {
      title: 'Badges Unlocked',
      value: '7',
      unit: 'badges',
      icon: 'Award',
      color: 'bg-primary',
      trend: { direction: 'up', value: 2 },
      onClick: () => navigate('/training-modules')
    },
    {
      title: 'Training Progress',
      value: '75',
      unit: '%',
      icon: 'BookOpen',
      color: 'bg-secondary',
      progress: 75,
      onClick: () => navigate('/training-modules')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, Citizen User!
          </h1>
          <p className="text-muted-foreground">
            Track your environmental impact and continue making a difference in your community.
          </p>
        </div>

        {/* Notification Banner */}
        <NotificationBanner />

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics?.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric?.title}
              value={metric?.value}
              unit={metric?.unit}
              icon={metric?.icon}
              color={metric?.color}
              progress={metric?.progress}
              trend={metric?.trend}
              onClick={metric?.onClick}
            />
          ))}
        </div>

        {/* Household Card - Full width */}
        <div className="mb-8">
          <HouseholdCard />
        </div>

        {/* Contribution Chart - Full width */}
        <div className="mb-8">
          <ContributionChart />
        </div>

        {/* Activity Feed - Full width */}
        <div className="mb-8">
          <ActivityFeed />
        </div>

        {/* Recent Collections - Full width */}
        <div className="mb-8">
          <RecentCollections />
        </div>

        {/* Environmental Impact Summary */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Environmental Impact Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
              <div className="text-2xl font-bold text-success mb-1">2.3 tons</div>
              <div className="text-sm text-muted-foreground">CO₂ Emissions Prevented</div>
            </div>
            
            <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-2xl font-bold text-primary mb-1">89%</div>
              <div className="text-sm text-muted-foreground">Proper Segregation Rate</div>
            </div>
            
            <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
              <div className="text-2xl font-bold text-accent mb-1">15</div>
              <div className="text-sm text-muted-foreground">Community Reports Submitted</div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Your contributions have helped make your community cleaner and more sustainable. 
              Keep up the great work!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardOverview;