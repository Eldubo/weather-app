// src/context/CityContext.js

import React, { createContext, useState, useContext } from 'react';

// Crear el contexto de la ciudad
const CityContext = createContext();

// Hook para acceder al contexto
export const useCity = () => {
  return useContext(CityContext);
};

// Componente Provider que envuelve la aplicación
export const CityProvider = ({ children }) => {
  const [city, setCity] = useState('');

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
};
