import { fetchCitySuggestions, fetchWeatherData } from '../services/weather-app-service.js';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { resultadoConsultaContext } from '../context/weather-contexts';

const InputCity = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const { setWeatherData } = useContext(resultadoConsultaContext);
  const debounceRef = useRef(null);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    if (value.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoadingSuggestions(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const result = await fetchCitySuggestions(value);
        setSuggestions(result);
      } catch (error) {
        console.error(error);
        setSuggestions([]);
      } finally {
        setIsLoadingSuggestions(false);
      }
    }, 300);
  };

  const handleSearch = async (cityName = inputValue) => {
    const selectedCity = cityName?.trim();

    if (!selectedCity) {
      alert('Por favor ingresa una ciudad');
      return;
    }

    try {
      const data = await fetchWeatherData(selectedCity);
      setWeatherData(data);
      setSuggestions([]);
      console.log('Respuesta de la API:', data);
    } catch (error) {
      alert(error.message);
      setWeatherData(null);
      console.error(error);
    }
  };

  const handleSuggestionClick = (city) => {
    const selectedCity = city?.name || city?.label || inputValue;
    setInputValue(selectedCity);
    setSuggestions([]);
    handleSearch(selectedCity);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="input-search-container">
      <div className="input-search-wrapper">
        <input
          type="text"
          className="input-search"
          placeholder="Ingresa una ciudad"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            setTimeout(() => setSuggestions([]), 150);
          }}
        />

        {isLoadingSuggestions && (
          <div className="search-loading">Buscando...</div>
        )}

        {suggestions.length > 0 && (
          <ul className="city-suggestions" role="listbox">
            {suggestions.map((city, index) => (
              <li
                key={`${city.name}-${city.country}-${index}`}
                className="city-suggestion-item"
                onMouseDown={(event) => {
                  event.preventDefault();
                  handleSuggestionClick(city);
                }}
              >
                <span className="city-suggestion-name">{city.name}</span>
                <span className="city-suggestion-location">
                  {city.state ? `${city.state}, ` : ''}
                  {city.country}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        className="button-search"
        onClick={() => handleSearch()}
      >
        Buscar
      </button>
    </div>
  );
};

export default InputCity;