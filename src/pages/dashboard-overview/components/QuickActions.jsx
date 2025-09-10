import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 1,
      title: 'Report Waste Issue',
      description: 'Report overflowing bins or illegal dumping',
      icon: 'AlertTriangle',
      color: 'bg-warning',
      route: '/report-waste-issues',
      urgent: true
    },
    {
      id: 2,
      title: 'Start Training',
      description: 'Learn proper waste segregation techniques',
      icon: 'BookOpen',
      color: 'bg-primary',
      route: '/training-modules',
      badge: '3 new modules'
    },
    {
      id: 3,
      title: 'Redeem Rewards',
      description: 'Use your points for eco-friendly products',
      icon: 'Gift',
      color: 'bg-accent',
      route: '/rewards-shop',
      badge: '1,250 points'
    },
    {
      id: 4,
      title: 'View Notifications',
      description: 'Check latest updates and achievements',
      icon: 'Bell',
      color: 'bg-secondary',
      route: '/notifications-center',
      badge: '5 new'
    }
  ];

  const handleActionClick = (route) => {
    navigate(route);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
        <Icon name="Zap" size={20} className="text-accent" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action) => (
          <div
            key={action?.id}
            className="relative group cursor-pointer"
            onClick={() => handleActionClick(action?.route)}
          >
            <div className="bg-muted border border-border rounded-lg p-4 hover:shadow-elevation-1 hover:scale-micro transition-all duration-200">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${action?.color} flex-shrink-0`}>
                  <Icon name={action?.icon} size={20} className="text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-foreground truncate">
                      {action?.title}
                    </h3>
                    {action?.urgent && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-error text-error-foreground">
                        Urgent
                      </span>
                    )}
                    {action?.badge && !action?.urgent && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                        {action?.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {action?.description}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={14}
                  className="text-xs"
                >
                  Go to {action?.title?.split(' ')?.[0]}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Emergency Contact */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between p-3 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="Phone" size={16} className="text-error" />
            <div>
              <p className="text-sm font-medium text-foreground">Emergency Waste Hotline</p>
              <p className="text-xs text-muted-foreground">For urgent waste management issues</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Phone"
            iconPosition="left"
            iconSize={14}
            className="text-error border-error hover:bg-error hover:text-error-foreground"
          >
            Call Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;