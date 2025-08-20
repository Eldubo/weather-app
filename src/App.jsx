// src/App.js

import React from 'react';
import { ResultadoProvider } from './context/resultadoConsultaContext';
import { ModoProvider } from './context/colorPantallaContext';
import InputCity from './components/InputCity';
import WeatherApp from './components/WeatherApp';  // Suponiendo que tienes este componente

function App() {
  return (
    <ResultadoProvider >
      <ModoProvider>
        <div className="App">
          <h1>Clima en la Ciudad</h1>
          <InputCity />
          <WeatherApp />
        </div>
      </ModoProvider>
    </ResultadoProvider>
  );
}

export default App;
