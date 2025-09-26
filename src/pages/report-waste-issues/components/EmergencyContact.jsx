import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyContact = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const emergencyContacts = [
    {
      id: 'waste_emergency',
      title: 'Waste Emergency Hotline',
      description: 'For urgent waste-related emergencies requiring immediate attention',
      phone: '1-800-WASTE-911',
      hours: '24/7 Emergency Service',
      icon: 'Phone',
      priority: 'high'
    },
    {
      id: 'environmental_hazard',
      title: 'Environmental Hazard Report',
      description: 'Report hazardous materials, chemical spills, or toxic waste',
      phone: '1-800-ENV-HAZARD',
      hours: 'Mon-Fri 8AM-6PM',
      icon: 'AlertTriangle',
      priority: 'critical'
    },
    {
      id: 'city_services',
      title: 'City Services Non-Emergency',
      description: 'General waste management inquiries and service requests',
      phone: '(555) 123-CITY',
      hours: 'Mon-Fri 7AM-7PM',
      icon: 'Building',
      priority: 'normal'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'border-red-200 bg-red-50';
      case 'high':
        return 'border-amber-200 bg-amber-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  const getPriorityIconColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600';
      case 'high':
        return 'text-amber-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <Icon name="Phone" size={16} className="text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Emergency Contacts</h3>
              <p className="text-xs text-muted-foreground">Quick access to urgent services</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            iconSize={16}
          >
            {isExpanded ? 'Hide' : 'Show'}
          </Button>
        </div>
      </div>
      {isExpanded && (
        <div className="p-4 space-y-3">
          {emergencyContacts?.map((contact) => (
            <div
              key={contact?.id}
              className={`border rounded-lg p-3 ${getPriorityColor(contact?.priority)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <Icon 
                    name={contact?.icon} 
                    size={18} 
                    className={getPriorityIconColor(contact?.priority)} 
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground text-sm">{contact?.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {contact?.description}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 gap-2">
                      <div className="flex items-center space-x-4 text-xs">
                        <span className="font-medium text-foreground">{contact?.phone}</span>
                        <span className="text-muted-foreground">{contact?.hours}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`tel:${contact?.phone}`, '_self')}
                  iconName="Phone"
                  iconSize={14}
                  className="ml-2 flex-shrink-0"
                >
                  Call
                </Button>
              </div>
            </div>
          ))}

          <div className="mt-4 p-3 bg-muted rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div className="text-xs text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Important Notice:</p>
                <p>
                  For life-threatening emergencies, always call 911 first. These contacts are for 
                  waste management and environmental issues only.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyContact;