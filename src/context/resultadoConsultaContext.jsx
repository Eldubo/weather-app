import { useState } from 'react';
import { resultadoConsultaContext as ResultadoConsultaContext } from './weather-contexts';

export const ResultadoProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);

  return (
    <ResultadoConsultaContext.Provider value={{ weatherData, setWeatherData }}>
      {children}
    </ResultadoConsultaContext.Provider>
  );
};
