import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadge = ({ badge, isUnlocked = false }) => {
  return (
    <div className={`relative p-4 rounded-lg border transition-all duration-300 ${
      isUnlocked 
        ? 'bg-gradient-to-br from-accent/20 to-success/20 border-accent/30 shadow-elevation-1' 
        : 'bg-muted/50 border-border opacity-60'
    }`}>
      <div className="text-center">
        <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
          isUnlocked ? badge?.bgColor : 'bg-muted'
        }`}>
          <Icon 
            name={badge?.icon} 
            size={32} 
            className={isUnlocked ? badge?.iconColor : 'text-muted-foreground'} 
          />
        </div>
        <h3 className={`font-semibold mb-1 ${
          isUnlocked ? 'text-foreground' : 'text-muted-foreground'
        }`}>
          {badge?.title}
        </h3>
        <p className={`text-sm ${
          isUnlocked ? 'text-muted-foreground' : 'text-muted-foreground/70'
        }`}>
          {badge?.description}
        </p>
        {isUnlocked && (
          <div className="mt-2 text-xs text-accent font-medium">
            +{badge?.points} points
          </div>
        )}
      </div>
      {isUnlocked && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
          <Icon name="Check" size={14} className="text-white" />
        </div>
      )}
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
          <Icon name="Lock" size={24} className="text-muted-foreground" />
        </div>
      )}
    </div>
  );
};

export default AchievementBadge;