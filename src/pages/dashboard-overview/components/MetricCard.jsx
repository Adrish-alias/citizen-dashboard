import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, unit, icon, color, progress, trend, onClick }) => {
  return (
    <div 
      className={`bg-card border border-border rounded-lg p-6 hover:shadow-elevation-1 transition-standard cursor-pointer ${onClick ? 'hover:scale-micro' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <div className={`p-2 rounded-lg ${color}`}>
              <Icon name={icon} size={20} className="text-white" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          </div>
          
          <div className="flex items-baseline space-x-1 mb-3">
            <span className="text-3xl font-bold text-foreground">{value}</span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>

          {progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${color?.replace('bg-', 'bg-')}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {trend && (
            <div className="flex items-center space-x-1 mt-2">
              <Icon 
                name={trend?.direction === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                size={14} 
                className={trend?.direction === 'up' ? 'text-success' : 'text-error'} 
              />
              <span className={`text-xs font-medium ${trend?.direction === 'up' ? 'text-success' : 'text-error'}`}>
                {trend?.value}% from last month
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;