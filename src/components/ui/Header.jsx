import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const primaryNavItems = [
    {
      label: 'Overview',
      path: '/dashboard-overview',
      icon: 'Home'
    },
    {
      label: 'Learn',
      path: '/training-modules',
      icon: 'BookOpen'
    },
    {
      label: 'Report',
      path: '/report-waste-issues',
      icon: 'AlertTriangle'
    },
    {
      label: 'Rewards',
      path: '/rewards-shop',
      icon: 'Gift'
    },
    {
      label: 'Feedback',
      path: '/feedback',
      icon: 'MessageSquare'
    }
  ];

  const secondaryNavItems = [
    {
      label: 'Notifications',
      path: '/notifications-center',
      icon: 'Bell'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMoreMenuOpen(false);
  };

  const isActive = (path) => {
    return location?.pathname === path || (path === '/dashboard-overview' && location?.pathname === '/');
  };

  return (
    <header className="sticky top-0 z-100 w-full bg-card border-b border-border shadow-elevation-1">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <circle cx="16" cy="16" r="14" fill="currentColor" opacity="0.1" />
              <path
                d="M12 8L20 8C21.1046 8 22 8.89543 22 10L22 14C22 15.1046 21.1046 16 20 16L12 16C10.8954 16 10 15.1046 10 14L10 10C10 8.89543 10.8954 8 12 8Z"
                fill="currentColor"
              />
              <path
                d="M8 18L24 18C24.5523 18 25 18.4477 25 19L25 21C25 21.5523 24.5523 22 24 22L8 22C7.44772 22 7 21.5523 7 21L7 19C7 18.4477 7.44772 18 8 18Z"
                fill="currentColor"
                opacity="0.7"
              />
              <circle cx="13" cy="25" r="2" fill="currentColor" opacity="0.5" />
              <circle cx="19" cy="25" r="2" fill="currentColor" opacity="0.5" />
            </svg>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground">SwachhSamadhan</span>
              <span className="text-xs text-muted-foreground hidden sm:block">Citizen Dashboard</span>
            </div>
          </div>
        </div>

        {/* Primary Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-1">
          {primaryNavItems?.map((item) => (
            <Button
              key={item?.path}
              variant={isActive(item?.path) ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
              className="transition-micro hover:scale-micro"
            >
              {item?.label}
            </Button>
          ))}

          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              iconName="MoreHorizontal"
              iconSize={16}
            >
              More
            </Button>

            {isMoreMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-150"
                  onClick={() => setIsMoreMenuOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-2 z-200">
                  <div className="py-2">
                    {secondaryNavItems?.map((item) => (
                      <button
                        key={item?.path}
                        onClick={() => handleNavigation(item?.path)}
                        className={`
                          w-full flex items-center space-x-3 px-4 py-2 text-left
                          transition-colors duration-200
                          hover:bg-muted
                          ${isActive(item?.path) ? 'bg-muted text-primary' : 'text-popover-foreground'}
                        `}
                      >
                        <Icon name={item?.icon} size={16} />
                        <span className="text-sm font-medium">{item?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          {/* Notifications Badge - Desktop */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleNavigation('/notifications-center')}
            className="relative hidden md:flex"
            iconName="Bell"
            iconSize={20}
          >
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-card"></span>
            <span className="sr-only">View notifications</span>
          </Button>

          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} className="text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground">Citizen User</p>
              <p className="text-xs text-muted-foreground">Active Participant</p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
            iconName="Menu"
            iconSize={20}
          >
            <span className="sr-only">Open navigation menu</span>
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMoreMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="px-4 py-3 space-y-1">
            {[...primaryNavItems, ...secondaryNavItems]?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2 rounded-lg
                  text-left transition-colors duration-200
                  ${isActive(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon name={item?.icon} size={18} />
                <span className="font-medium">{item?.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
      {/* Quick Action Button - Mobile Only */}
      {!location?.pathname?.includes('/report-waste-issues') && (
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-elevation-2 md:hidden z-60"
          onClick={() => handleNavigation('/report-waste-issues')}
          iconName="AlertTriangle"
          iconSize={24}
        >
          <span className="sr-only">Quick report waste issue</span>
        </Button>
      )}
    </header>
  );
};

export default Header;