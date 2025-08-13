// src/App.js

import React from 'react';
import { CityProvider } from './context/CityContext';
import InputCity from './components/InputCity';
import WeatherApp from './components/WeatherApp';  // Suponiendo que tienes este componente

function App() {
  return (
    <CityProvider>
      <div className="App">
        <h1>Clima en la Ciudad</h1>
        <InputCity />
        <WeatherApp />
      </div>
    </CityProvider>
  );
}

export default App;
