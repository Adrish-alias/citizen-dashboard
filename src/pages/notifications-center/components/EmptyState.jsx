import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ filter, onResetFilters }) => {
  const getEmptyStateContent = (filter) => {
    switch (filter) {
      case 'unread':
        return {
          icon: 'CheckCircle',
          title: 'All caught up!',
          description: 'You have no unread notifications. Great job staying on top of things!',
          action: null
        };
      case 'achievement':
        return {
          icon: 'Award',
          title: 'No achievements yet',
          description: 'Complete training modules and contribute to waste management to earn achievement notifications.',
          action: { label: 'Start Learning', path: '/training-modules' }
        };
      case 'reminder':
        return {
          icon: 'Clock',
          title: 'No reminders',
          description: 'You have no pending reminders. Check back later for updates.',
          action: null
        };
      case 'system':
        return {
          icon: 'Settings',
          title: 'No system alerts',
          description: 'No system notifications at this time. We\'ll notify you of any important updates.',
          action: null
        };
      default:
        return {
          icon: 'Bell',
          title: 'No notifications',
          description: 'You don\'t have any notifications yet. Start participating in waste management activities to receive updates.',
          action: { label: 'Go to Dashboard', path: '/dashboard-overview' }
        };
    }
  };

  const content = getEmptyStateContent(filter);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name={content?.icon} size={32} className="text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {content?.title}
      </h3>
      <p className="text-muted-foreground text-center max-w-md mb-6 leading-relaxed">
        {content?.description}
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        {content?.action && (
          <Button
            variant="default"
            onClick={() => window.location.href = content?.action?.path}
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={16}
          >
            {content?.action?.label}
          </Button>
        )}
        
        {filter !== 'all' && (
          <Button
            variant="outline"
            onClick={onResetFilters}
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
          >
            Show All Notifications
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;