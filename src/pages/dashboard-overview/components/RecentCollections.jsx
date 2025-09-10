import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentCollections = () => {
  // Mock recent collection data
  const recentCollections = [
    {
      id: 1,
      date: "2024-12-15",
      time: "09:30 AM",
      wasteTypes: ["Organic", "Recyclable", "Non-Recyclable"],
      totalWeight: "8.5 kg",
      segregationRating: 4.5,
      collectorName: "Maria Rodriguez",
      collectorId: "WC-001",
      notes: "Excellent segregation, minimal contamination found",
      status: "completed"
    },
    {
      id: 2,
      date: "2024-12-12",
      time: "10:15 AM",
      wasteTypes: ["Organic", "Recyclable"],
      totalWeight: "6.2 kg",
      segregationRating: 4.8,
      collectorName: "Carlos Martinez",
      collectorId: "WC-003",
      notes: "Perfect sorting, compost materials properly separated",
      status: "completed"
    },
    {
      id: 3,
      date: "2024-12-09",
      time: "08:45 AM",
      wasteTypes: ["Organic", "Recyclable", "Hazardous"],
      totalWeight: "9.1 kg",
      segregationRating: 3.8,
      collectorName: "Jennifer Lee",
      collectorId: "WC-007",
      notes: "Good effort, minor issues with plastic sorting",
      status: "completed"
    },
    {
      id: 4,
      date: "2024-12-06",
      time: "09:00 AM",
      wasteTypes: ["Organic", "Recyclable"],
      totalWeight: "7.3 kg",
      segregationRating: 4.2,
      collectorName: "Ahmed Hassan",
      collectorId: "WC-012",
      notes: "Well separated, good compliance with guidelines",
      status: "completed"
    }
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-success';
    if (rating >= 4.0) return 'text-primary';
    if (rating >= 3.5) return 'text-warning';
    return 'text-error';
  };

  const getRatingBgColor = (rating) => {
    if (rating >= 4.5) return 'bg-success/20';
    if (rating >= 4.0) return 'bg-primary/20';
    if (rating >= 3.5) return 'bg-warning/20';
    return 'bg-error/20';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent/20 rounded-lg">
            <Icon name="Truck" size={20} className="text-accent" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Recent Collections</h2>
        </div>
        <span className="text-sm text-muted-foreground">Last 30 days</span>
      </div>

      <div className="space-y-4">
        {recentCollections?.map((collection) => (
          <div key={collection?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {formatDate(collection?.date)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{collection?.time}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Weight" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground font-medium">{collection?.totalWeight}</span>
                  <span className="text-xs text-muted-foreground">collected</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`px-3 py-1 rounded-full ${getRatingBgColor(collection?.segregationRating)}`}>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className={getRatingColor(collection?.segregationRating)} />
                    <span className={`text-sm font-medium ${getRatingColor(collection?.segregationRating)}`}>
                      {collection?.segregationRating}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {collection?.wasteTypes?.map((type, index) => (
                <span key={index} className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded">
                  {type}
                </span>
              ))}
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name="User" size={14} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{collection?.collectorName}</span>
                    <span className="text-xs text-muted-foreground">({collection?.collectorId})</span>
                  </div>
                  <p className="text-sm text-muted-foreground italic">{collection?.notes}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground mb-1">31.1 kg</div>
            <div className="text-sm text-muted-foreground">Total Collected</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">4.3</div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">4</div>
            <div className="text-sm text-muted-foreground">Collections</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentCollections;