// src/App.js

import React from 'react';
import { ResultadoProvider } from './context/resultadoConsultaContext';
import { ProximosDiasProvider } from './context/proximosDiasContext';
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
