// src/components/InputCity.jsx
import {fetchWeatherData} from '../services/weather-app-service.js';
import React, { useState } from 'react';

const InputCity = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    if (!inputValue) {
      alert('Por favor ingresa una ciudad');
      return;
    }
    fetchWeatherData(inputValue); 
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
