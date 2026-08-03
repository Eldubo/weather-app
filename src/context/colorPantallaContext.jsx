import { useState } from 'react';
import { colorPantallaContext as ColorPantallaContext } from './weather-contexts';

export const ModoProvider = ({ children }) => {
  const [colorPantalla, setColorPantalla] = useState('light');

  return (
    <ColorPantallaContext.Provider value={{ colorPantalla, setColorPantalla }}>
      {children}
    </ColorPantallaContext.Provider>
  );
};
