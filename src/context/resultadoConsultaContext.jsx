import React, { createContext, useState } from 'react';

// Crear el contexto de consulta de clima
export const resultadoConsultaContext = createContext();

// Componente Provider que envuelve la aplicación
export const ResultadoProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);

  return (
    <resultadoConsultaContext.Provider value={{ weatherData, setWeatherData }}>
      {children}
    </resultadoConsultaContext.Provider>
  );
};
