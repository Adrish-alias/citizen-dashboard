import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const NotificationFilters = ({ 
  activeFilter, 
  onFilterChange, 
  sortBy, 
  onSortChange, 
  unreadCount, 
  onMarkAllRead,
  onClearAll 
}) => {
  const filterOptions = [
    { value: 'all', label: 'All Notifications' },
    { value: 'unread', label: `Unread (${unreadCount})` },
    { value: 'achievement', label: 'Achievements' },
    { value: 'reminder', label: 'Reminders' },
    { value: 'system', label: 'System Alerts' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'priority', label: 'Priority' },
    { value: 'type', label: 'Type' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {filterOptions?.map((option) => (
            <Button
              key={option?.value}
              variant={activeFilter === option?.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => onFilterChange(option?.value)}
              className="transition-micro hover:scale-micro"
            >
              {option?.label}
            </Button>
          ))}
        </div>

        {/* Sort and Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
          {/* Sort Dropdown */}
          <div className="min-w-[160px]">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={onSortChange}
              placeholder="Sort by..."
              className="w-full"
            />
          </div>

          {/* Bulk Actions */}
          <div className="flex space-x-2">
            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={onMarkAllRead}
                iconName="CheckCheck"
                iconPosition="left"
                iconSize={16}
              >
                Mark All Read
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              iconName="Trash2"
              iconPosition="left"
              iconSize={16}
              className="text-muted-foreground hover:text-error"
            >
              Clear All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationFilters;