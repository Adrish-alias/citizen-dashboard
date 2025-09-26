import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

// **MODIFICATION: The component now accepts `reports` as a prop**
const RecentReports = ({ reports }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // **REMOVED**: The hardcoded `recentReports` array has been deleted from this file.

  const statusConfig = {
    submitted: {
      label: 'Submitted',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: 'Clock'
    },
    in_progress: {
      label: 'In Progress',
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: 'Loader'
    },
    resolved: {
      label: 'Resolved',
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: 'CheckCircle'
    }
  };

  const priorityConfig = {
    low: { color: 'text-green-600', icon: 'ArrowDown' },
    medium: { color: 'text-amber-600', icon: 'Minus' },
    high: { color: 'text-red-600', icon: 'ArrowUp' }
  };

  const issueTypeConfig = {
    uncollected: { label: 'Uncollected Trash', icon: 'Trash2', color: 'text-blue-600' },
    illegal_dumping: { label: 'Illegal Dumping', icon: 'AlertTriangle', color: 'text-red-600' },
    damaged_bins: { label: 'Damaged Bins', icon: 'Trash', color: 'text-amber-600' }
  };

  const filterOptions = [
    { value: 'all', label: 'All Reports' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' }
  ];

  // **MODIFICATION: Use the `reports` prop instead of the local variable**
  const filteredReports = selectedFilter === 'all' 
    ? reports 
    : reports?.filter(report => report?.status === selectedFilter);

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 hover:shadow-elevation-2 transition-standard fade-in-fast">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Recent Reports</h2>
              <p className="text-sm text-muted-foreground">Track your submitted waste issues</p>
            </div>
          </div>
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {filterOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={selectedFilter === option?.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter(option?.value)}
                className="transition-standard hover-lift tap-shrink"
              >
                {option?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6">
        {filteredReports?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="FileX" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Reports Found</h3>
            <p className="text-muted-foreground">
              {selectedFilter === 'all' ?'You haven\'t submitted any reports yet.' 
                : `No reports with status "${filterOptions?.find(f => f?.value === selectedFilter)?.label}".`
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReports?.map((report) => (
              <div
                key={report?.id}
                className="border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-standard hover-lift tap-shrink fade-in-fast"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Main Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Icon 
                          name={issueTypeConfig?.[report?.issueType]?.icon} 
                          size={20} 
                          className={issueTypeConfig?.[report?.issueType]?.color} 
                        />
                        <div>
                          <h3 className="font-semibold text-foreground">{report?.title}</h3>
                          <p className="text-sm text-muted-foreground">ID: {report?.id}</p>
                        </div>
                      </div>
                      
                      {/* Priority Indicator */}
                      <div className="flex items-center space-x-1">
                        <Icon 
                          name={priorityConfig?.[report?.priority]?.icon} 
                          size={16} 
                          className={priorityConfig?.[report?.priority]?.color} 
                        />
                        <span className={`text-sm font-medium ${priorityConfig?.[report?.priority]?.color}`}>
                          {report?.priority?.charAt(0)?.toUpperCase() + report?.priority?.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Icon name="MapPin" size={14} />
                        <span>{report?.location}</span>
                      </div>
                      <p className="text-sm text-foreground line-clamp-2">{report?.description}</p>
                    </div>
                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={12} />
                        <span>Submitted: {formatDate(report?.submittedDate)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>Updated: {formatDate(report?.lastUpdate)}</span>
                      </div>
                      {report?.photos > 0 && (
                        <div className="flex items-center space-x-1">
                          <Icon name="Camera" size={12} />
                          <span>{report?.photos} photo{report?.photos > 1 ? 's' : ''}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Icon name="User" size={12} />
                        <span>{report?.assignedTo}</span>
                      </div>
                    </div>
                  </div>
                  {/* Status Badge */}
                  <div className="flex items-center justify-between lg:flex-col lg:items-end gap-3">
                    <div className={`
                      inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium border
                      ${statusConfig?.[report?.status]?.color}
                   `}>
                      <Icon name={statusConfig?.[report?.status]?.icon} size={14} />
                      <span>{statusConfig?.[report?.status]?.label}</span>
                    </div>
                    {/* Action Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ExternalLink"
                      iconPosition="right"
                      iconSize={14}
                      className="whitespace-nowrap hover-lift tap-shrink transition-standard"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Load More Button */}
        {filteredReports?.length > 0 && (
          <div className="text-center mt-6 pt-6 border-t border-border">
            <Button
              variant="outline"
              iconName="ChevronDown"
              iconPosition="right"
              className="hover-lift tap-shrink transition-standard"
            >
              Load More Reports
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentReports;