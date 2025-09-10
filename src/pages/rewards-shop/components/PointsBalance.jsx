import React from 'react';
import Icon from '../../../components/AppIcon';

const PointsBalance = ({ points, className = '' }) => {
  return (
    <div className={`bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90 mb-1">Available Points</p>
          <p className="text-3xl font-bold">{points?.toLocaleString()}</p>
          <p className="text-xs opacity-75 mt-1">Keep earning to unlock more rewards!</p>
        </div>
        <div className="bg-white/20 rounded-full p-3">
          <Icon name="Gift" size={32} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default PointsBalance;