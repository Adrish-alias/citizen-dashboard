import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, unit, icon, color, progress, trend, onClick }) => {
  const [isPressed, setIsPressed] = useState(false);

  const getGradientClass = (color) => {
    switch (color) {
      case 'bg-success':
        return 'gradient-primary';
      case 'bg-secondary':
        return 'gradient-secondary';
      case 'bg-accent':
        return 'gradient-accent';
      case 'bg-primary':
        return 'gradient-primary';
      default:
        return 'gradient-primary';
    }
  };

  const getProgressGradient = (color) => {
    switch (color) {
      case 'bg-success':
        return 'from-green-400 to-green-600';
      case 'bg-secondary':
        return 'from-blue-400 to-blue-600';
      case 'bg-accent':
        return 'from-amber-400 to-amber-600';
      case 'bg-primary':
        return 'from-green-400 to-green-600';
      default:
        return 'from-green-400 to-green-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      className={`
        relative overflow-hidden
        bg-gradient-to-br from-white via-white to-gray-50
        border border-gray-200/60
        rounded-2xl p-5 sm:p-6
        shadow-mobile-card hover:shadow-card-hover
        transition-all duration-300 ease-out
        cursor-pointer group
        backdrop-blur-sm
        ${onClick ? 'active:scale-95' : ''}
      `}
      onClick={onClick}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100" />
      
      <div className="relative z-10">
        {/* Header with icon and title */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <motion.div 
              className={`
                p-3 rounded-xl shadow-inner-glow
                ${getGradientClass(color)}
                group-hover:shadow-glow-primary
              `}
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.2 }
              }}
            >
              <Icon name={icon} size={20} className="text-white drop-shadow-sm" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide leading-tight">
                {title}
              </h3>
            </div>
          </div>
        </div>
        
        {/* Value display */}
        <div className="mb-4">
          <div className="flex items-baseline space-x-2">
            <motion.span 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-none"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {value}
            </motion.span>
            {unit && (
              <span className="text-sm sm:text-base text-gray-500 font-medium">
                {unit}
              </span>
            )}
          </div>
        </div>

        {/* Progress bar */}
        {progress !== undefined && (
          <motion.div 
            className="space-y-2 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Progress</span>
              <span className="text-xs font-bold text-gray-800">{progress}%</span>
            </div>
            <div className="relative w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <motion.div 
                className={`h-full bg-gradient-to-r ${getProgressGradient(color)} rounded-full shadow-sm`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />
              {/* Shimmer on progress bar */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </motion.div>
        )}

        {/* Trend indicator */}
        {trend && (
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <div className={`
              p-1.5 rounded-lg
              ${trend?.direction === 'up' 
                ? 'bg-green-100 text-green-600' 
                : 'bg-red-100 text-red-600'
              }
            `}>
              <Icon 
                name={trend?.direction === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                size={14}
              />
            </div>
            <div className="flex flex-col">
              <span className={`
                text-xs font-bold
                ${trend?.direction === 'up' ? 'text-green-600' : 'text-red-600'}
              `}>
                {trend?.direction === 'up' ? '+' : ''}{trend?.value}%
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Touch feedback for mobile */}
      {isPressed && (
        <div className="absolute inset-0 bg-black/5 rounded-2xl" />
      )}
    </motion.div>
  );
};

export default MetricCard;