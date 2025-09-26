import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = () => {
  const stats = [
    {
      id: 'total_reports',
      label: 'Total Reports',
      value: '23',
      change: '+3 this month',
      changeType: 'positive',
      icon: 'FileText',
      color: 'bg-blue-500'
    },
    {
      id: 'resolved_issues',
      label: 'Resolved Issues',
      value: '18',
      change: '78% resolution rate',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'bg-green-500'
    },
    {
      id: 'pending_reports',
      label: 'Pending Reports',
      value: '5',
      change: 'Avg. 2.3 days response',
      changeType: 'neutral',
      icon: 'Clock',
      color: 'bg-amber-500'
    },
    {
      id: 'community_impact',
      label: 'Community Points',
      value: '145',
      change: '+25 this week',
      changeType: 'positive',
      icon: 'Award',
      color: 'bg-purple-500'
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats?.map((stat) => (
        <div
          key={stat?.id}
          className="bg-card rounded-lg border border-border p-4 hover:shadow-elevation-1 transition-standard hover:scale-micro hover-lift tap-shrink fade-in-fast"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 ${stat?.color} rounded-lg flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} className="text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-foreground mb-1">{stat?.label}</h3>
            <p className={`text-xs ${getChangeColor(stat?.changeType)}`}>
              {stat?.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;