import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ModuleCard = ({ module, onStartModule }) => {
  const getProgressColor = (progress) => {
    if (progress === 100) return 'bg-success';
    if (progress >= 50) return 'bg-warning';
    return 'bg-primary';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'in-progress':
        return { name: 'Clock', color: 'text-warning' };
      default:
        return { name: 'Play', color: 'text-primary' };
    }
  };

  const statusIcon = getStatusIcon(module.status);

  return (
    <div className="bg-white border border-gray-100 rounded-lg p-6 hover:shadow-elevation-1 transition-all duration-200 hover-lift tap-shrink fade-in-fast">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg ${module.iconBg} flex items-center justify-center`}>
            <Icon name={module.icon} size={24} className={module.iconColor} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{module.title}</h3>
            <p className="text-sm text-muted-foreground">{module.duration}</p>
          </div>
        </div>
        <Icon name={statusIcon?.name} size={20} className={statusIcon?.color} />
      </div>
      <p className="text-muted-foreground mb-4 line-clamp-3">{module.description}</p>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Progress</span>
          <span className="text-sm text-muted-foreground">{module.progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(module.progress)}`}
            style={{ width: `${module.progress}%` }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="BookOpen" size={16} />
            <span>{module.lessons} lessons</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Award" size={16} />
            <span>{module.points} pts</span>
          </div>
        </div>
        <Button
          variant={module.status === 'completed' ? 'outline' : 'default'}
          size="sm"
          onClick={() => onStartModule(module)}
          iconName={module.status === 'completed' ? 'RotateCcw' : module.status === 'in-progress' ? 'Play' : 'ArrowRight'}
          iconPosition="right"
          iconSize={16}
        >
          {module.status === 'completed' ? 'Review' : module.status === 'in-progress' ? 'Continue' : 'Start'}
        </Button>
      </div>
    </div>
  );
};

export default ModuleCard;