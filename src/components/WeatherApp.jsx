// src/components/WeatherApp.jsx

import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/weather-app-service';
import {  useResultado } from 'src/context/resultadoConsultaContext.jsx';

export const WeatherApp = () => {
  const {setWeatherData} = useResultado();
  const [error, setError] = useState('');

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      try {
        const data = await fetchWeatherData(city);
        setWeatherData(data);
        setError('');
      } catch (err) {
        setError('Error al obtener los datos del clima');
        setWeatherData(null);
      }
    };

    fetchWeather();
  }, [city]); // Solo se vuelve a ejecutar cuando cambia la ciudad

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperatura: {weatherData.main.temp} °C</p>
          <p>Descripción: {weatherData.weather[0].description}</p>
          <p>Humedad: {weatherData.main.humidity} %</p>
          <p>Viento: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
