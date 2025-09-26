import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressSummary = ({ stats }) => {
  const progressPercentage = (stats?.completedModules / stats?.totalModules) * 100;

  return (
    <div className="bg-white border border-gray-100 rounded-lg p-6 mb-8 shadow-sm hover-lift tap-shrink fade-in-fast">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Icon name="GraduationCap" size={32} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Learning Progress</h2>
            <p className="text-gray-700">Master waste management techniques</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats?.completedModules}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{stats?.inProgressModules}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats?.totalPoints}</div>
            <div className="text-sm text-gray-600">Points Earned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{stats?.estimatedTime}</div>
            <div className="text-sm text-gray-600">Time Left</div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900">Overall Progress</span>
          <span className="text-sm text-gray-700">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="h-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-700"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressSummary;