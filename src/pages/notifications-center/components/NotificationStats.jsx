import React from 'react';
import Icon from '../../../components/AppIcon';

const NotificationStats = ({ stats }) => {
  const statCards = [
    {
      label: 'Total Notifications',
      value: stats?.total,
      icon: 'Bell',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Unread',
      value: stats?.unread,
      icon: 'Circle',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Achievements',
      value: stats?.achievements,
      icon: 'Award',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Reminders',
      value: stats?.reminders,
      icon: 'Clock',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-all duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat?.bgColor}`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
              <p className="text-sm text-muted-foreground">{stat?.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationStats;