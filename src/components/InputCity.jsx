import { fetchWeatherData } from '../services/weather-app-service.js';
import React, { useState, useContext } from 'react';
import { resultadoConsultaContext } from '../context/resultadoConsultaContext';
import '../styles/weather-info.css';

const InputCity = () => {
  const [inputValue, setInputValue] = useState('');
  const { setWeatherData } = useContext(resultadoConsultaContext);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = async () => {
    if (!inputValue) {
      alert('Por favor ingresa una ciudad');
      return;
    }
    try {
      const data = await fetchWeatherData(inputValue);
      setWeatherData(data);
      console.log('Respuesta de la API:', data);
    } catch (error) {
      alert(error.message);
      setWeatherData(null);
      console.error(error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="input-search-container">
      <input
        type="text"
        className="input-search"
        placeholder="Ingresa una ciudad"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className="button-search"
        onClick={handleSearch}
      >
        Buscar
      </button>
    </div>
  );
};

export default InputCity;