import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressSummary = ({ stats }) => {
  const progressPercentage = (stats?.completedModules / stats?.totalModules) * 100;

  return (
    <div className="bg-gradient-to-r from-primary/10 to-success/10 border border-border rounded-lg p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <Icon name="GraduationCap" size={32} className="text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Learning Progress</h2>
            <p className="text-muted-foreground">Master waste management techniques</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{stats?.completedModules}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">{stats?.inProgressModules}</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{stats?.totalPoints}</div>
            <div className="text-sm text-muted-foreground">Points Earned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{stats?.estimatedTime}</div>
            <div className="text-sm text-muted-foreground">Time Left</div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Overall Progress</span>
          <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div
            className="h-3 bg-gradient-to-r from-primary to-success rounded-full transition-all duration-700"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressSummary;