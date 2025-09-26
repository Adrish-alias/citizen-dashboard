import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// framer-motion removed to eliminate navigation animations
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
    <>
    <header className="sticky top-0 z-100 w-full bg-white/80 backdrop-blur-md border-b border-transparent shadow-sm glass-effect">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-inner-glow">
            <Icon name="Leaf" size={20} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">SwachhSamadhan</span>
            <span className="text-xs text-emerald-700/80 hidden sm:block font-medium">Citizen Dashboard</span>
          </div>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden lg:flex items-center space-x-2">
          {primaryNavItems?.map((item, index) => (
            <div
              key={item?.path}
            >
              <Button
                variant={isActive(item?.path) ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleNavigation(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={16}
                className="transition-smooth hover:scale-micro hover-lift tap-shrink"
              >
                {item?.label}
              </Button>
            </div>
          ))}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          {/* Notifications Badge - Desktop */}
          <div
            className="hidden lg:block"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleNavigation('/notifications-center')}
              className="relative"
              iconName="Bell"
              iconSize={20}
            >
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-400 to-red-500 rounded-full border-2 border-white animate-pulse-soft"></span>
              <span className="sr-only">View notifications</span>
            </Button>
          </div>

          {/* User Profile */}
          <div 
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-inner-glow">
              <Icon name="User" size={16} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-gray-900">Citizen User</p>
              <p className="text-xs text-emerald-700/80 font-medium">Active Participant</p>
            </div>
          </div>
        </div>
      </div>
    </header>
        {/* Mobile Bottom Navigation - full-width, sticky to bottom */}
        <div className="fixed bottom-0 left-0 right-0 lg:hidden z-50 w-screen">
          <div
            className="flex items-center justify-around px-2 py-2 bg-white/95 supports-[backdrop-filter]:backdrop-blur-sm border-t border-green-200 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            {primaryNavItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  relative flex flex-col items-center justify-center p-1.5 min-w-0 flex-1 mx-1 gap-0.5
                  transition-standard tap-shrink
                  ${isActive(item?.path)
                    ? 'text-green-700'
                    : 'text-gray-700 hover:bg-green-50'
                  }
                `}
              >
                {isActive(item?.path) && (
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-green-600" />
                )}
                <Icon name={item?.icon} size={18} />
                <span className={`text-[10px] leading-tight font-medium truncate ${isActive(item?.path) ? 'block' : 'hidden sm:block'}`}>{item?.label}</span>
              </button>
            ))}
            
            {/* Notifications in bottom nav */}
            <button
              onClick={() => handleNavigation('/notifications-center')}
              className={`
                relative flex flex-col items-center justify-center p-1.5 min-w-0 flex-1 mx-1 gap-0.5
                transition-standard tap-shrink
                ${isActive('/notifications-center')
                  ? 'text-green-700'
                  : 'text-gray-700 hover:bg-green-50'
                }
              `}
            >
              {isActive('/notifications-center') && (
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-green-600" />
              )}
              <div className="relative">
                <Icon name="Bell" size={18} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </div>
              <span className={`text-[10px] leading-tight font-medium truncate ${isActive('/notifications-center') ? 'block' : 'hidden sm:block'}`}>Alerts</span>
            </button>
          </div>
        </div>
    </>
  );
};

export default Header;