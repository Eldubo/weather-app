
import React, { createContext, useState, useContext } from 'react';

// Crear el contexto de últ consulta
export const resultadoConsultaContext = createContext();


// Componente Provider que envuelve la aplicación
export const ResultadoProvider = ({ children }) => {
  const [resultadoConsulta, setResultadoConsulta] = useState('');

  return (
    <resultadoConsultaContext.Provider value={{ resultadoConsulta, setResultadoConsulta }}>
      {children}
    </resultadoConsultaContext.Provider>
  );
};
