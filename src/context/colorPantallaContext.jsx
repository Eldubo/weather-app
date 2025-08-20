
import React, { useState} from 'react';

// Crear el contexto de últ consulta
export const colorPantallaContext = React.createContext();


// Componente Provider que envuelve la aplicación
export const ModoProvider = ({ children }) => {
  const [colorPantalla, setColorPantalla] = useState('');

  return (
    <colorPantallaContext.Provider value={{ colorPantalla, setColorPantalla }}>
      {children}
    </colorPantallaContext.Provider>
  );
};
