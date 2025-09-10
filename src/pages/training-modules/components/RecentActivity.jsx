import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'completed':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'started':
        return { name: 'Play', color: 'text-primary' };
      case 'quiz_passed':
        return { name: 'Award', color: 'text-accent' };
      case 'badge_earned':
        return { name: 'Star', color: 'text-warning' };
      default:
        return { name: 'Activity', color: 'text-muted-foreground' };
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Clock" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
      </div>
      <div className="space-y-4">
        {activities?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No recent activity</p>
            <p className="text-sm text-muted-foreground">Start a module to see your progress here</p>
          </div>
        ) : (
          activities?.map((activity) => {
            const icon = getActivityIcon(activity?.type);
            return (
              <div key={activity?.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0`}>
                  <Icon name={icon?.name} size={16} className={icon?.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity?.title}</p>
                  <p className="text-sm text-muted-foreground">{activity?.description}</p>
                  {activity?.points && (
                    <div className="flex items-center space-x-1 mt-1">
                      <Icon name="Plus" size={12} className="text-accent" />
                      <span className="text-xs text-accent font-medium">{activity?.points} points</span>
                    </div>
                  )}
                </div>
                <div className="text-xs text-muted-foreground flex-shrink-0">
                  {formatTimeAgo(activity?.timestamp)}
                </div>
              </div>
            );
          })
        )}
      </div>
      {activities?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200">
            View all activity
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;