import React from 'react';
import Icon from '../../../components/AppIcon';

const HouseholdCard = () => {
  // Mock household data
  const householdData = {
    name: "Green Valley Residence",
    id: "HH-2024-0157",
    address: "123 Eco Street, Green Valley District, Metro City 10001",
    members: [
      {
        id: 1,
        name: "John Smith",
        role: "Head of Household",
        joinedDate: "2023-01-15",
        status: "active"
      },
      {
        id: 2,
        name: "Sarah Smith",
        role: "Member",
        joinedDate: "2023-01-15",
        status: "active"
      },
      {
        id: 3,
        name: "Emma Smith",
        role: "Member",
        joinedDate: "2023-06-20",
        status: "active"
      },
      {
        id: 4,
        name: "Michael Smith",
        role: "Member",
        joinedDate: "2024-01-10",
        status: "active"
      }
    ]
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-primary/20 rounded-lg">
          <Icon name="Home" size={20} className="text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Household Information</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Household Details */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Household Name</label>
            <p className="text-foreground font-medium">{householdData?.name}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Household ID</label>
            <p className="text-foreground font-mono">{householdData?.id}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Address</label>
            <p className="text-foreground">{householdData?.address}</p>
          </div>
        </div>

        {/* Registered Members */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium text-muted-foreground">Registered Members</label>
            <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
              {householdData?.members?.length} Members
            </span>
          </div>
          
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {householdData?.members?.map((member) => (
              <div key={member?.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="User" size={14} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{member?.name}</p>
                  <p className="text-xs text-muted-foreground">{member?.role}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${
                    member?.status === 'active' ? 'bg-success' : 'bg-muted-foreground'
                  }`} />
                  <span className="text-xs text-muted-foreground capitalize">{member?.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseholdCard;