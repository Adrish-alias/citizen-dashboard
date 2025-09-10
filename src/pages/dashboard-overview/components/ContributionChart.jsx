import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

import Button from '../../../components/ui/Button';

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
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground capitalize">{entry?.dataKey}:</span>
              <span className="font-medium text-foreground">{entry?.value}kg</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-xl font-semibold text-foreground">Contribution Trends</h2>
        
        <div className="flex items-center space-x-2">
          {/* View Type Toggle */}
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={viewType === 'weekly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewType('weekly')}
              className="text-xs"
            >
              Weekly
            </Button>
            <Button
              variant={viewType === 'monthly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewType('monthly')}
              className="text-xs"
            >
              Monthly
            </Button>
          </div>

          {/* Chart Type Toggle */}
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={chartType === 'bar' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setChartType('bar')}
              iconName="BarChart3"
              iconSize={16}
            />
            <Button
              variant={chartType === 'line' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setChartType('line')}
              iconName="TrendingUp"
              iconSize={16}
            />
          </div>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="organic" fill="var(--color-success)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="recyclable" fill="var(--color-primary)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="general" fill="var(--color-warning)" radius={[2, 2, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="organic" 
                stroke="var(--color-success)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="recyclable" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="general" 
                stroke="var(--color-warning)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center space-x-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-sm text-muted-foreground">Organic Waste</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Recyclable</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-warning" />
          <span className="text-sm text-muted-foreground">General Waste</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionChart;