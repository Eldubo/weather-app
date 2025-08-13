// src/components/InputCity.jsx

import React, { useState } from 'react';
import { useCity } from '../context/CityContext';

const InputCity = () => {
  const { setCity } = useCity();  // Accedemos a `setCity` del contexto
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    if (!inputValue) {
      alert('Por favor ingresa una ciudad');
      return;
    }
    setCity(inputValue); // Actualizamos el valor de la ciudad en el contexto
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Ingresa una ciudad"
        value={inputValue}
        onChange={handleInputChange}
        style={{ padding: '10px', fontSize: '16px', marginBottom: '10px' }}
      />
      <button
        onClick={handleSearch}
        style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}
      >
        Buscar
      </button>
    </div>
  );
};

export default InputCity;
