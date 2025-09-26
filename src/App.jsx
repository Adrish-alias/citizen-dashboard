import React from "react";
import Routes from "./Routes";
import { PointsProvider } from './context/PointsContext';

function App() {
  return (
    <PointsProvider>
      <Routes />
    </PointsProvider>
  );
}

export default App;
