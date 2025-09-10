import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'waste_report',
      title: 'Waste Report Submitted',
      description: 'Reported overflowing bin at Main Street Park',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'completed',
      icon: 'AlertTriangle',
      color: 'text-warning'
    },
    {
      id: 2,
      type: 'reward_redeemed',
      title: 'Reward Redeemed',
      description: 'Eco-friendly water bottle (250 points)',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: 'completed',
      icon: 'Gift',
      color: 'text-accent'
    },
    {
      id: 3,
      type: 'training_completed',
      title: 'Training Module Completed',
      description: 'Composting Basics - Level 1',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'completed',
      icon: 'BookOpen',
      color: 'text-primary'
    },
    {
      id: 4,
      type: 'waste_contribution',
      title: 'Waste Contribution Logged',
      description: 'Added 2.5kg organic waste for composting',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'completed',
      icon: 'Recycle',
      color: 'text-success'
    },
    {
      id: 5,
      type: 'badge_earned',
      title: 'New Badge Earned',
      description: 'Eco Warrior - 50kg waste contributed',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: 'new',
      icon: 'Award',
      color: 'text-accent'
    }
  ];

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Recent Activities</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Last 7 days</span>
          <Icon name="Clock" size={16} className="text-muted-foreground" />
        </div>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted transition-colors">
            <div className={`p-2 rounded-full bg-muted ${activity?.color}`}>
              <Icon name={activity?.icon} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground truncate">
                  {activity?.title}
                </h3>
                <div className="flex items-center space-x-2">
                  {activity?.status === 'new' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                      New
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatTimestamp(activity?.timestamp)}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {activity?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full text-center text-sm text-primary hover:text-primary/80 font-medium transition-colors">
          View All Activities
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;