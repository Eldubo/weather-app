// src/context/CityContext.js

import React, { createContext, useState, useContext } from 'react';

// Crear el contexto de la ciudad
const resultadoProximosDiasContext = createContext();

// Hook para acceder al contexto
export const useResultado = () => {
  return useContext(resultadoProximosDiasContext);
};

// Componente Provider que envuelve la aplicación
export const ProximosDiasProvider = ({ children }) => {
  const [resultadoProximosDias, setResultadoProximosDias] = useState('');

  return (
    <resultadoConsultaContext.Provider value={{ resultadoProximosDias, setResultadoProximosDias }}>
      {children}
    </resultadoConsultaContext.Provider>
  );
};
