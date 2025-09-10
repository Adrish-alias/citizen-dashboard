import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NotificationCard from './components/NotificationCard';
import NotificationFilters from './components/NotificationFilters';
import NotificationStats from './components/NotificationStats';
import EmptyState from './components/EmptyState';

const NotificationsCenter = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      type: 'achievement',
      title: 'New Badge Unlocked!',
      content: `Congratulations! You've earned the "Eco Warrior" badge for completing 5 training modules and contributing 50kg of properly segregated waste.`,
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      read: false,
      priority: 'medium',
      actionButton: {
        label: 'View Badge',icon: 'Award',action: 'navigate',data: '/dashboard-overview'
      }
    },
    {
      id: 2,
      type: 'reminder',title: 'Training Module Pending',
      content: `You have an incomplete training module: "Advanced Composting Techniques". Complete it to earn 50 points and improve your waste management skills.`,
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      read: false,
      priority: 'high',
      actionButton: {
        label: 'Continue Learning',icon: 'BookOpen',action: 'navigate',data: '/training-modules'
      }
    },
    {
      id: 3,
      type: 'system',title: 'Collection Schedule Update',
      content: `Important: Waste collection in your area has been rescheduled from Tuesday to Wednesday this week due to the holiday. Please adjust your disposal timing accordingly.`,
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      read: true,
      priority: 'high'
    },
    {
      id: 4,
      type: 'achievement',title: 'Points Milestone Reached',content: `Amazing! You've reached 1,000 points! You can now redeem premium rewards from our eco-friendly shop. Check out the new sustainable products available.`,
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      read: false,
      priority: 'medium',
      actionButton: {
        label: 'Shop Rewards',
        icon: 'Gift',
        action: 'navigate',
        data: '/rewards-shop'
      }
    },
    {
      id: 5,
      type: 'system',
      title: 'App Update Available',
      content: `A new version of GreenTrack is available with improved reporting features and better performance. Update now to get the latest enhancements.`,
      timestamp: new Date(Date.now() - 21600000), // 6 hours ago
      read: true,
      priority: 'low'
    },
    {
      id: 6,
      type: 'reminder',
      title: 'Weekly Report Due',
      content: `Don't forget to submit your weekly waste contribution report. You have 2 days remaining to maintain your active participant status.`,
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      read: false,
      priority: 'medium',
      actionButton: {
        label: 'Submit Report',icon: 'FileText',action: 'navigate',data: '/report-waste-issues'
      }
    },
    {
      id: 7,
      type: 'achievement',title: 'Community Impact Recognition',
      content: `Your waste management efforts have helped your community save 500kg of waste from landfills this month. Thank you for making a difference!`,
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      read: true,
      priority: 'low'
    },
    {
      id: 8,
      type: 'system',title: 'Maintenance Notice',
      content: `Scheduled maintenance will occur on Sunday from 2:00 AM to 4:00 AM. Some features may be temporarily unavailable during this time.`,
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      read: true,
      priority: 'medium'
    },
    {
      id: 9,
      type: 'reminder',title: 'Reward Expiring Soon',
      content: `Your "Free Eco Bag" reward will expire in 5 days. Redeem it now before it's gone! Visit the rewards shop to claim your item.`,
      timestamp: new Date(Date.now() - 345600000), // 4 days ago
      read: false,
      priority: 'high',
      actionButton: {
        label: 'Redeem Now',
        icon: 'Gift',
        action: 'navigate',
        data: '/rewards-shop'
      }
    },
    {
      id: 10,
      type: 'achievement',
      title: 'First Report Submitted',
      content: `Congratulations on submitting your first waste issue report! You've earned 25 points and helped improve your community's waste management.`,
      timestamp: new Date(Date.now() - 432000000), // 5 days ago
      read: true,
      priority: 'low'
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  useEffect(() => {
    let filtered = [...notifications];

    // Apply filters
    if (activeFilter !== 'all') {
      if (activeFilter === 'unread') {
        filtered = filtered?.filter(n => !n?.read);
      } else {
        filtered = filtered?.filter(n => n?.type === activeFilter);
      }
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.timestamp) - new Date(b.timestamp);
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return (priorityOrder?.[b?.priority] || 0) - (priorityOrder?.[a?.priority] || 0);
        case 'type':
          return a?.type?.localeCompare(b?.type);
        case 'newest':
        default:
          return new Date(b.timestamp) - new Date(a.timestamp);
      }
    });

    setFilteredNotifications(filtered);
  }, [notifications, activeFilter, sortBy]);

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev =>
      prev?.map(n =>
        n?.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const handleArchive = (notificationId) => {
    setNotifications(prev =>
      prev?.filter(n => n?.id !== notificationId)
    );
  };

  const handleMarkAllRead = () => {
    setNotifications(prev =>
      prev?.map(n => ({ ...n, read: true }))
    );
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications? This action cannot be undone.')) {
      setNotifications([]);
    }
  };

  const handleAction = (action, data) => {
    if (action === 'navigate' && data) {
      navigate(data);
    }
  };

  const handleResetFilters = () => {
    setActiveFilter('all');
    setSortBy('newest');
  };

  // Calculate stats
  const stats = {
    total: notifications?.length,
    unread: notifications?.filter(n => !n?.read)?.length,
    achievements: notifications?.filter(n => n?.type === 'achievement')?.length,
    reminders: notifications?.filter(n => n?.type === 'reminder')?.length
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Notifications Center
          </h1>
          <p className="text-muted-foreground">
            Stay updated with achievements, reminders, and system alerts
          </p>
        </div>

        {/* Stats Overview */}
        <NotificationStats stats={stats} />

        {/* Filters */}
        <NotificationFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          unreadCount={stats?.unread}
          onMarkAllRead={handleMarkAllRead}
          onClearAll={handleClearAll}
        />

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications?.length > 0 ? (
            filteredNotifications?.map((notification) => (
              <NotificationCard
                key={notification?.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
                onArchive={handleArchive}
                onAction={handleAction}
              />
            ))
          ) : (
            <EmptyState
              filter={activeFilter}
              onResetFilters={handleResetFilters}
            />
          )}
        </div>

        {/* Load More Button (if needed) */}
        {filteredNotifications?.length > 0 && filteredNotifications?.length >= 10 && (
          <div className="flex justify-center mt-8">
            <button className="px-6 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              Load more notifications
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default NotificationsCenter;