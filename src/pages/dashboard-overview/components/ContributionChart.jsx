import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContributionChart = () => {
  const [viewType, setViewType] = useState('weekly');
  const [chartType, setChartType] = useState('bar');

  const weeklyData = [
    { name: 'Mon', organic: 2.5, recyclable: 1.8, general: 0.5 },
    { name: 'Tue', organic: 3.2, recyclable: 2.1, general: 0.8 },
    { name: 'Wed', organic: 1.9, recyclable: 1.5, general: 0.3 },
    { name: 'Thu', organic: 4.1, recyclable: 2.8, general: 1.2 },
    { name: 'Fri', organic: 3.7, recyclable: 2.3, general: 0.9 },
    { name: 'Sat', organic: 5.2, recyclable: 3.5, general: 1.5 },
    { name: 'Sun', organic: 2.8, recyclable: 1.9, general: 0.6 }
  ];

  const monthlyData = [
    { name: 'Week 1', organic: 18.5, recyclable: 12.8, general: 5.2 },
    { name: 'Week 2', organic: 22.3, recyclable: 15.6, general: 6.8 },
    { name: 'Week 3', organic: 19.7, recyclable: 13.2, general: 4.9 },
    { name: 'Week 4', organic: 25.1, recyclable: 17.4, general: 7.3 }
  ];

  const currentData = viewType === 'weekly' ? weeklyData : monthlyData;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <motion.div 
          className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-card-hover"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-sm font-semibold text-gray-900 mb-3">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-3 text-sm mb-1 last:mb-0">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full shadow-sm" 
                  style={{ backgroundColor: entry?.color }}
                />
                <span className="text-gray-600 capitalize font-medium">{entry?.dataKey.replace('_', ' ')}:</span>
              </div>
              <span className="font-bold text-gray-900">{entry?.value}kg</span>
            </div>
          ))}
        </motion.div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      className="gradient-card border border-gray-200/60 rounded-2xl p-4 sm:p-6 shadow-mobile-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <motion.div 
            className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-inner-glow"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Icon name="TrendingUp" size={20} className="text-white" />
          </motion.div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">📊 Contribution Trends</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          {/* View Type Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 shadow-inner">
            <motion.button
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                viewType === 'weekly' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setViewType('weekly')}
              whileTap={{ scale: 0.95 }}
            >
              Weekly
            </motion.button>
            <motion.button
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                viewType === 'monthly' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setViewType('monthly')}
              whileTap={{ scale: 0.95 }}
            >
              Monthly
            </motion.button>
          </div>

          {/* Chart Type Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 shadow-inner">
            <motion.button
              className={`p-2 rounded-lg transition-all duration-200 ${
                chartType === 'bar' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setChartType('bar')}
              whileTap={{ scale: 0.95 }}
            >
              <Icon name="BarChart3" size={16} />
            </motion.button>
            <motion.button
              className={`p-2 rounded-lg transition-all duration-200 ${
                chartType === 'line' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setChartType('line')}
              whileTap={{ scale: 0.95 }}
            >
              <Icon name="TrendingUp" size={16} />
            </motion.button>
          </div>
        </div>
      </div>

      <motion.div 
        className="h-64 sm:h-80 w-full bg-gradient-to-br from-gray-50/50 to-white rounded-xl p-2 sm:p-4"
        key={`${viewType}-${chartType}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={currentData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="2 4" stroke="#e5e7eb" opacity={0.6} />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={30}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="organic" fill="url(#organicGradient)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="recyclable" fill="url(#recyclableGradient)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="general" fill="url(#generalGradient)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="organicGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#16a34a" stopOpacity={0.7} />
                </linearGradient>
                <linearGradient id="recyclableGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.7} />
                </linearGradient>
                <linearGradient id="generalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#d97706" stopOpacity={0.7} />
                </linearGradient>
              </defs>
            </BarChart>
          ) : (
            <LineChart data={currentData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="2 4" stroke="#e5e7eb" opacity={0.6} />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={30}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="organic" 
                stroke="#22c55e" 
                strokeWidth={3}
                dot={{ fill: '#22c55e', strokeWidth: 2, r: 5, shadow: '0 2px 4px rgba(34, 197, 94, 0.3)' }}
                activeDot={{ r: 6, fill: '#22c55e', stroke: '#fff', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="recyclable" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5, shadow: '0 2px 4px rgba(59, 130, 246, 0.3)' }}
                activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="general" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 5, shadow: '0 2px 4px rgba(245, 158, 11, 0.3)' }}
                activeDot={{ r: 6, fill: '#f59e0b', stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </motion.div>

      {/* Legend */}
      <motion.div 
        className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 pt-4 border-t border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <motion.div 
          className="flex items-center space-x-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200/60"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 shadow-sm" />
          <span className="text-sm font-medium text-green-700">🌱 Organic</span>
        </motion.div>
        <motion.div 
          className="flex items-center space-x-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-200/60"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 shadow-sm" />
          <span className="text-sm font-medium text-blue-700">♻️ Recyclable</span>
        </motion.div>
        <motion.div 
          className="flex items-center space-x-2 px-3 py-2 bg-amber-50 rounded-lg border border-amber-200/60"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 shadow-sm" />
          <span className="text-sm font-medium text-amber-700">🗑️ General</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ContributionChart;