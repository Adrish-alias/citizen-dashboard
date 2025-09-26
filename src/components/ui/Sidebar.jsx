import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Overview',
      path: '/dashboard-overview',
      icon: 'Home',
      tooltip: 'Dashboard overview and metrics'
    },
    {
      label: 'Learn',
      path: '/training-modules',
      icon: 'BookOpen',
      tooltip: 'Training modules and educational content'
    },
    {
      label: 'Updates',
      path: '/notifications-center',
      icon: 'Bell',
      tooltip: 'Notifications and alerts'
    },
    {
      label: 'Report',
      path: '/report-waste-issues',
      icon: 'AlertTriangle',
      tooltip: 'Report waste management issues'
    },
    {
      label: 'Rewards',
      path: '/rewards-shop',
      icon: 'Gift',
      tooltip: 'Rewards shop and redemptions'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const isActive = (path) => {
    return location?.pathname === path || (path === '/dashboard-overview' && location?.pathname === '/');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-200 lg:hidden"
        onClick={toggleMobileMenu}
        iconName="Menu"
        iconSize={24}
      >
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-150 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-card border-r border-border z-100
          transition-transform duration-300 ease-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          ${isCollapsed ? 'w-16' : 'w-60'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 p-2 rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-inner-glow">
                <Icon name="Leaf" size={20} className="text-white" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-foreground">SwachhSamadhan</span>
                  <span className="text-xs text-muted-foreground">Citizen Dashboard</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg
                  text-left transition-all duration-200 ease-out
                  hover:bg-muted hover:scale-micro
                  focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                  ${isActive(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-elevation-1 border-l-4 border-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
                title={isCollapsed ? item?.tooltip : undefined}
              >
                <Icon
                  name={item?.icon}
                  size={20}
                  className={`flex-shrink-0 ${isActive(item?.path) ? 'text-primary-foreground' : ''}`}
                />
                {!isCollapsed && (
                  <span className="font-medium text-base">{item?.label}</span>
                )}
              </button>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary-foreground" />
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    Citizen User
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    Active Participant
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
      {/* Quick Action Button - Mobile Only */}
      {!location?.pathname?.includes('/report-waste-issues') && (
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-elevation-2 lg:hidden z-60"
          onClick={() => handleNavigation('/report-waste-issues')}
          iconName="AlertTriangle"
          iconSize={24}
        >
          <span className="sr-only">Quick report waste issue</span>
        </Button>
      )}
    </>
  );
};

export default Sidebar;