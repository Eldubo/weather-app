// src/App.js

import React from 'react';
import { ResultadoProvider } from './context/resultadoConsultaContext';
import { ModoProvider } from './context/colorPantallaContext';
import InputCity from './components/InputCity';
import Next24HoursForecast from './components/Next24HoursForecast';
import Next5DaysForecast from './components/Next5DaysForecast';
import { CurrentWeather } from './components/CurrentWeather';

function App() {
  return (
    <ResultadoProvider >
      <ModoProvider>
        <div className="App">
          <h1>Clima en la Ciudad</h1>
          <InputCity />
          <CurrentWeather />
          <Next24HoursForecast/>
          <Next5DaysForecast />
        </div>
      </ModoProvider>
    </ResultadoProvider>
  );
}

export default App;
