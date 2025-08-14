// src/context/CityContext.js

import React, { createContext, useState, useContext } from 'react';

// Crear el contexto de últ consulta
const resultadoConsultaContext = createContext();

// Hook para acceder al contexto
export const useResultado = () => {
  return useContext(resultadoConsultaContext);
};

// Componente Provider que envuelve la aplicación
export const ResultadoProvider = ({ children }) => {
  const [resultadoConsulta, setResultadoConsulta] = useState('');

  return (
    <resultadoConsultaContext.Provider value={{ resultadoConsulta, setResultadoConsulta }}>
      {children}
    </resultadoConsultaContext.Provider>
  );
};
