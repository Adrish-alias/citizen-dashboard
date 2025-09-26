import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCard = ({ notification, onMarkAsRead, onArchive, onAction }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'achievement':
        return 'Award';
      case 'reminder':
        return 'Clock';
      case 'system':
        return 'Settings';
      default:
        return 'Bell';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'achievement':
        return 'text-success';
      case 'reminder':
        return 'text-warning';
      case 'system':
        return 'text-secondary';
      default:
        return 'text-muted-foreground';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'Info';
      case 'low':
        return 'Circle';
      default:
        return null;
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className={`
      bg-card border border-border rounded-lg p-4 transition-all duration-200
      hover:shadow-elevation-1 hover:border-primary/20
      ${!notification?.read ? 'border-l-4 border-l-primary bg-primary/5' : ''}
    `}>
      <div className="flex items-start space-x-3">
        {/* Type Icon */}
        <div className={`
          flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
          ${notification?.type === 'achievement' ? 'bg-success/10' : ''}
          ${notification?.type === 'reminder' ? 'bg-warning/10' : ''}
          ${notification?.type === 'system' ? 'bg-secondary/10' : ''}
        `}>
          <Icon 
            name={getTypeIcon(notification?.type)} 
            size={20} 
            className={getTypeColor(notification?.type)}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className={`text-sm font-semibold ${!notification?.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {notification?.title}
                </h3>
                {notification?.priority && getPriorityIcon(notification?.priority) && (
                  <Icon 
                    name={getPriorityIcon(notification?.priority)} 
                    size={14} 
                    className={`
                      ${notification?.priority === 'high' ? 'text-error' : ''}
                      ${notification?.priority === 'medium' ? 'text-warning' : ''}
                      ${notification?.priority === 'low' ? 'text-muted-foreground' : ''}
                    `}
                  />
                )}
                {!notification?.read && (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                {notification?.content}
              </p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>{formatTimestamp(notification?.timestamp)}</span>
                <span className="capitalize">{notification?.type}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-1 ml-4">
              {!notification?.read && (
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => onMarkAsRead(notification?.id)}
                  iconName="Check"
                  iconSize={14}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Mark Read
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onArchive(notification?.id)}
                iconName="Archive"
                iconSize={14}
                className="text-muted-foreground hover:text-foreground w-8 h-8"
              >
                <span className="sr-only">Archive notification</span>
              </Button>
            </div>
          </div>

          {/* Action Button */}
          {notification?.actionButton && (
            <div className="mt-3 pt-3 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAction(notification?.actionButton?.action, notification?.actionButton?.data)}
                iconName={notification?.actionButton?.icon}
                iconPosition="left"
                iconSize={16}
              >
                {notification?.actionButton?.label}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;