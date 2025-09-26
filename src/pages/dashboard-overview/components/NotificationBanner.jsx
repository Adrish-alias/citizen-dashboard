import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const notifications = [
    {
      id: 1,
      type: 'achievement',
      title: 'New Badge Earned!',
      message: 'Congratulations! You\'ve earned the "Eco Champion" badge for contributing 100kg of waste.',
      icon: 'Award',
      color: 'bg-accent',
      priority: 'high'
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Training Module Available',
      message: 'New composting training module is now available. Complete it to earn 50 bonus points.',
      icon: 'BookOpen',
      color: 'bg-primary',
      priority: 'medium'
    }
  ];

  const [currentNotification, setCurrentNotification] = useState(0);

  const handleNext = () => {
    setCurrentNotification((prev) => (prev + 1) % notifications?.length);
  };

  const handlePrevious = () => {
    setCurrentNotification((prev) => (prev - 1 + notifications?.length) % notifications?.length);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible || notifications?.length === 0) {
    return null;
  }

  const notification = notifications?.[currentNotification];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 shadow-elevation-1">
      <div className="flex items-start space-x-4">
        <div className={`p-2 rounded-lg ${notification?.color} flex-shrink-0`}>
          <Icon name={notification?.icon} size={20} className="text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-foreground">
              {notification?.title}
            </h3>
            <div className="flex items-center space-x-2">
              {notification?.priority === 'high' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-error text-error-foreground">
                  High Priority
                </span>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDismiss}
                iconName="X"
                iconSize={16}
                className="h-6 w-6"
              />
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            {notification?.message}
          </p>
          
          {notifications?.length > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrevious}
                  iconName="ChevronLeft"
                  iconSize={16}
                  disabled={notifications?.length <= 1}
                />
                <span className="text-xs text-muted-foreground">
                  {currentNotification + 1} of {notifications?.length}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNext}
                  iconName="ChevronRight"
                  iconSize={16}
                  disabled={notifications?.length <= 1}
                />
              </div>
              
              <div className="hidden sm:flex items-center sm:space-x-1 sm:scale-100 origin-left">
                {notifications?.map((_, index) => (
                  <span
                    key={index}
                    role="button"
                    tabIndex={0}
                    onClick={() => setCurrentNotification(index)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setCurrentNotification(index); } }}
                    className={`inline-block align-middle sm:!w-[4px] sm:!h-[4px] rounded-full transition-colors outline-none border-0 shadow-none ring-0 focus:ring-0 shrink-0 cursor-pointer ${
                      index === currentNotification ? 'bg-primary opacity-100' : 'bg-muted opacity-60'
                    }`}
                    aria-label={`Go to notification ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationBanner;