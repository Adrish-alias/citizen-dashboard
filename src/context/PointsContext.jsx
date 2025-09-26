import React, { createContext, useState, useContext } from 'react';

const PointsContext = createContext(null);

export const PointsProvider = ({ children }) => {
  const [availablePoints, setAvailablePoints] = useState(2850);
  const [pointsEarnedThisMonth, setPointsEarnedThisMonth] = useState(1250); // Initial mock points for this month

  return (
    <PointsContext.Provider value={{ availablePoints, setAvailablePoints, pointsEarnedThisMonth, setPointsEarnedThisMonth }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};
